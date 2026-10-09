import { useEffect, useId, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import { FARMER_POINTS, FACILITY_POINT_IDS, ROUTE_NODES } from "../../data/traceability";
import { cn } from "../ui/utils";
import { embedUrl, fitCamera, offsetFromCentre } from "./mapProjection";

type MapView = "farmers" | "all";

const FACILITIES = ROUTE_NODES.filter((node) => FACILITY_POINT_IDS.includes(node.id));
const FARMER_PIN_COLOR = "#16a34a";
const FARMER_PIN_W = 14;
const FARMER_PIN_H = (FARMER_PIN_W * 32) / 24;
const PIN_PATH = "M12 1C5.9 1 1 5.9 1 12c0 8.3 11 19 11 19s11-10.7 11-19C23 5.9 18.1 1 12 1z";

// Same approach as the route map: a Google Maps embed with pins drawn over it by lat/lng
export function LocationsMap({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ width: number; height: number } | null>(null);
  const [view, setView] = useState<MapView>("farmers");
  const pinSymbolId = `farmer-pin${useId().replace(/:/g, "")}`;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize((prev) => (prev && prev.width === width && prev.height === height ? prev : { width, height }));
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const camera = useMemo(() => {
    if (!size) return null;
    const points = view === "farmers" ? FARMER_POINTS : [...FARMER_POINTS, ...FACILITIES];
    return fitCamera(points, size.width, size.height);
  }, [size, view]);

  return (
    <div ref={containerRef} className={cn("relative overflow-hidden bg-gray-100", className)}>
      {camera && (
        <>
          <iframe
            key={embedUrl(camera)}
            title="Farmer and facility locations"
            src={embedUrl(camera)}
            className="pointer-events-none absolute inset-0 h-full w-full"
            loading="lazy"
            style={{ border: 0 }}
          />

          <motion.div
            key={`${view}-${camera.zoom}`}
            className="absolute left-1/2 top-1/2 h-0 w-0"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* All 500 farmer pins share one SVG and one pin shape — far cheaper on phones than 500 separate elements */}
            <svg className="absolute left-0 top-0 h-px w-px overflow-visible" aria-hidden>
              <defs>
                <symbol id={pinSymbolId} viewBox="0 0 24 32">
                  <path d={PIN_PATH} fill={FARMER_PIN_COLOR} stroke="#ffffff" strokeWidth={2} />
                  <circle cx="12" cy="12" r="4" fill="#ffffff" />
                </symbol>
              </defs>
              {FARMER_POINTS.map((farmer) => {
                const { dx, dy } = offsetFromCentre(farmer.lat, farmer.lng, camera);
                return (
                  <use
                    key={farmer.id}
                    href={`#${pinSymbolId}`}
                    x={dx - FARMER_PIN_W / 2}
                    y={dy - FARMER_PIN_H}
                    width={FARMER_PIN_W}
                    height={FARMER_PIN_H}
                  >
                    <title>{`Farmer ${farmer.id} · ${farmer.area}`}</title>
                  </use>
                );
              })}
            </svg>
            {FACILITIES.map((facility) => {
              const { dx, dy } = offsetFromCentre(facility.lat, facility.lng, camera);
              return (
                <Pin
                  key={facility.id}
                  color={facility.color}
                  width={30}
                  dx={dx}
                  dy={dy}
                  title={`${facility.label} · ${facility.city}`}
                  glyph={facility.icon}
                  raised
                />
              );
            })}
          </motion.div>
        </>
      )}

      <div className="absolute right-2 top-2 z-10 flex rounded-full bg-white/95 p-1 shadow-md">
        {(
          [
            ["farmers", "Farmers"],
            ["all", "All sites"],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setView(key)}
            aria-pressed={view === key}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-semibold transition-colors",
              view === key ? "bg-emerald-600 text-white" : "text-gray-600 hover:text-emerald-700"
            )}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

// Classic map-pin with its tip anchored on the location
function Pin({
  color,
  width,
  dx,
  dy,
  title,
  glyph,
  raised = false,
}: {
  color: string;
  width: number;
  dx: number;
  dy: number;
  title: string;
  glyph?: string;
  raised?: boolean;
}) {
  const height = (width * 32) / 24;
  return (
    <div
      className={cn("absolute -translate-x-1/2 -translate-y-full", raised && "z-10")}
      style={{ left: dx, top: dy, width, height }}
      title={title}
    >
      <svg viewBox="0 0 24 32" width={width} height={height} className="drop-shadow-[0_1px_1.5px_rgba(0,0,0,0.35)]">
        <path
          d={PIN_PATH}
          fill={color}
          stroke="#ffffff"
          strokeWidth={2}
        />
        {!glyph && <circle cx="12" cy="12" r="4" fill="#ffffff" />}
      </svg>
      {glyph && (
        <span className="absolute inset-x-0 top-[18%] text-center leading-none" style={{ fontSize: width * 0.45 }}>
          {glyph}
        </span>
      )}
    </div>
  );
}
