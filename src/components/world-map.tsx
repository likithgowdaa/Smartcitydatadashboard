import { motion } from 'motion/react';
import { MapPin } from 'lucide-react';
import { Badge } from './ui/badge';

interface WorldMapProps {
  onCityClick: (city: string) => void;
  selectedCity: string;
  darkMode: boolean;
}

interface City {
  name: string;
  x: number; // percentage from left
  y: number; // percentage from top
  temperature: number;
  aqi: number;
}

const majorCities: City[] = [
  { name: 'New York', x: 22, y: 40, temperature: 18, aqi: 45 },
  { name: 'London', x: 48, y: 35, temperature: 12, aqi: 52 },
  { name: 'Paris', x: 50, y: 38, temperature: 15, aqi: 48 },
  { name: 'Tokyo', x: 82, y: 42, temperature: 22, aqi: 38 },
  { name: 'Sydney', x: 85, y: 78, temperature: 24, aqi: 25 },
  { name: 'Dubai', x: 58, y: 50, temperature: 32, aqi: 68 },
  { name: 'Singapore', x: 72, y: 60, temperature: 28, aqi: 55 },
  { name: 'Mumbai', x: 62, y: 52, temperature: 30, aqi: 125 },
  { name: 'Beijing', x: 76, y: 38, temperature: 16, aqi: 95 },
  { name: 'Los Angeles', x: 15, y: 42, temperature: 22, aqi: 62 },
  { name: 'São Paulo', x: 32, y: 70, temperature: 26, aqi: 58 },
  { name: 'Cairo', x: 53, y: 48, temperature: 28, aqi: 105 },
];

export function WorldMap({ onCityClick, selectedCity, darkMode }: WorldMapProps) {
  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return 'bg-green-500';
    if (aqi <= 100) return 'bg-yellow-500';
    if (aqi <= 150) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="relative w-full h-[500px] bg-gradient-to-b from-blue-100 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-lg overflow-hidden">
      {/* Simple world map background */}
      <svg
        viewBox="0 0 1000 500"
        className="w-full h-full opacity-30 dark:opacity-20"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Continents (simplified shapes) */}
        {/* North America */}
        <path
          d="M 50 150 Q 100 100 180 120 L 220 180 Q 200 220 160 250 L 100 280 Q 50 250 50 200 Z"
          fill={darkMode ? '#4b5563' : '#93c5fd'}
          stroke={darkMode ? '#6b7280' : '#3b82f6'}
          strokeWidth="2"
        />
        {/* South America */}
        <path
          d="M 180 280 L 220 320 Q 240 400 200 450 L 160 420 Q 150 350 180 280 Z"
          fill={darkMode ? '#4b5563' : '#93c5fd'}
          stroke={darkMode ? '#6b7280' : '#3b82f6'}
          strokeWidth="2"
        />
        {/* Europe */}
        <path
          d="M 450 120 L 520 140 Q 530 180 510 200 L 470 190 Q 450 160 450 120 Z"
          fill={darkMode ? '#4b5563' : '#93c5fd'}
          stroke={darkMode ? '#6b7280' : '#3b82f6'}
          strokeWidth="2"
        />
        {/* Africa */}
        <path
          d="M 480 200 Q 520 220 540 280 L 530 380 Q 500 420 470 380 L 460 280 Q 470 230 480 200 Z"
          fill={darkMode ? '#4b5563' : '#93c5fd'}
          stroke={darkMode ? '#6b7280' : '#3b82f6'}
          strokeWidth="2"
        />
        {/* Asia */}
        <path
          d="M 550 100 Q 700 80 820 140 L 850 200 Q 800 250 720 240 L 640 220 Q 570 180 550 100 Z"
          fill={darkMode ? '#4b5563' : '#93c5fd'}
          stroke={darkMode ? '#6b7280' : '#3b82f6'}
          strokeWidth="2"
        />
        {/* Australia */}
        <path
          d="M 750 350 Q 820 340 860 380 L 850 420 Q 800 430 750 410 Q 730 380 750 350 Z"
          fill={darkMode ? '#4b5563' : '#93c5fd'}
          stroke={darkMode ? '#6b7280' : '#3b82f6'}
          strokeWidth="2"
        />
      </svg>

      {/* City markers */}
      {majorCities.map((city, index) => (
        <motion.div
          key={city.name}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: index * 0.1 }}
          className="absolute cursor-pointer group"
          style={{
            left: `${city.x}%`,
            top: `${city.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
          onClick={() => onCityClick(city.name)}
        >
          {/* Pulse animation for selected city */}
          {selectedCity === city.name && (
            <motion.div
              className="absolute inset-0 rounded-full bg-blue-500"
              animate={{
                scale: [1, 2, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}
          
          {/* Pin marker */}
          <div className={`relative z-10 ${selectedCity === city.name ? 'scale-125' : ''} transition-transform`}>
            <MapPin 
              className={`w-6 h-6 ${getAQIColor(city.aqi)} text-white rounded-full p-1 shadow-lg`}
              fill="currentColor"
            />
          </div>

          {/* Hover tooltip */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-3 whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-20 border border-gray-200 dark:border-gray-700"
          >
            <div className="text-sm text-gray-900 dark:text-white mb-1">{city.name}</div>
            <div className="flex items-center gap-3 text-xs">
              <span className="text-gray-600 dark:text-gray-400">
                🌡️ {city.temperature}°C
              </span>
              <Badge variant="outline" className={`${getAQIColor(city.aqi)} text-white border-0 text-xs`}>
                AQI {city.aqi}
              </Badge>
            </div>
          </motion.div>
        </motion.div>
      ))}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 border border-gray-200 dark:border-gray-700">
        <div className="text-xs text-gray-900 dark:text-white mb-2">Air Quality</div>
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-gray-600 dark:text-gray-400">Good (0-50)</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span className="text-gray-600 dark:text-gray-400">Moderate (51-100)</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span className="text-gray-600 dark:text-gray-400">Unhealthy (101-150)</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-gray-600 dark:text-gray-400">Very Unhealthy (150+)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
