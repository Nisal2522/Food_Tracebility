import { motion } from "motion/react";
import { MapPin } from "lucide-react";
import {
  ROUTE_NODES,
  ROUTE_EDGES,
  ROUTE_MAP_VIEW,
  CUSTOMER,
  FARMER_POINTS,
  FACILITY_POINT_IDS,
  ROUTE_OVERVIEW_MAP_EMBED_URL,
} from "../../data/traceability";
import { GlassCard, Section } from "./shared";
import { SriLankaFlag } from "./SriLankaFlag";
import { CountryFlag } from "./CountryFlag";
import { LocationsMap } from "./LocationsMap";
import { offsetFromCentre } from "./mapProjection";

export function RouteMapSection() {
  const nodes = ROUTE_NODES.map((node) => ({ ...node, ...offsetFromCentre(node.lat, node.lng, ROUTE_MAP_VIEW) }));
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));

  return (
    <Section id="route" eyebrow="Supply Chain Graph" title="Interactive Route Map">
      <GlassCard className="overflow-hidden">
        <div className="relative h-[340px] overflow-hidden bg-gradient-to-br from-blue-50 via-emerald-50 to-teal-50">
          {/* Not interactive, so panning can't pull the map out from under the markers */}
          <iframe
            title="Route overview map"
            src={ROUTE_OVERVIEW_MAP_EMBED_URL}
            className="pointer-events-none absolute inset-0 h-full w-full"
            loading="lazy"
            style={{ border: 0 }}
          />

          <svg className="pointer-events-none absolute left-1/2 top-1/2 h-px w-px overflow-visible">
            {ROUTE_EDGES.map((edge, i) => {
              const from = byId[edge.from];
              const to = byId[edge.to];
              if (!from || !to) return null;
              return (
                <g key={`${edge.from}-${edge.to}`}>
                  <motion.line
                    x1={from.dx}
                    y1={from.dy}
                    x2={to.dx}
                    y2={to.dy}
                    stroke="#ffffff"
                    strokeWidth={5}
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.85 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12, duration: 0.8, ease: "easeInOut" }}
                  />
                  <motion.line
                    x1={from.dx}
                    y1={from.dy}
                    x2={to.dx}
                    y2={to.dy}
                    stroke="#16a34a"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12, duration: 0.8, ease: "easeInOut" }}
                  />
                </g>
              );
            })}
          </svg>

          {nodes.map((node, i) => (
            <motion.div
              key={node.id}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.12, type: "spring", stiffness: 250, damping: 16 }}
              className="group absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              style={{ left: `calc(50% + ${node.dx}px)`, top: `calc(50% + ${node.dy}px)` }}
            >
              <div
                className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-sm shadow-lg"
                style={{ backgroundColor: node.color }}
              >
                {node.icon}
              </div>
              <div className="absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 whitespace-nowrap rounded-xl border border-gray-100 bg-white px-3 py-1.5 opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                <p className="text-xs font-bold text-gray-900">{node.label}</p>
                <p className="flex items-center gap-1 text-xs text-gray-500">
                  <SriLankaFlag className="h-2.5 w-4 shrink-0 rounded-[1px]" /> {node.city}
                </p>
              </div>
            </motion.div>
          ))}

          <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 backdrop-blur-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            <span className="text-xs font-medium text-emerald-700">Live</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-2 px-4 py-3">
          {ROUTE_NODES.map((node) => (
            <div key={node.id} className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: node.color }} />
              <span className="text-[13px] text-gray-700">{node.label}</span>
            </div>
          ))}
          <div className="flex items-center gap-1.5">
            <CountryFlag country="GB" className="h-2.5 w-4 rounded-[1px]" />
            <span className="text-[13px] font-semibold text-gray-800">Export → {CUSTOMER.country}</span>
          </div>
        </div>

        <div className="border-t border-gray-100 p-4">
          <div className="mb-3 flex items-center justify-between gap-2">
            <p className="text-sm font-semibold text-gray-800">Farmer & Facility Locations</p>
            <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700">
              {FARMER_POINTS.length + FACILITY_POINT_IDS.length} points
            </span>
          </div>
          <div className="overflow-hidden rounded-2xl border border-gray-100">
            <LocationsMap className="h-72 w-full sm:h-96" />
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="flex items-center gap-2 text-[13px] text-gray-700">
              <MapPin className="h-4 w-4 fill-green-600 text-white drop-shadow" strokeWidth={1.5} />
              {FARMER_POINTS.length} farmers
            </span>
            <span className="flex items-center gap-2 text-[13px] text-gray-700">
              <MapPin className="h-5 w-5 fill-blue-500 text-white drop-shadow" strokeWidth={1.5} />
              {FACILITY_POINT_IDS.length} facilities (factories & warehouses)
            </span>
          </div>
        </div>
      </GlassCard>
    </Section>
  );
}
