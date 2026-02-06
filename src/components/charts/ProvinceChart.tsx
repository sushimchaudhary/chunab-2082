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
import { cn } from "@/lib/utils";

interface ProvinceChartProps {
  data: Record<string, number>;
  title?: string;
  titleNp?: string;
  className?: string;
}

// प्रदेशका लागि फरक-फरक आधुनिक रङहरू (Vibrant Palette)
const CHART_COLORS = [
  "#6366f1", // Indigo 500
  "#3b82f6", // Blue 500
  "#06b6d4", // Cyan 500
  "#14b8a6", // Teal 500
  "#10b981", // Emerald 500
  "#f59e0b", // Amber 500
  "#ef4444", // Red 500
];

export function ProvinceChart({
  data,
  title = "Candidates by Province",
  titleNp = "प्रदेश अनुसार उम्मेदवार",
  className,
}: ProvinceChartProps) {
  const chartData = useMemo(() => {
    return Object.entries(data)
      .map(([name, value]) => ({
        name,
        shortName: name.replace(" प्रदेश", ""),
        value,
      }))
      .sort((a, b) => b.value - a.value);
  }, [data]);

  return (
    <div className={cn("chart-container h-full p-5 rounded-2xl bg-cyan-950/20 border border-cyan-900/40 backdrop-blur-md", className)}>
      
      <div className="mb-6">
        <h3 className="font-bold text-white text-lg tracking-tight">{titleNp}</h3>
        <p className="text-[10px] text-cyan-600 uppercase tracking-widest font-medium">{title}</p>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#083344" vertical={false} />
            
            <XAxis
              dataKey="shortName"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#94a3b8", fontWeight: 500 }}
              interval={0}
              height={40}
              angle={-25}
              textAnchor="end"
            />
            
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#64748b" }}
            />
            
            <Tooltip
              cursor={{ fill: 'rgba(255, 255, 255, 0.03)' }}
              contentStyle={{
                backgroundColor: "#011c22",
                border: "1px solid rgba(8, 145, 178, 0.3)",
                borderRadius: "12px",
                fontSize: "12px",
                color: "#fff",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.5)"
              }}
              formatter={(value: number) => [
                <span className="font-bold text-white">{value.toLocaleString()} उम्मेदवार</span>,
                <span className="text-cyan-500 uppercase text-[10px] font-bold">संख्या</span>
              ]}
              labelStyle={{ color: "#fff", fontWeight: "bold", marginBottom: "4px" }}
              labelFormatter={(label, payload) => payload[0]?.payload?.name || label}
            />
            
            <Bar 
              dataKey="value" 
              radius={[6, 6, 0, 0]} 
              barSize={32}
              animationDuration={1200}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={CHART_COLORS[index % CHART_COLORS.length]}
                  className="hover:opacity-80 transition-opacity cursor-pointer"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}