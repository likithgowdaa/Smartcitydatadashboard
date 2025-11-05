import { motion } from 'motion/react';
import { MapPin } from 'lucide-react';
import { Badge } from './ui/badge';

interface IndiaMapProps {
  onCityClick: (city: string) => void;
  selectedLocation: string;
  darkMode: boolean;
}

interface CityMarker {
  name: string;
  state: string;
  x: number; // percentage from left
  y: number; // percentage from top
  aqi: number;
}

const majorIndianCities: CityMarker[] = [
  { name: 'Delhi', state: 'Delhi', x: 42, y: 28, aqi: 178 },
  { name: 'Mumbai', state: 'Maharashtra', x: 28, y: 52, aqi: 95 },
  { name: 'Kolkata', state: 'West Bengal', x: 68, y: 45, aqi: 145 },
  { name: 'Bengaluru', state: 'Karnataka', x: 38, y: 72, aqi: 78 },
  { name: 'Chennai', state: 'Tamil Nadu', x: 48, y: 75, aqi: 65 },
  { name: 'Hyderabad', state: 'Telangana', x: 42, y: 62, aqi: 88 },
  { name: 'Pune', state: 'Maharashtra', x: 32, y: 56, aqi: 102 },
  { name: 'Ahmedabad', state: 'Gujarat', x: 30, y: 44, aqi: 125 },
  { name: 'Jaipur', state: 'Rajasthan', x: 38, y: 35, aqi: 155 },
  { name: 'Lucknow', state: 'Uttar Pradesh', x: 48, y: 35, aqi: 168 },
  { name: 'Chandigarh', state: 'Chandigarh', x: 40, y: 25, aqi: 142 },
  { name: 'Bhopal', state: 'Madhya Pradesh', x: 42, y: 45, aqi: 118 },
  { name: 'Patna', state: 'Bihar', x: 58, y: 38, aqi: 185 },
  { name: 'Guwahati', state: 'Assam', x: 78, y: 35, aqi: 92 },
  { name: 'Kochi', state: 'Kerala', x: 40, y: 82, aqi: 45 },
  { name: 'Visakhapatnam', state: 'Andhra Pradesh', x: 54, y: 62, aqi: 72 },
];

export function IndiaMap({ onCityClick, selectedLocation, darkMode }: IndiaMapProps) {
  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return 'bg-green-500';
    if (aqi <= 100) return 'bg-yellow-500';
    if (aqi <= 150) return 'bg-orange-500';
    if (aqi <= 200) return 'bg-red-500';
    if (aqi <= 300) return 'bg-purple-500';
    return 'bg-rose-700';
  };

  const getAQICategory = (aqi: number) => {
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Moderate';
    if (aqi <= 150) return 'Unhealthy for Sensitive';
    if (aqi <= 200) return 'Unhealthy';
    if (aqi <= 300) return 'Very Unhealthy';
    return 'Hazardous';
  };

  return (
    <div className="relative w-full h-[600px] bg-gradient-to-br from-blue-50 to-teal-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
      {/* India Map SVG */}
      <svg
        viewBox="0 0 1000 1000"
        className="w-full h-full opacity-20 dark:opacity-10 absolute inset-0"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Simplified India outline */}
        <path
          d="M 420 200 L 450 180 L 480 190 L 500 210 L 520 240 L 540 280 L 550 320 L 560 360 L 570 400 L 575 440 L 575 480 L 570 520 L 560 560 L 545 600 L 525 630 L 500 660 L 475 690 L 450 720 L 430 750 L 420 780 L 410 810 L 405 840 L 400 860 L 380 870 L 360 860 L 340 840 L 330 820 L 325 800 L 320 780 L 310 760 L 295 740 L 280 720 L 265 700 L 255 680 L 250 660 L 245 640 L 242 620 L 240 600 L 238 580 L 235 560 L 232 540 L 230 520 L 228 500 L 227 480 L 228 460 L 232 440 L 238 420 L 248 400 L 262 380 L 280 360 L 300 345 L 320 335 L 340 328 L 360 322 L 380 315 L 395 305 L 405 290 L 410 270 L 415 250 L 418 230 Z"
          fill={darkMode ? '#1f2937' : '#60a5fa'}
          stroke={darkMode ? '#374151' : '#3b82f6'}
          strokeWidth="3"
        />
        
        {/* Heat zones overlay */}
        <defs>
          <radialGradient id="heatzone1" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="heatzone2" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#f97316" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="heatzone3" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </radialGradient>
        </defs>
        
        {/* Northern India heat zone (high pollution) */}
        <circle cx="420" cy="280" r="120" fill="url(#heatzone1)" />
        
        {/* Western India moderate zone */}
        <circle cx="300" cy="500" r="100" fill="url(#heatzone2)" />
        
        {/* Southern India good zone */}
        <circle cx="420" cy="750" r="110" fill="url(#heatzone3)" />
      </svg>

      {/* City markers */}
      {majorIndianCities.map((city, index) => {
        const isSelected = selectedLocation.includes(city.name);
        
        return (
          <motion.div
            key={city.name}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.05, type: 'spring', stiffness: 200 }}
            className="absolute cursor-pointer group"
            style={{
              left: `${city.x}%`,
              top: `${city.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
            onClick={() => onCityClick(`${city.name}, ${city.state}`)}
          >
            {/* Pulse animation for selected city */}
            {isSelected && (
              <motion.div
                className="absolute inset-0 rounded-full bg-teal-500"
                animate={{
                  scale: [1, 2.5, 1],
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
            <div className={`relative z-10 ${isSelected ? 'scale-125' : ''} transition-transform`}>
              <div className={`w-8 h-8 ${getAQIColor(city.aqi)} rounded-full shadow-lg border-2 border-white dark:border-gray-900 flex items-center justify-center`}>
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>

            {/* Hover tooltip */}
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              whileHover={{ opacity: 1, y: 0, scale: 1 }}
              className="absolute top-full mt-3 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-4 whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-all z-20 border border-gray-200 dark:border-gray-700"
            >
              <div className="text-sm text-gray-900 dark:text-white mb-2">{city.name}, {city.state}</div>
              <div className="flex items-center gap-3">
                <Badge className={`${getAQIColor(city.aqi)} text-white border-0`}>
                  AQI {city.aqi}
                </Badge>
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  {getAQICategory(city.aqi)}
                </span>
              </div>
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white dark:bg-gray-800 rotate-45 border-t border-l border-gray-200 dark:border-gray-700"></div>
            </motion.div>
          </motion.div>
        );
      })}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl shadow-xl p-4 border border-gray-200 dark:border-gray-700">
        <div className="text-xs text-gray-900 dark:text-white mb-3">Air Quality Index</div>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-4 h-4 rounded-full bg-green-500"></div>
            <span className="text-gray-600 dark:text-gray-400">Good (0-50)</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
            <span className="text-gray-600 dark:text-gray-400">Moderate (51-100)</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-4 h-4 rounded-full bg-orange-500"></div>
            <span className="text-gray-600 dark:text-gray-400">Unhealthy (101-150)</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-4 h-4 rounded-full bg-red-500"></div>
            <span className="text-gray-600 dark:text-gray-400">Very Unhealthy (151-200)</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-4 h-4 rounded-full bg-purple-500"></div>
            <span className="text-gray-600 dark:text-gray-400">Severe (201-300)</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-4 h-4 rounded-full bg-rose-700"></div>
            <span className="text-gray-600 dark:text-gray-400">Hazardous (300+)</span>
          </div>
        </div>
      </div>

      {/* Heat zones indicator */}
      <div className="absolute top-4 right-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl shadow-xl p-4 border border-gray-200 dark:border-gray-700">
        <div className="text-xs text-gray-900 dark:text-white mb-2">Heat Zones</div>
        <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
          <div>🔴 High pollution areas</div>
          <div>🟠 Moderate zones</div>
          <div>🟢 Clean air regions</div>
        </div>
      </div>
    </div>
  );
}
