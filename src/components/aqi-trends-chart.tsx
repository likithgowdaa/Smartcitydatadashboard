import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface AQITrendsChartProps {
  data: Array<{
    day: string;
    aqi: number;
    date?: string;
  }>;
  darkMode: boolean;
}

export function AQITrendsChart({ data, darkMode }: AQITrendsChartProps) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="aqiGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#14b8a6" stopOpacity={0.1}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
        <XAxis 
          dataKey="day" 
          stroke={darkMode ? '#9ca3af' : '#6b7280'}
          style={{ fontSize: '12px' }}
        />
        <YAxis 
          stroke={darkMode ? '#9ca3af' : '#6b7280'}
          style={{ fontSize: '12px' }}
          label={{ value: 'AQI', angle: -90, position: 'insideLeft', style: { fill: darkMode ? '#9ca3af' : '#6b7280' } }}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: darkMode ? '#1f2937' : '#ffffff',
            border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
            borderRadius: '12px',
            color: darkMode ? '#f3f4f6' : '#111827',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
          }}
          labelStyle={{ fontWeight: 'bold', marginBottom: '5px' }}
        />
        <Area 
          type="monotone" 
          dataKey="aqi" 
          stroke="#14b8a6" 
          strokeWidth={3}
          fill="url(#aqiGradient)"
          name="Air Quality Index"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
