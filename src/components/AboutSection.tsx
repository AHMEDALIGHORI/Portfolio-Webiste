import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, BarChart3, Zap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  {
    icon: Code2,
    title: "Frontend Development",
    desc: "Building pixel-perfect, responsive web applications with modern JavaScript frameworks.",
  },
  {
    icon: BarChart3,
    title: "Data Analysis",
    desc: "Transforming raw data into meaningful insights and visualizations that drive decisions.",
  },
  {
    icon: Zap,
    title: "Problem Solving",
    desc: "Delivering elegant solutions to complex technical challenges with clean, maintainable code.",
  },
];

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left column
      gsap.fromTo(
        leftRef.current,
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "top 40%",
            toggleActions: "play none none none",
          },
        }
      );

      // Stats counter animation
      const statEls = leftRef.current?.querySelectorAll(".stat-num");
      statEls?.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            },
          }
        );
      });

      // Right cards stagger
      const cards = cardsRef.current?.children;
      if (cards) {
        gsap.fromTo(
          Array.from(cards),
          { opacity: 0, y: 40, rotateX: 15 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 75%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="py-32 relative" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div ref={leftRef} className="opacity-0">
            <span className="text-primary text-sm font-medium tracking-widest uppercase">
              About Me
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold mt-4 leading-tight">
              Bridging the gap between
              <span className="text-gradient"> design & data</span>
            </h2>
            <div className="mt-8 space-y-5 text-muted-foreground leading-relaxed">
              <p>
                I'm Ahmed Ali Ghori, a passionate Frontend Developer and Data
                Analyst based in Pakistan. I specialize in crafting responsive,
                user-centric web interfaces while leveraging data to build
                smarter digital experiences.
              </p>
              <p>
                With expertise in JavaScript, React, and modern data tools, I
                bring a unique perspective that combines aesthetic design with
                data-driven decision making.
              </p>
            </div>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-3 gap-6">
              {[
                { num: "2+", label: "Years Experience" },
                { num: "10+", label: "Projects Built" },
                { num: "100%", label: "Dedication" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="stat-num font-display text-3xl font-bold text-primary">
                    {stat.num}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - highlight cards */}
          <div ref={cardsRef} className="space-y-6">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:glow-gold transition-all duration-500 opacity-0"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
