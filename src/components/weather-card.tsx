import { motion } from 'motion/react';
import { Cloud, Droplets, Wind, Eye, Gauge } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface WeatherCardProps {
  weather: {
    temperature: number;
    feelsLike: number;
    condition: string;
    icon: string;
    humidity: number;
    windSpeed: number;
    visibility: number;
    pressure: number;
    lastUpdated: string;
  };
  darkMode: boolean;
}

export function WeatherCard({ weather, darkMode }: WeatherCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-gradient-to-br from-blue-500 to-teal-500 border-0 rounded-3xl shadow-2xl overflow-hidden">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-white">
            <Cloud className="w-6 h-6" />
            Weather Conditions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Main Weather Display */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-6xl text-white mb-2">
                {Math.round(weather.temperature)}°C
              </div>
              <div className="text-white/80 text-lg mb-1">{weather.condition}</div>
              <div className="text-white/70 text-sm">
                Feels like {Math.round(weather.feelsLike)}°C
              </div>
            </div>
            <div className="text-8xl">
              {weather.icon === '01d' || weather.icon === '01n' ? '☀️' :
               weather.icon === '02d' || weather.icon === '02n' ? '⛅' :
               weather.icon === '03d' || weather.icon === '03n' ? '☁️' :
               weather.icon === '04d' || weather.icon === '04n' ? '☁️' :
               weather.icon === '09d' || weather.icon === '09n' ? '🌧️' :
               weather.icon === '10d' || weather.icon === '10n' ? '🌦️' :
               weather.icon === '11d' || weather.icon === '11n' ? '⛈️' :
               weather.icon === '13d' || weather.icon === '13n' ? '❄️' :
               weather.icon === '50d' || weather.icon === '50n' ? '🌫️' : '🌤️'}
            </div>
          </div>

          {/* Weather Details Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
              <div className="flex items-center gap-2 text-white/70 mb-2">
                <Droplets className="w-4 h-4" />
                <span className="text-sm">Humidity</span>
              </div>
              <div className="text-2xl text-white">{weather.humidity}%</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
              <div className="flex items-center gap-2 text-white/70 mb-2">
                <Wind className="w-4 h-4" />
                <span className="text-sm">Wind Speed</span>
              </div>
              <div className="text-2xl text-white">{weather.windSpeed} m/s</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
              <div className="flex items-center gap-2 text-white/70 mb-2">
                <Eye className="w-4 h-4" />
                <span className="text-sm">Visibility</span>
              </div>
              <div className="text-2xl text-white">{(weather.visibility / 1000).toFixed(1)} km</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
              <div className="flex items-center gap-2 text-white/70 mb-2">
                <Gauge className="w-4 h-4" />
                <span className="text-sm">Pressure</span>
              </div>
              <div className="text-2xl text-white">{weather.pressure} hPa</div>
            </div>
          </div>

          <div className="text-xs text-white/60 text-center">
            Last updated: {weather.lastUpdated}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
