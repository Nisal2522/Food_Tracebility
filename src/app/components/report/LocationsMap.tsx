import { useEffect, useId, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, MapPin } from "lucide-react";
import { FARMER_POINTS, FACILITY_POINT_IDS, ROUTE_NODES, ORIGIN_SUMMARY } from "../../data/traceability";
import { cn } from "../ui/utils";
import { embedUrl, fitCamera, offsetFromCentre } from "./mapProjection";
import { CountryFlag } from "./CountryFlag";

type Selection = {
  id: string;
  title: string;
  lines: string[];
  lat: number;
  lng: number;
  color: string;
  photo?: string;
};

const FACILITIES = ROUTE_NODES.filter((node) => FACILITY_POINT_IDS.includes(node.id));
const FARMER_PIN_COLOR = "#16a34a";
const FARMER_PIN_W = 16;
const PIN_PATH = "M12 1C5.9 1 1 5.9 1 12c0 8.3 11 19 11 19s11-10.7 11-19C23 5.9 18.1 1 12 1z";
const CARD_W = 240;
// Approximate info card height with its photo, used to decide where it fits
const CARD_H = 220;

const formatCoords = (lat: number, lng: number) => `${lat.toFixed(4)}° N, ${lng.toFixed(4)}° E`;

// Same approach as the route map: a Google Maps embed with pins drawn over it by lat/lng.
// Pins open an info card on tap, since hover tooltips don't exist on phones.
export function LocationsMap({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ width: number; height: number } | null>(null);
  const [selected, setSelected] = useState<Selection | null>(null);
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
    // Framed on the farms; facilities inside that area are shown too
    return fitCamera(FARMER_POINTS, size.width, size.height);
  }, [size]);

  // Screen position of a lat/lng inside the container
  const toScreen = (lat: number, lng: number) => {
    if (!camera || !size) return { x: 0, y: 0 };
    const { dx, dy } = offsetFromCentre(lat, lng, camera);
    return { x: size.width / 2 + dx, y: size.height / 2 + dy };
  };

  const selectFarmer = (farmer: (typeof FARMER_POINTS)[number]) =>
    setSelected({
      id: farmer.id,
      title: `Farmer ${farmer.id}`,
      lines: [`${farmer.area} · ${ORIGIN_SUMMARY.region}`, formatCoords(farmer.lat, farmer.lng)],
      lat: farmer.lat,
      lng: farmer.lng,
      color: FARMER_PIN_COLOR,
      photo: farmer.photo,
    });

  const selectFacility = (facility: (typeof FACILITIES)[number]) =>
    setSelected({
      id: facility.id,
      title: facility.label,
      lines: [
        `${facility.id.endsWith("wh") ? "Export warehouse" : "Processing factory"} · ${facility.city}`,
        formatCoords(facility.lat, facility.lng),
      ],
      lat: facility.lat,
      lng: facility.lng,
      color: facility.color,
      photo: facility.photo,
    });

  const selectedPos = selected ? toScreen(selected.lat, selected.lng) : null;

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden bg-gray-100", className)}
      onClick={() => setSelected(null)}
    >
      {camera && size && (
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
            key={camera.zoom}
            className="absolute inset-0"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* All 500 farmer pins share one SVG and one pin shape — far cheaper on phones than 500 separate elements */}
            <svg className="absolute inset-0 h-full w-full" aria-label="Farmer locations">
              <defs>
                <symbol id={pinSymbolId} viewBox="0 0 24 32">
                  <path d={PIN_PATH} fill={FARMER_PIN_COLOR} stroke="#ffffff" strokeWidth={2} />
                  <circle cx="12" cy="12" r="4" fill="#ffffff" />
                </symbol>
              </defs>
              {FARMER_POINTS.map((farmer) => {
                const { x, y } = toScreen(farmer.lat, farmer.lng);
                const isSelected = selected?.id === farmer.id;
                const w = isSelected ? FARMER_PIN_W * 1.8 : FARMER_PIN_W;
                const h = (w * 32) / 24;
                return (
                  <use
                    key={farmer.id}
                    href={`#${pinSymbolId}`}
                    x={x - w / 2}
                    y={y - h}
                    width={w}
                    height={h}
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      selectFarmer(farmer);
                    }}
                  >
                    <title>{`Farmer ${farmer.id} · ${farmer.area}`}</title>
                  </use>
                );
              })}
            </svg>

            {FACILITIES.map((facility) => {
              const { x, y } = toScreen(facility.lat, facility.lng);
              const isSelected = selected?.id === facility.id;
              return (
                <button
                  key={facility.id}
                  type="button"
                  aria-label={`${facility.label}, ${facility.city}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    selectFacility(facility);
                  }}
                  className={cn(
                    "absolute z-10 -translate-x-1/2 -translate-y-full transition-transform",
                    isSelected && "scale-125"
                  )}
                  style={{ left: x, top: y }}
                >
                  <Pin color={facility.color} width={30} glyph={facility.icon} />
                </button>
              );
            })}
          </motion.div>
        </>
      )}

      <AnimatePresence>
        {selected && selectedPos && size && (
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
            className="absolute z-20 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl"
            style={cardPosition(selectedPos, size)}
          >
            {selected.photo && (
              <img
                src={selected.photo}
                alt={selected.title}
                className="h-28 w-full bg-gray-100 object-cover"
                decoding="async"
              />
            )}
            <div className="p-3">
            <div className="flex items-start justify-between gap-2">
              <p className="flex items-center gap-1.5 text-sm font-bold text-gray-900">
                <MapPin className="h-4 w-4 shrink-0" style={{ color: selected.color }} />
                {selected.title}
                <CountryFlag country="LK" className="h-3 w-[18px] shrink-0 rounded-[2px] shadow-sm" />
              </p>
              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Close"
                className="-m-1 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            {selected.lines.map((line) => (
              <p key={line} className="mt-1 text-[13px] leading-snug text-gray-600">
                {line}
              </p>
            ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Places the info card above the pin if it fits, otherwise below, otherwise along the top edge; clamped to the sides
function cardPosition(pos: { x: number; y: number }, size: { width: number; height: number }) {
  const width = Math.min(CARD_W, size.width - 16);
  const left = Math.min(Math.max(pos.x - width / 2, 8), size.width - width - 8);
  if (pos.y - 32 >= CARD_H + 8) return { width, left, bottom: size.height - pos.y + 32 };
  if (size.height - pos.y - 8 >= CARD_H) return { width, left, top: pos.y + 8 };
  return { width, left, top: 8 };
}

// Classic map-pin with an optional emoji glyph, used for the facility markers
function Pin({ color, width, glyph }: { color: string; width: number; glyph?: string }) {
  const height = (width * 32) / 24;
  return (
    <div className="relative" style={{ width, height }}>
      <svg viewBox="0 0 24 32" width={width} height={height} className="drop-shadow-[0_1px_1.5px_rgba(0,0,0,0.35)]">
        <path d={PIN_PATH} fill={color} stroke="#ffffff" strokeWidth={2} />
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
