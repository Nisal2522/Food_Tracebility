import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, MapPin, Thermometer, Building2 } from "lucide-react";
import { JOURNEY } from "../../data/traceability";
import { GlassCard, Section } from "./shared";
import { CountryFlag } from "./CountryFlag";

export function JourneyTimelineSection() {
  const [expanded, setExpanded] = useState<number | null>(JOURNEY.length - 1);

  return (
    <Section id="journey" eyebrow="Traceability" title="Supply Chain Journey">
      <div className="relative">
        {JOURNEY.map((stage, i) => {
          const isLast = i === JOURNEY.length - 1;
          const isDone = stage.status === "Completed";
          const isCurrent = stage.status === "Current";
          const open = expanded === i;
          // Dashed connector into and out of an optional stage, showing it can be skipped
          const dashedLink = stage.optional || JOURNEY[i + 1]?.optional;

          return (
            <div key={stage.id} className="flex gap-4">
              <div className="flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, type: "spring", stiffness: 260, damping: 16 }}
                  className={`z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-lg shadow-md ${
                    stage.optional
                      ? "border-2 border-dashed border-emerald-400 bg-white shadow-emerald-100"
                      : isDone
                      ? "bg-gradient-to-br from-emerald-400 to-green-500 shadow-emerald-200"
                      : isCurrent
                      ? "bg-gradient-to-br from-blue-400 to-blue-500 shadow-blue-200 ring-4 ring-blue-100"
                      : "bg-gray-200"
                  }`}
                >
                  {stage.icon}
                </motion.div>
                {!isLast && (
                  <motion.div
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 + 0.15, duration: 0.5 }}
                    style={{ originY: 0 }}
                    className={`mb-1 mt-1 min-h-10 flex-1 ${
                      dashedLink
                        ? "w-0 border-l-2 border-dashed border-emerald-300"
                        : isDone
                        ? "w-0.5 bg-emerald-300"
                        : "w-0.5 bg-gray-200"
                    }`}
                  />
                )}
              </div>

              <div className="flex-1 pb-6">
                <button onClick={() => setExpanded(open ? null : i)} className="w-full text-left">
                  <GlassCard
                    className={`p-4 transition-shadow hover:shadow-lg ${
                      isCurrent ? "ring-1 ring-blue-200" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-sm font-bold text-gray-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                            {stage.label}
                          </p>
                          <CountryFlag country={stage.country} className="h-3.5 w-5 shrink-0 rounded-[2px]" />
                          {stage.optional && (
                            <span className="rounded-full border border-dashed border-emerald-300 px-2 py-0.5 text-xs font-semibold text-emerald-600">
                              Optional
                            </span>
                          )}
                          {isCurrent ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">
                              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-500" /> In Transit
                            </span>
                          ) : (
                            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                              Completed
                            </span>
                          )}
                        </div>
                        <ul className="mt-1.5 space-y-1">
                          {stage.entities.map((entity) => (
                            <li key={entity.name} className="flex flex-wrap items-center gap-x-1.5 text-sm">
                              <Building2 className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                              <span className="font-medium text-gray-800">{entity.name}</span>
                              <span className="flex items-center gap-0.5 text-xs text-gray-400">
                                <MapPin className="h-3 w-3" /> {entity.detail}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex shrink-0 flex-col items-end gap-1.5">
                        <span className="text-xs font-medium text-gray-500">{stage.date}</span>
                        <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
                      </div>
                    </div>

                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="mt-3 border-t border-gray-100 pt-3">
                            <img
                              src={stage.image}
                              alt={stage.label}
                              className="mb-3 h-32 w-full rounded-xl object-cover"
                            />
                            <p className="text-xs leading-relaxed text-gray-600">{stage.details}</p>
                            <div className="mt-3 grid grid-cols-2 gap-2">
                              <MiniStat icon={<Thermometer className="h-3.5 w-3.5" />} label="Temp" value={stage.temperature} />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </GlassCard>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

function MiniStat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl bg-gray-50 p-2.5">
      <div className="flex items-center gap-1 text-gray-400">
        {icon}
        <span className="text-[10px]">{label}</span>
      </div>
      <p className="mt-1 truncate text-xs font-semibold text-gray-800">{value}</p>
    </div>
  );
}
