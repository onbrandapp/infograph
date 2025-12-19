import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell 
} from 'recharts';

// 1. SWISS THEME CONFIG
const swissTheme = {
  black: '#111111',
  offWhite: '#F5F5F7',
  blue: '#007AFF',
  red: '#FF3B30',
};

// 2. CUSTOM BAR SHAPE (The "Brutalist" Look)
const BrutalistBar = (props) => {
  const { fill, x, y, width, height } = props;
  return (
    <g>
      {/* The Shadow (Offset Box) */}
      <rect 
        x={x + 4} 
        y={y + 4} 
        width={width} 
        height={height} 
        fill={swissTheme.black} 
        opacity={0.1} 
      />
      {/* The Main Bar */}
      <rect 
        x={x} 
        y={y} 
        width={width} 
        height={height} 
        stroke={swissTheme.black} 
        strokeWidth={2} 
        fill={fill} 
      />
    </g>
  );
};

// 3. CUSTOM TOOLTIP (Fixed: Added inline style to FORCE white background)
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div 
        className="border-2 border-swiss-black p-3 shadow-none"
        style={{ backgroundColor: '#ffffff' }} // <--- FORCE WHITE BACKGROUND
      >
        <p className="font-mono text-[10px] uppercase tracking-widest text-gray-500 mb-1">{label}</p>
        <p className="font-sans text-xl font-bold text-swiss-blue">
          {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

// 4. THE MAIN COMPONENT
const SwissChart = ({ data }) => {
  if (!data || data.length === 0) return null;

  return (
    <div className="w-full h-full font-mono text-xs">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          // FIXED: Increased bottom margin to 40 so labels don't get cut off
          margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
        >
          {/* Grid: Very faint or none */}
          <CartesianGrid 
            strokeDasharray="0" 
            vertical={false} 
            stroke="#000000" 
            opacity={0.05} 
          />

          {/* X Axis: Thick Black Line */}
          <XAxis 
            dataKey="name" 
            axisLine={{ stroke: swissTheme.black, strokeWidth: 2 }}
            tickLine={false}
            tick={{ fill: swissTheme.black, fontSize: 10, dy: 10 }}
            interval={0} 
          />

          {/* Y Axis: No line, just numbers */}
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: swissTheme.black, fontSize: 10, dx: -10 }}
          />

          {/* FIXED: cursor={false} removes the gray/black hover bar completely */}
       

          {/* The Bar: Using our custom shape */}
          <Bar 
            dataKey="value" 
            shape={<BrutalistBar />} 
            isAnimationActive={true} 
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={index % 2 === 0 ? swissTheme.blue : swissTheme.black} 
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SwissChart;