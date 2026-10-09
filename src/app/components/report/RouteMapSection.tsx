import { MapPin } from "lucide-react";
import { FARMER_POINTS, FACILITY_POINT_IDS } from "../../data/traceability";
import { GlassCard, Section } from "./shared";
import { LocationsMap } from "./LocationsMap";

export function RouteMapSection() {
  return (
    <Section
      id="route"
      eyebrow="Where It's Sourced"
      title="Origin Locations"
      headerRight={
        <span className="shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">
          {FARMER_POINTS.length + FACILITY_POINT_IDS.length} points
        </span>
      }
    >
      <GlassCard className="overflow-hidden p-3 sm:p-4">
        <div className="overflow-hidden rounded-2xl border border-gray-100">
          <LocationsMap className="h-80 w-full sm:h-[28rem]" />
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 px-1">
          <span className="flex items-center gap-2 text-[13px] text-gray-700">
            <MapPin className="h-4 w-4 fill-green-600 text-white drop-shadow" strokeWidth={1.5} />
            {FARMER_POINTS.length} farmers
          </span>
          <span className="flex items-center gap-2 text-[13px] text-gray-700">
            <MapPin className="h-5 w-5 fill-blue-500 text-white drop-shadow" strokeWidth={1.5} />
            {FACILITY_POINT_IDS.length} facilities (factories & warehouses)
          </span>
        </div>
        <p className="mt-2 px-1 text-xs text-gray-500">Tap a pin to see its details.</p>
      </GlassCard>
    </Section>
  );
}
