import { Candidate } from "@/types/election";
import { ChevronRight } from "lucide-react";

interface BattleProps {
  candidate1: Candidate;
  candidate2: Candidate;
  constituencyName: string;
}

export function TrendingBattles({ candidate1, candidate2, constituencyName }: BattleProps) {
  return (
    <div className="relative group bg-slate-900/40 backdrop-blur-md border border-cyan-900/20 rounded-xl p-4 transition-all hover:border-cyan-500/30 shadow-xl min-w-[280px] md:min-w-[320px] flex-shrink-0">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <span className="text-[10px] font-bold text-cyan-500/80 uppercase tracking-wider bg-cyan-500/5 px-2 py-1 rounded-md">
          {constituencyName}
        </span>
        <ChevronRight className="h-4 w-4 text-cyan-500/40 group-hover:text-cyan-400 transition-colors" />
      </div>

      <div className="flex items-center justify-between relative gap-2">
      
        <div className="flex flex-col items-center text-center flex-1 min-w-0">
          <div className="relative h-14 w-14 md:h-20 md:w-20 rounded-full border-2 border-cyan-500/20 overflow-hidden bg-slate-800 mb-2">
            <img 
              src={`https://result.election.gov.np/Images/Candidate/${candidate1.CandidateID}.jpg`} 
              alt={candidate1.CandidateName}
              className="h-full w-full object-cover "
            />
          </div>
          <h4 className="text-white font-bold text-xs md:text-sm truncate w-full">{candidate1.CandidateName.split(' ')[0]}</h4>
          <p className="text-cyan-500/60 text-[9px] truncate w-full uppercase">{candidate1.PoliticalPartyName.split('(')[0]}</p>
        </div>

       
        <div className="h-7 w-7 rounded-full bg-slate-950 border border-cyan-500/40 flex items-center justify-center z-10 shrink-0">
          <span className="text-[8px] font-black text-white italic">VS</span>
        </div>

       
        <div className="flex flex-col items-center text-center flex-1 min-w-0">
          <div className="relative h-14 w-14 md:h-20 md:w-20 rounded-full border-2 border-cyan-500/20 overflow-hidden bg-slate-800 mb-2">
            <img 
              src={`https://result.election.gov.np/Images/Candidate/${candidate2.CandidateID}.jpg`} 
              alt={candidate2.CandidateName}
              className="h-full w-full object-cover"
            />
          </div>
          <h4 className="text-white font-bold text-xs md:text-sm truncate w-full">{candidate2.CandidateName.split(' ')[0]}</h4>
          <p className="text-cyan-500/60 text-[9px] truncate w-full uppercase">{candidate2.PoliticalPartyName.split('(')[0]}</p>
        </div>
      </div>
    </div>
  );
}