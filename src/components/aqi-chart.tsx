import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface AQIChartProps {
  data: Array<{
    day: string;
    aqi: number;
  }>;
  darkMode: boolean;
}

export function AQIChart({ data, darkMode }: AQIChartProps) {
  const getBarColor = (aqi: number) => {
    if (aqi <= 50) return '#10b981'; // green
    if (aqi <= 100) return '#fbbf24'; // yellow
    if (aqi <= 150) return '#f97316'; // orange
    return '#ef4444'; // red
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
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
        <Bar 
          dataKey="aqi" 
          name="AQI Level"
          radius={[8, 8, 0, 0]}
        >
          {data.map((entry, index) => (
            <Bar key={`bar-${index}`} fill={getBarColor(entry.aqi)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
