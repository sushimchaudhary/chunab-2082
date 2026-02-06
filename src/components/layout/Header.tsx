import { Link, useLocation } from "react-router-dom";
import { BarChart3, Users, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    path: "/candidates",
    label: "Candidates",
    labelNp: "उम्मेदवारहरू",
    icon: Users,
  },
];

export function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-cyan-900/30 bg-slate-950/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl transition-all duration-300 group-hover:scale-105">
            <img
              src="/logo.jpeg"
              alt="Logo"
              className="h-full w-full object-contain mix-blend-screen"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-white leading-tight tracking-tight">
              प्रतिनिधि सभा निर्वाचन २०८२ डाटा
            </span>
            <span className="text-xs text-cyan-500/80 font-medium">
              Election Data Nepal
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20"
                    : "text-slate-400 hover:text-cyan-400 hover:bg-slate-900",
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{item.labelNp}</span>
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Button - Cyan hover effect */}
        <button
          className="md:hidden p-2 rounded-lg text-slate-400 hover:bg-slate-900 hover:text-cyan-400"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-cyan-900/30 bg-slate-950 p-4 animate-in fade-in slide-in-from-top-2">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-4 rounded-xl text-sm font-medium transition-colors",
                    isActive
                      ? "bg-cyan-500 text-slate-950"
                      : "text-slate-400 bg-slate-900/50 hover:bg-slate-900",
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <div className="flex flex-col">
                    <span className="text-base">{item.labelNp}</span>
                    <span className="text-[10px] uppercase opacity-70 tracking-wider">
                      {item.label}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}
