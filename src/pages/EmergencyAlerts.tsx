
import { useState, useEffect } from 'react';
import { Bell, AlertTriangle, CheckCircle, Clock, RefreshCw, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AlertCard from '@/components/AlertCard';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

interface Alert {
  id: number;
  level: 'danger' | 'warning' | 'safe' | 'info';
  title: string;
  message: string;
  location: string;
  timestamp: string;
  acknowledged: boolean;
  instructions?: string[];
}

const EmergencyAlerts = () => {
  const { toast } = useToast();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeAlerts, setActiveAlerts] = useState<Alert[]>([
    {
      id: 1,
      level: 'danger',
      title: 'Fire Alarm Triggered',
      message: 'Fire alarm activated in Computer Science building. Please evacuate immediately.',
      location: 'CS Building, 2nd Floor',
      timestamp: '2 minutes ago',
      acknowledged: false,
      instructions: [
        'Exit through the nearest emergency exit',
        'Do not use elevators',
        'Proceed to the designated assembly point',
        'Wait for further instructions from safety personnel'
      ]
    },
    {
      id: 2,
      level: 'warning',
      title: 'Scheduled Maintenance',
      message: 'Fire extinguishers in Library being replaced. Please use alternate routes in case of emergency.',
      location: 'Library',
      timestamp: '1 hour ago',
      acknowledged: true
    }
  ]);
  
  const [pastAlerts, setPastAlerts] = useState<Alert[]>([
    {
      id: 3,
      level: 'safe',
      title: 'All Clear: Fire Drill Completed',
      message: 'The scheduled fire drill has been completed successfully. Normal activities can resume.',
      location: 'All Campus',
      timestamp: 'Yesterday, 11:30 AM',
      acknowledged: true
    },
    {
      id: 4,
      level: 'danger',
      title: 'Fire Alarm Triggered',
      message: 'Fire alarm activated in Hostel Block B. Please evacuate immediately.',
      location: 'Hostel Block B, 3rd Floor',
      timestamp: '3 days ago',
      acknowledged: true
    }
  ]);

  const [refreshInterval, setRefreshInterval] = useState(60); // seconds
  const [timeUntilRefresh, setTimeUntilRefresh] = useState(refreshInterval);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeUntilRefresh((prev) => {
        if (prev <= 1) {
          handleRefresh();
          return refreshInterval;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [refreshInterval]);

  const handleAcknowledge = (id: number) => {
    setActiveAlerts((prev) =>
      prev.map((alert) =>
        alert.id === id
          ? { ...alert, acknowledged: true }
          : alert
      )
    );

    toast({
      title: "Alert Acknowledged",
      description: "Emergency services have been notified of your acknowledgment.",
      variant: "default",
    });
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    
    // Simulate API call to refresh data
    setTimeout(() => {
      setIsRefreshing(false);
      setTimeUntilRefresh(refreshInterval);
      
      toast({
        title: "Alerts Updated",
        description: "All emergency alerts are now up to date.",
        variant: "default",
      });
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold flex items-center">
          <Bell className="h-7 w-7 mr-2 text-fire" />
          Emergency Alerts
        </h1>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
            <span className="ml-1 text-xs text-gray-500">({timeUntilRefresh}s)</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="active" className="mb-8">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="active" className="flex items-center">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Active Alerts
            {activeAlerts.some(alert => !alert.acknowledged) && (
              <Badge variant="destructive" className="ml-2">New</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="past" className="flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            Past Alerts
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="mt-4">
          <div className="space-y-4">
            {activeAlerts.length > 0 ? (
              activeAlerts.map((alert) => (
                <Card key={alert.id} className={alert.level === 'danger' ? 'border-red-500' : ''}>
                  <CardContent className="p-6">
                    <AlertCard
                      level={alert.level}
                      title={alert.title}
                      message={alert.message}
                      location={alert.location}
                      timestamp={alert.timestamp}
                      pulsing={alert.level === 'danger' && !alert.acknowledged}
                    />
                    
                    {alert.instructions && (
                      <div className="mt-4 border-t pt-4">
                        <h4 className="text-lg font-semibold mb-2">Evacuation Instructions:</h4>
                        <ol className="list-decimal pl-5 space-y-2">
                          {alert.instructions.map((instruction, idx) => (
                            <li key={idx}>{instruction}</li>
                          ))}
                        </ol>
                      </div>
                    )}
                    
                    {!alert.acknowledged && (
                      <div className="mt-4 flex justify-end">
                        <Button 
                          onClick={() => handleAcknowledge(alert.id)}
                          className="flex items-center"
                        >
                          <ThumbsUp className="h-4 w-4 mr-2" />
                          Acknowledge Alert
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-10">
                <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />
                <h3 className="text-xl font-medium text-gray-900">All Clear</h3>
                <p className="mt-2 text-gray-500">
                  There are no active emergency alerts at this time.
                </p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="past" className="mt-4">
          <div className="space-y-4">
            {pastAlerts.map((alert) => (
              <Card key={alert.id}>
                <CardContent className="p-6">
                  <AlertCard
                    level={alert.level}
                    title={alert.title}
                    message={alert.message}
                    location={alert.location}
                    timestamp={alert.timestamp}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      <Card>
        <CardHeader>
          <CardTitle>What to do in case of fire emergency</CardTitle>
          <CardDescription>
            Follow these steps to ensure your safety and the safety of others
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">If you discover a fire:</h3>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Activate the nearest fire alarm</li>
                <li>Call emergency services at 101</li>
                <li>Alert people in the immediate area</li>
                <li>If the fire is small and you are trained, use a fire extinguisher</li>
                <li>Evacuate the building using the nearest exit</li>
              </ol>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">If you hear a fire alarm:</h3>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Stop what you are doing immediately</li>
                <li>Follow evacuation routes to the nearest exit</li>
                <li>Do not use elevators</li>
                <li>Close doors behind you to contain the fire</li>
                <li>Proceed to the designated assembly point</li>
                <li>Wait for further instructions from safety personnel</li>
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmergencyAlerts;
