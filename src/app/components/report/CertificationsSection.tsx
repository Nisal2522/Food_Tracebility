import { motion } from "motion/react";
import { CERTIFICATIONS } from "../../data/traceability";
import { GlassCard, Section } from "./shared";

export function CertificationsSection() {
  return (
    <Section id="certifications" eyebrow="Compliance" title="Certifications">
      <div className="space-y-3">
        {CERTIFICATIONS.map((cert, i) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
          >
            <GlassCard className="flex items-center gap-3 p-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-xl">
                {cert.icon}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-gray-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {cert.name}
                </p>
                <p className="truncate text-[13px] text-gray-600">{cert.issuer}</p>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
