"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ConstructingImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  variant?: "build-up" | "scan-line" | "tiles" | "reveal-center";
}

export function ConstructingImage({
  src,
  alt,
  fill = false,
  width,
  height,
  className,
  imgClassName,
  sizes = "100vw",
  variant = "build-up",
}: ConstructingImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTriggered) {
            setHasTriggered(true);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasTriggered]);

  useEffect(() => {
    if (!hasTriggered) return;

    const duration = 1400;
    const start = performance.now();

    const animate = (now: number) => {
      const elapsed = now - start;
      const rawProgress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - rawProgress, 3);
      setProgress(eased);
      if (rawProgress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [hasTriggered]);

  const clipPaths = {
    "build-up": `inset(${(1 - progress) * 100}% 0 0 0)`,
    "scan-line": `inset(0 0 ${(1 - progress) * 100}% 0)`,
    "reveal-center": `inset(${(1 - progress) * 50}% ${(1 - progress) * 20}% ${(1 - progress) * 50}% ${(1 - progress) * 20}%)`,
    tiles: `inset(0 0 0 0)`,
  };

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <div
        className="relative"
        style={{
          clipPath: variant === "tiles" ? undefined : clipPaths[variant],
          transition: variant === "tiles" ? "none" : undefined,
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill={fill}
          width={!fill ? width : undefined}
          height={!fill ? height : undefined}
          className={imgClassName}
          sizes={sizes}
        />
      </div>
      {variant === "build-up" && progress < 1 && (
        <div
          className="absolute bottom-0 left-0 right-0 h-1 bg-primary/60 origin-bottom"
          style={{
            transform: `scaleY(${progress})`,
            transformOrigin: "bottom",
          }}
        />
      )}
    </div>
  );
}
