import { motion } from "motion/react";
import { ShieldCheck, Clock } from "lucide-react";
import { AUTHENTICITY } from "../../data/traceability";
import { GlassCard, Section } from "./shared";

export function AuthenticitySection() {
  return (
    <Section id="authenticity" eyebrow="Food Authenticity" title="Verified Genuine">
      <GlassCard className="relative overflow-hidden border-emerald-300 p-8 text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/80 via-transparent to-green-50/60" />
        <div className="relative">
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.1 }}
            className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-green-600 shadow-lg shadow-emerald-200"
          >
            <ShieldCheck className="h-12 w-12 text-white" strokeWidth={2.2} />
          </motion.div>

          <p className="mt-5 text-lg font-bold text-emerald-600" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Verified
          </p>
          <p className="mx-auto mt-1 max-w-xs text-sm text-gray-500">{AUTHENTICITY.message}</p>

          <div className="mx-auto mt-6 max-w-[220px]">
            <div className="flex items-end justify-center gap-1">
              <span className="text-5xl font-bold text-emerald-600" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {AUTHENTICITY.score}
              </span>
              <span className="mb-1.5 text-xl font-semibold text-emerald-500">%</span>
            </div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Authenticity Score</p>
          </div>

          <div className="mx-auto mt-6 flex max-w-sm flex-col gap-2 sm:flex-row sm:justify-center">
            <div className="flex items-center justify-center gap-1.5 rounded-full bg-white/70 px-3 py-1.5 text-xs text-gray-500">
              <Clock className="h-3.5 w-3.5 text-emerald-500" />
              Verified {AUTHENTICITY.verifiedAt}
            </div>
          </div>
          <p className="mt-3 text-xs text-gray-400">{AUTHENTICITY.method}</p>
        </div>
      </GlassCard>
    </Section>
  );
}
