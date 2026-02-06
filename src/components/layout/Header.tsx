"use client"

import { Link, useLocation } from "react-router-dom";
import { Users, Menu, X, Search } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "/candidates", label: "Candidates", labelNp: "उम्मेदवारहरू", icon: Users },
];

export function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearchClick = () => {
    const element = document.getElementById("main-content");
    if (element) {
      // scroll-margin-top ले हेडरले कन्टेन्ट नछोपोस् भनेर ग्याप राख्छ
      const yOffset = -80; 
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-cyan-900/30 bg-slate-950/80 backdrop-blur-md">
      <div className="container flex h-20 items-center justify-between gap-4">
        
        {/* Logo Section */}
        <Link to="/" className="group flex items-center gap-3 shrink-0">
          <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl transition-all duration-300 group-hover:scale-105">
            <img
              src="/logo.jpeg"
              alt="Logo"
              className="h-full w-full object-contain mix-blend-screen"
            />
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-base font-bold text-white leading-tight tracking-tight">
              प्रतिनिधि सभा निर्वाचन २०८२ डाटा
            </span>
            
          </div>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-md relative group hidden sm:block">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-white group-focus-within:text-cyan-400" />
          </div>
          <input
            type="text"
            onClick={handleSearchClick}
            readOnly
            placeholder="उम्मेदवार वा जिल्ला खोज्नुहोस्..."
            className="w-full bg-cyan-950/20 border border-cyan-900/50 rounded-full py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all"
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
                  isActive ? "bg-cyan-500 text-slate-950" : "text-slate-400 hover:text-cyan-400"
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{item.labelNp}</span>
              </Link>
            );
          })}
        </nav>

        {/* Mobile Buttons */}
        <div className="flex items-center gap-2 md:hidden">
            <button onClick={handleSearchClick} className="p-2 text-cyan-500"><Search className="h-6 w-6" /></button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-slate-400">
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
        </div>
      </div>
    </header>
  );
}