
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bell, 
  MapPin, 
  BookOpen, 
  Calendar,
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AlertCard from '@/components/AlertCard';

const Home = () => {
  const [alerts] = useState([
    {
      id: 1,
      level: 'danger',
      title: 'Fire Alarm Triggered',
      message: 'Fire alarm activated in Computer Science building. Please evacuate immediately.',
      location: 'CS Building, 2nd Floor',
      timestamp: '2 minutes ago'
    },
    {
      id: 2,
      level: 'warning',
      title: 'Scheduled Maintenance',
      message: 'Fire extinguishers in Library being replaced. Please use alternate routes.',
      location: 'Library',
      timestamp: '1 hour ago'
    }
  ] as const);

  const quickLinks = [
    {
      title: 'Evacuation Maps',
      description: 'Find the nearest exits and assembly points',
      icon: <MapPin className="h-8 w-8" />,
      link: '/evacuation-routes',
      color: 'bg-blue-100 text-blue-700'
    },
    {
      title: 'Safety Guides',
      description: 'Learn about fire prevention and safety measures',
      icon: <BookOpen className="h-8 w-8" />,
      link: '/safety-guides',
      color: 'bg-green-100 text-green-700'
    },
    {
      title: 'Fire Drill Schedule',
      description: 'View upcoming fire drills and exercises',
      icon: <Calendar className="h-8 w-8" />,
      link: '/dashboard',
      color: 'bg-purple-100 text-purple-700'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-500 to-orange-500 py-16 px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Fire Safety at SPIT
            </h1>
            <p className="mt-4 text-xl max-w-2xl mx-auto">
              A comprehensive platform for emergency preparedness, hazard reporting, and fire safety awareness.
            </p>
            <div className="mt-8 flex justify-center">
              <Link to="/report-hazard">
                <button className="emergency-button flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  Report Fire Hazard
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Live Emergency Alerts */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <Bell className="h-6 w-6 mr-2 text-fire" />
            Live Emergency Alerts
          </h2>
          <Link to="/emergency-alerts" className="text-fire hover:text-fire-dark font-medium flex items-center">
            View All
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>

        <div className="grid gap-4">
          {alerts.map((alert) => (
            <AlertCard
              key={alert.id}
              level={alert.level}
              title={alert.title}
              message={alert.message}
              location={alert.location}
              timestamp={alert.timestamp}
              pulsing={alert.level === 'danger'}
            />
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickLinks.map((link, idx) => (
              <Link key={idx} to={link.link}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className={`${link.color} p-3 w-fit rounded-lg mb-2`}>
                      {link.icon}
                    </div>
                    <CardTitle>{link.title}</CardTitle>
                    <CardDescription>{link.description}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Learn More
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
