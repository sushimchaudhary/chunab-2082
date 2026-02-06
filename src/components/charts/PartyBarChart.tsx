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
import { ChartDataItem } from "@/types/election";
import { getShortPartyName } from "@/hooks/useElectionData";
import { cn } from "@/lib/utils";

interface PartyBarChartProps {
  data: Record<string, number>;
  title?: string;
  titleNp?: string;
  maxItems?: number;
  className?: string;
}

// Cyan & Teal Palette: डार्क थिमका लागि उपयुक्त विभिन्न शेड्स
const CHART_COLORS = [
  "#6366f1", // Indigo 500
  "#3b82f6", // Blue 500
  "#06b6d4", // Cyan 500
  "#8b5cf6", // Violet 500
  "#2dd4bf", // Teal 400
  "#4f46e5", // Indigo 600
  "#2563eb", // Blue 600
  "#7c3aed", // Violet 600
];

export function PartyBarChart({
  data,
  title = "Candidates by Party",
  titleNp = "पार्टी अनुसार उम्मेदवार",
  maxItems = 7,
  className,
}: PartyBarChartProps) {
  const chartData: ChartDataItem[] = useMemo(() => {
    return Object.entries(data)
      .map(([name, value]) => ({
        name,
        shortName: getShortPartyName(name),
        value,
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, maxItems);
  }, [data, maxItems]);

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
            layout="vertical"
            margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
            barGap={8}
          >
            {/* ग्रिडलाई मधुरो बनाइएको छ */}
            <CartesianGrid strokeDasharray="3 3" stroke="#083344" horizontal={false} />
            
            <XAxis
              type="number"
              hide // अझै सफा देखाउन X-axis लाई लुकाइएको छ
            />
            
            <YAxis
              dataKey="shortName"
              type="category"
              width={80}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#94a3b8", fontWeight: 500 }}
            />
            
            <Tooltip
              cursor={{ fill: 'rgba(6, 182, 212, 0.05)' }}
              contentStyle={{
                backgroundColor: "#011c22",
                border: "1px solid rgba(8, 145, 178, 0.3)",
                borderRadius: "12px",
                fontSize: "12px",
                color: "#fff",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.5)"
              }}
              formatter={(value: number, name: string, props: any) => [
                <span className="text-white font-bold">{value.toLocaleString()} उम्मेदवार</span>,
                <span className="text-cyan-500 text-[10px] uppercase font-bold">{props.payload.name}</span>,
              ]}
              labelFormatter={() => ""}
            />
            
            <Bar 
              dataKey="value" 
              radius={[0, 6, 6, 0]} 
              barSize={24}
              animationDuration={1500}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={CHART_COLORS[index % CHART_COLORS.length]}
                  // Hover गर्दा बार चम्किने इफेक्ट
                  className="hover:opacity-80 transition-opacity cursor-pointer"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {/* Footer info */}
      <div className="mt-4 text-center">
        <p className="text-[10px] text-cyan-800 font-medium">Top {maxItems} parties shown</p>
      </div>
    </div>
  );
}