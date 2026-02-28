import { HeroConstructing } from "@/components/hero-constructing";
import { SectionRenderer } from "@/components/sections";
import { ProjectCard } from "@/components/project-card";
import { TeamCard } from "@/components/team-card";
import { RevealOnScroll } from "@/components/scroll-reveal";
import { getPageData, getFeaturedProjects, getTeam } from "@/lib/data";
import { generateSEO } from "@/lib/seo";

export const metadata = generateSEO({
  title: "Banor Group",
  description:
    "Integrated redevelopment ecosystem—workforce, redevelopment, and capital working together to transform neighborhoods.",
  path: "/",
});

export default async function HomePage() {
  const pageData = await getPageData("home");
  const projects = await getFeaturedProjects();
  const team = await getTeam();

  return (
    <>
      <HeroConstructing
        title={pageData.title}
        subtitle={pageData.subtitle}
        intro={pageData.intro}
        heroImage={pageData.heroImage}
        primaryCta={pageData.CTAs?.[0] ? { label: pageData.CTAs[0].label, href: pageData.CTAs[0].href } : undefined}
        secondaryCta={pageData.CTAs?.[1] ? { label: pageData.CTAs[1].label, href: pageData.CTAs[1].href } : undefined}
      />

      {pageData.sections?.map((section: { id: string; type: string; [key: string]: unknown }, i: number) => (
        <RevealOnScroll key={section.id || i} variant="build-up" delay={i * 80}>
          <SectionRenderer section={section} />
        </RevealOnScroll>
      ))}

      {projects.length > 0 && (
        <RevealOnScroll variant="slide-up">
          <section className="section-padding bg-gradient-to-b from-slate-900/40 to-transparent">
            <div className="container mx-auto px-4 md:px-6">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-normal text-slate-100 text-center mb-10">
              Featured Projects
            </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, i) => (
                  <RevealOnScroll key={project.slug} variant="scale-in" delay={i * 100}>
                    <ProjectCard {...project} />
                  </RevealOnScroll>
                ))}
              </div>
            </div>
          </section>
        </RevealOnScroll>
      )}

      <RevealOnScroll variant="build-up">
        <section id="team" className="section-padding">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-normal text-slate-100 text-center mb-10">
            Leadership
          </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {team.slice(0, 6).map((member, i) => (
                <RevealOnScroll key={member.name} variant="slide-up" delay={i * 80}>
                  <TeamCard {...member} />
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>
      </RevealOnScroll>
    </>
  );
}
