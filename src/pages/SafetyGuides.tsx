
import { useState } from 'react';
import { 
  BookOpen, 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  PlayCircle, 
  Download, 
  ExternalLink, 
  Search,
  ChevronDown, 
  ChevronRight,
  Flame,
  Phone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Progress } from '@/components/ui/progress';

interface GuideCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
}

interface Guide {
  id: string;
  title: string;
  category: string;
  type: 'text' | 'video' | 'infographic' | 'quiz';
  description: string;
  length?: string;
  thumbnail?: string;
}

const SafetyGuides = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [quizProgress, setQuizProgress] = useState(0);
  const [activeQuizQuestion, setActiveQuizQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const categories: GuideCategory[] = [
    {
      id: 'prevention',
      title: 'Preventive Measures',
      icon: <AlertTriangle className="h-6 w-6" />,
      description: 'Learn how to prevent fire hazards in different settings'
    },
    {
      id: 'response',
      title: 'Emergency Response',
      icon: <Flame className="h-6 w-6" />,
      description: 'Step-by-step guides on how to respond to fire emergencies'
    },
    {
      id: 'equipment',
      title: 'Safety Equipment',
      icon: <FileText className="h-6 w-6" />,
      description: 'Learn how to use fire extinguishers and other equipment'
    },
    {
      id: 'evacuation',
      title: 'Evacuation Procedures',
      icon: <CheckCircle2 className="h-6 w-6" />,
      description: 'Proper evacuation protocols during fire emergencies'
    }
  ];

  const guides: Guide[] = [
    {
      id: 'g1',
      title: 'Common Fire Hazards in Academic Settings',
      category: 'prevention',
      type: 'text',
      description: 'Learn about the most common fire hazards found in colleges and universities.',
      length: '5 min read'
    },
    {
      id: 'g2',
      title: 'How to Use a Fire Extinguisher',
      category: 'equipment',
      type: 'video',
      description: 'Step-by-step video guide on using different types of fire extinguishers.',
      length: '3:45 video',
      thumbnail: 'fire-extinguisher.jpg'
    },
    {
      id: 'g3',
      title: 'Laboratory Fire Safety',
      category: 'prevention',
      type: 'infographic',
      description: 'Essential safety measures for chemistry and physics labs.',
      thumbnail: 'lab-safety.jpg'
    },
    {
      id: 'g4',
      title: 'Evacuation Routes and Assembly Points',
      category: 'evacuation',
      type: 'text',
      description: 'Detailed information about campus evacuation routes and assembly points.',
      length: '4 min read'
    },
    {
      id: 'g5',
      title: 'Fire Emergency Response Protocol',
      category: 'response',
      type: 'text',
      description: 'What to do when you discover a fire or hear a fire alarm.',
      length: '6 min read'
    },
    {
      id: 'g6',
      title: 'Fire Safety Quiz',
      category: 'prevention',
      type: 'quiz',
      description: 'Test your knowledge of fire safety measures and protocols.',
      length: '10 questions'
    }
  ];

  const quizQuestions = [
    {
      question: "What should you do first when you discover a fire?",
      options: [
        "Call the fire department",
        "Alert people nearby and activate the fire alarm",
        "Try to extinguish it yourself",
        "Run to the nearest exit"
      ],
      correctAnswer: "Alert people nearby and activate the fire alarm"
    },
    {
      question: "What does the acronym PASS stand for in fire extinguisher use?",
      options: [
        "Pull, Aim, Squeeze, Sweep",
        "Prepare, Alert, Secure, Safety",
        "Push, Apply, Secure, Sweep",
        "Point, Activate, Spray, Safeguard"
      ],
      correctAnswer: "Pull, Aim, Squeeze, Sweep"
    },
    {
      question: "Which of the following should you NOT do during a fire?",
      options: [
        "Stay low to the ground",
        "Feel doors before opening them",
        "Use elevators to evacuate quickly",
        "Follow designated evacuation routes"
      ],
      correctAnswer: "Use elevators to evacuate quickly"
    }
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredGuides = guides.filter(guide => 
    guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guide.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getGuidesByCategory = (categoryId: string) => {
    return filteredGuides.filter(guide => guide.category === categoryId);
  };

  const getGuideTypeIcon = (type: string) => {
    switch (type) {
      case 'text':
        return <FileText className="h-5 w-5 text-blue-500" />;
      case 'video':
        return <PlayCircle className="h-5 w-5 text-red-500" />;
      case 'infographic':
        return <FileText className="h-5 w-5 text-green-500" />;
      case 'quiz':
        return <CheckCircle2 className="h-5 w-5 text-purple-500" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const handleQuizAnswer = (questionIndex: number, answer: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: answer
    });
  };

  const handleNextQuestion = () => {
    if (activeQuizQuestion < quizQuestions.length - 1) {
      setActiveQuizQuestion(activeQuizQuestion + 1);
      setQuizProgress(((activeQuizQuestion + 1) / quizQuestions.length) * 100);
    } else {
      setQuizSubmitted(true);
      setQuizProgress(100);
    }
  };

  const calculateQuizScore = () => {
    let correctAnswers = 0;
    
    quizQuestions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    
    return {
      score: correctAnswers,
      total: quizQuestions.length,
      percentage: Math.round((correctAnswers / quizQuestions.length) * 100)
    };
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold flex items-center">
          <BookOpen className="h-7 w-7 mr-2 text-blue-600" />
          Fire Safety Guides
        </h1>
        <div className="relative max-w-xs w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search guides..."
            className="pl-9"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
          <TabsTrigger value="all">All Guides</TabsTrigger>
          {categories.map(category => (
            <TabsTrigger key={category.id} value={category.id} className="hidden md:flex items-center">
              {category.icon}
              <span className="ml-2">{category.title}</span>
            </TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGuides.map(guide => (
              <Card key={guide.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      {getGuideTypeIcon(guide.type)}
                      <span className="text-xs uppercase font-semibold text-gray-500">
                        {guide.type}
                      </span>
                    </div>
                    {guide.length && (
                      <span className="text-xs text-gray-500">{guide.length}</span>
                    )}
                  </div>
                  <CardTitle className="mt-2">{guide.title}</CardTitle>
                  <CardDescription>{guide.description}</CardDescription>
                </CardHeader>
                {guide.thumbnail && (
                  <div className="px-6">
                    <div className="w-full h-40 bg-gray-200 rounded-md flex items-center justify-center">
                      <FileText className="h-10 w-10 text-gray-400" />
                    </div>
                  </div>
                )}
                <CardFooter className="pt-4">
                  {guide.type === 'quiz' ? (
                    <Button className="w-full" variant="outline">
                      Start Quiz
                    </Button>
                  ) : (
                    <Button className="w-full" variant="outline">
                      View Guide
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {categories.map(category => (
          <TabsContent key={category.id} value={category.id} className="mt-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold flex items-center">
                {category.icon}
                <span className="ml-2">{category.title}</span>
              </h2>
              <p className="text-gray-600 mt-1">{category.description}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getGuidesByCategory(category.id).map(guide => (
                <Card key={guide.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        {getGuideTypeIcon(guide.type)}
                        <span className="text-xs uppercase font-semibold text-gray-500">
                          {guide.type}
                        </span>
                      </div>
                      {guide.length && (
                        <span className="text-xs text-gray-500">{guide.length}</span>
                      )}
                    </div>
                    <CardTitle className="mt-2">{guide.title}</CardTitle>
                    <CardDescription>{guide.description}</CardDescription>
                  </CardHeader>
                  {guide.thumbnail && (
                    <div className="px-6">
                      <div className="w-full h-40 bg-gray-200 rounded-md flex items-center justify-center">
                        <FileText className="h-10 w-10 text-gray-400" />
                      </div>
                    </div>
                  )}
                  <CardFooter className="pt-4">
                    {guide.type === 'quiz' ? (
                      <Button className="w-full" variant="outline">
                        Start Quiz
                      </Button>
                    ) : (
                      <Button className="w-full" variant="outline">
                        View Guide
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>How to Use a Fire Extinguisher: The PASS Method</CardTitle>
              <CardDescription>
                Remember PASS: Pull, Aim, Squeeze, Sweep
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="border rounded-lg p-4 flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-2">
                    P
                  </div>
                  <h3 className="font-bold mb-1">Pull</h3>
                  <p className="text-sm text-gray-600">Pull the pin at the top of the extinguisher that keeps the handle from being pressed.</p>
                </div>
                
                <div className="border rounded-lg p-4 flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-2">
                    A
                  </div>
                  <h3 className="font-bold mb-1">Aim</h3>
                  <p className="text-sm text-gray-600">Aim the nozzle or hose at the base of the fire. Stand 6-8 feet away from the fire.</p>
                </div>
                
                <div className="border rounded-lg p-4 flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-2">
                    S
                  </div>
                  <h3 className="font-bold mb-1">Squeeze</h3>
                  <p className="text-sm text-gray-600">Squeeze the handle to release the extinguishing agent. Release to stop the flow.</p>
                </div>
                
                <div className="border rounded-lg p-4 flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-2">
                    S
                  </div>
                  <h3 className="font-bold mb-1">Sweep</h3>
                  <p className="text-sm text-gray-600">Sweep the nozzle from side to side at the base of the fire until it is extinguished.</p>
                </div>
              </div>
              
              <div className="w-full h-56 bg-gray-200 rounded-md flex items-center justify-center mb-4">
                <PlayCircle className="h-12 w-12 text-gray-400" />
                <span className="ml-2 text-gray-500">Video demonstration</span>
              </div>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 text-sm">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertTriangle className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium text-yellow-800">Important Note</h3>
                    <div className="text-yellow-700 mt-1">
                      <p>Only attempt to extinguish a fire if:</p>
                      <ul className="list-disc pl-5 mt-1 space-y-1">
                        <li>The fire is small and contained</li>
                        <li>You have a clear escape route</li>
                        <li>You have the right type of extinguisher</li>
                        <li>You are trained and confident to use it</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" className="flex items-center">
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
              <Button className="flex items-center">
                <PlayCircle className="mr-2 h-4 w-4" />
                Watch Video
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Fire Safety Quiz</CardTitle>
              <CardDescription>
                Test your knowledge with our fire safety quiz
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!quizSubmitted ? (
                <div>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Question {activeQuizQuestion + 1} of {quizQuestions.length}</span>
                      <span>{Math.round(quizProgress)}%</span>
                    </div>
                    <Progress value={quizProgress} className="h-2" />
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="font-medium mb-2">{quizQuestions[activeQuizQuestion].question}</h3>
                    <div className="space-y-2">
                      {quizQuestions[activeQuizQuestion].options.map((option, idx) => (
                        <div 
                          key={idx}
                          className={`flex items-center border rounded-md p-3 cursor-pointer hover:bg-gray-50 ${
                            selectedAnswers[activeQuizQuestion] === option ? 'border-blue-500 bg-blue-50' : ''
                          }`}
                          onClick={() => handleQuizAnswer(activeQuizQuestion, option)}
                        >
                          <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                            selectedAnswers[activeQuizQuestion] === option ? 'border-blue-500' : 'border-gray-300'
                          }`}>
                            {selectedAnswers[activeQuizQuestion] === option && (
                              <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                            )}
                          </div>
                          <span>{option}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full" 
                    onClick={handleNextQuestion}
                    disabled={selectedAnswers[activeQuizQuestion] === undefined}
                  >
                    {activeQuizQuestion < quizQuestions.length - 1 ? 'Next Question' : 'Submit Quiz'}
                  </Button>
                </div>
              ) : (
                <div className="text-center">
                  <div className="mb-4">
                    <CheckCircle2 className="h-12 w-12 mx-auto text-green-500 mb-2" />
                    <h3 className="text-xl font-medium">Quiz Completed!</h3>
                  </div>
                  
                  <div className="mb-6">
                    <div className="text-5xl font-bold text-green-600 mb-2">
                      {calculateQuizScore().percentage}%
                    </div>
                    <p className="text-gray-600">
                      You got {calculateQuizScore().score} out of {calculateQuizScore().total} questions correct
                    </p>
                  </div>
                  
                  <Button className="w-full" onClick={() => {
                    setQuizSubmitted(false);
                    setActiveQuizQuestion(0);
                    setSelectedAnswers({});
                    setQuizProgress(0);
                  }}>
                    Retake Quiz
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Emergency Contacts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-red-100 rounded-full p-2 mr-3">
                    <Phone className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Fire Emergency</h3>
                    <p className="text-lg font-bold">101</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-2 mr-3">
                    <Phone className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Campus Security</h3>
                    <p className="text-lg font-bold">+91-22-1234-5679</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-green-100 rounded-full p-2 mr-3">
                    <Phone className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Medical Emergency</h3>
                    <p className="text-lg font-bold">102</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Fire Safety FAQs</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>What should I do if I discover a fire?</AccordionTrigger>
                  <AccordionContent>
                    <p>If you discover a fire:</p>
                    <ol className="list-decimal pl-5 mt-2 space-y-1 text-sm">
                      <li>Activate the nearest fire alarm</li>
                      <li>Alert people in the immediate area</li>
                      <li>Call emergency services at 101</li>
                      <li>If the fire is small and you are trained, use a fire extinguisher</li>
                      <li>Evacuate the building using the nearest exit</li>
                    </ol>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger>How often are fire drills conducted?</AccordionTrigger>
                  <AccordionContent>
                    Fire drills are conducted quarterly at SPIT. Every building participates in at least one drill per semester. The schedule is posted on the campus safety website and notifications are sent via email and the campus safety app.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger>What types of fire extinguishers are available on campus?</AccordionTrigger>
                  <AccordionContent>
                    <p>SPIT campus is equipped with different types of fire extinguishers based on the potential fire hazards in each area:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                      <li><strong>Class A:</strong> For ordinary combustibles (wood, paper)</li>
                      <li><strong>Class B:</strong> For flammable liquids</li>
                      <li><strong>Class C:</strong> For electrical equipment</li>
                      <li><strong>Class D:</strong> For combustible metals (labs only)</li>
                      <li><strong>Class K:</strong> For cooking oils (cafeteria)</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger>Where are the assembly points located?</AccordionTrigger>
                  <AccordionContent>
                    <p>The main assembly points on campus are:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                      <li><strong>Point A:</strong> Main Building Parking Lot</li>
                      <li><strong>Point B:</strong> Sports Field</li>
                      <li><strong>Point C:</strong> College Gate Area</li>
                    </ul>
                    <p className="mt-2 text-sm">Check the evacuation maps for the assembly point closest to your location.</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <a href="#" className="flex items-center">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View All FAQs
                </a>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SafetyGuides;
