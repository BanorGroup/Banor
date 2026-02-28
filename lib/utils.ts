import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Prepends basePath to asset paths for GitHub Pages (and other subpath deployments).
 * Required because next/image doesn't automatically add basePath to src.
 */
export function getImageSrc(path: string): string {
  if (!path || path.startsWith("http://") || path.startsWith("https://")) return path;
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return basePath ? `${basePath}${path.startsWith("/") ? path : `/${path}`}` : path;
}
