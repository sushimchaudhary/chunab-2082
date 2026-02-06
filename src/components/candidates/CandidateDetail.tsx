import { Candidate } from "@/types/election";
import { getShortPartyName } from "@/hooks/useElectionData";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  User,
  MapPin,
  GraduationCap,
  Calendar,
  Building,
  Briefcase,
  Flag,
  Home,
  
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CandidateDetailProps {
  candidate: Candidate | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CandidateDetail({
  candidate,
  open,
  onOpenChange,
}: CandidateDetailProps) {
  if (!candidate) return null;

  const shortParty = getShortPartyName(candidate.PoliticalPartyName);

  const details = [
    { icon: Calendar, label: "उमेर (Age)", value: `${candidate.AGE_YR} Years` },
    { icon: User, label: "लिङ्ग (Gender)", value: candidate.Gender },
    {
      icon: Flag,
      label: "पार्टी (Party)",
      value: candidate.PoliticalPartyName,
    },
    {
      icon: GraduationCap,
      label: "योग्यता (Qualification)",
      value: candidate.QUALIFICATION,
    },
    {
      icon: Building,
      label: "शिक्षण संस्था (Institution)",
      value: candidate.NAMEOFINST || "N/A",
    },
    { icon: MapPin, label: "जिल्ला (District)", value: candidate.DistrictName },
    {
      icon: Briefcase,
      label: "अनुभव (Experience)",
      value: candidate.EXPERIENCE || "N/A",
    },
    {
      icon: Home,
      label: "ठेगाना (Address)",
      value: candidate.ADDRESS || "N/A",
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "max-w-[92vw] sm:max-w-md rounded-xl p-0 overflow-hidden bg-[#011c22] border-cyan-800 text-cyan-50 shadow-2xl shadow-black/50",
          "max-h-[80vh] flex flex-col focus:outline-none",
        )}
      >
        <DialogHeader className="p-2  flex flex-row items-center gap-4 border-b border-cyan-900/50 bg-cyan-950/20 backdrop-blur-md">
          <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-xl border-2 border-cyan-700/30 overflow-hidden bg-cyan-900/50 shrink-0 shadow-lg">
            <img
              src={`https://result.election.gov.np/Images/Candidate/${candidate.CandidateID}.jpg`}
              className="h-full w-full object-cover"
              alt={candidate.CandidateName}
            />
          </div>
          <div className="flex-1 min-w-0 pr-4">
            <DialogTitle className="text-lg sm:text-xl font-bold font-nepali leading-tight text-white">
              {candidate.CandidateName}
            </DialogTitle>
            <div className="mt-1 flex flex-col gap-0.5">
              <p className="text-xs text-cyan-400 font-semibold truncate">
                {shortParty}
              </p>
              <p className="text-[11px] text-cyan-600 font-medium">
                चिन्ह: {candidate.SymbolName}
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-2 custom-scrollbar">
          <style
            dangerouslySetInnerHTML={{
              __html: `
 
  .custom-scrollbar::-webkit-scrollbar {
    width: 4px;
  }

  
  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
 .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #0891b2; /* cyan-600 */
    border-radius: 10px;
  }

  
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #06b6d4; /* cyan-500 */
  }

 
  .custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: #0891b2 transparent;
  }
`,
            }}
          />

          <div className="grid grid-cols-1 gap-6">
            {details.map((detail, index) => {
              const Icon = detail.icon;
              return (
                <div
                  key={index}
                  className="flex items-start gap-4 transition-transform active:scale-[0.98]"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-900/30 border border-cyan-700/30 shrink-0">
                    <Icon className="h-4 w-4 text-cyan-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] uppercase tracking-[0.1em] text-cyan-600 font-bold mb-0.5">
                      {detail.label}
                    </p>
                    <p className="text-[14px] sm:text-[15px] text-cyan-50/90 leading-relaxed font-medium">
                      {detail.value}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Close - Mobile optimized */}
        <div className="p-2 bg-cyan-950/30 border-t border-cyan-900/50">
          <button
            onClick={() => onOpenChange(false)}
            className="w-full py-1.5 rounded bg-red-600 border border-red-600 text-white text-sm font-bold hover:bg-red-700 "
          >
            Close
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
