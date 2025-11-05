import { motion } from 'motion/react';
import { Sparkles, Sun, Cloud, Wind, Droplets, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useEffect, useState } from 'react';

interface SmartTipsProps {
  weather: {
    temperature: number;
    condition: string;
    humidity: number;
    windSpeed: number;
  };
  aqi: {
    status: string;
  } | null;
  darkMode: boolean;
}

export function SmartTips({ weather, aqi, darkMode }: SmartTipsProps) {
  const [tips, setTips] = useState<Array<{ icon: any; text: string; color: string }>>([]);

  useEffect(() => {
    const generatedTips: Array<{ icon: any; text: string; color: string }> = [];

    // Temperature-based tips
    if (weather.temperature > 35) {
      generatedTips.push({
        icon: <Sun className="w-5 h-5" />,
        text: `It's very hot at ${Math.round(weather.temperature)}°C. Stay hydrated and avoid prolonged sun exposure.`,
        color: 'from-orange-500 to-red-500',
      });
    } else if (weather.temperature > 30) {
      generatedTips.push({
        icon: <Sun className="w-5 h-5" />,
        text: `Warm day ahead at ${Math.round(weather.temperature)}°C. Remember to drink plenty of water throughout the day.`,
        color: 'from-yellow-500 to-orange-500',
      });
    } else if (weather.temperature < 15) {
      generatedTips.push({
        icon: <Cloud className="w-5 h-5" />,
        text: `Cool weather at ${Math.round(weather.temperature)}°C. Don't forget to wear a jacket or sweater.`,
        color: 'from-blue-500 to-cyan-500',
      });
    } else {
      generatedTips.push({
        icon: <Sun className="w-5 h-5" />,
        text: `Pleasant temperature at ${Math.round(weather.temperature)}°C. Perfect day for outdoor activities!`,
        color: 'from-teal-500 to-green-500',
      });
    }

    // AQI-based tips
    if (aqi) {
      if (aqi.status === 'Good') {
        generatedTips.push({
          icon: <Wind className="w-5 h-5" />,
          text: 'Excellent air quality! Great time for jogging, cycling, or outdoor sports.',
          color: 'from-green-500 to-emerald-500',
        });
      } else if (aqi.status === 'Moderate') {
        generatedTips.push({
          icon: <AlertTriangle className="w-5 h-5" />,
          text: 'Air quality is moderate. Sensitive individuals should limit prolonged outdoor activity.',
          color: 'from-yellow-500 to-orange-500',
        });
      } else {
        generatedTips.push({
          icon: <AlertTriangle className="w-5 h-5" />,
          text: 'Poor air quality detected. Avoid outdoor activities and wear a mask if you need to go out.',
          color: 'from-red-500 to-rose-500',
        });
      }
    }

    // Humidity-based tips
    if (weather.humidity > 80) {
      generatedTips.push({
        icon: <Droplets className="w-5 h-5" />,
        text: `High humidity at ${weather.humidity}%. It may feel warmer than the actual temperature.`,
        color: 'from-blue-500 to-teal-500',
      });
    }

    // Wind-based tips
    if (weather.windSpeed > 10) {
      generatedTips.push({
        icon: <Wind className="w-5 h-5" />,
        text: `Windy conditions with ${weather.windSpeed} m/s winds. Secure loose outdoor items.`,
        color: 'from-cyan-500 to-blue-500',
      });
    }

    // Weather condition tips
    if (weather.condition.toLowerCase().includes('rain')) {
      generatedTips.push({
        icon: <Cloud className="w-5 h-5" />,
        text: "Rainy weather expected. Don't forget your umbrella!",
        color: 'from-blue-500 to-indigo-500',
      });
    } else if (weather.condition.toLowerCase().includes('clear') || weather.condition.toLowerCase().includes('sun')) {
      generatedTips.push({
        icon: <Sun className="w-5 h-5" />,
        text: 'Clear skies ahead! Apply sunscreen if going out.',
        color: 'from-yellow-500 to-amber-500',
      });
    }

    setTips(generatedTips.slice(0, 3)); // Show max 3 tips
  }, [weather, aqi]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <Card className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
            <Sparkles className="w-6 h-6 text-purple-500" />
            Smart Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {tips.map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-gradient-to-r ${tip.color} p-4 rounded-2xl text-white`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">{tip.icon}</div>
                  <p className="text-sm leading-relaxed">{tip.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
