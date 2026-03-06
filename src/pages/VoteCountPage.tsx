import React, { useState } from "react";
import {
  Search,
  Globe,
  RefreshCcw,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";

const ELECTION_SOURCES = [
  {
    id: "ekantipur",
    name: "Kantipur",
    label: "कान्तिपुर",
    url: "https://election.ekantipur.com/?lng=nep",
    color: "from-gray-600 to-gray-800",
  },
  {
    id: "onlinekhabar",
    name: "Online Khabar",
    label: "अनलाइनखबर",
    url: "https://election.onlinekhabar.com/",
    color: "from-sky-400 to-sky-500",
  },
  {
    id: "hamropatro",
    name: "Hamro Patro",
    label: "हाम्रो पात्रो",
    url: "https://app.hamropatro.com/election",
    color: "from-red-500 to-red-600",
  },
];

export default function VoteCountI() {
  const [activeTab, setActiveTab] = useState(ELECTION_SOURCES[0].url);
  const [key, setKey] = useState(0); // Iframe refresh गर्नका लागि

  const handleRefresh = () => setKey((prev) => prev + 1);

  return (
    <Layout>
    <div className="min-h-screen  text-white font-nepali">
      {/* --- PREMIUM HEADER --- */}
      <div className="pt-6 pb-4 px-4 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="pb-3">
              <div className="max-w-7xl mx-auto flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-red-600 italic  uppercase flex items-center gap-2">
                    <span className="bg-red-600 text-white px-2 not-italic ">
                      LIVE
                    </span>
                    लाइभ अपडेट हेर्नुहोस्
                  </h2>
                </div>
              </div>
            </div>

            {/* Refresh & External Link for Mobile */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleRefresh}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 py-1.5 px-4 rounded text-xs font-bold transition-all active:scale-95"
              >
                <RefreshCcw className="h-4 w-4 text-green-500" /> REFRESH
              </button>
              <a
                href={activeTab}
                target="_blank"
                className="p-1.5 bg-red-600/10 border border-red-600/20 rounded hover:bg-red-600 transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* --- MODERN TABS (Responsive & Styled) --- */}
      <div className="sticky top-20 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto flex p-1">
          {ELECTION_SOURCES.map((source) => (
            <button
              key={source.id}
              onClick={() => setActiveTab(source.url)}
              className={`relative flex-1 py-3 px-2 text-[10px] md:text-sm font-black uppercase tracking-tighter transition-all rounded flex items-center justify-center gap-1 ${
                activeTab === source.url
                  ? "text-white"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              {activeTab === source.url && (
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${source.color} rounded -z-10 shadow-lg shadow-red-900/20`}
                />
              )}
              {source.label}
              <ChevronRight
                className={`h-3 w-3 ${activeTab === source.url ? "opacity-100" : "opacity-0"}`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* --- IFRAME DISPLAY --- */}
      <div className="relative w-full h-[calc(100vh-160px)] md:h-[calc(130vh-200px)] bg-zinc-950 overflow-hidden">
        {/* Loader behind Iframe */}
        <div className="absolute inset-0 flex items-center justify-center -z-10 bg-[#0a0a0a]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs font-bold tracking-[0.2em] text-gray-600 uppercase animate-pulse">
              Connecting to Source...
            </p>
          </div>
        </div>

        {/* The Iframe with key for refresh */}
        <iframe
          key={key}
          src={activeTab}
          className="w-full h-full border-none shadow-2xl"
          title="Election Result"
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
          loading="lazy"
        />
      </div>

      {/* --- MOBILE INFO BAR --- */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-red-600 py-1 px-4 text-center">
        <p className="text-[10px] font-bold italic tracking-widest">
          डाटा आधिकारिक स्रोतहरूबाट सिधै लोड भइरहेको छ
        </p>
      </div>
    </div>
    </Layout>
  );
}
