import Image from "next/image";
import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";

function DynamicIcon({ name, className }: { name: string; className?: string }) {
  const Icon = (Icons as Record<string, React.ComponentType<{ className?: string }>>)[name];
  return Icon ? <Icon className={className} /> : null;
}

interface TeamCardProps {
  name: string;
  role: string;
  arm: string;
  bio: string;
  image?: string;
  linkedin?: string;
  icon?: string;
}

export function TeamCard({
  name,
  role,
  arm,
  bio,
  image,
  linkedin,
  icon = "User",
}: TeamCardProps) {
  return (
    <div className="group rounded-2xl bg-slate-800/50 border border-slate-700/50 p-5 backdrop-blur-sm transition-all duration-300 ease-out hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 hover:scale-[1.01]">
      <div className="flex gap-4">
          <div className="shrink-0 w-16 h-16 rounded-2xl bg-slate-700/80 overflow-hidden flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
          {image ? (
            <Image src={image} alt={name} width={64} height={64} className="object-cover" />
          ) : (
            <DynamicIcon name={icon} className="size-8 text-slate-500" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-slate-100">{name}</h3>
              <p className="text-primary font-medium text-sm">{role}</p>
              <p className="text-slate-500 text-xs capitalize">{arm}</p>
            </div>
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg text-slate-400 hover:text-primary hover:bg-slate-700/50 transition-colors"
                aria-label="LinkedIn"
              >
                <Icons.Linkedin className="size-5" />
              </a>
            )}
          </div>
          <p className="text-slate-300 text-sm mt-2">{bio}</p>
        </div>
      </div>
    </div>
  );
}
