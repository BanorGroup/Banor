import Link from "next/link";
import * as Icons from "lucide-react";
import type { SiteConfig } from "@/lib/data";

interface FooterProps {
  config: SiteConfig;
}

function DynamicIcon({ name, className }: { name: string; className?: string }) {
  const Icon = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[name];
  return Icon ? <Icon className={className} /> : null;
}

export function Footer({ config }: FooterProps) {
  return (
    <footer className="relative border-t border-slate-800/60 overflow-hidden animate-fade-in">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-950 to-slate-950" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="container mx-auto px-4 md:px-6 py-16 relative z-10">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <h3 className="font-display text-xl font-semibold text-slate-50 mb-3">
              {config.siteName}
            </h3>
            <p className="text-primary font-medium text-sm mb-1">{config.tagline}</p>
            <p className="text-slate-500 text-sm mb-6">{config.subtagline}</p>
            <div className="flex gap-3">
              {config.socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-11 h-11 rounded-xl bg-slate-800/80 text-slate-400 hover:text-primary hover:bg-primary/10 hover:scale-110 transition-all duration-300"
                  aria-label={link.label}
                >
                  <DynamicIcon name={link.icon} className="size-5" />
                </a>
              ))}
            </div>
          </div>
          {config.footer.columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-semibold text-slate-200 mb-4 text-sm uppercase tracking-wider">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-slate-400 hover:text-primary transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 pt-8 border-t border-slate-800/60 text-center text-slate-500 text-sm">
          {config.footer.copyright}
        </div>
      </div>
    </footer>
  );
}
