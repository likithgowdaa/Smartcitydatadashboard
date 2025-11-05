import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import { projectId, publicAnonKey } from '../utils/supabase/info';

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-2d6e0233`;

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatBotProps {
  onClose: () => void;
  darkMode: boolean;
  onLocationSearch: (location: string) => void;
  useRealAI?: boolean;
}

export function ChatBot({ onClose, darkMode, onLocationSearch, useRealAI = true }: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your Smart City AI Assistant for India. I can help you check air quality, compare pollution levels across cities, and provide health recommendations. Try asking 'What's the AQI in Delhi?' or 'Show me pollution levels in Bangalore'",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const generateMockBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // AQI queries
    if (lowerMessage.includes('aqi') || lowerMessage.includes('air quality') || lowerMessage.includes('pollution')) {
      if (lowerMessage.includes('in') || lowerMessage.includes('at')) {
        const cityMatch = userMessage.match(/(?:in|at)\s+([a-zA-Z\s]+)/i);
        if (cityMatch) {
          const location = cityMatch[1].trim();
          setTimeout(() => onLocationSearch(location), 500);
          return `Fetching air quality data for ${location}. I'll show you the current AQI, pollutant levels (PM2.5, PM10, CO, NO₂, O₃, SO₂), health recommendations, and trends.`;
        }
      }
    }

    // Show/display queries
    if ((lowerMessage.includes('show') || lowerMessage.includes('display')) && !lowerMessage.includes('nearby')) {
      const cityMatch = userMessage.match(/(?:show|display).*?(?:in|for|at)\s+([a-zA-Z\s]+)/i);
      if (cityMatch) {
        const location = cityMatch[1].trim();
        setTimeout(() => onLocationSearch(location), 500);
        return `Loading data for ${location}...`;
      }
    }

    // Compare cities
    if (lowerMessage.includes('compare')) {
      return `To compare air quality between cities, I recommend viewing each location individually. Popular Indian cities to check:

🔴 **High Pollution Areas:**
• Delhi (AQI typically 150-200)
• Patna (AQI typically 160-190)
• Lucknow (AQI typically 150-180)

🟡 **Moderate Pollution:**
• Mumbai (AQI typically 80-120)
• Kolkata (AQI typically 100-150)
• Ahmedabad (AQI typically 100-140)

🟢 **Better Air Quality:**
• Bengaluru (AQI typically 60-90)
• Chennai (AQI typically 50-80)
• Kochi (AQI typically 40-70)

Click on any city on the map to view detailed data!`;
    }

    // City recommendations
    if (lowerMessage.includes('recommend') || lowerMessage.includes('suggest') || lowerMessage.includes('clean') || lowerMessage.includes('best')) {
      return `Based on air quality patterns in India, here are cities with relatively cleaner air:

🌟 **Best Air Quality:**
• Kochi, Kerala (AQI usually 40-60)
• Visakhapatnam, Andhra Pradesh (AQI usually 60-80)
• Guwahati, Assam (AQI usually 70-100)

🌤️ **Good to Moderate:**
• Bengaluru, Karnataka (AQI usually 70-90)
• Chennai, Tamil Nadu (AQI usually 60-85)
• Hyderabad, Telangana (AQI usually 80-100)

⚠️ **Avoid When Possible:**
• Delhi NCR region
• Indo-Gangetic Plain cities
• Major industrial centers

Southern and northeastern cities generally have better air quality!`;
    }

    // Nearby cities
    if (lowerMessage.includes('nearby') || lowerMessage.includes('around')) {
      return `To find nearby cities, please search for a specific location first. I can then show you air quality data for surrounding areas. Try searching for cities like Delhi, Mumbai, Bengaluru, or your current location!`;
    }

    // Greetings
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return `Hello! I'm here to help you explore weather and air quality data for cities worldwide. What would you like to know?`;
    }

    // Thank you
    if (lowerMessage.includes('thank')) {
      return `You're welcome! Feel free to ask me anything about weather, air quality, or city comparisons.`;
    }

    // Help
    if (lowerMessage.includes('help')) {
      return `I can help you with:

🌫️ **Air Quality Queries:** "What's the AQI in [city]?" or "Show pollution in [area]"
📊 **Pollutant Levels:** "Show me PM2.5 levels in Delhi"
⚖️ **City Comparisons:** "Compare air quality between cities"
✨ **Recommendations:** "Which cities have clean air?"
🗺️ **Location Search:** Works for all Indian cities and areas
💡 **Health Tips:** "What should I do when AQI is high?"

Just ask naturally, and I'll help you!`;
    }

    // Health advice
    if (lowerMessage.includes('health') || lowerMessage.includes('what should') || lowerMessage.includes('precaution')) {
      return `Here are health precautions based on AQI levels:

**AQI 0-50 (Good):** Safe for all outdoor activities

**AQI 51-100 (Moderate):** Unusually sensitive people should limit prolonged outdoor activities

**AQI 101-150 (Unhealthy for Sensitive):** 
• Children, elderly, and people with respiratory conditions should reduce outdoor activities
• General public can continue normal activities

**AQI 151-200 (Unhealthy):**
• Everyone should avoid prolonged outdoor exertion
• Wear N95 masks when going outside
• Keep windows closed

**AQI 201+ (Very Unhealthy/Hazardous):**
• Stay indoors with air purifiers running
• Avoid all outdoor activities
• Use N95/N99 masks if you must go out
• Monitor health symptoms closely

Search for your city to see current AQI and specific recommendations!`;
    }

    // Default response
    return `I can help you check air quality for any city or area in India. Try asking "What's the AQI in [your city]?" or click on cities on the map to see their pollution levels!`;
  };

  const getAIResponse = async (userMessage: string, history: Message[]): Promise<{ response: string; cityToSearch: string | null }> => {
    try {
      const conversationHistory = history.slice(-6).map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text,
      }));

      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({
          message: userMessage,
          conversationHistory,
        }),
      });

      if (!response.ok) {
        throw new Error('AI service unavailable');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error getting AI response:', error);
      throw error;
    }
  };

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

    // Simulate bot response delay
    setTimeout(async () => {
      let botResponseText = '';
      let cityToSearch: string | null = null;

      if (useRealAI) {
        try {
          const aiResponse = await getAIResponse(input, messages);
          botResponseText = aiResponse.response;
          cityToSearch = aiResponse.cityToSearch;
        } catch (error) {
          console.error('Falling back to mock responses:', error);
          botResponseText = generateMockBotResponse(input);
        }
      } else {
        botResponseText = generateMockBotResponse(input);
      }

      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponseText,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);

      // If AI suggested a location search, trigger it
      if (cityToSearch) {
        setTimeout(() => onLocationSearch(cityToSearch), 1000);
      }
    }, 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] z-50"
    >
      <Card className="shadow-2xl border-2">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <Bot className="w-5 h-5" />
            AI Assistant
            <Badge variant="secondary" className="ml-auto bg-white/20 text-white border-0">
              {useRealAI ? 'AI Powered' : 'Demo Mode'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-96 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.sender === 'bot'
                        ? 'bg-gradient-to-br from-blue-500 to-purple-600'
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  >
                    {message.sender === 'bot' ? (
                      <Bot className="w-4 h-4 text-white" />
                    ) : (
                      <User className="w-4 h-4 text-gray-700 dark:text-gray-200" />
                    )}
                  </div>
                  <div
                    className={`rounded-lg p-3 max-w-[80%] ${
                      message.sender === 'bot'
                        ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                        : 'bg-blue-500 text-white'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="rounded-lg p-3 bg-gray-100 dark:bg-gray-700">
                    <div className="flex gap-1">
                      <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">AI is thinking...</span>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !isTyping && handleSend()}
                placeholder="Ask me anything..."
                className="flex-1"
                disabled={isTyping}
              />
              <Button 
                onClick={handleSend} 
                size="icon" 
                className="bg-gradient-to-r from-blue-500 to-purple-600"
                disabled={isTyping}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              <button
                onClick={() => setInput("What's the AQI in Delhi?")}
                className="text-xs bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-gray-700 dark:text-gray-300"
              >
                Delhi AQI
              </button>
              <button
                onClick={() => setInput("Compare pollution in Mumbai and Bengaluru")}
                className="text-xs bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-gray-700 dark:text-gray-300"
              >
                Compare cities
              </button>
              <button
                onClick={() => setInput("Which cities have clean air?")}
                className="text-xs bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-gray-700 dark:text-gray-300"
              >
                Clean air cities
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
