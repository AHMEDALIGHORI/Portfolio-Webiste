import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, Github, Linkedin, Instagram } from "lucide-react";
import HeroScene3D from "./HeroScene3D";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        tagRef.current,
        { opacity: 0, y: 30, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, delay: 0.3 }
      )
        .fromTo(
          nameRef.current,
          { opacity: 0, y: 60, clipPath: "inset(100% 0 0 0)" },
          { opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)", duration: 1.2 },
          "-=0.4"
        )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.5"
        )
        .fromTo(
          socialsRef.current?.children ? Array.from(socialsRef.current.children) : [],
          { opacity: 0, y: 20, scale: 0.8 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1 },
          "-=0.3"
        )
        .fromTo(
          scrollRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          "-=0.2"
        );

      // Parallax on scroll
      gsap.to(nameRef.current, {
        y: -80,
        opacity: 0.3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D Background */}
      <HeroScene3D />

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-background/30 via-background/60 to-background pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="flex flex-col items-center text-center">
          {/* Tag */}
          <div ref={tagRef} className="mb-6 opacity-0">
            <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 text-primary text-xs font-medium tracking-widest uppercase backdrop-blur-sm">
              Frontend Developer & Data Analyst
            </span>
          </div>

          {/* Name */}
          <h1
            ref={nameRef}
            className="font-display text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight leading-[0.9] opacity-0"
          >
            <span className="text-foreground">Ahmed Ali</span>
            <br />
            <span className="text-gradient">Ghori</span>
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="mt-8 max-w-xl text-lg text-muted-foreground leading-relaxed opacity-0"
          >
            Crafting responsive web interfaces and transforming data into
            actionable insights. Based in Pakistan.
          </p>

          {/* Social links */}
          <div ref={socialsRef} className="mt-10 flex items-center gap-4">
            <a
              href="https://github.com/AHMEDALIGHORI"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-border bg-secondary/50 backdrop-blur-sm hover:border-primary hover:text-primary transition-all duration-300 opacity-0"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/ahmed-ali-ghori-803a0916b/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-border bg-secondary/50 backdrop-blur-sm hover:border-primary hover:text-primary transition-all duration-300 opacity-0"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://www.instagram.com/ahmedalikhan568"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-border bg-secondary/50 backdrop-blur-sm hover:border-primary hover:text-primary transition-all duration-300 opacity-0"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
          </div>

          {/* Scroll indicator */}
          <div
            ref={scrollRef}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-0"
          >
            <div className="animate-bounce">
              <ArrowDown size={20} className="text-muted-foreground" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
