// Helpers for drawing markers over a non-interactive Google Maps embed.
// The embed is centred on `ll` at zoom `z`, so a point's pixel offset from the iframe centre
// can be computed with Web Mercator and stays correct at any container width.

export type MapCamera = { lat: number; lng: number; zoom: number };

const TILE_SIZE = 256;

// World pixel position at zoom 0
function toWorld(lat: number, lng: number) {
  const sin = Math.sin((lat * Math.PI) / 180);
  return {
    x: ((lng + 180) / 360) * TILE_SIZE,
    y: (0.5 - Math.log((1 + sin) / (1 - sin)) / (4 * Math.PI)) * TILE_SIZE,
  };
}

function fromWorld(x: number, y: number) {
  const lng = (x / TILE_SIZE) * 360 - 180;
  const lat = (Math.atan(Math.sinh(Math.PI * (1 - (2 * y) / TILE_SIZE))) * 180) / Math.PI;
  return { lat, lng };
}

export function offsetFromCentre(lat: number, lng: number, camera: MapCamera) {
  const scale = 2 ** camera.zoom;
  const centre = toWorld(camera.lat, camera.lng);
  const point = toWorld(lat, lng);
  return { dx: (point.x - centre.x) * scale, dy: (point.y - centre.y) * scale };
}

// Largest whole zoom (the embed only supports integers) that fits every point inside the box
export function fitCamera(
  points: { lat: number; lng: number }[],
  width: number,
  height: number,
  padding = 32,
  maxZoom = 13
): MapCamera {
  const world = points.map((p) => toWorld(p.lat, p.lng));
  const minX = Math.min(...world.map((p) => p.x));
  const maxX = Math.max(...world.map((p) => p.x));
  const minY = Math.min(...world.map((p) => p.y));
  const maxY = Math.max(...world.map((p) => p.y));
  const spanX = Math.max(maxX - minX, 1e-9);
  const spanY = Math.max(maxY - minY, 1e-9);
  const fit = Math.min((width - 2 * padding) / spanX, (height - 2 * padding) / spanY);
  const zoom = Math.max(1, Math.min(maxZoom, Math.floor(Math.log2(fit))));
  const centre = fromWorld((minX + maxX) / 2, (minY + maxY) / 2);
  return { lat: centre.lat, lng: centre.lng, zoom };
}

export function embedUrl(camera: MapCamera) {
  return `https://maps.google.com/maps?ll=${camera.lat.toFixed(5)},${camera.lng.toFixed(5)}&z=${camera.zoom}&output=embed`;
}
