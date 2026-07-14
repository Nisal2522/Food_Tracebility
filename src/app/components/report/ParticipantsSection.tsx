import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { MapPin, BadgeCheck, Award } from "lucide-react";
import { PARTICIPANTS } from "../../data/traceability";
import { GlassCard, Section } from "./shared";

export function ParticipantsSection() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const gap = card ? parseFloat(getComputedStyle(el).columnGap || "16") : 16;
    const step = (card?.offsetWidth ?? 256) + gap;
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollByCard(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollByCard(-1);
    }
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <Section id="participants" eyebrow="Verified Network" title="Supply Chain Participants">
      <div
        ref={scrollerRef}
        tabIndex={0}
        role="group"
        aria-label="Supply chain participants, use arrow keys or scroll to browse"
        onKeyDown={handleKeyDown}
        className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:rounded-2xl"
      >
        {PARTICIPANTS.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.45 }}
            className="w-64 shrink-0 snap-start"
          >
            <GlassCard className="h-full p-5">
              <div className="flex items-start gap-3">
                <div className="relative shrink-0">
                  <img src={p.avatar} alt={p.name} className="h-14 w-14 rounded-2xl object-cover" />
                  {p.verified && (
                    <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-emerald-500">
                      <BadgeCheck className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-0.5 flex items-center gap-1.5">
                    <span className="text-base leading-none">{p.logo}</span>
                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                      {p.role}
                    </span>
                  </div>
                  <p className="truncate text-sm font-bold text-gray-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {p.name}
                  </p>
                  <p className="truncate text-xs text-gray-500">{p.company}</p>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-emerald-500" /> {p.location}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Award className="h-3.5 w-3.5 shrink-0 text-emerald-500" /> {p.certification}
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
