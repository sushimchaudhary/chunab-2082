import { FileText, ArrowLeft, ChevronDown, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { useState } from "react";

const manifestoList = [
  {
    id: "cpnuml",
    files: [{ name: "पूर्ण घोषणापत्र", file: "cpnuml.pdf" }],
    name: "नेकपा एमाले",
    color: "border-red-500/30",
    priorities: "समृद्धि र सामाजिक सुरक्षा",
    symbol: "/symbol/cpn.jpg",
  },
  {
    id: "congress",
    files: [{ name: "पूर्ण घोषणापत्र", file: "congress.pdf" }],
    name: "नेपाली कांग्रेस",
    color: "border-green-500/30",
    priorities: "शिक्षा, स्वास्थ्य र युवा रोजगारी",
    symbol: "/symbol/congress.png",
  },
  {
    id: "nekapa",
    files: [{ name: "पूर्ण घोषणापत्र", file: "nekapa.pdf" }],
    name: "नेकपा माओवादी",
    color: "border-red-500/30",
    priorities: "समाजवाद र उत्पादन क्रान्ति",
    symbol: "/symbol/nekapa.jpg",
  },
  {
    id: "rsp",
    files: [{ name: "पूर्ण घोषणापत्र", file: "rsp.pdf" }],
    name: "राष्ट्रिय स्वतन्त्र पार्टी",
    color: "border-cyan-500/30",
    priorities: "डिजिटल नेपाल र सुशासन",
    symbol: "/symbol/rsp.png",
  },
  {
    id: "ujyalo",
    files: [
      { name: "घोषणापत्र भाग १", file: "unp1.pdf" },
      { name: "घोषणापत्र भाग २", file: "unp2.pdf" },
      { name: "घोषणापत्र भाग ३", file: "unp3.pdf" },
    ],
    name: "उज्यालो पार्टी",
    color: "border-yellow-500/30",
    priorities: "उर्जा र स्मार्ट सिटी",
    symbol: "/symbol/ujyalo.png",
  },
  {
    id: "shram-sanskriti",
    files: [{ name: "पूर्ण घोषणापत्र", file: "ShramSanskritiParty.pdf" }],
    name: "श्रम संस्कृति पार्टी",
    color: "border-blue-500/30",
    priorities: "श्रमको सम्मान र सीप विकास",
    symbol: "/symbol/ssparty.svg",
  },
];

export function ManifestoSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  const handleOpenPDF = (fileName: string) => {
    window.open(`/manifesto/${fileName}`, "_blank");
  };

  const handleCardClick = (party: typeof manifestoList[0]) => {
    if (party.files.length > 1) {
      setOpenId(openId === party.id ? null : party.id);
    } else {
     
      handleOpenPDF(party.files[0].file);
    }
  };

  return (
    <Layout>
      <div className="bg-black min-h-screen p-4 md:p-10">
        <div className="max-w-7xl mx-auto mb-10">
          <Link to="/candidates" className="flex items-center gap-2 text-cyan-500 mb-6 hover:text-cyan-400 w-fit transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Candidates
          </Link>
          <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
            <FileText className="text-cyan-500 h-8 w-8" /> निर्वाचन घोषणापत्रहरू
          </h2>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {manifestoList.map((party) => (
            <div
              key={party.id}
              onClick={() => handleCardClick(party)}
              className={`group relative overflow-hidden rounded-xl border ${party.color} bg-cyan-950/10 p-5  shadow-lg cursor-pointer hover:bg-cyan-900/20 `}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="h-14 w-14 rounded-full bg-white flex items-center justify-center overflow-hidden border-2 border-cyan-500/20 shadow-lg">
                  <img src={party.symbol} alt={party.name} className="h-full w-full object-contain p-1" />
                </div>
              </div>

              <h3 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                {party.name}
              </h3>
              <p className="text-xs text-gray-400 mb-4 line-clamp-1">मुख्य एजेन्डा: {party.priorities}</p>

              <div className="flex items-center justify-between w-full text-cyan-500 text-xs font-bold mt-2">
                <span>घोषणापत्र पढ्नुहोस्</span>
                {party.files.length > 1 ? (
                  <ChevronDown className={`h-4 w-4 ${openId === party.id ? "rotate-180" : ""}`} />
                ) : (
                  <ChevronRight className="h-4 w-4 transition-transform" />
                )}
              </div>

              {openId === party.id && party.files.length > 1 && (
                <div className="mt-4 space-y-2 animate-in fade-in slide-in-from-top-2  relative z-20">
                  {party.files.map((f, i) => (
                    <div
                      key={i}
                      onClick={(e) => {
                        e.stopPropagation(); 
                        handleOpenPDF(f.file);
                      }}
                      className="flex items-center justify-between p-3 bg-white/5 hover:bg-cyan-500/20 rounded-lg text-gray-200 text-xs border border-white/10 transition-all active:scale-[0.97]"
                    >
                      <span className="flex items-center gap-2">
                        <FileText className="h-3 w-3 text-cyan-500" />
                        {f.name}
                      </span>
                      <ChevronRight className="h-3 w-3 text-cyan-500" />
                    </div>
                  ))}
                </div>
              )}

              {/* Decorative Glow */}
              <div className="absolute -right-4 -bottom-4 h-16 w-16 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}