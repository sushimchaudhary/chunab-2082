import { FileText, ArrowLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";

const manifestoList = [
 
  {
    id: "cpnuml",
    file: "cpnuml.pdf",
    name: "नेकपा एमाले",
    color: "border-red-500/30",
    priorities: "समृद्धि र सामाजिक सुरक्षा",
    symbol: "/symbol/cpn.jpg",
  },
   {
    id: "congress",
    file: "congress.pdf",
    name: "नेपाली कांग्रेस",
    color: "border-green-500/30",
    priorities: "शिक्षा, स्वास्थ्य र युवा रोजगारी",
    symbol: "/symbol/congress.png",
  },
  {
    id: "nekapa",
    file: "nekapa.pdf",
    name: "नेकपा माओवादी",
    color: "border-red-500/30",
    priorities: "समाजवाद र उत्पादन क्रान्ति",
    symbol: "/symbol/nekapa.svg",
  },
  {
    id: "rsp",
    file: "rsp.pdf",
    name: "राष्ट्रिय स्वतन्त्र पार्टी",
    color: "border-cyan-500/30",
    priorities: "डिजिटल नेपाल र सुशासन",
    symbol: "/symbol/rsp.png",
  },
  
  {
    id: "ujyalo",
    file: "ujyaloparty.pdf",
    name: "उज्यालो पार्टी",
    color: "border-yellow-500/30",
    priorities: "उर्जा र स्मार्ट सिटी",
    symbol: "/symbol/ujyalo.png",
  },
  {
    id: "shram-sanskriti",
    file: "ShramSanskritiParty.pdf",
    name: "श्रम संस्कृति पार्टी",
    color: "border-blue-500/30",
    priorities: "श्रमको सम्मान र सीप विकास",
    symbol: "/symbol/ssparty.jpg",
  },
];

export function ManifestoSection() {
  const handleOpenPDF = (fileName: string) => {
    const fileUrl = `/manifesto/${fileName}`;
    window.open(fileUrl, "_blank");
  };

  return (
    <Layout>
      <div className="min-h-screen bg-black ">
        <div className="max-w-8xl mx-auto mb-10">
          <Link
            to="/candidates"
            className="flex items-center gap-2 text-cyan-500 mb-6 hover:text-cyan-400 transition-colors w-fit"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Candidates
          </Link>

          <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
            <FileText className="text-cyan-500 h-8 w-8" />
            निर्वाचन घोषणापत्रहरू
          </h2>
          <p className="text-gray-400 mt-2 text-sm">
            विभिन्न राजनीतिक दलहरूको आधिकारिक प्रतिवद्धता पत्रहरू यहाँबाट हेर्न
            सक्नुहुन्छ।
          </p>
        </div>

        <div className="max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          {manifestoList.map((party) => (
            <div
              key={party.id}
              onClick={() => handleOpenPDF(party.file)}
              className={`group relative overflow-hidden rounded-xl border ${party.color} bg-cyan-950/10 p-5 cursor-pointer hover:bg-cyan-900/20 transition-all shadow-lg hover:shadow-cyan-500/5`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center overflow-hidden border-2 border-cyan-500/20 shadow-lg group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={party.symbol}
                    alt={party.name}
                    className="h-full w-full object-contain rounded-full"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://via.placeholder.com/150?text=?";
                    }}
                  />
                </div>

                {/* <span className="text-[10px] font-bold text-cyan-600 bg-cyan-500/5 px-2 py-1 rounded uppercase tracking-wider">
                  PDF Available
                </span> */}
              </div>

              <h3 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                {party.name}
              </h3>

              <p className="text-xs text-gray-400 mb-4 line-clamp-1">
                मुख्य एजेन्डा: {party.priorities}
              </p>

              <div className="flex items-center text-cyan-500 text-xs font-bold">
                घोषणापत्र पढ्नुहोस्
                <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>

              {/* Decorative Glow */}
              <div className="absolute -right-4 -bottom-4 h-16 w-16 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/10 transition-colors" />
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto mt-12 text-center p-6 border border-dashed border-gray-800 rounded-xl">
          <p className="text-gray-500 text-xs italic font-nepali">
            * यी कागजातहरू अध्ययनको लागि मात्र उपलब्ध गराइएका हुन्।
          </p>
        </div>
      </div>
    </Layout>
  );
}
