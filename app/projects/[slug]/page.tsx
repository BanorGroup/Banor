import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import * as Icons from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProject, getProjects } from "@/lib/data";
import { getImageSrc } from "@/lib/utils";
import { generateSEO, generateBreadcrumbJSONLD } from "@/lib/seo";

function DynamicIcon({ name, className }: { name: string; className?: string }) {
  const Icon = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[name];
  return Icon ? <Icon className={className} /> : null;
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p: { slug: string }) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};
  return generateSEO({
    title: project.title,
    description: project.summary,
    path: `/projects/${slug}`,
  });
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const armLabels: Record<string, string> = {
    foundation: "Foundation",
    development: "Development",
    capital: "Capital",
  };

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: project.title, href: `/projects/${slug}` },
  ];
  const breadcrumbJSONLD = generateBreadcrumbJSONLD(breadcrumbs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJSONLD) }}
      />
      <article className="pb-14">
        <div className="relative h-[35vh] min-h-[260px] bg-slate-800">
          {project.images?.[0] ? (
            <Image
              src={getImageSrc(project.images[0])}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-slate-500">
              <DynamicIcon name={project.icon || "Building2"} className="size-24" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="container mx-auto px-4">
              <div className="flex gap-2 mb-2">
                <span className="rounded-full bg-primary/90 px-2 py-1 text-xs font-medium">
                  {armLabels[project.arm] ?? project.arm}
                </span>
                <span className="rounded-full bg-slate-800/90 px-2 py-1 text-xs">{project.status}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">{project.title}</h1>
              <p className="text-slate-300 mt-2">{project.location}</p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-6 -mt-8 relative z-10">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="rounded-2xl bg-slate-800/50 border border-slate-700/50 p-6">
                <h2 className="text-xl font-semibold text-slate-100 mb-3">Overview</h2>
                <p className="text-slate-300 leading-relaxed">{project.description}</p>
              </div>
            </div>
            <div>
              <div className="rounded-2xl bg-slate-800/50 border border-slate-700/50 p-5">
                <h3 className="font-semibold text-slate-100 mb-3">Impact</h3>
                <div className="space-y-3">
                  {project.impactStats?.map((stat: { label: string; value: string }, i: number) => (
                    <div key={i} className="flex justify-between">
                      <span className="text-slate-400">{stat.label}</span>
                      <span className="text-primary font-medium">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Button asChild className="mt-5 w-full">
                <Link href="/projects">View All Projects</Link>
              </Button>
            </div>
          </div>

          {project.images && project.images.length > 1 && (
            <div className="mt-10 grid grid-cols-2 gap-4">
              {project.images.slice(1).map((img: string, i: number) => (
                <div key={i} className="aspect-video relative rounded-xl overflow-hidden">
                  <Image src={getImageSrc(img)} alt="" fill className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>
      </article>
    </>
  );
}
