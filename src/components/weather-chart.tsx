import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface WeatherChartProps {
  data: Array<{
    day: string;
    temperature: number;
    humidity: number;
  }>;
  darkMode: boolean;
}

export function WeatherChart({ data, darkMode }: WeatherChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
        <XAxis 
          dataKey="day" 
          stroke={darkMode ? '#9ca3af' : '#6b7280'}
          style={{ fontSize: '12px' }}
        />
        <YAxis 
          stroke={darkMode ? '#9ca3af' : '#6b7280'}
          style={{ fontSize: '12px' }}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: darkMode ? '#1f2937' : '#ffffff',
            border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
            borderRadius: '8px',
            color: darkMode ? '#f3f4f6' : '#111827'
          }}
        />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="temperature" 
          stroke="#3b82f6" 
          strokeWidth={2}
          name="Temperature (°C)"
          dot={{ fill: '#3b82f6', r: 4 }}
        />
        <Line 
          type="monotone" 
          dataKey="humidity" 
          stroke="#8b5cf6" 
          strokeWidth={2}
          name="Humidity (%)"
          dot={{ fill: '#8b5cf6', r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
