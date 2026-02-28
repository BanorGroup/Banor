"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { SiteConfig } from "@/lib/data";

interface HeaderProps {
  config: SiteConfig;
}

export function Header({ config }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b backdrop-blur-xl transition-all duration-300",
        scrolled ? "border-slate-700/80 bg-slate-950/95" : "border-slate-800/60 bg-slate-950/80"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex h-16 items-center justify-between">
        <Link
          href="/"
          className="font-display text-xl font-semibold tracking-tight text-slate-50 transition-all hover:text-primary"
        >
          {config.siteName}
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {config.navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-4 py-2.5 rounded-lg text-sm font-medium text-slate-400 transition-all duration-200",
                "hover:text-slate-50 hover:bg-slate-800/60",
                item.href === "/partner" && "text-primary"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Button asChild size="sm" className="glow-subtle">
            <Link href="/partner">Partner / Invest</Link>
          </Button>
          <button
            className="md:hidden p-2.5 rounded-lg text-slate-400 hover:text-primary hover:bg-slate-800/60 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-slate-800/60 bg-slate-950/95 backdrop-blur-xl animate-slide-down">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
            {config.navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-4 py-3 rounded-lg text-slate-400 hover:text-primary hover:bg-slate-800/60 transition-colors",
                  item.href === "/partner" && "font-medium text-primary"
                )}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
