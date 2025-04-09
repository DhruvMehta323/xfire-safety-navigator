import { useState, useRef, useEffect } from 'react';
import { MapPin, Navigation, Flame, Info, Locate, Filter, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const EvacuationRoutes = () => {
  const [activeBuilding, setActiveBuilding] = useState('main');
  const [zoom, setZoom] = useState(1);
  const canvasRef = useRef<HTMLDivElement>(null);
  
  // Filter options
  const [filters, setFilters] = useState({
    exits: true,
    fireExtinguishers: true,
    assemblyPoints: true,
    fireDoors: true
  });

  // Buildings with floors
  const buildings = [
    { id: 'main', name: 'Main Building', floors: 5 },
    { id: 'cs', name: 'Computer Science', floors: 3 },
    { id: 'library', name: 'Library', floors: 2 },
    { id: 'canteen', name: 'Canteen', floors: 1 },
    { id: 'hostel', name: 'Hostel Block', floors: 6 }
  ];

  // Map items for demonstration
  const mapItems = [
    { type: 'exit', x: 80, y: 20, building: 'main', floor: 1, label: 'Main Exit' },
    { type: 'exit', x: 80, y: 80, building: 'main', floor: 1, label: 'Emergency Exit 1' },
    { type: 'exit', x: 20, y: 80, building: 'main', floor: 1, label: 'Emergency Exit 2' },
    { type: 'fireExtinguisher', x: 50, y: 30, building: 'main', floor: 1, label: 'Fire Extinguisher 1' },
    { type: 'fireExtinguisher', x: 70, y: 60, building: 'main', floor: 1, label: 'Fire Extinguisher 2' },
    { type: 'fireExtinguisher', x: 30, y: 70, building: 'main', floor: 1, label: 'Fire Extinguisher 3' },
    { type: 'assemblyPoint', x: 50, y: 10, building: 'main', floor: 0, label: 'Assembly Point A' },
    { type: 'fireDoor', x: 40, y: 50, building: 'main', floor: 1, label: 'Fire Door 1' },
    { type: 'fireDoor', x: 60, y: 40, building: 'main', floor: 1, label: 'Fire Door 2' },
    
    // Add items for CS building
    { type: 'exit', x: 75, y: 25, building: 'cs', floor: 1, label: 'Main Exit' },
    { type: 'exit', x: 25, y: 75, building: 'cs', floor: 1, label: 'Emergency Exit' },
    { type: 'fireExtinguisher', x: 50, y: 50, building: 'cs', floor: 1, label: 'Fire Extinguisher 1' },
    { type: 'assemblyPoint', x: 50, y: 10, building: 'cs', floor: 0, label: 'Assembly Point B' },
  ];

  const [selectedFloor, setSelectedFloor] = useState(1);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [userLocation, setUserLocation] = useState<{x: number, y: number} | null>(null);

  const toggleFilter = (filterType: keyof typeof filters) => {
    setFilters({
      ...filters,
      [filterType]: !filters[filterType]
    });
  };

  const zoomIn = () => {
    if (zoom < 2) setZoom(zoom + 0.2);
  };

  const zoomOut = () => {
    if (zoom > 0.6) setZoom(zoom - 0.2);
  };

  const simulateUserLocation = () => {
    // In a real app, this would use geolocation or indoor positioning
    setUserLocation({ x: 45 + Math.random() * 10, y: 45 + Math.random() * 10 });
  };

  const getIconForMapItem = (type: string) => {
    switch (type) {
      case 'exit':
        return <Navigation className="h-6 w-6 text-green-600" />;
      case 'fireExtinguisher':
        return <Flame className="h-6 w-6 text-red-600" />;
      case 'assemblyPoint':
        return <MapPin className="h-6 w-6 text-blue-600" />;
      case 'fireDoor':
        return <Info className="h-6 w-6 text-orange-600" />;
      default:
        return <MapPin className="h-6 w-6" />;
    }
  };

  const getLabelForMapItem = (type: string) => {
    switch (type) {
      case 'exit':
        return 'Exit';
      case 'fireExtinguisher':
        return 'Fire Extinguisher';
      case 'assemblyPoint':
        return 'Assembly Point';
      case 'fireDoor':
        return 'Fire Door';
      default:
        return type;
    }
  };

  const getColorForMapItem = (type: string) => {
    switch (type) {
      case 'exit':
        return 'bg-green-100 border-green-500';
      case 'fireExtinguisher':
        return 'bg-red-100 border-red-500';
      case 'assemblyPoint':
        return 'bg-blue-100 border-blue-500';
      case 'fireDoor':
        return 'bg-orange-100 border-orange-500';
      default:
        return 'bg-gray-100 border-gray-500';
    }
  };

  const handleItemClick = (item: any) => {
    setSelectedItem(item);
  };

  const filteredMapItems = mapItems.filter(item => 
    item.building === activeBuilding && 
    (item.floor === selectedFloor || item.floor === 0) && 
    filters[item.type as keyof typeof filters]
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8 flex items-center">
        <Navigation className="h-7 w-7 mr-2 text-green-600" />
        Evacuation Routes
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Buildings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {buildings.map((building) => (
                  <Button
                    key={building.id}
                    variant={activeBuilding === building.id ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => {
                      setActiveBuilding(building.id);
                      setSelectedFloor(1);
                      setSelectedItem(null);
                    }}
                  >
                    {building.name}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Map Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Floor</h3>
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: buildings.find(b => b.id === activeBuilding)?.floors || 0 }).map((_, i) => (
                    <Button
                      key={i}
                      variant={selectedFloor === i + 1 ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedFloor(i + 1)}
                    >
                      {i + 1}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Zoom</h3>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="icon" onClick={zoomOut}>
                    <Minus className="h-4 w-4" />
                  </Button>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary" 
                      style={{ width: `${(zoom / 2) * 100}%` }}
                    ></div>
                  </div>
                  <Button variant="outline" size="icon" onClick={zoomIn}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Show/Hide</h3>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full flex items-center justify-between">
                      <span>Filters</span>
                      <Filter className="h-4 w-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Map Elements</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem
                      checked={filters.exits}
                      onCheckedChange={() => toggleFilter('exits')}
                    >
                      Exits
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={filters.fireExtinguishers}
                      onCheckedChange={() => toggleFilter('fireExtinguishers')}
                    >
                      Fire Extinguishers
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={filters.assemblyPoints}
                      onCheckedChange={() => toggleFilter('assemblyPoints')}
                    >
                      Assembly Points
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={filters.fireDoors}
                      onCheckedChange={() => toggleFilter('fireDoors')}
                    >
                      Fire Doors
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              <Button 
                className="w-full flex items-center justify-center" 
                onClick={simulateUserLocation}
              >
                <Locate className="h-4 w-4 mr-2" />
                Find My Location
              </Button>
            </CardContent>
          </Card>

          {selectedItem && (
            <Card>
              <CardHeader>
                <CardTitle>{selectedItem.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="mr-2">
                      {getIconForMapItem(selectedItem.type)}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{getLabelForMapItem(selectedItem.type)}</p>
                      <p className="text-xs text-gray-500">
                        {buildings.find(b => b.id === selectedItem.building)?.name}, Floor {selectedItem.floor}
                      </p>
                    </div>
                  </div>
                  
                  {selectedItem.type === 'exit' && (
                    <div className="mt-2 pt-2 border-t">
                      <h4 className="font-medium text-sm mb-1">Usage Instructions:</h4>
                      <ul className="text-xs space-y-1 list-disc pl-4">
                        <li>Push bar to open in emergency</li>
                        <li>Keep clear of obstructions</li>
                        <li>Proceed to nearest assembly point</li>
                      </ul>
                    </div>
                  )}
                  
                  {selectedItem.type === 'fireExtinguisher' && (
                    <div className="mt-2 pt-2 border-t">
                      <h4 className="font-medium text-sm mb-1">How to use:</h4>
                      <ul className="text-xs space-y-1 list-disc pl-4">
                        <li>Pull the pin</li>
                        <li>Aim at base of fire</li>
                        <li>Squeeze the lever</li>
                        <li>Sweep from side to side</li>
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="lg:col-span-3">
          <Tabs defaultValue="map">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="map">Interactive Map</TabsTrigger>
              <TabsTrigger value="steps">Evacuation Steps</TabsTrigger>
            </TabsList>
            
            <TabsContent value="map" className="mt-4">
              <Card>
                <CardContent className="p-6">
                  <div 
                    ref={canvasRef}
                    className="relative w-full aspect-square border rounded-lg bg-gray-50 overflow-hidden"
                    style={{ transform: `scale(${zoom})`, transformOrigin: 'center' }}
                  >
                    {/* Building floor layout - simplified for demo */}
                    <div className="absolute inset-0 p-2">
                      <div className="h-full border-2 border-gray-300 rounded-lg relative">
                        {/* Simple floor layout */}
                        <div className="absolute top-[20%] left-[20%] right-[20%] bottom-[20%] border border-gray-500 bg-white"></div>
                        <div className="absolute top-[40%] left-[20%] w-[60%] h-[1px] bg-gray-400"></div>
                        <div className="absolute top-[20%] left-[40%] w-[1px] h-[60%] bg-gray-400"></div>
                        
                        {/* Building Label */}
                        <div className="absolute top-2 left-2 text-xs font-bold">
                          {buildings.find(b => b.id === activeBuilding)?.name} - Floor {selectedFloor}
                        </div>
                      </div>

                      {/* Map items */}
                      {filteredMapItems.map((item, idx) => (
                        <button
                          key={idx}
                          className={`absolute p-1 rounded-full border-2 transition-transform hover:scale-110 cursor-pointer z-10 ${
                            selectedItem?.label === item.label ? 'ring-2 ring-blue-500' : ''
                          }`}
                          style={{ 
                            left: `${item.x}%`, 
                            top: `${item.y}%`,
                            transform: 'translate(-50%, -50%)'
                          }}
                          onClick={() => handleItemClick(item)}
                        >
                          {getIconForMapItem(item.type)}
                        </button>
                      ))}

                      {/* User location */}
                      {userLocation && (
                        <div 
                          className="absolute w-4 h-4 bg-blue-500 rounded-full border-2 border-white z-20 animate-pulse"
                          style={{ 
                            left: `${userLocation.x}%`, 
                            top: `${userLocation.y}%`,
                            transform: 'translate(-50%, -50%)'
                          }}
                        ></div>
                      )}

                      {/* Path from user to nearest exit - only shown if user location is set */}
                      {userLocation && (
                        <svg className="absolute inset-0 w-full h-full z-0">
                          <path 
                            d={`M ${userLocation.x} ${userLocation.y} L 50 50 L 80 20`} 
                            stroke="#3B82F6"
                            strokeWidth="3"
                            strokeDasharray="5,5"
                            fill="none"
                            className="animate-pulse"
                          />
                        </svg>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
                    {['exit', 'fireExtinguisher', 'assemblyPoint', 'fireDoor'].map((type) => (
                      <div 
                        key={type} 
                        className={`flex items-center p-2 rounded-md border ${getColorForMapItem(type)}`}
                      >
                        <div className="mr-2">
                          {getIconForMapItem(type)}
                        </div>
                        <span className="text-xs font-medium">
                          {getLabelForMapItem(type)}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="steps" className="mt-4">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Evacuation Procedure</h3>
                  
                  <div className="space-y-6">
                    <div className="flex">
                      <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-red-100 text-red-600 font-bold text-lg mr-4">
                        1
                      </div>
                      <div>
                        <h4 className="text-lg font-medium">Stay Calm</h4>
                        <p className="text-gray-600">
                          Remain calm and alert others nearby about the emergency.
                        </p>
                      </div>
                    </div>

                    <div className="flex">
                      <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-orange-100 text-orange-600 font-bold text-lg mr-4">
                        2
                      </div>
                      <div>
                        <h4 className="text-lg font-medium">Activate Alarm</h4>
                        <p className="text-gray-600">
                          If you discover a fire, activate the nearest fire alarm pull station.
                        </p>
                      </div>
                    </div>

                    <div className="flex">
                      <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-yellow-100 text-yellow-600 font-bold text-lg mr-4">
                        3
                      </div>
                      <div>
                        <h4 className="text-lg font-medium">Call for Help</h4>
                        <p className="text-gray-600">
                          Call campus security at extension 5555 or emergency services at 101.
                        </p>
                      </div>
                    </div>

                    <div className="flex">
                      <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-600 font-bold text-lg mr-4">
                        4
                      </div>
                      <div>
                        <h4 className="text-lg font-medium">Use Nearest Exit</h4>
                        <p className="text-gray-600">
                          Proceed to the nearest emergency exit. Do not use elevators.
                        </p>
                        <div className="mt-2 p-2 bg-gray-50 rounded border text-sm">
                          <strong>Tip:</strong> Feel doors with the back of your hand before opening. If hot, find another exit route.
                        </div>
                      </div>
                    </div>

                    <div className="flex">
                      <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-bold text-lg mr-4">
                        5
                      </div>
                      <div>
                        <h4 className="text-lg font-medium">Proceed to Assembly Point</h4>
                        <p className="text-gray-600">
                          Go to your designated assembly point and wait for instructions.
                        </p>
                        <div className="mt-2">
                          <h5 className="font-medium">Assembly Points:</h5>
                          <ul className="list-disc pl-5 text-sm space-y-1 mt-1">
                            <li>Point A: Main Building Parking Lot</li>
                            <li>Point B: Sports Field</li>
                            <li>Point C: College Gate Area</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default EvacuationRoutes;
