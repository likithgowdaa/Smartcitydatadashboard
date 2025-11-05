import { motion } from 'motion/react';
import { Card, CardContent } from './ui/card';

interface PollutantCardProps {
  name: string;
  value: number;
  unit: string;
  icon: string;
  delay?: number;
}

export function PollutantCard({ name, value, unit, icon, delay = 0 }: PollutantCardProps) {
  const getPollutantLevel = (name: string, value: number) => {
    if (name === 'PM2.5') {
      if (value <= 30) return { color: 'green', level: 'Good' };
      if (value <= 60) return { color: 'yellow', level: 'Moderate' };
      if (value <= 90) return { color: 'orange', level: 'Poor' };
      return { color: 'red', level: 'Severe' };
    }
    if (name === 'PM10') {
      if (value <= 50) return { color: 'green', level: 'Good' };
      if (value <= 100) return { color: 'yellow', level: 'Moderate' };
      if (value <= 250) return { color: 'orange', level: 'Poor' };
      return { color: 'red', level: 'Severe' };
    }
    // Default for other pollutants
    if (value <= 50) return { color: 'green', level: 'Low' };
    if (value <= 100) return { color: 'yellow', level: 'Moderate' };
    if (value <= 200) return { color: 'orange', level: 'High' };
    return { color: 'red', level: 'Very High' };
  };

  const { color, level } = getPollutantLevel(name, value);

  const colorClasses = {
    green: 'from-green-400 to-green-600',
    yellow: 'from-yellow-400 to-yellow-600',
    orange: 'from-orange-400 to-orange-600',
    red: 'from-red-400 to-red-600',
  };

  const bgClasses = {
    green: 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800',
    yellow: 'bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800',
    orange: 'bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800',
    red: 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <Card className={`${bgClasses[color as keyof typeof bgClasses]} border rounded-2xl shadow-md hover:shadow-xl transition-shadow`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-3xl">{icon}</div>
            <div className={`text-xs px-3 py-1 rounded-full bg-gradient-to-r ${colorClasses[color as keyof typeof colorClasses]} text-white`}>
              {level}
            </div>
          </div>
          <div className="text-2xl text-gray-900 dark:text-white mb-1">
            {value}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
            {unit}
          </div>
          <div className="text-sm text-gray-700 dark:text-gray-300">
            {name}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
