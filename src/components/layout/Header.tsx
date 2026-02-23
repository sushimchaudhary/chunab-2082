"use client"

import { Link, useLocation } from "react-router-dom";
import { Users, Menu, X, Search, FileText } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "/candidates", label: "Candidates", labelNp: "उम्मेदवारहरू", icon: Users },
  { path: "/manifesto", label: "Manifesto", labelNp: "घोषणापत्र", icon: FileText },
];

export function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // पेज परिवर्तन हुँदा मोबाइल मेनु आफैं बन्द हुने बनाउन
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const handleSearchClick = () => {
    setMobileMenuOpen(false);
    const element = document.getElementById("main-content");
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-cyan-900/30 bg-slate-950/80 backdrop-blur-md">
      <div className="container mx-auto flex h-20 items-center justify-between gap-4 px-4">
        
        {/* Logo Section */}
        <Link to="/" className="group flex items-center gap-3 shrink-0">
          <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl transition-all duration-300 group-hover:scale-105 border border-cyan-500/20">
            <img
              src="/logo.jpeg"
              alt="Logo"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="hidden lg:flex flex-col">
            <span className="text-base font-bold text-white leading-tight tracking-tight">
              प्रतिनिधि सभा निर्वाचन २०८२ डाटा
            </span>
          </div>
        </Link>

        {/* Search Bar (Desktop) */}
        <div className="hidden md:block flex-1 max-w-md relative group">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400 group-focus-within:text-cyan-400" />
          </div>
          <input
            type="text"
            onClick={handleSearchClick}
            readOnly
            placeholder="उम्मेदवार वा जिल्ला खोज्नुहोस्..."
            className="w-full bg-cyan-950/20 border border-cyan-900/50 rounded-full py-2 pl-10 pr-4 text-sm text-white placeholder:text-gray-500 cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all"
          />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                  isActive 
                    ? "bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.4)]" 
                    : "text-slate-400 hover:text-cyan-400 hover:bg-cyan-950/30"
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{item.labelNp}</span>
              </Link>
            );
          })}
        </nav>

        {/* Mobile Toggle Buttons */}
        <div className="flex items-center gap-2 md:hidden">
          <button 
            onClick={handleSearchClick} 
            className="p-2 rounded-lg bg-cyan-950/30 text-cyan-500 border border-cyan-900/50"
          >
            <Search className="h-5 w-5" />
          </button>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="p-2 rounded-lg bg-slate-900 text-slate-400 border border-slate-800"
          >
            {mobileMenuOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-[80px] left-0 w-full bg-slate-950 border-b border-cyan-900/50 shadow-2xl animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col p-4 gap-2 bg-gradient-to-b from-slate-950 to-cyan-950/20">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-4 px-5 py-4 rounded-xl text-base font-semibold transition-all",
                    isActive 
                      ? "bg-cyan-500 text-slate-950 shadow-lg" 
                      : "text-slate-300 bg-slate-900/50 border border-slate-800"
                  )}
                >
                  <Icon className={cn("h-5 w-5", isActive ? "text-slate-950" : "text-cyan-500")} />
                  <span>{item.labelNp}</span>
                </Link>
              );
            })}
            
            {/* Mobile Search Placeholder inside Menu */}
            <div 
              onClick={handleSearchClick}
              className="mt-2 flex items-center gap-4 px-5 py-4 rounded-xl bg-cyan-950/20 border border-cyan-900/30 text-gray-400 text-sm"
            >
              <Search className="h-5 w-5 text-cyan-500" />
              खोज्नुहोस्...
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}