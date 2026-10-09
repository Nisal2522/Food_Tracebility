// Realistic sample data for a single scanned product — Organic King Coconut Water
// from 500 farmers in Sri Lanka, exported to a customer in the United Kingdom.

import productImage from "../../assets/king-coconut-water.jpg";

export const PRODUCT = {
  endProduct: "Organic King Coconut Water",
  batchNo: "BATCH-KC-0001",
  hsCode: "2009.89",
  totalVolume: "100.00 litre",
  manufacturingDate: "9 Oct 2026",
  bestBefore: "11 Nov 2026",
  shipmentDate: "8 Oct 2026",
  consignmentNumber: "CMB-LDN-2026-0471",
  countryOfLoading: "SRI LANKA",
  countryOfOrigin: "SRI LANKA",
  heroImage: productImage,
};

export type CountryCode = "LK" | "GB";

export type JourneyEntity = {
  name: string;
  detail: string;
};

export type JourneyStage = {
  id: number;
  icon: string;
  label: string;
  date: string;
  country: CountryCode;
  entities: JourneyEntity[];
  image: string;
  status: "Completed" | "Current";
  temperature: string;
  details: string;
};

export const JOURNEY: JourneyStage[] = [
  {
    id: 1,
    icon: "🌴",
    label: "Harvested",
    date: "7–8 Oct 2026",
    country: "LK",
    entities: [
      { name: "500 Farmers", detail: "Smallholders, Kurunegala coconut belt" },
      { name: "ABC (Pvt) Ltd", detail: "Farmer network, Kurunegala" },
    ],
    image:
      "https://images.unsplash.com/photo-1743947064386-23d317e8da5e?w=600&h=400&fit=crop&auto=format",
    status: "Completed",
    temperature: "27°C",
    details:
      "Young king coconuts (Thambili) hand-harvested at 6–7 months maturity from certified-organic smallholder plots. Every nut is logged against its farmer and plot so each lot can be traced back to source.",
  },
  {
    id: 2,
    icon: "🧺",
    label: "Collected by Buyer",
    date: "8 Oct 2026",
    country: "LK",
    entities: [{ name: "ABC (Pvt) Ltd Collection Centre", detail: "Kurunegala" }],
    image:
      "https://images.unsplash.com/photo-1743947063482-3a7f53a6e0d9?w=600&h=400&fit=crop&auto=format",
    status: "Completed",
    temperature: "24°C",
    details:
      "Nuts were weighed, graded and consolidated at the collection centre before dispatch to the factories.",
  },
  {
    id: 3,
    icon: "🏭",
    label: "Processed",
    date: "8–9 Oct 2026",
    country: "LK",
    entities: [
      { name: "Colombo Factory", detail: "Ja-Ela, Colombo" },
      { name: "Hambantota Factory", detail: "Hambantota" },
    ],
    image: productImage,
    status: "Completed",
    temperature: "4°C",
    details:
      "Nuts washed, opened on a closed hygienic line, micro-filtered and chilled with no added sugar or preservatives. Filled into 500 mL tamper-evident bottles and labelled with QR codes linked to this record.",
  },
  {
    id: 4,
    icon: "📦",
    label: "Exported from Sri Lanka",
    date: "10 Oct 2026",
    country: "LK",
    entities: [
      { name: "Colombo WH", detail: "Colombo Port" },
      { name: "Kandy WH", detail: "Kandy" },
    ],
    image:
      "https://images.unsplash.com/photo-1651525670033-279c26cc2347?w=600&h=400&fit=crop&auto=format",
    status: "Completed",
    temperature: "4°C",
    details:
      "Lots palletised in cold storage, export documents cleared and the consignment loaded into a refrigerated container at 4°C for sea freight.",
  },
  {
    id: 5,
    icon: "🚢",
    label: "Dispatched to Customer",
    date: "10 Oct 2026",
    country: "GB",
    entities: [{ name: "UK Company ABC", detail: "London, United Kingdom" }],
    image:
      "https://images.unsplash.com/photo-1751779057940-43cc385452f7?w=600&h=400&fit=crop&auto=format",
    status: "Current",
    temperature: "4°C",
    details:
      "Consignment shipped in a reefer container from Colombo Port to the customer in the United Kingdom, with temperature logged throughout the voyage.",
  },
];

// Facilities in the supply-chain graph, plotted on the route map by lat/lng
export type RouteNode = {
  id: string;
  label: string;
  icon: string;
  city: string;
  lat: number;
  lng: number;
  color: string;
};

export const ROUTE_NODES: RouteNode[] = [
  { id: "farms", label: "Farms (500)", icon: "🌴", city: "Kurunegala", lat: 7.6236, lng: 80.2392, color: "#22c55e" },
  { id: "collection", label: "Collection Centre", icon: "🧺", city: "Kurunegala", lat: 7.4863, lng: 80.3647, color: "#84cc16" },
  { id: "colombo-factory", label: "Colombo Factory", icon: "🏭", city: "Ja-Ela, Colombo", lat: 7.0744, lng: 79.8919, color: "#3b82f6" },
  { id: "hambantota-factory", label: "Hambantota Factory", icon: "🏭", city: "Hambantota", lat: 6.1241, lng: 81.1185, color: "#3b82f6" },
  { id: "colombo-wh", label: "Colombo WH", icon: "📦", city: "Colombo Port", lat: 6.9497, lng: 79.8428, color: "#8b5cf6" },
  { id: "kandy-wh", label: "Kandy WH", icon: "📦", city: "Kandy", lat: 7.2906, lng: 80.6337, color: "#8b5cf6" },
];

export const ROUTE_EDGES: { from: string; to: string }[] = [
  { from: "farms", to: "collection" },
  { from: "collection", to: "colombo-factory" },
  { from: "collection", to: "hambantota-factory" },
  { from: "colombo-factory", to: "colombo-wh" },
  { from: "hambantota-factory", to: "kandy-wh" },
];

// The overview map is centred here at this zoom so markers can be projected onto it
export const ROUTE_MAP_VIEW = { lat: 6.9, lng: 80.48, zoom: 8 };

export const ROUTE_OVERVIEW_MAP_EMBED_URL = `https://maps.google.com/maps?ll=${ROUTE_MAP_VIEW.lat},${ROUTE_MAP_VIEW.lng}&z=${ROUTE_MAP_VIEW.zoom}&output=embed`;

export const CUSTOMER = {
  country: "United Kingdom",
};

export type SourceLot = {
  lotId: string;
  date: string;
  factory: string;
  warehouse: string;
  volume: number; // litres
  farmers: number;
  plots: number;
};

export const SOURCE_LOTS: SourceLot[] = [
  { lotId: "LOT-KC-0101", date: "8 Oct 2026", factory: "Colombo Factory", warehouse: "Colombo WH", volume: 18.5, farmers: 92, plots: 104 },
  { lotId: "LOT-KC-0102", date: "8 Oct 2026", factory: "Colombo Factory", warehouse: "Colombo WH", volume: 16.75, farmers: 81, plots: 95 },
  { lotId: "LOT-KC-0103", date: "9 Oct 2026", factory: "Colombo Factory", warehouse: "Colombo WH", volume: 17.25, farmers: 88, plots: 99 },
  { lotId: "LOT-KC-0104", date: "8 Oct 2026", factory: "Hambantota Factory", warehouse: "Kandy WH", volume: 15.8, farmers: 79, plots: 101 },
  { lotId: "LOT-KC-0105", date: "9 Oct 2026", factory: "Hambantota Factory", warehouse: "Kandy WH", volume: 16.2, farmers: 83, plots: 107 },
  { lotId: "LOT-KC-0106", date: "9 Oct 2026", factory: "Hambantota Factory", warehouse: "Kandy WH", volume: 15.5, farmers: 77, plots: 106 },
];

export type OriginArea = {
  name: string;
  farmers: number;
  plots: number;
  areaHa: number;
};

export const ORIGIN_AREAS: OriginArea[] = [
  { name: "Wariyapola", farmers: 210, plots: 258, areaHa: 542.3 },
  { name: "Kurunegala", farmers: 158, plots: 190, areaHa: 398.7 },
  { name: "Mawathagama", farmers: 132, plots: 164, areaHa: 343.6 },
];

export const ORIGIN_SUMMARY = {
  region: "Kurunegala District",
  province: "North Western Province, Sri Lanka",
  variety: "King Coconut (Cocos nucifera var. aurantiaca)",
  farmers: ORIGIN_AREAS.reduce((sum, a) => sum + a.farmers, 0),
  plots: ORIGIN_AREAS.reduce((sum, a) => sum + a.plots, 0),
  totalAreaHa: ORIGIN_AREAS.reduce((sum, a) => sum + a.areaHa, 0),
};

// Approximate centre of each sourcing area, used to scatter farmer locations
const ORIGIN_AREA_CENTRES: Record<string, { lat: number; lng: number }> = {
  Wariyapola: { lat: 7.6236, lng: 80.2392 },
  Kurunegala: { lat: 7.4863, lng: 80.3647 },
  Mawathagama: { lat: 7.4319, lng: 80.443 },
};

export type FarmerPoint = { id: string; area: string; lat: number; lng: number };

// Deterministic PRNG so the sample farmer locations are identical on every load
function seededRandom(seed: number) {
  let t = seed;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

export const FARMER_POINTS: FarmerPoint[] = (() => {
  const rand = seededRandom(2026);
  const points: FarmerPoint[] = [];
  ORIGIN_AREAS.forEach((area) => {
    const centre = ORIGIN_AREA_CENTRES[area.name];
    for (let i = 0; i < area.farmers; i++) {
      // Box–Muller gives a natural cluster around the area centre
      const radius = Math.sqrt(-2 * Math.log(1 - rand())) * 0.04;
      const angle = 2 * Math.PI * rand();
      points.push({
        id: `F-${String(points.length + 1).padStart(3, "0")}`,
        area: area.name,
        lat: centre.lat + radius * Math.sin(angle),
        lng: centre.lng + radius * Math.cos(angle),
      });
    }
  });
  return points;
})();

export const FACILITY_POINT_IDS = ["colombo-factory", "hambantota-factory", "colombo-wh", "kandy-wh"];

export type QualityTest = {
  name: string;
  icon: string;
  result: "Passed" | "Warning" | "Failed";
  value: number;
  detail: string;
};

export const QUALITY_TESTS: QualityTest[] = [
  { name: "Pesticide Residue", icon: "🧪", result: "Passed", value: 98, detail: "Below EU MRL threshold" },
  { name: "Moisture Content", icon: "💧", result: "Passed", value: 85, detail: "18% – optimal range" },
  { name: "Microbiology", icon: "🦠", result: "Passed", value: 96, detail: "No pathogens detected" },
  { name: "Chemical Test", icon: "⚗️", result: "Passed", value: 99, detail: "No harmful residues" },
  { name: "Organic Certification", icon: "🌿", result: "Passed", value: 100, detail: "SLSI Certificate SL-ORG-2026-0045" },
  { name: "Appearance Grade", icon: "👁️", result: "Warning", value: 78, detail: "Minor surface blemish on 4% of batch" },
];

export const QUALITY_SUMMARY = {
  overallScore: 95,
  moisture: "18%",
  storageTemperature: "4°C",
  expiryDate: "25 Jul 2026",
  inspector: "Dr. Amara Bandara",
  inspectionDate: "13 Jul 2026",
  lab: "SLSI – Kandy Branch",
  certificateNo: "QC-2026-3341",
};

export type Participant = {
  role: string;
  icon: string;
  name: string;
  subtitle: string;
  location: string;
  certification: string;
  verified: boolean;
  optional?: boolean;
};

export const PARTICIPANTS: Participant[] = [
  {
    role: "Farmers",
    icon: "🌴",
    name: "ABC (Pvt) Ltd",
    subtitle: "500 registered farmers",
    location: "Kurunegala, Sri Lanka",
    certification: "Organic Group Certified",
    verified: true,
  },
  {
    role: "Collector",
    icon: "🧺",
    name: "ABC (Pvt) Ltd Collection Centre",
    subtitle: "Buyer collection point",
    location: "Kurunegala, Sri Lanka",
    certification: "GlobalG.A.P. Registered",
    verified: true,
    optional: true,
  },
  {
    role: "Processor",
    icon: "🏭",
    name: "Colombo Factory",
    subtitle: "3 lots · 52.50 L",
    location: "Ja-Ela, Colombo, Sri Lanka",
    certification: "HACCP Certified",
    verified: true,
  },
  {
    role: "Processor",
    icon: "🏭",
    name: "Hambantota Factory",
    subtitle: "3 lots · 47.50 L",
    location: "Hambantota, Sri Lanka",
    certification: "HACCP Certified",
    verified: true,
  },
  {
    role: "Exporter",
    icon: "📦",
    name: "Colombo WH",
    subtitle: "Export warehouse · Colombo Port",
    location: "Colombo, Sri Lanka",
    certification: "ISO 22000 Certified",
    verified: true,
  },
  {
    role: "Exporter",
    icon: "📦",
    name: "Kandy WH",
    subtitle: "Export warehouse",
    location: "Kandy, Sri Lanka",
    certification: "ISO 22000 Certified",
    verified: true,
  },
  {
    role: "Customer",
    icon: "🚢",
    name: "UK Company ABC",
    subtitle: "Importer",
    location: "London, United Kingdom",
    certification: "BRCGS Certified",
    verified: true,
  },
];

export type Certification = {
  id: string;
  name: string;
  icon: string;
  number: string;
  issuer: string;
  validity: string;
  status: "Verified" | "Pending" | "Expired";
};

export const CERTIFICATIONS: Certification[] = [
  {
    id: "globalgap",
    name: "GlobalG.A.P.",
    icon: "🌍",
    number: "GGN 4049927812345",
    issuer: "GLOBALG.A.P. c/o FoodPLUS GmbH",
    validity: "Valid until 30 Jun 2027",
    status: "Verified",
  },
  {
    id: "iso22000",
    name: "ISO 22000",
    icon: "🛡️",
    number: "ISO22K-LK-88214",
    issuer: "SGS Lanka (Pvt) Ltd",
    validity: "Valid until 14 Mar 2027",
    status: "Verified",
  },
  {
    id: "haccp",
    name: "HACCP",
    icon: "🧪",
    number: "HACCP-2026-3392",
    issuer: "Bureau Veritas Sri Lanka",
    validity: "Valid until 09 Nov 2027",
    status: "Verified",
  },
  {
    id: "brcgs",
    name: "BRCGS",
    icon: "🏆",
    number: "BRCGS-77410-SL",
    issuer: "BRCGS Global Standards",
    validity: "Valid until 22 Jan 2027",
    status: "Verified",
  },
  {
    id: "control-union",
    name: "Control Union Certified",
    icon: "✅",
    number: "CU 844213-ORG",
    issuer: "Control Union Certifications",
    validity: "Valid until 05 Aug 2027",
    status: "Verified",
  },
];

export type MediaCategory = {
  id: string;
  label: string;
  icon: string;
  images: { src: string; caption: string }[];
};

export const MEDIA_GALLERY: MediaCategory[] = [
  {
    id: "farm",
    label: "Farm",
    icon: "🌱",
    images: [
      { src: "https://images.unsplash.com/photo-1622955658214-d05c1c6fcf84?w=700&h=500&fit=crop&auto=format", caption: "Hillside mango orchard at Green Valley Farm, Matale" },
      { src: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=700&h=500&fit=crop&auto=format", caption: "Karthakolomban mangoes ready for harvest" },
      { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&h=500&fit=crop&auto=format", caption: "Nimal Perera, farm owner" },
    ],
  },
  {
    id: "harvest",
    label: "Harvest",
    icon: "🧺",
    images: [
      { src: "https://images.unsplash.com/photo-1685478676925-05548b7bc317?w=700&h=500&fit=crop&auto=format", caption: "Hand-picking at peak ripeness" },
      { src: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=700&h=500&fit=crop&auto=format", caption: "Freshly harvested batch BAT-2026-00152" },
    ],
  },
  {
    id: "factory",
    label: "Factory",
    icon: "🏭",
    images: [
      { src: "https://images.unsplash.com/photo-1669207334420-66d0e3450283?w=700&h=500&fit=crop&auto=format", caption: "Washing, grading and inspection line" },
      { src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=700&h=500&fit=crop&auto=format", caption: "Dilshan Fernando, processing supervisor" },
    ],
  },
  {
    id: "packaging",
    label: "Packaging",
    icon: "📦",
    images: [
      { src: "https://images.unsplash.com/photo-1519096845289-95806ee03a1a?w=700&h=500&fit=crop&auto=format", caption: "Vacuum sealing in biodegradable trays" },
    ],
  },
  {
    id: "shipping",
    label: "Shipping",
    icon: "🚚",
    images: [
      { src: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=700&h=500&fit=crop&auto=format", caption: "Cold-chain transit, Kandy to Colombo" },
      { src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=700&h=500&fit=crop&auto=format", caption: "Kasun Jayawardena, logistics driver" },
    ],
  },
  {
    id: "warehouse",
    label: "Warehouse",
    icon: "🏬",
    images: [
      { src: "https://images.unsplash.com/photo-1651525670033-279c26cc2347?w=700&h=500&fit=crop&auto=format", caption: "Cold storage staging at Peradeniya warehouse" },
    ],
  },
  {
    id: "shelf",
    label: "Cargills Food City Shelf Display",
    icon: "🏪",
    images: [
      { src: "https://images.unsplash.com/photo-1771019992524-9d83e1bf69bb?w=700&h=500&fit=crop&auto=format", caption: "Shelf-stocked and ready for sale" },
      { src: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=700&h=500&fit=crop&auto=format", caption: "Pradeep Silva, store manager" },
    ],
  },
];
