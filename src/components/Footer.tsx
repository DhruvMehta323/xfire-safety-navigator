
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span>SPIT Campus, Andheri West, Mumbai</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                <span>+91-22-1234-5678</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                <span>firesafety@spit.ac.in</span>
              </div>
            </div>
          </div>

          {/* Emergency Contacts */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Emergency Helplines</h3>
            <div className="space-y-3">
              <div className="flex flex-col">
                <span className="font-medium">Fire Emergency:</span>
                <span className="text-red-300">101</span>
              </div>
              <div className="flex flex-col">
                <span className="font-medium">Campus Security:</span>
                <span className="text-red-300">+91-22-1234-5679</span>
              </div>
              <div className="flex flex-col">
                <span className="font-medium">Ambulance:</span>
                <span className="text-red-300">102</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="grid grid-cols-1 gap-2">
              <Link to="/evacuation-routes" className="hover:text-red-300">Evacuation Maps</Link>
              <Link to="/safety-guides" className="hover:text-red-300">Safety Tips</Link>
              <Link to="/dashboard" className="hover:text-red-300">Fire Drill Schedule</Link>
              <Link to="/report-hazard" className="hover:text-red-300">Report a Hazard</Link>
            </div>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-white hover:text-red-300">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-red-300">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-red-300">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-600 text-center">
          <p>&copy; {new Date().getFullYear()} xFire.in - Fire Safety Platform at SPIT. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
