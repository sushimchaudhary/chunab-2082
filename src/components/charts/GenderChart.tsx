"use client"

import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface GenderChartProps {
  data: Record<string, number>;
  title?: string;
  titleNp?: string;
}

const GENDER_COLORS: Record<string, string> = {
  पुरुष: "#3b82f6", // Royal Blue
  महिला: "#a855f7", // Purple 500
  अन्य: "#64748b", // Slate 500
};

export function GenderChart({
  data,
  title = "Gender Distribution",
  titleNp = "लिङ्ग वितरण",
}: GenderChartProps) {
  const chartData = useMemo(() => {
    return Object.entries(data).map(([name, value]) => ({
      name,
      value,
    }));
  }, [data]);

  const total = chartData.reduce((acc, item) => acc + item.value, 0);

  return (
    <div className="chart-container h-full p-5 rounded-2xl bg-cyan-950/20 border border-cyan-900/40 backdrop-blur-sm">
      
      <div className="mb-6">
        <h3 className="font-bold text-white text-lg tracking-tight">{titleNp}</h3>
        <p className="text-[10px] text-cyan-600 uppercase tracking-widest font-medium">{title}</p>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            {/* ग्रिड लाइनलाई अझै मधुरो बनाइएको छ */}
            <CartesianGrid strokeDasharray="3 3" stroke="#083344" vertical={false} />
            
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#64748b" }}
            />
            
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#64748b" }}
            />
            
            <Tooltip
              cursor={{ fill: 'rgba(6, 182, 212, 0.05)' }}
              contentStyle={{
                backgroundColor: "#011c22",
                border: "1px solid rgba(8, 145, 178, 0.3)",
                borderRadius: "12px",
                fontSize: "12px",
                color: "#fff"
              }}
              itemStyle={{ color: "#fff" }}
              formatter={(value: number) => [
                `${value.toLocaleString()} उम्मेदवार`,
                `संख्या`
              ]}
            />
            
            <Bar dataKey="value" barSize={45} radius={[6, 6, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={GENDER_COLORS[entry.name] || "#0891b2"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend with percentages - अझै सफा बनाइएको */}
      <div className="mt-6 flex flex-wrap justify-center gap-x-8 gap-y-2">
        {chartData.map((item, index) => (
          <div key={index} className="flex items-center gap-2.5">
            <div
              className="h-2 w-2 rounded-full"
              style={{
                backgroundColor: GENDER_COLORS[item.name] || "#0891b2",
                boxShadow: `0 0 10px ${GENDER_COLORS[item.name]}44`
              }}
            />
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-white">
                {((item.value / total) * 100).toFixed(1)}%
              </span>
              <span className="text-[10px] text-cyan-700 font-medium uppercase tracking-tighter">
                {item.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}