import { motion } from 'motion/react';
import { Wind, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

interface AQICardProps {
  aqi: {
    location: string;
    aqi: number;
    status: 'Good' | 'Moderate' | 'Poor';
    lastUpdated: string;
  };
  darkMode: boolean;
}

export function AQICard({ aqi, darkMode }: AQICardProps) {
  const getAQIColor = (status: string) => {
    if (status === 'Good') return {
      bg: 'from-green-500 to-emerald-600',
      icon: <CheckCircle className="w-8 h-8" />,
      emoji: '😊',
      text: 'Excellent air quality! Perfect for outdoor activities.',
    };
    if (status === 'Moderate') return {
      bg: 'from-yellow-500 to-orange-500',
      icon: <AlertCircle className="w-8 h-8" />,
      emoji: '😐',
      text: 'Acceptable air quality. Sensitive individuals should be cautious.',
    };
    return {
      bg: 'from-red-500 to-rose-600',
      icon: <XCircle className="w-8 h-8" />,
      emoji: '😷',
      text: 'Unhealthy air quality. Limit outdoor activities and wear a mask.',
    };
  };

  const config = getAQIColor(aqi.status);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <Card className={`bg-gradient-to-br ${config.bg} border-0 rounded-3xl shadow-2xl overflow-hidden`}>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-white">
            <Wind className="w-6 h-6" />
            Air Quality Index
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Main AQI Display */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-6xl text-white mb-2">
                {aqi.aqi}
              </div>
              <Badge className="bg-white/20 text-white border-0 text-lg px-4 py-2 rounded-full backdrop-blur-sm">
                {aqi.status}
              </Badge>
            </div>
            <div className="text-8xl">
              {config.emoji}
            </div>
          </div>

          {/* Status Message */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
            <div className="flex items-start gap-3 text-white">
              {config.icon}
              <div>
                <div className="text-sm opacity-90 mb-1">Health Advisory</div>
                <div className="text-sm opacity-80">{config.text}</div>
              </div>
            </div>
          </div>

          {/* AQI Scale Reference */}
          <div className="space-y-2">
            <div className="text-xs text-white/70 mb-3">AQI Scale Reference</div>
            <div className="grid grid-cols-3 gap-2">
              <div className={`p-2 rounded-xl text-center ${aqi.status === 'Good' ? 'bg-white/30' : 'bg-white/10'}`}>
                <div className="text-xs text-white/80 mb-1">0-50</div>
                <div className="text-xs text-white">Good</div>
              </div>
              <div className={`p-2 rounded-xl text-center ${aqi.status === 'Moderate' ? 'bg-white/30' : 'bg-white/10'}`}>
                <div className="text-xs text-white/80 mb-1">51-100</div>
                <div className="text-xs text-white">Moderate</div>
              </div>
              <div className={`p-2 rounded-xl text-center ${aqi.status === 'Poor' ? 'bg-white/30' : 'bg-white/10'}`}>
                <div className="text-xs text-white/80 mb-1">101+</div>
                <div className="text-xs text-white">Poor</div>
              </div>
            </div>
          </div>

          <div className="text-xs text-white/60 text-center">
            Last updated: {aqi.lastUpdated}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
