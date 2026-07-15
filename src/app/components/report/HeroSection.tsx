import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, Calendar, Leaf, ChevronDown } from "lucide-react";
import { PRODUCT } from "../../data/traceability";
import { useDeviceView } from "../../context/device-view";
import { cn } from "../ui/utils";
import { GlassCard } from "./shared";
import { SriLankaFlag } from "./SriLankaFlag";

export function HeroSection() {
  const { view } = useDeviceView();
  const [detailsExpanded, setDetailsExpanded] = useState(false);
  return (
    <section className="relative">
      <div className="relative mx-4 h-[62vh] min-h-[420px] overflow-hidden rounded-[28px] sm:mx-0 sm:rounded-t-none sm:rounded-b-[32px]">
        <img
          src={PRODUCT.heroImage}
          alt={PRODUCT.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/0" />

        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="absolute left-5 top-6 flex items-center gap-1.5 rounded-full border border-white/60 bg-white/90 px-3 py-1.5 shadow-sm backdrop-blur-md"
        >
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          <span className="text-xs font-semibold text-emerald-700">Verified</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="absolute right-5 top-6 flex items-center rounded-full border border-white/30 bg-white/20 p-1.5 backdrop-blur-md"
        >
          <SriLankaFlag className="h-4 w-6 rounded-[3px] shadow-sm" />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "relative z-10 mx-auto -mt-16 w-full px-5",
          view === "mobile" ? "max-w-2xl" : "max-w-7xl px-5 sm:px-10 lg:px-16"
        )}
      >
        <GlassCard className="p-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
              {PRODUCT.category}
            </span>
            <span className="rounded-full bg-gray-50 px-2.5 py-1 text-xs font-mono text-gray-500">
              {PRODUCT.batchId}
            </span>
          </div>

          <h1
            className="mt-3 text-3xl font-bold leading-tight text-gray-900"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {PRODUCT.name}
          </h1>
          <p className="mt-1 text-sm text-gray-500">{PRODUCT.variety} · {PRODUCT.origin}</p>

          <p className="mt-4 text-sm leading-relaxed text-gray-600">{PRODUCT.description}</p>

          <div className={cn("mt-5 grid grid-cols-2 gap-3", view === "desktop" && "sm:grid-cols-4")}>
            <InfoTile icon={<CheckCircle2 className="h-4 w-4 text-emerald-500" />} label="Status" value={PRODUCT.status} />
            <InfoTile
              icon={<Leaf className="h-4 w-4 text-emerald-500" />}
              label="Freshness"
              value={`${PRODUCT.freshness}%`}
              accent
            />

            {view === "desktop" && (
              <>
                <InfoTile icon={<Calendar className="h-4 w-4 text-emerald-500" />} label="Harvested" value={PRODUCT.harvestDate} />
                <InfoTile icon={<Calendar className="h-4 w-4 text-emerald-500" />} label="Best Before" value={PRODUCT.expiryDate} />
              </>
            )}
          </div>

          {view === "mobile" && (
            <>
              <AnimatePresence initial={false}>
                {detailsExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      <InfoTile icon={<Calendar className="h-4 w-4 text-emerald-500" />} label="Harvested" value={PRODUCT.harvestDate} />
                      <InfoTile icon={<Calendar className="h-4 w-4 text-emerald-500" />} label="Best Before" value={PRODUCT.expiryDate} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="button"
                onClick={() => setDetailsExpanded((prev) => !prev)}
                aria-expanded={detailsExpanded}
                className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-2xl bg-gray-50/80 py-2.5 text-xs font-semibold text-gray-500 transition-colors hover:bg-gray-100"
              >
                {detailsExpanded ? "Show less" : "Show more details"}
                <ChevronDown
                  className={cn("h-4 w-4 transition-transform duration-300", detailsExpanded && "rotate-180")}
                />
              </button>
            </>
          )}

          <div className="mt-4">
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="font-medium text-gray-500">{PRODUCT.freshnessLabel}</span>
              <span className="font-semibold text-emerald-600">{PRODUCT.daysRemaining} days remaining</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-emerald-50">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-green-500"
                initial={{ width: 0 }}
                animate={{ width: `${PRODUCT.freshness}%` }}
                transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </section>
  );
}

function InfoTile({
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
    <div className={`rounded-2xl p-3 ${accent ? "bg-emerald-50" : "bg-gray-50/80"}`}>
      <div className="flex items-center gap-1.5">
        {icon}
        <span className="text-[11px] text-gray-400">{label}</span>
      </div>
      <p className="mt-1 truncate text-sm font-semibold text-gray-900">{value}</p>
    </div>
  );
}
