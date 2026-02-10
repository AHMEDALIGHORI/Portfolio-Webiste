import { Github, Linkedin, Instagram, Facebook, Mail, MapPin, ArrowUpRight, Code2, BarChart3, Zap, ExternalLink, ArrowDown, Home, User, FolderOpen, Send } from "lucide-react";
import TextScramble from "../TextScramble";
import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useState, useCallback } from "react";

const navSections = [
  { id: "hero", label: "Home", icon: Home, offset: 0 },
  { id: "about", label: "About", icon: User, offset: 0.25 },
  { id: "skills", label: "Skills", icon: Zap, offset: 0.5 },
  { id: "projects", label: "Projects", icon: FolderOpen, offset: 0.75 },
  { id: "contact", label: "Contact", icon: Send, offset: 1 },
];

const SectionNav = () => {
  const scroll = useScroll();
  const [active, setActive] = useState(0);

  useFrame(() => {
    const offset = scroll.offset;
    let closest = 0;
    let minDist = Infinity;
    navSections.forEach((s, i) => {
      const dist = Math.abs(offset - s.offset);
      if (dist < minDist) {
        minDist = dist;
        closest = i;
      }
    });
    setActive(closest);
  });

  const jumpTo = useCallback(
    (targetOffset: number) => {
      const el = scroll.el;
      if (el) {
        const maxScroll = el.scrollHeight - el.clientHeight;
        el.scrollTo({ top: targetOffset * maxScroll, behavior: "smooth" });
      }
    },
    [scroll]
  );

  return (
    <nav className="fixed right-3 sm:right-6 top-[60%] -translate-y-1/2 z-50 flex flex-col items-center gap-2 sm:gap-3">
      {navSections.map((s, i) => (
        <button
          key={s.id}
          onClick={() => jumpTo(s.offset)}
          className="group relative flex items-center justify-center"
          aria-label={`Jump to ${s.label}`}
        >
          <span className="absolute right-full mr-3 px-2.5 py-1 rounded-md text-xs font-medium bg-background/80 backdrop-blur-sm border border-border/50 text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none hidden sm:block">
            {s.label}
          </span>
          <span
            className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border transition-all duration-300 ${
              active === i
                ? "border-primary bg-primary/20 text-primary scale-110"
                : "border-border/50 bg-background/20 text-muted-foreground hover:border-primary/60 hover:text-primary"
            } backdrop-blur-sm`}
          >
            <s.icon className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
          </span>
        </button>
      ))}
      <div className="absolute top-4 bottom-4 sm:top-5 sm:bottom-5 left-1/2 -translate-x-1/2 w-px bg-border/30 -z-10" />
    </nav>
  );
};

const Section = ({
  children,
  offset,
  className = "",
}: {
  children: React.ReactNode;
  offset: number;
  className?: string;
}) => (
  <section
    className={`absolute w-screen ${className}`}
    style={{ top: `${offset * 100}vh` }}
  >
    {children}
  </section>
);

const WorldOverlay = () => {
  return (
    <div className="w-screen" style={{ position: "relative" }}>
      <SectionNav />

      {/* ===== HERO ===== */}
      <Section offset={0} className="h-screen flex items-center justify-center pr-10 sm:pr-0">
        <div className="text-center px-6 max-w-3xl mx-auto">
          <div className="mb-6">
            <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 text-primary text-xs font-medium tracking-widest uppercase backdrop-blur-sm bg-background/20">
              Frontend Developer & Data Analyst
            </span>
          </div>
          <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight leading-[0.9]">
            <TextScramble text="Ahmed Ali" className="text-foreground" />
            <br />
            <TextScramble text="Ghori" className="text-gradient" speed={40} />
          </h1>
          <p className="mt-8 max-w-xl mx-auto text-lg text-muted-foreground leading-relaxed">
            Crafting responsive web interfaces and transforming data into actionable insights.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            {[
              { icon: Github, url: "https://github.com/AHMEDALIGHORI", label: "GitHub" },
              { icon: Linkedin, url: "https://www.linkedin.com/in/ahmed-ali-ghori-803a0916b/", label: "LinkedIn" },
              { icon: Instagram, url: "https://www.instagram.com/ahmedalikhan568", label: "Instagram" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full border border-border/50 bg-background/20 backdrop-blur-sm hover:border-primary hover:text-primary transition-all duration-300"
                aria-label={s.label}
              >
                <s.icon size={20} />
              </a>
            ))}
          </div>
          <div className="mt-16 animate-bounce">
            <ArrowDown size={20} className="text-muted-foreground mx-auto" />
            <p className="text-xs text-muted-foreground mt-2">Scroll to explore</p>
          </div>
        </div>
      </Section>

      {/* ===== ABOUT ===== */}
      <Section offset={1} className="h-screen flex items-center pr-10 sm:pr-0">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:ml-[15%]">
          <div className="bg-background/30 backdrop-blur-xl rounded-2xl border border-border/50 p-8 lg:p-10">
            <TextScramble text="About Me" className="text-primary text-sm font-medium tracking-widest uppercase" />
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 leading-tight">
              Bridging <TextScramble text="design & data" className="text-gradient" />
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              I'm Ahmed Ali Ghori, a passionate Frontend Developer and Data Analyst based in Pakistan.
              I specialize in crafting responsive, user-centric web interfaces while leveraging data
              to build smarter digital experiences.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { num: "2+", label: "Years" },
                { num: "10+", label: "Projects" },
                { num: "100%", label: "Dedication" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-display text-2xl font-bold text-primary">{stat.num}</div>
                  <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
            <div className="mt-8 space-y-3">
              {[
                { icon: Code2, title: "Frontend Development", desc: "Modern JavaScript & React" },
                { icon: BarChart3, title: "Data Analysis", desc: "Insights & Visualization" },
                { icon: Zap, title: "Problem Solving", desc: "Clean, maintainable code" },
              ].map((item) => (
                <div key={item.title} className="flex items-center gap-3 p-3 rounded-xl bg-background/30 border border-border/30">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <item.icon size={18} />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ===== SKILLS ===== */}
      <Section offset={2} className="h-screen flex items-center pr-10 sm:pr-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-background/30 backdrop-blur-xl rounded-2xl border border-border/50 p-8 lg:p-10">
            <div className="text-center mb-8">
              <TextScramble text="Skills & Expertise" className="text-primary text-sm font-medium tracking-widest uppercase" />
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-3">
                My <TextScramble text="Tech Stack" className="text-gradient" />
              </h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                {
                  title: "Frontend",
                  skills: ["HTML / CSS — 95%", "JavaScript — 90%", "React — 85%", "TypeScript — 80%", "Tailwind — 90%"],
                },
                {
                  title: "Data & Analytics",
                  skills: ["Python — 80%", "Excel — 90%", "Data Viz — 85%", "SQL — 75%", "Power BI — 70%"],
                },
                {
                  title: "Tools",
                  skills: ["Git / GitHub — 85%", "Figma — 75%", "VS Code — 95%", "Responsive — 90%", "REST APIs — 80%"],
                },
              ].map((cat) => (
                <div key={cat.title} className="space-y-3">
                  <h3 className="font-display text-lg font-semibold text-primary">{cat.title}</h3>
                  {cat.skills.map((skill) => {
                    const [name, level] = skill.split(" — ");
                    const pct = parseInt(level);
                    return (
                      <div key={name}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-foreground">{name}</span>
                          <span className="text-muted-foreground">{level}</span>
                        </div>
                        <div className="h-1 rounded-full bg-secondary/50 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-primary to-gold-dim"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ===== PROJECTS ===== */}
      <Section offset={3} className="h-screen flex items-center pr-10 sm:pr-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:mr-[5%]">
          <div className="bg-background/30 backdrop-blur-xl rounded-2xl border border-border/50 p-8 lg:p-10">
            <div className="text-center mb-8">
              <TextScramble text="Featured Work" className="text-primary text-sm font-medium tracking-widest uppercase" />
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-3">
                Selected <TextScramble text="Projects" className="text-gradient" />
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { title: "E-Commerce Dashboard", desc: "Analytics dashboard with interactive charts and data filtering.", tags: ["React", "Tailwind", "Chart.js"], url: "https://github.com/AHMEDALIGHORI" },
                { title: "Portfolio Website", desc: "Animated portfolio with smooth scroll and dark theme.", tags: ["HTML", "CSS", "JS"], url: "https://github.com/AHMEDALIGHORI/Project" },
                { title: "Data Visualization Tool", desc: "Transforms CSV data into insightful charts and graphs.", tags: ["Python", "Pandas", "Plotly"], url: "https://github.com/AHMEDALIGHORI" },
                { title: "Task Management App", desc: "Drag-and-drop task manager with categories and deadlines.", tags: ["React", "TypeScript", "Firebase"], url: "https://github.com/AHMEDALIGHORI" },
              ].map((proj) => (
                <div key={proj.title} className="group p-5 rounded-xl bg-background/30 border border-border/30 hover:border-primary/40 transition-all duration-300">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-display text-base font-bold text-foreground group-hover:text-primary transition-colors">
                      {proj.title}
                    </h3>
                    <div className="flex gap-1">
                      <a href={proj.url} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-md text-muted-foreground hover:text-primary transition-colors">
                        <Github size={14} />
                      </a>
                      <a href={proj.url} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-md text-muted-foreground hover:text-primary transition-colors">
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3">{proj.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-primary/10 text-primary">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ===== CONTACT ===== */}
      <Section offset={4} className="h-screen flex items-center pr-10 sm:pr-0">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="bg-background/30 backdrop-blur-xl rounded-2xl border border-border/50 p-8 lg:p-10">
            <div className="text-center mb-8">
              <TextScramble text="Get in Touch" className="text-primary text-sm font-medium tracking-widest uppercase" />
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-3">
                Let's <TextScramble text="Connect" className="text-gradient" />
              </h2>
              <p className="mt-4 text-muted-foreground text-sm max-w-md mx-auto">
                Open to new opportunities and collaborations. Reach out!
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-background/30 border border-border/30">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary"><Mail size={18} /></div>
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-sm font-medium text-foreground">ahmedalighori@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-background/30 border border-border/30">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary"><MapPin size={18} /></div>
                  <div>
                    <p className="text-xs text-muted-foreground">Location</p>
                    <p className="text-sm font-medium text-foreground">Pakistan</p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                {[
                  { name: "GitHub", icon: Github, url: "https://github.com/AHMEDALIGHORI", handle: "@AHMEDALIGHORI" },
                  { name: "LinkedIn", icon: Linkedin, url: "https://www.linkedin.com/in/ahmed-ali-ghori-803a0916b/", handle: "Ahmed Ali Ghori" },
                  { name: "Instagram", icon: Instagram, url: "https://www.instagram.com/ahmedalikhan568", handle: "@ahmedalikhan568" },
                  { name: "Facebook", icon: Facebook, url: "https://www.facebook.com/share/1CZL1ufPbt/", handle: "Ahmed Ali Ghori" },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between p-2.5 rounded-lg border border-border/30 bg-background/20 hover:border-primary/40 transition-all"
                  >
                    <div className="flex items-center gap-2">
                      <social.icon size={16} className="text-primary" />
                      <div>
                        <p className="text-xs font-medium text-foreground">{social.name}</p>
                        <p className="text-[10px] text-muted-foreground">{social.handle}</p>
                      </div>
                    </div>
                    <ArrowUpRight size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
                  </a>
                ))}
              </div>
            </div>
            <div className="mt-8 text-center">
              <p className="text-xs text-muted-foreground">
                © {new Date().getFullYear()} Ahmed Ali Ghori. Designed & Built with ❤️
              </p>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default WorldOverlay;
