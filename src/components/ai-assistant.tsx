import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Bot, User, Sparkles, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { projectId, publicAnonKey } from '../utils/supabase/info';

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-2d6e0233`;

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface AIAssistantProps {
  onClose: () => void;
  darkMode: boolean;
  onLocationSearch: (location: string) => void;
}

export function AIAssistant({ onClose, darkMode, onLocationSearch }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "👋 Hi! I'm your Smart City AI Assistant with real-time weather and air quality data.\n\n💬 Try asking:\n• What's the weather in Bangalore?\n• Should I wear a mask in Hebbal?\n• Compare air quality: Mysore vs Delhi\n• Which Karnataka city has clean air?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [quickActions, setQuickActions] = useState<string[]>([
    "Weather in Bangalore?",
    "AQI in Hebbal?",
    "Clean air cities?",
  ]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      // Call AI API
      const response = await fetch(`${API_BASE_URL}/ai-chat`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      if (response.ok) {
        const data = await response.json();
        
        const botMessage: Message = {
          id: messages.length + 2,
          text: data.response,
          sender: 'bot',
          timestamp: new Date(),
        };

        setMessages(prev => [...prev, botMessage]);

        // If AI suggests searching for a city, trigger it
        if (data.suggestedLocation) {
          setTimeout(() => onLocationSearch(data.suggestedLocation), 1000);
        }
      } else {
        throw new Error('AI response failed');
      }
    } catch (error) {
      console.error('AI chat error:', error);
      
      // Fallback to mock response
      const botResponse = generateMockResponse(input);
      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    }

    setIsTyping(false);
  };

  const generateMockResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Weather queries
    if (lowerMessage.includes('weather') && (lowerMessage.includes('in') || lowerMessage.includes('at'))) {
      const locationMatch = userMessage.match(/(?:in|at)\s+([a-zA-Z\s]+)/i);
      if (locationMatch) {
        const location = locationMatch[1].trim();
        setTimeout(() => onLocationSearch(location), 500);
        return `🌤️ Fetching current weather data for ${location}. The dashboard will update with live temperature, humidity, wind speed, and conditions.`;
      }
    }

    // AQI queries
    if ((lowerMessage.includes('air quality') || lowerMessage.includes('aqi') || lowerMessage.includes('pollution')) && (lowerMessage.includes('in') || lowerMessage.includes('at'))) {
      const locationMatch = userMessage.match(/(?:in|at)\s+([a-zA-Z\s]+)/i);
      if (locationMatch) {
        const location = locationMatch[1].trim();
        setTimeout(() => onLocationSearch(location), 500);
        return `🌫️ Checking air quality for ${location}. I'll show you if it's Good, Moderate, or Poor, along with health recommendations.`;
      }
    }

    // Compare cities
    if (lowerMessage.includes('compare')) {
      return `🔍 To compare cities, I can help you check each one individually. Here's what I can tell you:\n\n**Karnataka Cities (Generally Good):**\n• Bangalore - Usually moderate air quality\n• Mysore - Better air quality, less industrial\n• Mangalore - Coastal, cleaner air\n\n**Other Indian Cities:**\n• Delhi - Often poor air quality\n• Mumbai - Moderate to poor\n• Chennai - Generally moderate\n\nWhich city would you like to check first?`;
    }

    // Clean air queries
    if (lowerMessage.includes('clean') || lowerMessage.includes('best') || (lowerMessage.includes('good') && lowerMessage.includes('air'))) {
      if (lowerMessage.includes('karnataka')) {
        return `🌿 **Cleanest Air in Karnataka:**\n\n1. **Coorg** - Hill station with excellent air quality\n2. **Mysore** - Less industrial, moderate pollution\n3. **Mangalore** - Coastal city with sea breeze\n4. **Chikmagalur** - Hill station, pristine air\n5. **Udupi** - Coastal town, clean environment\n\nBangalore has moderate air quality but can vary by area. Would you like to check a specific city?`;
      }
      return `🌿 **Cities with Clean Air in India:**\n\n**South India:**\n• Mysore, Karnataka\n• Coorg, Karnataka\n• Ooty, Tamil Nadu\n• Kochi, Kerala\n\n**Northeast:**\n• Shillong, Meghalaya\n• Gangtok, Sikkim\n\n**Others:**\n• Chandigarh\n• Puducherry\n\nWould you like to check weather and AQI for any of these?`;
    }

    // Karnataka specific
    if (lowerMessage.includes('karnataka') || lowerMessage.includes('bangalore')) {
      return `📍 **Karnataka Weather & Air Quality Info:**\n\nI can help you check data for:\n• Bangalore (Bengaluru)\n• Mysore\n• Mangalore\n• Hubli-Dharwad\n• Belgaum\n• Davangere\n• Shimoga\n• Tumkur\n\nJust ask "What's the weather in [city]?" or "Show air quality for [city]"`;
    }

    // Help
    if (lowerMessage.includes('help')) {
      return `💡 **I can help you with:**\n\n🌤️ **Weather:** "What's the weather in Bangalore?"\n🌫️ **Air Quality:** "Show AQI for Delhi"\n⚖️ **Comparisons:** "Compare Mysore and Mumbai"\n🌿 **Recommendations:** "Which Karnataka city has clean air?"\n🔍 **Specific Areas:** "Weather in Hebbal, Bangalore"\n\nJust ask naturally and I'll help!`;
    }

    // Default
    return `I can help you check weather and air quality for cities. Try asking:\n\n• "What's the weather in Bangalore?"\n• "Show air quality for Mysore"\n• "Which city has cleaner air?"\n\nWhat would you like to know?`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] z-50"
    >
      <Card className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-500 via-teal-500 to-emerald-500 text-white">
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            AI Assistant
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {/* Messages Area */}
          <ScrollArea className="h-96 p-4">
            <div className="space-y-4" ref={scrollRef}>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.sender === 'bot' 
                      ? 'bg-gradient-to-br from-blue-500 to-teal-500' 
                      : 'bg-gray-300 dark:bg-gray-700'
                  }`}>
                    {message.sender === 'bot' ? (
                      <Bot className="w-5 h-5 text-white" />
                    ) : (
                      <User className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                    )}
                  </div>
                  <div className={`flex-1 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                    <div className={`inline-block px-4 py-3 rounded-2xl max-w-[85%] ${
                      message.sender === 'bot'
                        ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                        : 'bg-gradient-to-r from-blue-500 to-teal-500 text-white'
                    }`}>
                      <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 px-2">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="inline-block px-4 py-3 rounded-2xl bg-gray-100 dark:bg-gray-800">
                      <Loader2 className="w-5 h-5 animate-spin text-gray-600 dark:text-gray-400" />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything..."
                className="flex-1 rounded-2xl bg-gray-100 dark:bg-gray-800 border-0"
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="rounded-2xl bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
            
            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2 mt-3">
              {quickActions.map((action, idx) => (
                <button
                  key={idx}
                  onClick={() => setInput(action)}
                  className="text-xs bg-gradient-to-r from-blue-50 to-teal-50 dark:from-gray-800 dark:to-gray-700 px-3 py-1.5 rounded-full hover:from-blue-100 hover:to-teal-100 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all text-gray-700 dark:text-gray-300 border border-blue-200 dark:border-gray-600"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
