import { useId, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, Factory, Globe, ChevronDown, Hash, Droplets, Ship, Package, Anchor } from "lucide-react";
import { PRODUCT, COMPANY } from "../../data/traceability";
import { useDeviceView } from "../../context/device-view";
import { cn } from "../ui/utils";
import { GlassCard } from "./shared";
import { SriLankaFlag } from "./SriLankaFlag";

const iconClass = "h-4 w-4 text-emerald-500";

const DETAILS: { icon: React.ReactNode; label: string; value: string; accent?: boolean }[] = [
  { icon: <Hash className={iconClass} />, label: "HS Code", value: PRODUCT.hsCode },
  { icon: <Droplets className={iconClass} />, label: "Total Volume", value: PRODUCT.totalVolume },
  { icon: <Factory className={iconClass} />, label: "Manufacturing Date", value: PRODUCT.manufacturingDate },
  { icon: <Calendar className={iconClass} />, label: "Best Before", value: PRODUCT.bestBefore, accent: true },
  { icon: <Ship className={iconClass} />, label: "Shipment Date", value: PRODUCT.shipmentDate },
  { icon: <Package className={iconClass} />, label: "Consignment Number", value: PRODUCT.consignmentNumber },
  { icon: <Anchor className={iconClass} />, label: "Country of Loading", value: PRODUCT.countryOfLoading },
  { icon: <Globe className={iconClass} />, label: "Country of Origin", value: PRODUCT.countryOfOrigin },
];

// Tiles shown before "Show more details" on mobile
const MOBILE_VISIBLE = 4;

export function HeroSection() {
  const { view } = useDeviceView();
  const [detailsExpanded, setDetailsExpanded] = useState(false);
  return (
    <section className="relative">
      {/* Company banner */}
      <div className="relative mx-4 mt-4 overflow-hidden rounded-[28px] bg-gradient-to-br from-emerald-600 via-emerald-700 to-green-900 text-white shadow-[0_20px_50px_rgba(16,64,32,0.18)] sm:mx-0 sm:mt-0 sm:rounded-t-none sm:rounded-b-[32px] sm:shadow-none">
        <BannerPattern />

        <div
          className={cn(
            "relative mx-auto w-full px-5 pb-24 pt-5",
            view === "mobile" ? "max-w-2xl" : "max-w-7xl sm:px-10 sm:pb-28 sm:pt-8 lg:px-16"
          )}
        >
          <div className="flex items-center justify-end">
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="flex items-center rounded-full bg-white/15 p-1.5"
            >
              <SriLankaFlag className="h-4 w-6 rounded-[3px] shadow-sm" />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 flex items-center gap-4"
          >
            <CompanyLogo />
            <div className="min-w-0">
              <h2
                className="text-2xl font-bold leading-tight sm:text-3xl"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {COMPANY.name}
              </h2>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="mt-4 max-w-3xl text-[15px] leading-relaxed text-emerald-50/90"
          >
            {COMPANY.background}
          </motion.p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "relative z-10 mx-auto -mt-16 w-full px-4",
          view === "mobile" ? "max-w-2xl" : "max-w-7xl px-4 sm:px-10 lg:px-16"
        )}
      >
        <GlassCard className="bg-white p-6 sm:bg-white">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-gray-50 px-2.5 py-1 text-xs font-mono text-gray-500">
              {PRODUCT.batchNo}
            </span>
          </div>

          <h1
            className="mt-3 text-3xl font-bold leading-tight text-gray-900"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {PRODUCT.endProduct}
          </h1>

          <div className={cn("mt-5 grid grid-cols-2 gap-3", view === "desktop" && "sm:grid-cols-4")}>
            {(view === "desktop" ? DETAILS : DETAILS.slice(0, MOBILE_VISIBLE)).map((d) => (
              <InfoTile key={d.label} {...d} />
            ))}
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
                      {DETAILS.slice(MOBILE_VISIBLE).map((d) => (
                        <InfoTile key={d.label} {...d} />
                      ))}
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
        <span className="text-xs font-medium text-gray-500">{label}</span>
      </div>
      <p className="mt-1 break-words text-sm font-semibold text-gray-900">{value}</p>
    </div>
  );
}

// Company logo, or an initials badge until a logo image is provided
function CompanyLogo() {
  // Use a short all-caps first word (e.g. "ABC") as-is, otherwise the first letters of each word
  const words = COMPANY.name.replace(/\(.*?\)/g, "").split(/\s+/).filter(Boolean);
  const initials = /^[A-Z0-9]{2,4}$/.test(words[0] ?? "")
    ? words[0]
    : words
        .map((word) => word[0])
        .join("")
        .slice(0, 3)
        .toUpperCase();

  return (
    <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-lg ring-4 ring-white/20 sm:h-24 sm:w-24">
      {COMPANY.logo ? (
        <img src={COMPANY.logo} alt={`${COMPANY.name} logo`} className="h-full w-full object-contain p-1" />
      ) : (
        <span
          className="bg-gradient-to-br from-emerald-600 to-green-800 bg-clip-text text-xl font-extrabold tracking-tight text-transparent sm:text-2xl"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          aria-label={`${COMPANY.name} logo`}
        >
          {initials}
        </span>
      )}
    </div>
  );
}

// Decorative banner background: fading dot grid, topographic contour rings and a faint palm frond
function BannerPattern() {
  const uid = useId().replace(/:/g, "");
  const leaflets = Array.from({ length: 13 }, (_, k) => {
    const y = -(k + 1) * 24;
    const len = 96 - k * 5;
    return (
      <g key={k}>
        <path d={`M0 ${y} q ${-len * 0.5} ${-len * 0.12} ${-len} ${len * 0.32}`} />
        <path d={`M0 ${y} q ${len * 0.5} ${-len * 0.12} ${len} ${len * 0.32}`} />
      </g>
    );
  });

  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1200 420"
      preserveAspectRatio="xMaxYMid slice"
    >
      <defs>
        <pattern id={`${uid}-dots`} width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.3" fill="#ffffff" fillOpacity="0.16" />
        </pattern>
        <radialGradient id={`${uid}-fade`} cx="0" cy="0" r="0.75">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <mask id={`${uid}-mask`}>
          <rect width="1200" height="420" fill={`url(#${uid}-fade)`} />
        </mask>
      </defs>

      <rect width="1200" height="420" fill={`url(#${uid}-dots)`} mask={`url(#${uid}-mask)`} />

      <g fill="none" stroke="#ffffff" strokeOpacity="0.09" strokeWidth="1.5" transform="translate(1050 70) rotate(-18)">
        {Array.from({ length: 9 }, (_, i) => (
          <ellipse key={i} rx={60 + i * 44} ry={36 + i * 31} />
        ))}
      </g>

      <g
        fill="none"
        stroke="#d9f99d"
        strokeOpacity="0.14"
        strokeWidth="2"
        strokeLinecap="round"
        transform="translate(1010 470) rotate(-32)"
      >
        <path d="M0 0 L0 -330" />
        {leaflets}
      </g>
    </svg>
  );
}
