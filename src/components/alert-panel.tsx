import { motion } from 'motion/react';
import { AlertTriangle, X } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import { useState } from 'react';

interface AlertPanelProps {
  aqi: number;
  category: string;
  location: string;
}

export function AlertPanel({ aqi, category, location }: AlertPanelProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const getAlertStyle = () => {
    if (aqi <= 150) {
      return {
        bg: 'bg-orange-50 dark:bg-orange-950 border-orange-500',
        icon: 'text-orange-600 dark:text-orange-400',
        text: 'text-orange-900 dark:text-orange-200',
      };
    } else if (aqi <= 200) {
      return {
        bg: 'bg-red-50 dark:bg-red-950 border-red-500',
        icon: 'text-red-600 dark:text-red-400',
        text: 'text-red-900 dark:text-red-200',
      };
    } else {
      return {
        bg: 'bg-purple-50 dark:bg-purple-950 border-purple-500',
        icon: 'text-purple-600 dark:text-purple-400',
        text: 'text-purple-900 dark:text-purple-200',
      };
    }
  };

  const getMessage = () => {
    if (aqi <= 150) {
      return `Air quality in ${location} is unhealthy for sensitive groups. People with respiratory conditions should limit prolonged outdoor activities.`;
    } else if (aqi <= 200) {
      return `⚠️ Air quality in ${location} is unhealthy. Everyone should avoid prolonged outdoor exertion. Wear a mask if going outside.`;
    } else if (aqi <= 300) {
      return `🚨 Air quality in ${location} is very unhealthy. Health warnings of emergency conditions. Entire population is likely to be affected. Stay indoors and use air purifiers.`;
    } else {
      return `🚨 HAZARDOUS air quality in ${location}! Health alert: everyone may experience serious health effects. Avoid all outdoor activity and stay indoors with windows closed.`;
    }
  };

  const style = getAlertStyle();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      className="mb-6"
    >
      <Alert className={`${style.bg} border-2 rounded-2xl shadow-lg relative`}>
        <AlertTriangle className={`w-5 h-5 ${style.icon}`} />
        <AlertDescription className={style.text}>
          <div className="pr-8">
            <div className="mb-2">
              <strong>Air Quality Alert - {category}</strong>
            </div>
            <div className="text-sm">{getMessage()}</div>
          </div>
        </AlertDescription>
        <button
          onClick={() => setDismissed(true)}
          className={`absolute top-4 right-4 ${style.icon} hover:opacity-70 transition-opacity`}
        >
          <X className="w-5 h-5" />
        </button>
      </Alert>
    </motion.div>
  );
}
