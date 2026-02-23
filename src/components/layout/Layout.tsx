"use client";

import { ReactNode } from "react";
import { Header } from "./Header";
import { cn } from "@/lib/utils";
import Footer from "./Footer";

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

   <Footer/>
    </div>
  );
}
