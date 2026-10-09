import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { MapPin, Building2 } from "lucide-react";
import { JOURNEY } from "../../data/traceability";
import { GlassCard, Section } from "./shared";
import { CountryFlag } from "./CountryFlag";

// Seconds the flow dot takes to travel from one step to the next
const LINK_SECONDS = 2;

export function JourneyTimelineSection() {
  // Index of the connector the flow dot is currently travelling along; it walks step to step and loops
  const [activeLink, setActiveLink] = useState(0);
  const reduceMotion = useReducedMotion();
  const linkCount = JOURNEY.length - 1;
  const advanceLink = () => setActiveLink((link) => (link + 1) % linkCount);

  return (
    <Section id="journey" eyebrow="Traceability" title="Supply Chain Journey">
      <div className="relative">
        {JOURNEY.map((stage, i) => {
          const isLast = i === JOURNEY.length - 1;

          return (
            <div key={stage.id} className="flex gap-3 sm:gap-4">
              <div className="flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0, rotate: -30 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, type: "spring", stiffness: 260, damping: 16 }}
                  className="relative z-10"
                >
                  <motion.div
                    initial={false}
                    animate={!reduceMotion && i > 0 && activeLink === i - 1 ? { scale: [1, 1, 1.18, 1] } : { scale: 1 }}
                    transition={{ duration: LINK_SECONDS, times: [0, 0.85, 0.93, 1] }}
                    className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-green-500 text-lg shadow-md shadow-emerald-200 sm:h-11 sm:w-11"
                  >
                    {stage.icon}
                  </motion.div>
                </motion.div>
                {!isLast && (
                  <motion.div
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12 + 0.2, duration: 0.6, ease: "easeOut" }}
                    style={{ originY: 0 }}
                    className="relative mb-1 mt-1 flex min-h-10 w-3 flex-1 justify-center"
                  >
                    <span className="absolute inset-y-0 w-0.5 rounded-full bg-emerald-200" />
                    {!reduceMotion && activeLink === i && (
                      <>
                        <motion.span
                          key={`fill-${i}`}
                          className="absolute top-0 w-0.5 rounded-full bg-emerald-500"
                          initial={{ height: "0%", opacity: 1 }}
                          animate={{ height: "100%", opacity: [1, 1, 0] }}
                          transition={{ duration: LINK_SECONDS, ease: "easeInOut", opacity: { times: [0, 0.85, 1], duration: LINK_SECONDS } }}
                        />
                        <motion.span
                          key={`dot-${i}`}
                          className="absolute h-3 w-3 -translate-y-1/2 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.2),0_0_12px_rgba(16,185,129,0.7)]"
                          initial={{ top: "0%" }}
                          animate={{ top: "100%" }}
                          transition={{ duration: LINK_SECONDS, ease: "easeInOut" }}
                          onAnimationComplete={advanceLink}
                        />
                      </>
                    )}
                  </motion.div>
                )}
              </div>

              <motion.div
                className="min-w-0 flex-1 pb-5"
                initial={{ opacity: 0, x: 32 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.12 + 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <GlassCard className="overflow-hidden transition-shadow duration-300 hover:shadow-lg">
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <p
                        className="text-[15px] font-bold leading-snug text-gray-900"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      >
                        {stage.label}
                      </p>
                    </div>

                    <ul className="mt-2.5 space-y-2.5">
                      {stage.entities.map((entity) => (
                        <li key={entity.name} className="flex items-start gap-2.5">
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-50">
                            <Building2 className="h-4 w-4 text-emerald-600" />
                          </span>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold leading-snug text-gray-900">
                              {entity.name}
                              <CountryFlag
                                country={entity.country ?? stage.country}
                                className="ml-1.5 inline-block h-3 w-[18px] rounded-[2px] align-[-1px] shadow-sm"
                              />
                            </p>
                            <p className="mt-0.5 flex items-start gap-1 text-[13px] leading-snug text-gray-600">
                              <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gray-400" />
                              {entity.detail}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>

                  </div>
                </GlassCard>
              </motion.div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
