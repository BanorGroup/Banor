"use client";

import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      setProgress(Math.min((scrollTop / docHeight) * 100, 100));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[100] h-0.5 bg-gradient-to-r from-primary to-brand-accent origin-left transition-transform duration-300 ease-out"
      style={{ transform: `scaleX(${progress / 100})` }}
      aria-hidden
    />
  );
}
