import { motion } from "motion/react";
import {
  ROUTE_NODES,
  ROUTE_EDGES,
  ROUTE_MAP_VIEW,
  CUSTOMER,
  MAP_EMBED_URL,
  ROUTE_OVERVIEW_MAP_EMBED_URL,
} from "../../data/traceability";
import { cn } from "../ui/utils";
import { GlassCard, Section } from "./shared";
import { SriLankaFlag } from "./SriLankaFlag";
import { CountryFlag } from "./CountryFlag";

const TILE_SIZE = 256;

// Web Mercator pixel position at the given zoom, matching how the embedded Google map is drawn
function project(lat: number, lng: number, zoom: number) {
  const scale = TILE_SIZE * 2 ** zoom;
  const sin = Math.sin((lat * Math.PI) / 180);
  return {
    x: ((lng + 180) / 360) * scale,
    y: (0.5 - Math.log((1 + sin) / (1 - sin)) / (4 * Math.PI)) * scale,
  };
}

// Pixel offset of a point from the map centre, so markers stay aligned at any container width
function offsetFromCentre(lat: number, lng: number) {
  const centre = project(ROUTE_MAP_VIEW.lat, ROUTE_MAP_VIEW.lng, ROUTE_MAP_VIEW.zoom);
  const point = project(lat, lng, ROUTE_MAP_VIEW.zoom);
  return { dx: point.x - centre.x, dy: point.y - centre.y };
}

export function RouteMapSection() {
  const nodes = ROUTE_NODES.map((node) => ({ ...node, ...offsetFromCentre(node.lat, node.lng) }));
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
                    stroke={edge.optional ? "#84cc16" : "#16a34a"}
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeDasharray={edge.optional ? "4 5" : undefined}
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
                className={cn(
                  "relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-sm shadow-lg",
                  node.optional && "border-dashed"
                )}
                style={{ backgroundColor: node.color }}
              >
                {node.icon}
              </div>
              <div className="absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 whitespace-nowrap rounded-xl border border-gray-100 bg-white px-3 py-1.5 opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                <p className="text-xs font-bold text-gray-900">
                  {node.label}
                  {node.optional && <span className="ml-1 font-medium text-emerald-600">(optional)</span>}
                </p>
                <p className="flex items-center gap-1 text-xs text-gray-400">
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
              <span className="text-xs text-gray-600">
                {node.label}
                {node.optional && <span className="text-emerald-600"> · optional</span>}
              </span>
            </div>
          ))}
          <div className="flex items-center gap-1.5">
            <CountryFlag country="GB" className="h-2.5 w-4 rounded-[1px]" />
            <span className="text-xs font-semibold text-gray-700">Export → {CUSTOMER.country}</span>
          </div>
        </div>

        <div className="border-t border-gray-100 p-4">
          <p className="mb-2 text-xs font-semibold text-gray-500">Customer Destination</p>
          <div className="overflow-hidden rounded-2xl border border-gray-100">
            <iframe
              title="Customer location"
              src={MAP_EMBED_URL}
              width="100%"
              height="220"
              loading="lazy"
              style={{ border: 0, display: "block" }}
            />
          </div>
        </div>
      </GlassCard>
    </Section>
  );
}
