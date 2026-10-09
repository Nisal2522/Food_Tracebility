import { MapPin, Sprout, Ruler, Users, LandPlot } from "lucide-react";
import { ORIGIN_SUMMARY } from "../../data/traceability";
import { GlassCard, Section } from "./shared";
import { CountryFlag } from "./CountryFlag";

const formatHa = (value: number) => `${value.toLocaleString("en-US", { maximumFractionDigits: 1 })} ha`;

export function OriginSummarySection() {
  const avgPlotHa = ORIGIN_SUMMARY.totalAreaHa / ORIGIN_SUMMARY.plots;

  return (
    <Section id="origin" eyebrow="Where It Comes From" title="Origin Summary">
      <GlassCard className="p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <CountryFlag country="LK" className="h-9 w-14 shrink-0 rounded-md shadow-sm" />
          <div className="min-w-0">
            <p className="text-lg font-bold leading-tight text-gray-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {ORIGIN_SUMMARY.region}
            </p>
            <p className="mt-0.5 flex items-center gap-1 text-sm text-gray-600">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-emerald-500" /> {ORIGIN_SUMMARY.province}
            </p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-5">
          <Fact icon={<Users className="h-4 w-4" />} label="Farmers" value={String(ORIGIN_SUMMARY.farmers)} />
          <Fact icon={<LandPlot className="h-4 w-4" />} label="Farm Plots" value={String(ORIGIN_SUMMARY.plots)} />
          <Fact icon={<Ruler className="h-4 w-4" />} label="Total Area" value={formatHa(ORIGIN_SUMMARY.totalAreaHa)} />
          <Fact icon={<Ruler className="h-4 w-4" />} label="Avg. Plot Size" value={formatHa(avgPlotHa)} />
          <Fact
            icon={<Sprout className="h-4 w-4" />}
            label="Variety"
            value={ORIGIN_SUMMARY.variety}
            className="col-span-2 lg:col-span-1"
          />
        </div>
      </GlassCard>
    </Section>
  );
}

function Fact({
  icon,
  label,
  value,
  className = "",
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={`rounded-2xl bg-gray-50/80 p-3.5 ${className}`}>
      <div className="flex items-center gap-1.5 text-emerald-500">
        {icon}
        <span className="text-xs font-medium text-gray-500">{label}</span>
      </div>
      <p className="mt-1.5 text-base font-semibold leading-snug text-gray-900">{value}</p>
    </div>
  );
}
