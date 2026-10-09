import { Ruler, Users, LandPlot, Factory } from "lucide-react";
import { ORIGIN_SUMMARY } from "../../data/traceability";
import { GlassCard, Section } from "./shared";

const formatHa = (value: number) => `${value.toLocaleString("en-US", { maximumFractionDigits: 1 })} ha`;

export function OriginSummarySection() {
  return (
    <Section id="origin" eyebrow="Where It Comes From" title="Origin Summary">
      <GlassCard className="p-3 sm:p-4">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Fact icon={<Users className="h-4 w-4" />} label="Farmers" value={String(ORIGIN_SUMMARY.farmers)} />
          <Fact icon={<LandPlot className="h-4 w-4" />} label="Farm Plots" value={String(ORIGIN_SUMMARY.plots)} />
          <Fact icon={<Ruler className="h-4 w-4" />} label="Total Area" value={formatHa(ORIGIN_SUMMARY.totalAreaHa)} />
          <Fact
            icon={<Factory className="h-4 w-4" />}
            label="Processing Centers"
            value={String(ORIGIN_SUMMARY.processingCenters)}
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
    <div className={`rounded-2xl bg-gray-50/80 p-3 sm:p-3.5 ${className}`}>
      <div className="flex items-center gap-1.5 text-emerald-500">
        {icon}
        <span className="text-xs font-medium text-gray-500">{label}</span>
      </div>
      <p className="mt-1.5 text-base font-semibold leading-snug text-gray-900">{value}</p>
    </div>
  );
}
