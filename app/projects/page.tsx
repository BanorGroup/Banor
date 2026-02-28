import { Hero } from "@/components/hero";
import { ProjectCard } from "@/components/project-card";
import { getProjects } from "@/lib/data";
import { generateSEO, generateBreadcrumbJSONLD } from "@/lib/seo";

export const metadata = generateSEO({
  title: "Projects",
  description: "Banor Group projects across Foundation, Development, and Capital.",
  path: "/projects",
});

export default async function ProjectsPage() {
  const projects = await getProjects();
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
  ];
  const breadcrumbJSONLD = generateBreadcrumbJSONLD(breadcrumbs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJSONLD) }}
      />
      <Hero
        title="Projects"
        subtitle="Foundation. Development. Capital."
        intro="Explore our integrated redevelopment projects across the ecosystem."
      />
      <section className="section-padding">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.slug} {...project} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
