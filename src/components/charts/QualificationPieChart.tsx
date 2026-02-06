"use client"

import { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { ChartDataItem } from "@/types/election";
import { cn } from "@/lib/utils";

interface QualificationPieChartProps {
  data: Record<string, number>;
  title?: string;
  titleNp?: string;
  className?: string;
}

// शैक्षिक योग्यताका लागि आधुनिक Cyan-Teal-Slate प्यालेट
const CHART_COLORS = [
  "#06b6d4", // Cyan 500
  "#2dd4bf", // Teal 400
  "#0891b2", // Cyan 600
  "#14b8a6", // Teal 500
  "#64748b", // Slate 500 (मधुरो योग्यताका लागि)
  "#0e7490", // Cyan 700
  "#94a3b8", // Slate 400
];

export function QualificationPieChart({
  data,
  title = "Qualification Distribution",
  titleNp = "शैक्षिक योग्यता",
  className,
}: QualificationPieChartProps) {
  const chartData: ChartDataItem[] = useMemo(() => {
    return Object.entries(data)
      .map(([name, value]) => ({
        name,
        value,
      }))
      .sort((a, b) => b.value - a.value);
  }, [data]);

  const total = chartData.reduce((acc, item) => acc + item.value, 0);

  return (
    <div className={cn("chart-container h-full p-5 rounded-2xl bg-cyan-950/20 border border-cyan-900/40 backdrop-blur-md", className)}>
      
      <div className="mb-2">
        <h3 className="font-bold text-white text-lg tracking-tight">{titleNp}</h3>
        <p className="text-[10px] text-cyan-600 uppercase tracking-widest font-medium">{title}</p>
      </div>

      <div className="h-64 relative">
        {/* चार्टको बीचमा कुल संख्या देखाउन (Doughnut Center Text) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-8">
          <span className="text-2xl font-black text-white">{total}</span>
          <span className="text-[9px] text-cyan-700 uppercase font-bold tracking-tighter">Total</span>
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60} // अलि ठुलो पारिएको ताकि बीचमा टेक्स्ट अटोस्
              outerRadius={85}
              paddingAngle={4}
              dataKey="value"
              stroke="none" // सेतो बोर्डर हटाउन
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={CHART_COLORS[index % CHART_COLORS.length]}
                  className="hover:opacity-80 transition-opacity outline-none"
                />
              ))}
            </Pie>
            
            <Tooltip
              contentStyle={{
                backgroundColor: "#011c22",
                border: "1px solid rgba(8, 145, 178, 0.3)",
                borderRadius: "12px",
                fontSize: "12px",
                color: "#fff",
              }}
              itemStyle={{ color: "#fff" }}
              formatter={(value: number, name: string) => [
                <span className="font-bold text-white">{value.toLocaleString()} ({((value / total) * 100).toFixed(1)}%)</span>,
                <span className="text-cyan-500">{name}</span>
              ]}
            />

            <Legend
              layout="horizontal"
              align="center"
              verticalAlign="bottom"
              iconType="circle"
              wrapperStyle={{ 
                fontSize: "10px", 
                paddingTop: "20px",
                color: "#94a3b8"
              }}
              formatter={(value) => <span className="text-cyan-100/70 font-medium">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}