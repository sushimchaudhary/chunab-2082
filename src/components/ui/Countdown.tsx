import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  targetDate: string | Date;
  className?: string;
  title?: string;
  subtitle?: string;
};

const toNepaliNum = (num: number | string) => {
  const nepaliDigits: { [key: string]: string } = {
    "0": "०", "1": "१", "2": "२", "3": "३", "4": "४", 
    "5": "५", "6": "६", "7": "७", "8": "८", "9": "९"
  };
  return String(num).split("").map(d => nepaliDigits[d] || d).join("");
};

export default function Countdown({ targetDate, className = "", title, subtitle }: Props) {
  const [now, setNow] = useState<Date>(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const target = typeof targetDate === "string" ? new Date(targetDate) : targetDate;
  const diff = target.getTime() - now.getTime();

  const currentTimeStr = now.toLocaleTimeString('en-US', { 
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true 
  });

  const totalSeconds = Math.max(0, Math.floor(diff / 1000));
  const days = Math.floor(totalSeconds / (24 * 3600));
  const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center gap-2 min-w-[70px] sm:min-w-[80px] md:min-w-[110px]">
      <div className="relative group">
        <div className="absolute -inset-1 bg-cyan-500 rounded-lg blur opacity-10 group-hover:opacity-30 transition duration-500"></div>
        <div className="relative flex h-12 w-12 sm:h-14 sm:w-14 md:h-20 md:w-20 items-center justify-center rounded-lg md:rounded-xl bg-slate-900 border border-cyan-500/30 md:border-2 shadow-inner">
          <span className="text-xl sm:text-2xl md:text-3xl font-black text-cyan-400 tabular-nums">
            {toNepaliNum(value.toString().padStart(2, '0'))}
          </span>
        </div>
      </div>
      <span className="text-[10px] md:text-sm font-bold text-slate-400 tracking-wider md:tracking-widest uppercase">
        {label}
      </span>
    </div>
  );

  return (
    <div className={cn("flex flex-col items-center p-4 md:p-8 rounded-2xl bg-slate-950 border border-cyan-900/40 shadow-2xl relative overflow-hidden", className)}>
      
      <div className="absolute top-0 left-0 w-full h-[1px] md:h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>

      <div className="absolute top-2 right-2 md:top-3 md:right-3 flex items-center gap-2 px-2 py-1">
        <span className="flex h-1.5 w-1.5 md:h-2 md:w-2">
          <span className=" absolute inline-flex h-full w-full  opacity-75"></span>
          <span className="animate-ping relative inline-flex rounded-full h-full w-full bg-cyan-500"></span>
        </span>
        <span className="text-[9px] md:text-xs font-mono text-cyan-500/80 font-bold">
          {toNepaliNum(currentTimeStr)}
        </span>
      </div>

      <div className="text-center mb-6 md:mb-10 mt-4">
        <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-white mb-2 md:mb-4 tracking-tight px-4">
          {title || "प्रतिनिधि सभा सदस्य निर्वाचन २०८२"}
        </h2>
        <div className="flex items-center justify-center gap-2 md:gap-4">
          <div className="h-[1px] w-6 md:w-12 bg-cyan-900/60"></div>
          <p className="text-cyan-500 font-bold text-[9px] md:text-sm uppercase tracking-widest opacity-90">
            {subtitle || "निर्वाचन काउन्टडाउन"}
          </p>
          <div className="h-[1px] w-6 md:w-12 bg-cyan-900/60"></div>
        </div>
      </div>

      {/* Container flex-nowrap बाट मोबाइलमा पनि सिधा लाइनमा अट्छ */}
      <div className="flex flex-row gap-2 sm:gap-4 md:gap-6 justify-center items-center w-full overflow-x-auto pb-2">
        <TimeUnit value={days} label="दिन" />
        <TimeUnit value={hours} label="घण्टा" />
        <TimeUnit value={minutes} label="मिनेट" />
        <TimeUnit value={seconds} label="सेकेन्ड" />
      </div>
    </div>
  );
}