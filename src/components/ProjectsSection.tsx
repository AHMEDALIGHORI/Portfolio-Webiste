import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Github } from "lucide-react";
import TiltCard from "./TiltCard";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "E-Commerce Dashboard",
    description:
      "A responsive analytics dashboard for tracking sales, revenue, and customer metrics with interactive charts and data filtering.",
    tags: ["React", "Tailwind", "Chart.js"],
    github: "https://github.com/AHMEDALIGHORI",
  },
  {
    title: "Portfolio Website",
    description:
      "A modern, animated personal portfolio showcasing frontend development skills with smooth scroll animations and dark theme.",
    tags: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/AHMEDALIGHORI/Project",
  },
  {
    title: "Data Visualization Tool",
    description:
      "An interactive data visualization platform that transforms CSV data into beautiful, insightful charts and graphs.",
    tags: ["Python", "Pandas", "Plotly"],
    github: "https://github.com/AHMEDALIGHORI",
  },
  {
    title: "Task Management App",
    description:
      "A clean, minimalist task manager with drag-and-drop functionality, categories, and deadline tracking features.",
    tags: ["React", "TypeScript", "Firebase"],
    github: "https://github.com/AHMEDALIGHORI",
  },
];

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );

      const cards = gridRef.current?.children;
      if (cards) {
        gsap.fromTo(
          Array.from(cards),
          { opacity: 0, y: 60, rotateY: 5 },
          {
            opacity: 1,
            y: 0,
            rotateY: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: gridRef.current, start: "top 80%" },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" className="py-32 relative" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={headerRef} className="text-center mb-16 opacity-0">
          <span className="text-primary text-sm font-medium tracking-widest uppercase">
            Featured Work
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mt-4">
            Selected <span className="text-gradient">Projects</span>
          </h2>
        </div>

        <div ref={gridRef} className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <TiltCard
              key={project.title}
              className="group relative rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/40 hover:glow-gold transition-colors duration-500 opacity-0"
            >
              {/* Gradient top bar */}
              <div className="h-1 bg-gradient-to-r from-primary/30 to-transparent" />

              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex gap-2">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-secondary text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                      aria-label="View source"
                    >
                      <Github size={16} />
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-secondary text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                      aria-label="View live"
                    >
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
