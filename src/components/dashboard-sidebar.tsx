import { Clock, MapPin, TrendingUp, Heart, AlertCircle, Leaf } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';

interface SidebarProps {
  recentSearches: string[];
  onSearchClick: (location: string) => void;
  darkMode: boolean;
  onClose?: () => void;
}

const topPollutedCities = [
  { name: 'Delhi', state: 'Delhi', aqi: 178 },
  { name: 'Patna', state: 'Bihar', aqi: 185 },
  { name: 'Lucknow', state: 'Uttar Pradesh', aqi: 168 },
  { name: 'Jaipur', state: 'Rajasthan', aqi: 155 },
  { name: 'Kolkata', state: 'West Bengal', aqi: 145 },
];

const healthTips = [
  {
    icon: <Leaf className="w-4 h-4" />,
    title: 'Indoor Plants',
    tip: 'Place indoor plants like Snake Plant and Peace Lily to purify air naturally',
    color: 'text-green-600 dark:text-green-400',
  },
  {
    icon: <Heart className="w-4 h-4" />,
    title: 'Stay Hydrated',
    tip: 'Drink plenty of water to help your body flush out toxins from polluted air',
    color: 'text-blue-600 dark:text-blue-400',
  },
  {
    icon: <AlertCircle className="w-4 h-4" />,
    title: 'Use Masks',
    tip: 'Wear N95 masks when AQI is above 150 to protect from harmful particles',
    color: 'text-orange-600 dark:text-orange-400',
  },
];

const aqiTrendsInfo = [
  { period: 'Morning (6-9 AM)', trend: 'Usually highest', icon: '📈', color: 'text-red-600 dark:text-red-400' },
  { period: 'Afternoon (12-3 PM)', trend: 'Moderate levels', icon: '📊', color: 'text-yellow-600 dark:text-yellow-400' },
  { period: 'Evening (6-9 PM)', trend: 'Increases again', icon: '📈', color: 'text-orange-600 dark:text-orange-400' },
  { period: 'Night (9 PM-6 AM)', trend: 'Gradually decreases', icon: '📉', color: 'text-green-600 dark:text-green-400' },
];

export function Sidebar({ recentSearches, onSearchClick, darkMode, onClose }: SidebarProps) {
  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return 'bg-green-500';
    if (aqi <= 100) return 'bg-yellow-500';
    if (aqi <= 150) return 'bg-orange-500';
    if (aqi <= 200) return 'bg-red-500';
    if (aqi <= 300) return 'bg-purple-500';
    return 'bg-rose-700';
  };

  const handleCityClick = (city: string, state: string) => {
    onSearchClick(`${city}, ${state}`);
    onClose?.();
  };

  return (
    <ScrollArea className="h-full">
      <div className="p-6 space-y-6">
        {/* Top Polluted Cities */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-red-500" />
            <h3 className="text-gray-900 dark:text-white">Top Polluted Cities</h3>
          </div>
          <div className="space-y-2">
            {topPollutedCities.map((city, index) => (
              <button
                key={index}
                onClick={() => handleCityClick(city.name, city.state)}
                className="w-full p-3 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors text-left border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="text-sm text-gray-900 dark:text-white">{city.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{city.state}</div>
                  </div>
                  <Badge className={`${getAQIColor(city.aqi)} text-white border-0`}>
                    {city.aqi}
                  </Badge>
                </div>
              </button>
            ))}
          </div>
        </div>

        <Separator className="bg-gray-200 dark:bg-gray-700" />

        {/* Recent Searches */}
        {recentSearches.length > 0 && (
          <>
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-teal-500" />
                <h3 className="text-gray-900 dark:text-white">Recent Searches</h3>
              </div>
              <div className="space-y-2">
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      onSearchClick(search);
                      onClose?.();
                    }}
                    className="w-full p-3 bg-teal-50 dark:bg-teal-950 hover:bg-teal-100 dark:hover:bg-teal-900 rounded-xl transition-colors text-left flex items-center gap-2 border border-teal-200 dark:border-teal-800"
                  >
                    <MapPin className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                    <span className="text-sm text-gray-900 dark:text-white">{search}</span>
                  </button>
                ))}
              </div>
            </div>
            <Separator className="bg-gray-200 dark:bg-gray-700" />
          </>
        )}

        {/* Health Tips */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Heart className="w-5 h-5 text-pink-500" />
            <h3 className="text-gray-900 dark:text-white">Health Tips</h3>
          </div>
          <div className="space-y-3">
            {healthTips.map((tip, index) => (
              <Card key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-gray-200 dark:border-gray-700 rounded-xl">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`${tip.color} mt-1`}>
                      {tip.icon}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-gray-900 dark:text-white mb-1">
                        {tip.title}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {tip.tip}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Separator className="bg-gray-200 dark:bg-gray-700" />

        {/* AQI Trends Info */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-purple-500" />
            <h3 className="text-gray-900 dark:text-white">Daily AQI Patterns</h3>
          </div>
          <div className="space-y-2">
            {aqiTrendsInfo.map((info, index) => (
              <div
                key={index}
                className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-600 dark:text-gray-400">{info.period}</span>
                  <span className="text-lg">{info.icon}</span>
                </div>
                <div className={`text-sm ${info.color}`}>
                  {info.trend}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pro Tip */}
        <Card className="bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-950 dark:to-emerald-950 border-teal-200 dark:border-teal-800 rounded-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-teal-700 dark:text-teal-300">
              <Leaf className="w-4 h-4" />
              Pro Tip
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-teal-900 dark:text-teal-100">
              Air quality is typically best between 3-5 PM. Plan outdoor activities during this time for healthier air exposure.
            </p>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
}
