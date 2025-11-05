import { useState, useEffect } from 'react';
import { Search, Moon, Sun, MapPin, Cloud, MessageCircle, X, Loader2, Settings } from 'lucide-react';
import { Input } from './components/ui/input';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { Switch } from './components/ui/switch';
import { WeatherCard } from './components/weather-card';
import { AQICard } from './components/aqi-card';
import { TrendsChart } from './components/trends-chart';
import { SmartTips } from './components/smart-tips';
import { AIAssistant } from './components/ai-assistant';
import { motion, AnimatePresence } from 'motion/react';
import { projectId, publicAnonKey } from './utils/supabase/info';

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-2d6e0233`;

interface WeatherData {
  location: string;
  country: string;
  temperature: number;
  feelsLike: number;
  condition: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  pressure: number;
  lastUpdated: string;
}

interface AQIData {
  location: string;
  aqi: number;
  status: 'Good' | 'Moderate' | 'Poor';
  lastUpdated: string;
}

interface LocationSuggestion {
  name: string;
  state?: string;
  country: string;
  lat: number;
  lon: number;
  priority: number;
  displayName?: string;
  subtitle?: string;
}

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('Bangalore, IN');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [aqiData, setAQIData] = useState<AQIData | null>(null);
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [weatherTrends, setWeatherTrends] = useState<any[]>([]);
  const [aqiTrends, setAQITrends] = useState<any[]>([]);
  const [showDemoNotice, setShowDemoNotice] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    handleSearch('Bangalore, IN');
    checkAPIStatus();
  }, []);

  const checkAPIStatus = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/health`, {
        headers: { 'Authorization': `Bearer ${publicAnonKey}` },
      });
      
      if (response.ok) {
        const data = await response.json();
        const usingDemo = data.apiKeys?.openweathermap?.includes('demo') || 
                         data.apiKeys?.iqair?.includes('demo');
        setShowDemoNotice(usingDemo);
      }
    } catch (err) {
      console.log('Health check failed:', err);
    }
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.length < 2) {
        setSuggestions([]);
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/search-locations?q=${encodeURIComponent(searchQuery)}`, {
          headers: { 'Authorization': `Bearer ${publicAnonKey}` },
        });

        if (response.ok) {
          const data = await response.json();
          setSuggestions(data);
        }
      } catch (err) {
        console.error('Error fetching suggestions:', err);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const handleSearch = async (location: string) => {
    if (!location.trim()) return;
    
    setLoading(true);
    setError(null);
    setSelectedLocation(location);
    setShowSuggestions(false);
    setSearchQuery('');
    
    try {
      console.log('Fetching weather for:', location);
      console.log('API URL:', `${API_BASE_URL}/weather/${encodeURIComponent(location)}`);
      
      const weatherResponse = await fetch(`${API_BASE_URL}/weather/${encodeURIComponent(location)}`, {
        headers: { 'Authorization': `Bearer ${publicAnonKey}` },
      });

      console.log('Weather response status:', weatherResponse.status);

      if (!weatherResponse.ok) {
        const errorText = await weatherResponse.text();
        console.error('Weather API error:', errorText);
        
        // Try to parse error message
        let errorMsg = 'Location not found';
        try {
          const errorJson = JSON.parse(errorText);
          if (errorJson.error) {
            errorMsg = errorJson.error;
          }
        } catch {
          // Keep default error message
        }
        
        throw new Error(errorMsg);
      }

      const weather = await weatherResponse.json();
      console.log('Weather data:', weather);
      setWeatherData(weather);

      // Fetch AQI
      const aqiResponse = await fetch(`${API_BASE_URL}/air-quality/${encodeURIComponent(location)}`, {
        headers: { 'Authorization': `Bearer ${publicAnonKey}` },
      });

      if (aqiResponse.ok) {
        const aqi = await aqiResponse.json();
        console.log('AQI data:', aqi);
        setAQIData(aqi);
      } else {
        console.log('AQI fetch failed, setting to null');
        setAQIData(null);
      }

      // Fetch trends
      const trendsResponse = await fetch(`${API_BASE_URL}/trends/${encodeURIComponent(location)}`, {
        headers: { 'Authorization': `Bearer ${publicAnonKey}` },
      });

      if (trendsResponse.ok) {
        const trends = await trendsResponse.json();
        console.log('Trends data:', trends);
        setWeatherTrends(trends.weather || []);
        setAQITrends(trends.aqi || []);
      }
      
      setLoading(false);
    } catch (err) {
      console.error('Error loading data:', err);
      const errorMessage = err instanceof Error ? err.message : 'Please try another location.';
      
      // Provide helpful suggestions if location not found
      if (errorMessage.includes('not found')) {
        setError(`Location "${location}" not found. Try searching for nearby cities like "Bangalore", "Mysore", or check the spelling.`);
      } else {
        setError(`Unable to fetch data for ${location}. ${errorMessage}`);
      }
      setLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: LocationSuggestion) => {
    const locationName = suggestion.state 
      ? `${suggestion.name}, ${suggestion.state}, ${suggestion.country}`
      : `${suggestion.name}, ${suggestion.country}`;
    handleSearch(locationName);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950' : 'bg-gradient-to-br from-blue-50 via-white to-teal-50'}`}>
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-teal-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Cloud className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl text-gray-900 dark:text-white">Smart City Dashboard</h1>
                <p className="text-xs text-gray-600 dark:text-gray-400">Weather & Air Quality</p>
              </div>
            </div>
            
            {/* Search Bar - Desktop */}
            <div className="hidden md:block relative flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Try: Bangalore, Hebbal, Mysore..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && searchQuery) {
                      handleSearch(searchQuery);
                    }
                  }}
                  className="pl-12 pr-4 h-12 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-2xl shadow-sm"
                  onFocus={() => setShowSuggestions(true)}
                />
              </div>
              
              {/* Search Suggestions */}
              <AnimatePresence>
                {showSuggestions && suggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full mt-2 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl z-50 overflow-hidden max-h-96 overflow-y-auto"
                  >
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="w-full px-4 py-3 text-left hover:bg-gradient-to-r hover:from-blue-50 hover:to-teal-50 dark:hover:from-gray-700 dark:hover:to-gray-600 flex items-center gap-3 text-gray-900 dark:text-gray-100 border-b border-gray-100 dark:border-gray-700 last:border-b-0 transition-all group"
                      >
                        <MapPin className="w-4 h-4 text-blue-500 group-hover:text-teal-500 transition-colors" />
                        <div className="flex-1">
                          <div className="text-sm">{suggestion.displayName || `${suggestion.name}, ${suggestion.country}`}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {suggestion.subtitle || (suggestion.state || suggestion.country)}
                          </div>
                        </div>
                        {suggestion.priority === 1 && (
                          <Badge variant="outline" className="ml-auto text-xs bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-950 dark:to-teal-950 border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300">
                            Karnataka
                          </Badge>
                        )}
                        {suggestion.priority === 2 && (
                          <Badge variant="outline" className="ml-auto text-xs bg-orange-50 dark:bg-orange-950 border-orange-300 dark:border-orange-700 text-orange-700 dark:text-orange-300">
                            India
                          </Badge>
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Actions */}
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-2xl">
                <Sun className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                <Moon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </div>
              <Button variant="ghost" size="icon" className="rounded-2xl hidden sm:flex">
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden mt-4 relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search cities..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchQuery) {
                    handleSearch(searchQuery);
                  }
                }}
                className="pl-12 pr-4 h-12 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-2xl"
                onFocus={() => setShowSuggestions(true)}
              />
            </div>
            
            <AnimatePresence>
              {showSuggestions && suggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full mt-2 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl z-50 max-h-60 overflow-y-auto"
                >
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full px-4 py-3 text-left hover:bg-gradient-to-r hover:from-blue-50 hover:to-teal-50 dark:hover:from-gray-700 dark:hover:to-gray-600 flex items-center gap-3 text-gray-900 dark:text-gray-100 border-b border-gray-100 dark:border-gray-700 last:border-b-0 transition-all group"
                    >
                      <MapPin className="w-4 h-4 text-blue-500 group-hover:text-teal-500 transition-colors" />
                      <div className="flex-1">
                        <div className="text-sm">{suggestion.displayName || `${suggestion.name}, ${suggestion.country}`}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{suggestion.subtitle || (suggestion.state || suggestion.country)}</div>
                      </div>
                      {suggestion.priority === 1 && (
                        <Badge variant="outline" className="text-xs bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-950 dark:to-teal-950 border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300">
                          KA
                        </Badge>
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Demo Notice */}
        {showDemoNotice ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-2xl p-4"
          >
            <div className="flex items-start gap-3">
              <div className="text-2xl">ℹ️</div>
              <div className="flex-1 text-sm text-blue-900 dark:text-blue-100">
                <div className="mb-1">Demo Mode Active</div>
                <div className="text-xs text-blue-700 dark:text-blue-300">
                  Using sample data. To get real-time weather and air quality data, please add your API keys in the Supabase Dashboard under Edge Functions → Manage Secrets.
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border border-green-200 dark:border-green-800 rounded-2xl p-4"
          >
            <div className="flex items-start gap-3">
              <div className="text-2xl">🟢</div>
              <div className="flex-1 text-sm text-green-900 dark:text-green-100">
                <div className="mb-1">Live Data Active</div>
                <div className="text-xs text-green-700 dark:text-green-300">
                  Connected to OpenWeatherMap & IQAir APIs. All data is real-time and updated automatically. AI Assistant powered by OpenAI GPT-3.5.
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center py-20"
            >
              <div className="text-center">
                <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">Loading data...</p>
              </div>
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <Cloud className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">{error}</p>
              <Button 
                onClick={() => handleSearch('Bangalore, IN')} 
                className="mt-4 rounded-xl bg-gradient-to-r from-blue-500 to-teal-500"
              >
                Try Bangalore
              </Button>
            </motion.div>
          ) : weatherData ? (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {/* Location Header */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                    <MapPin className="w-5 h-5 text-blue-500" />
                    <span className="text-sm">Current Location</span>
                  </div>
                  <h2 className="text-3xl text-gray-900 dark:text-white">
                    {weatherData.location}, {weatherData.country}
                  </h2>
                </div>
                <Button
                  onClick={() => handleSearch(selectedLocation)}
                  variant="outline"
                  size="sm"
                  className="rounded-xl"
                >
                  Refresh
                </Button>
              </div>

              {/* Weather & AQI Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <WeatherCard weather={weatherData} darkMode={darkMode} />
                {aqiData && <AQICard aqi={aqiData} darkMode={darkMode} />}
              </div>

              {/* Smart Tips */}
              <SmartTips weather={weatherData} aqi={aqiData} darkMode={darkMode} />

              {/* Trend Charts */}
              {(weatherTrends.length > 0 || aqiTrends.length > 0) && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {weatherTrends.length > 0 && (
                    <TrendsChart
                      title="Weather Trends"
                      description="Temperature patterns over time"
                      data={weatherTrends}
                      dataKey="temp"
                      color="#3b82f6"
                      darkMode={darkMode}
                      unit="°C"
                    />
                  )}
                  {aqiTrends.length > 0 && (
                    <TrendsChart
                      title="Air Quality Trends"
                      description="AQI patterns over time"
                      data={aqiTrends}
                      dataKey="aqi"
                      color="#10b981"
                      darkMode={darkMode}
                      unit=""
                    />
                  )}
                </div>
              )}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </main>

      {/* Floating AI Assistant Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-blue-500 via-teal-500 to-emerald-500 rounded-full shadow-2xl flex items-center justify-center text-white hover:shadow-3xl transition-all hover:scale-110 z-50"
      >
        <AnimatePresence mode="wait">
          {chatOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-7 h-7" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageCircle className="w-7 h-7" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* AI Assistant */}
      <AnimatePresence>
        {chatOpen && (
          <AIAssistant 
            onClose={() => setChatOpen(false)} 
            darkMode={darkMode}
            onLocationSearch={handleSearch}
          />
        )}
      </AnimatePresence>

      {/* Footer Credits */}
      <footer className="mt-16 mb-8 border-t border-gray-200 dark:border-gray-800">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="container mx-auto px-4 pt-8"
        >
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Created by <span className="font-medium">Likith Gowda</span>
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Department of Information Science & Engineering
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Atria Institute of Technology
            </p>
            <div className="pt-3 border-t border-gray-200 dark:border-gray-700 mt-4 max-w-md mx-auto"></div>
            <p className="text-xs text-gray-500 dark:text-gray-500 pt-3">
              With credits to <span className="font-medium text-gray-600 dark:text-gray-400">Sai Shree Pavan</span>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              Department of Information Science & Engineering, Atria Institute of Technology
            </p>
          </div>
        </motion.div>
      </footer>
    </div>
  );
}
