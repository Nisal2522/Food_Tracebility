import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { QUALITY_TESTS, QUALITY_SUMMARY } from "../../data/traceability";
import { useDeviceView } from "../../context/device-view";
import { cn } from "../ui/utils";
import { GlassCard, Section, StatusPill } from "./shared";

export function QualitySection() {
  const score = QUALITY_SUMMARY.overallScore;
  const circumference = 2 * Math.PI * 46;
  const offset = circumference * (1 - score / 100);
  const { view } = useDeviceView();
  const isMobilePreview = view === "mobile";

  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const gap = card ? parseFloat(getComputedStyle(el).columnGap || "12") : 12;
    const step = (card?.offsetWidth ?? el.clientWidth) + gap;
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!isMobilePreview) return;
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
    if (!el || !isMobilePreview) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [isMobilePreview]);

  return (
    <Section id="quality" eyebrow="Lab Certified" title="Quality Inspection">
      <div className={cn("grid gap-4", !isMobilePreview && "sm:grid-cols-5")}>
        <GlassCard
          className={cn("flex flex-col items-center p-6 text-center", !isMobilePreview && "sm:col-span-2")}
        >
          <p className="mb-4 text-sm font-semibold text-gray-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Overall Quality Score
          </p>
          <div className="relative h-36 w-36">
            <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
              <circle cx="50" cy="50" r="46" fill="none" stroke="#f0fdf4" strokeWidth="8" />
              <motion.circle
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke="#22c55e"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                whileInView={{ strokeDashoffset: offset }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-3xl font-bold text-emerald-600" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {score}%
              </p>
              <p className="text-xs font-medium text-gray-400">Excellent</p>
            </div>
          </div>
          <div className="mt-5 w-full space-y-2 text-left">
            <SummaryRow label="Inspector" value={QUALITY_SUMMARY.inspector} />
            <SummaryRow label="Inspection Date" value={QUALITY_SUMMARY.inspectionDate} />
            <SummaryRow label="Lab" value={QUALITY_SUMMARY.lab} />
            <SummaryRow label="Certificate No." value={QUALITY_SUMMARY.certificateNo} />
            <SummaryRow label="Storage Temp" value={QUALITY_SUMMARY.storageTemperature} />
            <SummaryRow label="Expiry Date" value={QUALITY_SUMMARY.expiryDate} />
          </div>
        </GlassCard>

        <div
          ref={scrollerRef}
          tabIndex={isMobilePreview ? 0 : undefined}
          role={isMobilePreview ? "group" : undefined}
          aria-label={isMobilePreview ? "Quality tests, use arrow keys or scroll to browse" : undefined}
          onKeyDown={handleKeyDown}
          className={cn(
            "gap-3",
            isMobilePreview
              ? "no-scrollbar flex snap-x snap-mandatory overflow-x-auto outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:rounded-2xl"
              : "grid grid-cols-1 sm:col-span-3 sm:grid-cols-2"
          )}
        >
          {QUALITY_TESTS.map((test, i) => (
            <motion.div
              key={test.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className={isMobilePreview ? "w-full shrink-0 snap-start" : undefined}
            >
              <GlassCard
                className={`p-4 ${
                  test.result === "Passed" ? "bg-emerald-50/40" : "bg-amber-50/40"
                }`}
              >
                <div className="mb-2 flex flex-wrap items-center justify-between gap-x-2 gap-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="shrink-0 text-lg">{test.icon}</span>
                    <p className="text-sm font-semibold text-gray-900">{test.name}</p>
                  </div>
                  <StatusPill status={test.result} />
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-white">
                  <motion.div
                    className={`h-full rounded-full ${test.result === "Passed" ? "bg-emerald-500" : "bg-amber-400"}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${test.value}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.06, duration: 0.7, ease: "easeOut" }}
                  />
                </div>
                <p className="mt-1.5 text-xs text-gray-500">{test.detail}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-xs text-gray-400">{label}</span>
      <span className="truncate text-xs font-semibold text-gray-800">{value}</span>
    </div>
  );
}
