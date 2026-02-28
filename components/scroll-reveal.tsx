"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealVariant = "build-up" | "slide-up" | "scale-in" | "blinds" | "diagonal" | "slide-in-right";

interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  threshold?: number;
  rootMargin?: string;
}

const variantStyles = {
  "build-up": {
    hidden: { clipPath: "inset(100% 0 0 0)", opacity: 0 },
    visible: { clipPath: "inset(0 0 0 0)", opacity: 1 },
  },
  "slide-up": {
    hidden: { transform: "translateY(32px)", opacity: 0 },
    visible: { transform: "translateY(0)", opacity: 1 },
  },
  "scale-in": {
    hidden: { transform: "scale(0.95)", opacity: 0 },
    visible: { transform: "scale(1)", opacity: 1 },
  },
  blinds: {
    hidden: { clipPath: "inset(0 100% 0 0)", opacity: 0 },
    visible: { clipPath: "inset(0 0 0 0)", opacity: 1 },
  },
  diagonal: {
    hidden: {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
      opacity: 0,
    },
    visible: {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      opacity: 1,
    },
  },
  "slide-in-right": {
    hidden: { transform: "translateX(24px)", opacity: 0 },
    visible: { transform: "translateX(0)", opacity: 1 },
  },
};

export function RevealOnScroll({
  children,
  className,
  variant = "build-up",
  delay = 0,
  duration = 1000,
  threshold = 0.1,
  rootMargin = "0px 0px -60px 0px",
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setIsVisible(true);
            setHasAnimated(true);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, hasAnimated]);

  const styles = variantStyles[variant];
  const state = isVisible ? styles.visible : styles.hidden;

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <div
        style={{
          ...state,
          transition: `clip-path ${duration}ms cubic-bezier(0.22, 1, 0.36, 1), 
            opacity ${duration}ms cubic-bezier(0.22, 1, 0.36, 1),
            transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1)`,
          transitionDelay: `${delay}ms`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
