import { Candidate } from "@/types/election";
import { getShortPartyName } from "@/hooks/useElectionData";
import { User, MapPin, GraduationCap, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface CandidateCardProps {
  candidate: Candidate;
  onClick?: () => void;
  className?: string;
}

const partyColorMap: Record<string, string> = {
  "नेपाली काँग्रेस": "bg-green-500/10 text-green-400 border-green-500/20",
  "नेपाल कम्युनिष्ट पार्टी (एकीकृत मार्क्सवादी लेनिनवादी)": "bg-red-500/10 text-red-400 border-red-500/20",
  "नेपाल कम्युनिष्ट पार्टी (माओवादी केन्द्र)": "bg-rose-500/10 text-rose-400 border-rose-500/20",
  "राष्ट्रिय स्वतन्त्र पार्टी": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "राष्ट्रिय प्रजातन्त्र पार्टी": "bg-purple-500/10 text-purple-400 border-purple-500/20",
  "जनता समाजवादी पार्टी, नेपाल": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  "स्वतन्त्र": "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
};

export function CandidateCard({ candidate, onClick, className }: CandidateCardProps) {
  const shortParty = getShortPartyName(candidate.PoliticalPartyName);
  const partyColor = partyColorMap[candidate.PoliticalPartyName] || "bg-cyan-900/20 text-cyan-300 border-cyan-800";

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border border-cyan-900/50 bg-cyan-950/20 p-4 transition-all hover:border-cyan-500/50 hover:bg-cyan-950/40",
        className
      )}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick?.()}
    >
      <div className="flex items-start gap-4">
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-cyan-800 bg-cyan-900/50 shadow-inner group-hover:border-cyan-500 transition-colors">
          <img 
            src={`https://result.election.gov.np/Images/Candidate/${candidate.CandidateID}.jpg`} 
            className="h-full w-full object-cover" 
            alt={candidate.CandidateName}
            onError={(e) => {
                e.currentTarget.style.display = 'none';
            }}
          />
          <User className="absolute inset-0 m-auto h-6 w-6 text-cyan-700 -z-10" />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-cyan-50 truncate font-nepali tracking-tight group-hover:text-cyan-400 transition-colors">
            {candidate.CandidateName}
          </h3>

          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span
              className={cn(
                "rounded-md px-2 py-0.5 text-[11px] font-medium border",
                partyColor
              )}
            >
              {shortParty}
            </span>
            <span className="text-[11px] font-medium text-cyan-500/80 uppercase tracking-wider">
              {candidate.SymbolName}
            </span>
          </div>
        </div>
      </div>

      <div className="my-4 h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-900/50 to-transparent" />

      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="flex items-center gap-2 text-cyan-400/70">
          <MapPin className="h-3.5 w-3.5 text-cyan-500" />
          <span className="truncate">{candidate.DistrictName} - {candidate.SCConstID}</span>
        </div>
        <div className="flex items-center gap-2 text-cyan-400/70">
          <Calendar className="h-3.5 w-3.5 text-cyan-500" />
          <span>{candidate.AGE_YR} वर्ष</span>
        </div>
        <div className="flex items-center gap-2 text-cyan-400/70 col-span-2">
          <GraduationCap className="h-3.5 w-3.5 text-cyan-500" />
          <span className="truncate">{candidate.QUALIFICATION || "साधारण लेखपढ"}</span>
        </div>
      </div>
      
      <div className="absolute -inset-px rounded-xl bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </div>
  );
}