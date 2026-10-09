import { useEffect, useRef, useState } from "react";
import { Route, Map, Sprout, ShieldCheck } from "lucide-react";
import { cn } from "../ui/utils";

const SECTIONS = [
  { id: "journey", label: "Journey", icon: Route },
  { id: "route", label: "Map", icon: Map },
  { id: "origin", label: "Origin", icon: Sprout },
  { id: "certifications", label: "Certificates", icon: ShieldCheck },
];

export function SectionNav() {
  const [active, setActive] = useState(SECTIONS[0].id);
  const scrollerRef = useRef<HTMLDivElement>(null);

  // Highlight whichever section sits in the middle band of the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Keep the active chip visible in the horizontal scroller without moving the page
  useEffect(() => {
    const scroller = scrollerRef.current;
    const chip = scroller?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!scroller || !chip) return;
    scroller.scrollTo({ left: chip.offsetLeft - scroller.clientWidth / 2 + chip.offsetWidth / 2, behavior: "smooth" });
  }, [active]);

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      aria-label="Report sections"
      className="sticky top-0 z-40 mt-4 border-b border-emerald-100/70 bg-[#f8faf8]/85 backdrop-blur-xl"
    >
      <div
        ref={scrollerRef}
        className="no-scrollbar mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-2.5 sm:px-10 lg:px-16"
      >
        {SECTIONS.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              type="button"
              data-id={id}
              onClick={() => goTo(id)}
              aria-current={isActive ? "true" : undefined}
              className={cn(
                "flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-[13px] font-semibold transition-colors",
                isActive
                  ? "bg-emerald-600 text-white shadow-sm shadow-emerald-200"
                  : "border border-gray-200 bg-white text-gray-600 hover:border-emerald-200 hover:text-emerald-700"
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
