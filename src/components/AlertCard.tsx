
import { AlertCircle, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

type AlertLevel = 'danger' | 'warning' | 'safe' | 'info';

interface AlertCardProps {
  level: AlertLevel;
  title: string;
  message: string;
  timestamp?: string;
  location?: string;
  pulsing?: boolean;
  className?: string;
}

const AlertCard = ({ 
  level, 
  title, 
  message, 
  timestamp, 
  location,
  pulsing = false,
  className 
}: AlertCardProps) => {
  const getIcon = () => {
    switch (level) {
      case 'danger':
        return <AlertCircle className="h-6 w-6 text-alert-danger" />;
      case 'warning':
        return <AlertTriangle className="h-6 w-6 text-alert-warning" />;
      case 'safe':
        return <CheckCircle className="h-6 w-6 text-alert-safe" />;
      default:
        return <Clock className="h-6 w-6 text-blue-500" />;
    }
  };

  const getBgColor = () => {
    switch (level) {
      case 'danger':
        return 'bg-red-50 border-alert-danger';
      case 'warning':
        return 'bg-orange-50 border-alert-warning';
      case 'safe':
        return 'bg-green-50 border-alert-safe';
      default:
        return 'bg-blue-50 border-blue-500';
    }
  };

  return (
    <div 
      className={cn(
        'rounded-lg p-4 border-l-4 shadow-md',
        getBgColor(),
        pulsing && 'animate-pulse-alert',
        className
      )}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-3">
          {getIcon()}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-gray-700 mt-1">{message}</p>
          
          {(location || timestamp) && (
            <div className="mt-2 text-sm text-gray-600 flex flex-wrap gap-x-4">
              {location && (
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{location}</span>
                </div>
              )}
              {timestamp && (
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{timestamp}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

import { MapPin } from 'lucide-react';

export default AlertCard;
