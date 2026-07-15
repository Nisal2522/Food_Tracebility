import { motion } from "motion/react";
import { Navigation, Clock, MapPin } from "lucide-react";
import { ROUTE, JOURNEY_SUMMARY, MAP_EMBED_URL, ROUTE_OVERVIEW_MAP_EMBED_URL } from "../../data/traceability";
import { GlassCard, Section } from "./shared";
import { SriLankaFlag } from "./SriLankaFlag";

export function RouteMapSection() {
  const pathD = ROUTE.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");

  return (
    <Section id="route" eyebrow="Live Tracking" title="Interactive Route Map">
      <GlassCard className="overflow-hidden">
        <div className="relative h-[340px] bg-gradient-to-br from-blue-50 via-emerald-50 to-teal-50">
          <iframe
            title="Route overview map"
            src={ROUTE_OVERVIEW_MAP_EMBED_URL}
            className="absolute inset-0 h-full w-full"
            loading="lazy"
            style={{ border: 0 }}
          />

          <svg viewBox="0 0 100 100" className="pointer-events-none absolute inset-0 h-full w-full">
            <motion.path
              d={pathD}
              fill="none"
              stroke="#ffffff"
              strokeWidth="1.8"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.9 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, ease: "easeInOut" }}
            />
            <motion.path
              d={pathD}
              fill="none"
              stroke="#22c55e"
              strokeWidth="0.9"
              strokeLinecap="round"
              strokeDasharray="2.4 2"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, ease: "easeInOut" }}
            />
          </svg>

          {ROUTE.map((point, i) => (
            <motion.div
              key={point.label}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.15, type: "spring", stiffness: 250, damping: 16 }}
              className="group absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              style={{ left: `${point.x}%`, top: `${point.y}%` }}
            >
              {point.status === "current" && (
                <span className="absolute inset-0 -m-2 animate-ping rounded-full bg-amber-300/60" />
              )}
              <div
                className="relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-white text-lg shadow-lg"
                style={{ backgroundColor: point.color }}
              >
                {point.icon}
                <span
                  className="absolute -top-1.5 -left-1.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-gray-900 text-[10px] font-bold text-white shadow-sm"
                  aria-label={`Stop ${i + 1}`}
                >
                  {i + 1}
                </span>
              </div>
              <div className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-xl border border-gray-100 bg-white px-3 py-1.5 opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                <p className="text-xs font-bold text-gray-900">{point.label}</p>
                <p className="flex items-center gap-1 text-xs text-gray-400">
                  <SriLankaFlag className="h-2.5 w-4 shrink-0 rounded-[1px]" /> {point.city}
                </p>
              </div>
            </motion.div>
          ))}

          <div className="absolute bottom-4 left-4 rounded-xl border border-gray-100 bg-white/90 p-3 backdrop-blur-sm">
            <p className="mb-1.5 text-xs font-semibold text-gray-700">Route Legend</p>
            <div className="space-y-1">
              {ROUTE.map((p) => (
                <div key={p.label} className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                  <span className="text-xs text-gray-600">{p.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 backdrop-blur-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            <span className="text-xs font-medium text-emerald-700">Live</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-4">
          <StatChip icon={<Navigation className="h-4 w-4" />} label="Distance" value={JOURNEY_SUMMARY.totalDistance} />
          <StatChip icon={<Clock className="h-4 w-4" />} label="Duration" value={JOURNEY_SUMMARY.duration} />
          <StatChip icon={<MapPin className="h-4 w-4" />} label="Current" value={JOURNEY_SUMMARY.currentLocation} />
          <StatChip icon={<MapPin className="h-4 w-4" />} label="Status" value={JOURNEY_SUMMARY.deliveryStatus} accent />
        </div>

        <div className="border-t border-gray-100 p-4">
          <p className="mb-2 text-xs font-semibold text-gray-500">Current Retail Location</p>
          <div className="overflow-hidden rounded-2xl border border-gray-100">
            <iframe
              title="Retail store location"
              src={MAP_EMBED_URL}
              width="100%"
              height="220"
              loading="lazy"
              style={{ border: 0, display: "block" }}
            />
          </div>
        </div>
      </GlassCard>
    </Section>
  );
}

function StatChip({
  icon,
  label,
  value,
  accent = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className={`rounded-xl p-3 ${accent ? "bg-emerald-50" : "bg-gray-50"}`}>
      <div className={`flex items-center gap-1.5 ${accent ? "text-emerald-500" : "text-gray-400"}`}>{icon}</div>
      <p className="mt-1 truncate text-sm font-semibold text-gray-900">{value}</p>
      <p className="text-[11px] text-gray-400">{label}</p>
    </div>
  );
}
