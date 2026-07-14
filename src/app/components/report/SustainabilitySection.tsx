import { motion } from "motion/react";
import { SUSTAINABILITY } from "../../data/traceability";
import { useDeviceView } from "../../context/device-view";
import { cn } from "../ui/utils";
import { GlassCard, Section } from "./shared";

export function SustainabilitySection() {
  const { view } = useDeviceView();
  const isMobilePreview = view === "mobile";

  return (
    <Section id="sustainability" eyebrow="Impact" title="Sustainability">
      <div className={cn("grid gap-3", isMobilePreview ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5")}>
        {SUSTAINABILITY.map((metric, i) => (
          <motion.div
            key={metric.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
          >
            <MetricRing {...metric} />
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function MetricRing({
  icon,
  label,
  value,
  max,
  unit,
  color,
}: {
  icon: string;
  label: string;
  value: number;
  max: number;
  unit: string;
  color: string;
}) {
  const pct = Math.min(value / max, 1) * 100;
  const r = 24;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - pct / 100);

  return (
    <GlassCard className="flex flex-col items-center gap-2 p-4 text-center">
      <div className="relative h-16 w-16">
        <svg viewBox="0 0 60 60" className="h-full w-full -rotate-90">
          <circle cx="30" cy="30" r={r} fill="none" stroke="#f0fdf4" strokeWidth="6" />
          <motion.circle
            cx="30"
            cy="30"
            r={r}
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: offset }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-lg">{icon}</div>
      </div>
      <div>
        <p className="text-sm font-bold text-gray-900">
          {value}
          {unit}
        </p>
        <p className="text-[11px] leading-tight text-gray-500">{label}</p>
      </div>
    </GlassCard>
  );
}
