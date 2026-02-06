"use client";

import { ReactNode } from "react";
import { Header } from "./Header";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

export function Layout({ children, className }: LayoutProps) {
  return (
    <div className="min-h-screen bg-black selection:bg-cyan-500/30">
      <Header />

      <main
        className={cn(
          "container py-6 md:py-10 min-h-[calc(100vh-200px)]",
          className,
        )}
      >
        {children}
      </main>

      <footer className="border-t border-cyan-900/30 bg-[#010a0c] backdrop-blur-md py-4 mt-2">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-6">
         
          <div className="flex flex-col items-center md:items-start space-y-2">
            <div className="flex items-center gap-2">
              <p className="text-sm font-bold text-white tracking-tight">
                All the data are sourced from 
                <a href="https://election.gov.np/np/">
                  <span className="hover:underline hover:text-cyan-500"> election commission of nepal.</span>
                  </a>
              </p>
            </div>
            <p className="text-xs text-cyan-500 font-medium">
            नागरिक सचेतनाका लागि डाटा
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <p className="text-[10px] uppercase tracking-[0.1em] text-cyan-500 font-bold">
              Developed & Maintained by
            </p>
            <a
              href="https://sempatech.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2"
            >
             
              <span className="text-sm text-white group-hover:text-cyan-400 transition-all font-bold">
                Sempa Tech
              </span>
            </a>
          </div>
        </div>

        <div className="container mt-3 pt-3 border-t border-cyan-900/40 text-center md:text-left">
          <p className="text-[10px] text-cyan-900/90">
            © {new Date().getFullYear()} All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
