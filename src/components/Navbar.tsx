
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Menu, X, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img src="/assets/spit-logo.png" alt="SPIT Logo" className="h-8 w-auto" />
              <span className="ml-2 text-xl font-bold text-fire">xFire</span>
              <span className="text-secondary text-xl font-bold">.in</span>
            </Link>
            
            {/* Desktop Menu */}
            <div className="hidden md:ml-6 md:flex md:space-x-6">
              <Link to="/" className="text-gray-700 hover:text-fire px-3 py-2 font-medium">
                Home
              </Link>
              <Link to="/report-hazard" className="text-gray-700 hover:text-fire px-3 py-2 font-medium">
                Report Hazard
              </Link>
              <Link to="/emergency-alerts" className="text-gray-700 hover:text-fire px-3 py-2 font-medium">
                Emergency Alerts
              </Link>
              <Link to="/evacuation-routes" className="text-gray-700 hover:text-fire px-3 py-2 font-medium">
                Evacuation Routes
              </Link>
              <Link to="/dashboard" className="text-gray-700 hover:text-fire px-3 py-2 font-medium">
                Dashboard
              </Link>
              <Link to="/safety-guides" className="text-gray-700 hover:text-fire px-3 py-2 font-medium">
                Safety Guides
              </Link>
            </div>
          </div>
          
          <div className="flex items-center">
            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-fire"></span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <span className="text-fire font-medium">Fire Drill</span>
                  <span className="ml-2">Scheduled this Friday at 10 AM</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span className="text-alert-warning font-medium">Maintenance</span>
                  <span className="ml-2">Fire extinguishers being checked today</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="ml-4">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/dashboard" className="w-full">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Login / Register</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <span>Role: Student</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Mobile menu button */}
            <div className="md:hidden ml-4 flex items-center">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-fire hover:bg-gray-100 focus:outline-none"
              >
                {isMenuOpen ? (
                  <X className="block h-6 w-6" />
                ) : (
                  <Menu className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-fire hover:bg-gray-100">
              Home
            </Link>
            <Link to="/report-hazard" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-fire hover:bg-gray-100">
              Report Hazard
            </Link>
            <Link to="/emergency-alerts" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-fire hover:bg-gray-100">
              Emergency Alerts
            </Link>
            <Link to="/evacuation-routes" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-fire hover:bg-gray-100">
              Evacuation Routes
            </Link>
            <Link to="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-fire hover:bg-gray-100">
              Dashboard
            </Link>
            <Link to="/safety-guides" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-fire hover:bg-gray-100">
              Safety Guides
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
