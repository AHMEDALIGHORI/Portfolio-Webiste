import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, MapPin, Github, Linkedin, Instagram, Facebook, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const socials = [
  { name: "GitHub", icon: Github, url: "https://github.com/AHMEDALIGHORI", handle: "@AHMEDALIGHORI" },
  { name: "LinkedIn", icon: Linkedin, url: "https://www.linkedin.com/in/ahmed-ali-ghori-803a0916b/", handle: "Ahmed Ali Ghori" },
  { name: "Instagram", icon: Instagram, url: "https://www.instagram.com/ahmedalikhan568", handle: "@ahmedalikhan568" },
  { name: "Facebook", icon: Facebook, url: "https://www.facebook.com/share/1CZL1ufPbt/", handle: "Ahmed Ali Ghori" },
];

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current, { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.8,
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });

      gsap.fromTo(infoRef.current, { opacity: 0, x: -40 }, {
        opacity: 1, x: 0, duration: 0.8,
        scrollTrigger: { trigger: infoRef.current, start: "top 80%" },
      });

      const links = linksRef.current?.children;
      if (links) {
        gsap.fromTo(Array.from(links), { opacity: 0, x: 30 }, {
          opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: linksRef.current, start: "top 80%" },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" className="py-32 bg-card/50 relative" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={headerRef} className="text-center mb-16 opacity-0">
          <span className="text-primary text-sm font-medium tracking-widest uppercase">
            Get in Touch
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mt-4">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="mt-6 max-w-lg mx-auto text-muted-foreground leading-relaxed">
            I'm always open to new opportunities and collaborations. Whether you
            have a project in mind or just want to say hi — reach out!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div ref={infoRef} className="p-8 rounded-2xl bg-background border border-border space-y-6 opacity-0">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10 text-primary">
                <Mail size={24} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium text-foreground">ahmedalighori@gmail.com</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10 text-primary">
                <MapPin size={24} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium text-foreground">Pakistan</p>
              </div>
            </div>
          </div>

          <div ref={linksRef} className="space-y-4">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 rounded-xl border border-border bg-background hover:border-primary/40 hover:glow-gold transition-all duration-300 opacity-0"
              >
                <div className="flex items-center gap-3">
                  <social.icon size={20} className="text-primary" />
                  <div>
                    <p className="font-medium text-foreground text-sm">{social.name}</p>
                    <p className="text-xs text-muted-foreground">{social.handle}</p>
                  </div>
                </div>
                <ArrowUpRight size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
