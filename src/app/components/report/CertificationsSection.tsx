import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, BadgeCheck, ShieldCheck } from "lucide-react";
import { CERTIFICATIONS, type Certification } from "../../data/traceability";
import { GlassCard, Section } from "./shared";

export function CertificationsSection() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <Section id="certifications" eyebrow="Compliance" title="Certifications">
      <div className="space-y-3">
        {CERTIFICATIONS.map((cert, i) => {
          const open = expanded === cert.id;
          return (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
            >
              <GlassCard className="overflow-hidden">
                <button
                  type="button"
                  onClick={() => setExpanded(open ? null : cert.id)}
                  className="flex w-full items-center gap-3 p-4 text-left"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-xl">
                    {cert.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-gray-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      {cert.name}
                    </p>
                    <p className="truncate text-xs text-gray-500">{cert.issuer}</p>
                  </div>
                  <ChevronDown className={`h-4 w-4 shrink-0 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-gray-100 p-4">
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                          <DetailRow label="Certificate No." value={cert.number} />
                          <DetailRow label="Issuing Body" value={cert.issuer} />
                          <DetailRow label="Validity" value={cert.validity} />
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs text-gray-400">Verification Status</span>
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                              <BadgeCheck className="h-3 w-3" /> {cert.status}
                            </span>
                          </div>
                        </div>

                        <div className="mt-4">
                          <p className="mb-1.5 text-xs font-semibold text-gray-500">Certificate Preview</p>
                          <CertificatePreview cert={cert} />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-xs text-gray-400">{label}</span>
      <span className="truncate text-xs font-semibold text-gray-800">{value}</span>
    </div>
  );
}

function CertificatePreview({ cert }: { cert: Certification }) {
  return (
    <div className="relative overflow-hidden rounded-xl border-2 border-dashed border-emerald-200 bg-gradient-to-br from-emerald-50/80 to-white p-5 text-center">
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-500">Certificate of Compliance</p>
      <div className="mx-auto mt-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-2xl">
        {cert.icon}
      </div>
      <p className="mt-2 text-base font-bold text-gray-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        {cert.name}
      </p>
      <p className="mt-0.5 font-mono text-[11px] text-gray-500">{cert.number}</p>
      <div className="mx-auto mt-3 flex w-fit items-center gap-1 rounded-full bg-white/70 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
        <ShieldCheck className="h-3 w-3" /> {cert.status} · {cert.validity}
      </div>
    </div>
  );
}
