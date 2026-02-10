import { useEffect, useRef, useCallback } from "react";

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailsRef = useRef<HTMLDivElement[]>([]);
  const mouse = useRef({ x: -100, y: -100 });
  const pos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const isHovering = useRef(false);
  const trailCount = 6;

  const trailPositions = useRef(
    Array.from({ length: trailCount }, () => ({ x: -100, y: -100 }))
  );

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouse.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleHoverStart = useCallback(() => {
    isHovering.current = true;
    if (ringRef.current) {
      ringRef.current.style.width = "48px";
      ringRef.current.style.height = "48px";
      ringRef.current.style.borderColor = "hsl(38 92% 50% / 0.6)";
    }
    if (dotRef.current) {
      dotRef.current.style.transform = "translate(-50%, -50%) scale(0.5)";
      dotRef.current.style.opacity = "0.8";
    }
  }, []);

  const handleHoverEnd = useCallback(() => {
    isHovering.current = false;
    if (ringRef.current) {
      ringRef.current.style.width = "36px";
      ringRef.current.style.height = "36px";
      ringRef.current.style.borderColor = "hsl(38 92% 50% / 0.3)";
    }
    if (dotRef.current) {
      dotRef.current.style.transform = "translate(-50%, -50%) scale(1)";
      dotRef.current.style.opacity = "1";
    }
  }, []);

  useEffect(() => {
    // Check for touch device
    if (window.matchMedia("(pointer: coarse)").matches) return;

    document.body.style.cursor = "none";
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Hover detection for interactive elements
    const addHoverListeners = () => {
      const interactives = document.querySelectorAll("a, button, [role='button'], input, textarea, select");
      interactives.forEach((el) => {
        el.addEventListener("mouseenter", handleHoverStart);
        el.addEventListener("mouseleave", handleHoverEnd);
        (el as HTMLElement).style.cursor = "none";
      });
      return interactives;
    };

    let interactives = addHoverListeners();

    // Re-bind on DOM changes
    const observer = new MutationObserver(() => {
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", handleHoverStart);
        el.removeEventListener("mouseleave", handleHoverEnd);
      });
      interactives = addHoverListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // Animation loop
    let raf: number;
    const animate = () => {
      // Dot follows instantly
      pos.current.x += (mouse.current.x - pos.current.x) * 0.35;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.35;

      // Ring follows with lag
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.15;

      if (dotRef.current) {
        dotRef.current.style.left = `${pos.current.x}px`;
        dotRef.current.style.top = `${pos.current.y}px`;
      }
      if (ringRef.current) {
        ringRef.current.style.left = `${ringPos.current.x}px`;
        ringRef.current.style.top = `${ringPos.current.y}px`;
      }

      // Trails follow with increasing lag
      for (let i = 0; i < trailCount; i++) {
        const target = i === 0 ? pos.current : trailPositions.current[i - 1];
        const speed = 0.2 - i * 0.025;
        trailPositions.current[i].x += (target.x - trailPositions.current[i].x) * speed;
        trailPositions.current[i].y += (target.y - trailPositions.current[i].y) * speed;

        const el = trailsRef.current[i];
        if (el) {
          el.style.left = `${trailPositions.current[i].x}px`;
          el.style.top = `${trailPositions.current[i].y}px`;
        }
      }

      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(raf);
      observer.disconnect();
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", handleHoverStart);
        el.removeEventListener("mouseleave", handleHoverEnd);
        (el as HTMLElement).style.cursor = "";
      });
    };
  }, [handleMouseMove, handleHoverStart, handleHoverEnd]);

  // Hide on touch devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      {/* Trail dots */}
      {Array.from({ length: trailCount }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) trailsRef.current[i] = el;
          }}
          className="fixed -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: `${6 - i * 0.7}px`,
            height: `${6 - i * 0.7}px`,
            background: `hsl(38 92% 50% / ${0.25 - i * 0.035})`,
            boxShadow: `0 0 ${8 - i}px hsl(38 92% 50% / ${0.2 - i * 0.03})`,
            left: -100,
            top: -100,
          }}
        />
      ))}

      {/* Outer ring */}
      <div
        ref={ringRef}
        className="fixed -translate-x-1/2 -translate-y-1/2 rounded-full border"
        style={{
          width: 36,
          height: 36,
          borderColor: "hsl(38 92% 50% / 0.3)",
          transition: "width 0.3s ease, height 0.3s ease, border-color 0.3s ease",
          left: -100,
          top: -100,
        }}
      />

      {/* Inner dot */}
      <div
        ref={dotRef}
        className="fixed -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 6,
          height: 6,
          background: "hsl(38 92% 50%)",
          boxShadow: "0 0 12px hsl(38 92% 50% / 0.6), 0 0 24px hsl(38 92% 50% / 0.3)",
          transition: "transform 0.3s ease, opacity 0.3s ease",
          left: -100,
          top: -100,
        }}
      />
    </div>
  );
};

export default CustomCursor;
