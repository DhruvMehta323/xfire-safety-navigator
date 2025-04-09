
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  AlertTriangle, 
  Users, 
  BookOpen, 
  Calendar, 
  CheckCircle2, 
  Clock,
  UserRound,
  Shield,
  History,
  BarChart3,
  Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import AlertCard from '@/components/AlertCard';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface UserRole {
  id: string;
  name: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
}

const Dashboard = () => {
  const [activeRole, setActiveRole] = useState<string>('student');
  
  const roles: UserRole[] = [
    {
      id: 'student',
      name: 'Student',
      description: 'Access to basic fire safety information and reporting',
      features: [
        'Report hazards',
        'View evacuation routes',
        'Receive emergency alerts',
        'Access safety guides'
      ],
      icon: <UserRound className="h-6 w-6" />
    },
    {
      id: 'faculty',
      name: 'Faculty',
      description: 'Additional access to emergency resources and safety plans',
      features: [
        'All student features',
        'Initiate emergency protocols',
        'View detailed evacuation maps',
        'Access emergency contact directory'
      ],
      icon: <BookOpen className="h-6 w-6" />
    },
    {
      id: 'security',
      name: 'Security',
      description: 'Monitor reported hazards and manage fire drills',
      features: [
        'All faculty features',
        'Verify reported hazards',
        'Track evacuation progress',
        'Manage and schedule fire drills',
        'Send emergency notifications'
      ],
      icon: <Shield className="h-6 w-6" />
    },
    {
      id: 'admin',
      name: 'Admin',
      description: 'Full system access and management capabilities',
      features: [
        'All security features',
        'Manage user roles and permissions',
        'Configure system settings',
        'Generate safety compliance reports',
        'Access analytics dashboard'
      ],
      icon: <Users className="h-6 w-6" />
    }
  ];

  const pendingHazards = [
    {
      id: 'HR-2023-001',
      type: 'Electrical',
      location: 'Computer Lab 3',
      reportedBy: 'John Doe',
      date: '2 hours ago',
      priority: 'High'
    },
    {
      id: 'HR-2023-002',
      type: 'Chemical',
      location: 'Chemistry Lab',
      reportedBy: 'Jane Smith',
      date: '1 day ago',
      priority: 'Medium'
    },
    {
      id: 'HR-2023-003',
      type: 'Blocked Exit',
      location: 'Main Building Exit',
      reportedBy: 'Alex Johnson',
      date: '3 days ago',
      priority: 'High'
    }
  ];

  const upcomingDrills = [
    {
      id: 1,
      title: 'Quarterly Fire Drill',
      date: 'April 15, 2023',
      time: '10:00 AM',
      location: 'All Buildings',
      status: 'Scheduled'
    },
    {
      id: 2,
      title: 'Hostel Block Evacuation',
      date: 'April 22, 2023',
      time: '3:00 PM',
      location: 'Hostel Block A & B',
      status: 'Planning'
    }
  ];
  
  const recentSafetyChecks = [
    {
      id: 1,
      type: 'Fire Extinguishers',
      date: 'March 28, 2023',
      status: 'Passed',
      notes: 'All extinguishers properly charged and in place'
    },
    {
      id: 2,
      type: 'Emergency Lighting',
      date: 'March 25, 2023',
      status: 'Action Required',
      notes: '3 lights in CS building need battery replacement'
    },
    {
      id: 3,
      type: 'Smoke Detectors',
      date: 'March 20, 2023',
      status: 'Passed',
      notes: 'All detectors functional'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'passed':
        return 'text-green-600';
      case 'action required':
        return 'text-red-600';
      case 'scheduled':
        return 'text-blue-600';
      case 'planning':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-3xl font-bold">Fire Safety Dashboard</h1>
        
        <div className="mt-4 md:mt-0">
          <Tabs 
            value={activeRole} 
            onValueChange={setActiveRole}
            className="w-full md:w-auto"
          >
            <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full md:w-auto">
              {roles.map(role => (
                <TabsTrigger key={role.id} value={role.id} className="flex items-center">
                  <span className="mr-1.5">{role.icon}</span>
                  <span className="hidden md:inline">{role.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Active Hazards</CardTitle>
            <CardDescription>Reported fire safety issues</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{pendingHazards.length}</div>
              <AlertTriangle className="h-8 w-8 text-yellow-500" />
            </div>
            <div className="mt-2 text-sm text-gray-500">
              {pendingHazards.filter(h => h.priority === 'High').length} high priority
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link to="/report-hazard">View All Hazards</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Upcoming Drills</CardTitle>
            <CardDescription>Scheduled fire drills</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{upcomingDrills.length}</div>
              <Calendar className="h-8 w-8 text-blue-500" />
            </div>
            <div className="mt-2 text-sm text-gray-500">
              Next drill on {upcomingDrills[0]?.date}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">View Schedule</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Compliance Status</CardTitle>
            <CardDescription>Fire safety compliance score</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">87%</div>
              <CheckCircle2 className="h-8 w-8 text-green-500" />
            </div>
            <Progress value={87} className="h-2 mt-2" />
            <div className="mt-2 text-sm text-gray-500">
              3 items need attention
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">View Details</Button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Role specific info */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                {roles.find(r => r.id === activeRole)?.icon}
                <CardTitle>{roles.find(r => r.id === activeRole)?.name} View</CardTitle>
              </div>
              <CardDescription>
                {roles.find(r => r.id === activeRole)?.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <h3 className="text-sm font-medium mb-1">Available Features:</h3>
                <ul className="space-y-1">
                  {roles.find(r => r.id === activeRole)?.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Access {roles.find(r => r.id === activeRole)?.name} Portal</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-fire" />
                Recent Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <AlertCard
                  level="danger"
                  title="Fire Alarm Triggered"
                  message="CS Building, 2nd Floor"
                  timestamp="2 hours ago"
                />
                <AlertCard
                  level="warning"
                  title="Scheduled Maintenance"
                  message="Fire extinguishers in Library"
                  timestamp="Yesterday"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/emergency-alerts">View All Alerts</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Right Column - Tab-based content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="hazards" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="hazards" className="flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Hazards
              </TabsTrigger>
              <TabsTrigger value="drills" className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                Fire Drills
              </TabsTrigger>
              <TabsTrigger value="safety" className="flex items-center">
                <History className="h-4 w-4 mr-2" />
                Safety Checks
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="hazards" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Pending Hazard Reports</CardTitle>
                  <CardDescription>Recently reported fire safety hazards</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pendingHazards.map((hazard) => (
                        <TableRow key={hazard.id}>
                          <TableCell className="font-medium">{hazard.id}</TableCell>
                          <TableCell>{hazard.type}</TableCell>
                          <TableCell>{hazard.location}</TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(hazard.priority)}`}>
                              {hazard.priority}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">View details</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                {(activeRole === 'security' || activeRole === 'admin') && (
                  <CardFooter>
                    <Button className="ml-auto">Manage Hazards</Button>
                  </CardFooter>
                )}
              </Card>
            </TabsContent>
            
            <TabsContent value="drills" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Fire Drills</CardTitle>
                  <CardDescription>Scheduled drills and exercises</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingDrills.map((drill) => (
                      <div key={drill.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{drill.title}</h3>
                            <div className="text-sm text-gray-500 mt-1">
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                <span>{drill.date} at {drill.time}</span>
                              </div>
                              <div className="flex items-center mt-1">
                                <AlertTriangle className="h-4 w-4 mr-1" />
                                <span>{drill.location}</span>
                              </div>
                            </div>
                          </div>
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            drill.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {drill.status}
                          </span>
                        </div>
                        
                        {(activeRole === 'faculty' || activeRole === 'security' || activeRole === 'admin') && (
                          <div className="mt-3 flex justify-end space-x-2">
                            <Button variant="outline" size="sm">View Details</Button>
                            {(activeRole === 'security' || activeRole === 'admin') && (
                              <Button size="sm">Manage</Button>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
                {(activeRole === 'security' || activeRole === 'admin') && (
                  <CardFooter>
                    <Button className="ml-auto">Schedule New Drill</Button>
                  </CardFooter>
                )}
              </Card>
            </TabsContent>
            
            <TabsContent value="safety" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Safety Checks</CardTitle>
                  <CardDescription>Fire safety equipment inspection results</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Type</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentSafetyChecks.map((check) => (
                        <TableRow key={check.id}>
                          <TableCell className="font-medium">{check.type}</TableCell>
                          <TableCell>{check.date}</TableCell>
                          <TableCell>
                            <span className={getStatusColor(check.status)}>
                              {check.status}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">View details</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                {(activeRole === 'security' || activeRole === 'admin') && (
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Generate Report</Button>
                    <Button>Schedule Check</Button>
                  </CardFooter>
                )}
              </Card>
            </TabsContent>
          </Tabs>
          
          {(activeRole === 'admin') && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Fire Safety Analytics
                </CardTitle>
                <CardDescription>Summary of key metrics and trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Hazards by Type</h4>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Electrical</span>
                        <span>45%</span>
                      </div>
                      <Progress value={45} className="h-1.5" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Chemical</span>
                        <span>30%</span>
                      </div>
                      <Progress value={30} className="h-1.5" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Blocked Exits</span>
                        <span>15%</span>
                      </div>
                      <Progress value={15} className="h-1.5" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Other</span>
                        <span>10%</span>
                      </div>
                      <Progress value={10} className="h-1.5" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Response Time</h4>
                    <div className="text-3xl font-bold">26 min</div>
                    <div className="text-xs text-green-600">↓ 12% from last month</div>
                    
                    <h4 className="text-sm font-medium mt-4">Resolution Rate</h4>
                    <div className="text-3xl font-bold">92%</div>
                    <div className="text-xs text-green-600">↑ 5% from last month</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">View Detailed Analytics</Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
