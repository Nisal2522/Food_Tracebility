import { motion } from "motion/react";
import { MapPin, Sprout, Ruler, Users, LandPlot, BadgeCheck } from "lucide-react";
import { ORIGIN_AREAS, ORIGIN_SUMMARY } from "../../data/traceability";
import { GlassCard, Section } from "./shared";
import { CountryFlag } from "./CountryFlag";

const formatHa = (value: number) => `${value.toLocaleString("en-US", { maximumFractionDigits: 1 })} ha`;

export function OriginSummarySection() {
  const avgPlotHa = ORIGIN_SUMMARY.totalAreaHa / ORIGIN_SUMMARY.plots;

  return (
    <Section id="origin" eyebrow="Where It Comes From" title="Origin Summary">
      <div className="grid gap-4 lg:grid-cols-2">
        <GlassCard className="p-5">
          <div className="flex items-center gap-3">
            <CountryFlag country="LK" className="h-8 w-12 shrink-0 rounded-md shadow-sm" />
            <div className="min-w-0">
              <p className="text-base font-bold text-gray-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {ORIGIN_SUMMARY.region}
              </p>
              <p className="flex items-center gap-1 text-xs text-gray-500">
                <MapPin className="h-3 w-3 shrink-0" /> {ORIGIN_SUMMARY.province}
              </p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <Fact icon={<Users className="h-4 w-4" />} label="Farmers" value={String(ORIGIN_SUMMARY.farmers)} />
            <Fact icon={<LandPlot className="h-4 w-4" />} label="Farm Plots" value={String(ORIGIN_SUMMARY.plots)} />
            <Fact icon={<Ruler className="h-4 w-4" />} label="Total Area" value={formatHa(ORIGIN_SUMMARY.totalAreaHa)} />
            <Fact icon={<Ruler className="h-4 w-4" />} label="Avg. Plot Size" value={formatHa(avgPlotHa)} />
            <Fact icon={<Sprout className="h-4 w-4" />} label="Variety" value={ORIGIN_SUMMARY.variety} wide />
          </div>
        </GlassCard>

        <GlassCard className="flex flex-col p-5">
          <p className="text-xs font-semibold text-gray-500">Sourcing by Area</p>
          <div className="mt-3 space-y-4">
            {ORIGIN_AREAS.map((area, i) => {
              const share = (area.farmers / ORIGIN_SUMMARY.farmers) * 100;
              return (
                <div key={area.name}>
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-sm font-semibold text-gray-900">{area.name}</span>
                    <span className="text-xs font-semibold text-emerald-600">{share.toFixed(0)}%</span>
                  </div>
                  <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-emerald-50">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-green-500"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${share}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                  <p className="mt-1 text-[11px] text-gray-400">
                    {area.farmers} farmers · {area.plots} plots · {formatHa(area.areaHa)}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-5 space-y-2 border-t border-gray-100 pt-4">
            {ORIGIN_SUMMARY.checks.map((check) => (
              <div key={check.label} className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-1.5 text-xs text-gray-600">
                  <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-emerald-500" /> {check.label}
                </span>
                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                  {check.value}
                </span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </Section>
  );
}

function Fact({
  icon,
  label,
  value,
  wide = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  wide?: boolean;
}) {
  return (
    <div className={`rounded-2xl bg-gray-50/80 p-3 ${wide ? "col-span-2" : ""}`}>
      <div className="flex items-center gap-1.5 text-gray-400">
        {icon}
        <span className="text-[11px]">{label}</span>
      </div>
      <p className="mt-1 text-sm font-semibold text-gray-900">{value}</p>
    </div>
  );
}
