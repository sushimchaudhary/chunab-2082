import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  titleNp?: string;
  value: number | string;
  icon: LucideIcon;
  trend?: {
    value: number;
    label: string;
  };
  variant?: "default" | "primary" | "accent";
  className?: string;
}

export function StatCard({
  title,
  titleNp,
  value,
  icon: Icon,
  trend,
  variant = "default",
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "p-5 rounded-xl border transition-all duration-300 group relative overflow-hidden",
        "bg-[#022c37]/40 border-cyan-900/40 hover:border-cyan-500/50 shadow-lg",
        variant === "primary" && "border-cyan-500/30 bg-cyan-500/5",
        variant === "accent" && "border-amber-500/20 bg-amber-500/5",
        className
      )}
    >
      <div className="absolute -right-4 -top-4 w-20 h-20 bg-cyan-500/5 rounded-full blur-3xl group-hover:bg-cyan-500/10 transition-colors" />

      <div className="flex items-start justify-between relative z-10">
        <div className="space-y-1.5">
          {titleNp && (
            <p className="text-[15px] font-bold text-cyan-50 font-nepali leading-tight">
              {titleNp}
            </p>
          )}
          <p className="text-[10px] uppercase tracking-wider font-bold text-cyan-700/80">
            {title}
          </p>
        </div>
        <div
          className={cn(
            "rounded-md p-2.5 transition-all duration-300",
            variant === "default" && "bg-cyan-950/50 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-cyan-950",
            variant === "primary" && "bg-cyan-500/20 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-cyan-950",
            variant === "accent" && "bg-amber-500/20 text-amber-500 group-hover:bg-amber-500 group-hover:text-amber-950"
          )}
        >
          <Icon className="h-5 w-5 stroke-[2.5px]" />
        </div>
      </div>

      <div className="mt-5 relative z-10">
        <p className="text-2xl font-bold text-white tracking-tight">
          {typeof value === "number" ? value.toLocaleString("ne-NP") : value}
        </p>
        
        {trend && (
          <div
            className={cn(
              "mt-2 inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold",
              trend.value >= 0 
                ? "bg-emerald-500/10 text-emerald-400" 
                : "bg-rose-500/10 text-rose-400"
            )}
          >
            {trend.value >= 0 ? "↑" : "↓"} {Math.abs(trend.value)}% 
            <span className="ml-1 opacity-80">{trend.label}</span>
          </div>
        )}
      </div>
    </div>
  );
}