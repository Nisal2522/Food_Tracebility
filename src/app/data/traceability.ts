// Realistic sample data for a single scanned product — Karthakolomban Mango
// from Green Valley Farm, Matale, Sri Lanka.

export const PRODUCT = {
  name: "Ceylon Karthakolomban Mango",
  variety: "Karthakolomban Variety",
  category: "Fresh Fruit",
  batchId: "BAT-2026-00152",
  productId: "PRD-000245",
  sku: "MANGO-ORG-500",
  countryFlag: "🇱🇰",
  countryName: "Sri Lanka",
  origin: "Matale District, Central Province",
  status: "Available for Sale",
  freshness: 94,
  freshnessLabel: "Peak Freshness",
  harvestDate: "12 Jul 2026",
  expiryDate: "25 Jul 2026",
  daysRemaining: 11,
  weight: "500g",
  description:
    "Hand-picked at peak ripeness from a certified-organic hillside orchard, then cold-chain delivered within 48 hours of harvest. Every mango in this batch is traced from blossom to shelf.",
  heroImage:
    "https://images.unsplash.com/photo-1553279768-865429fa0078?w=1200&h=1400&fit=crop&auto=format",
  thumbImage:
    "https://images.unsplash.com/photo-1553279768-865429fa0078?w=200&h=200&fit=crop&auto=format",
};

export const AUTHENTICITY = {
  verified: true,
  score: 100,
  message: "No tampering detected.",
  verifiedAt: "14 Jul 2026, 11:32 AM",
  method: "Blockchain cryptographic signature + QR checksum",
  scansToDate: 1,
};

export type JourneyStage = {
  id: number;
  icon: string;
  label: string;
  stage: string;
  date: string;
  time: string;
  country: string;
  location: string;
  organization: string;
  person: string;
  image: string;
  status: "Completed" | "Current" | "Upcoming";
  temperature: string;
  details: string;
};

export const JOURNEY: JourneyStage[] = [
  {
    id: 1,
    icon: "🌱",
    label: "Farm",
    stage: "Harvest",
    date: "12 Jul 2026",
    time: "06:30 AM",
    country: "🇱🇰",
    location: "Green Valley Farm, Matale",
    organization: "Green Valley Farm",
    person: "Nimal Perera",
    image:
      "https://images.unsplash.com/photo-1622955658214-d05c1c6fcf84?w=600&h=400&fit=crop&auto=format",
    status: "Completed",
    temperature: "28°C",
    details:
      "450 kg of Karthakolomban mangoes hand-harvested at peak ripeness from a certified-organic hillside orchard. Manual sorting and grading performed on-site; batch passed initial visual quality check before cold storage.",
  },
  {
    id: 2,
    icon: "🏭",
    label: "Processing",
    stage: "Wash, Grade & Inspect",
    date: "13 Jul 2026",
    time: "08:15 AM",
    country: "🇱🇰",
    location: "ABC Food Processing Center, Kandy",
    organization: "ABC Food Processing Center",
    person: "Dilshan Fernando",
    image:
      "https://images.unsplash.com/photo-1669207334420-66d0e3450283?w=600&h=400&fit=crop&auto=format",
    status: "Completed",
    temperature: "22°C",
    details:
      "Washing, grading and lab testing completed. Pesticide residue and microbiology tests passed. Organic certification re-verified against farm records. 420 kg approved for packaging and distribution.",
  },
  {
    id: 3,
    icon: "📦",
    label: "Packaging",
    stage: "Vacuum Sealed & Labeled",
    date: "13 Jul 2026",
    time: "12:00 PM",
    country: "🇱🇰",
    location: "ABC Food Processing Center, Kandy",
    organization: "ABC Food Processing Center",
    person: "Dilshan Fernando",
    image:
      "https://images.unsplash.com/photo-1519096845289-95806ee03a1a?w=600&h=400&fit=crop&auto=format",
    status: "Completed",
    temperature: "20°C",
    details:
      "Sealed into food-grade biodegradable trays with vacuum packaging to extend shelf life. Batch ID BAT-2026-00152 assigned and QR codes printed, each cryptographically linked to this blockchain record.",
  },
  {
    id: 4,
    icon: "🚚",
    label: "Distribution",
    stage: "Cold-Chain Transit",
    date: "13 Jul 2026",
    time: "03:00 PM",
    country: "🇱🇰",
    location: "En Route – Kandy to Colombo",
    organization: "XYZ Logistics",
    person: "Kasun Jayawardena",
    image:
      "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&h=400&fit=crop&auto=format",
    status: "Completed",
    temperature: "4°C",
    details:
      "Refrigerated vehicle WP CAB 4587 departed with real-time GPS and temperature tracking active throughout the 87 km route, maintaining an unbroken 4°C cold chain.",
  },
  {
    id: 5,
    icon: "🏪",
    label: "Retail",
    stage: "Shelf-Stocked",
    date: "14 Jul 2026",
    time: "07:45 AM",
    country: "🇱🇰",
    location: "Cargills Food City – Kandy",
    organization: "Cargills Food City",
    person: "Pradeep Silva",
    image:
      "https://images.unsplash.com/photo-1770291326691-c19455e2263e?w=600&h=400&fit=crop&auto=format",
    status: "Completed",
    temperature: "4°C",
    details:
      "Batch received, refrigerated and shelf-stocked. QR codes scanned and verified against the blockchain ledger before the product was cleared for sale to consumers.",
  },
  {
    id: 6,
    icon: "👤",
    label: "Customer",
    stage: "Product Verified",
    date: "14 Jul 2026",
    time: "11:32 AM",
    country: "🇱🇰",
    location: "Cargills Food City – Kandy",
    organization: "Consumer Scan",
    person: "You",
    image:
      "https://images.unsplash.com/photo-1544531480-9eadeb3c8f41?w=600&h=400&fit=crop&auto=format",
    status: "Current",
    temperature: "–",
    details:
      "QR code scanned just now. Full farm-to-shelf traceability confirmed and blockchain verification complete — this product is authentic and untampered.",
  },
];

export type RoutePoint = {
  label: string;
  icon: string;
  city: string;
  lat: number;
  lng: number;
  x: number;
  y: number;
  color: string;
  status: "done" | "current";
};

export const ROUTE: RoutePoint[] = [
  { label: "Farm", icon: "🌱", city: "Matale", lat: 7.4675, lng: 80.6234, x: 52, y: 26, color: "#22c55e", status: "done" },
  { label: "Processing Plant", icon: "🏭", city: "Kandy", lat: 7.2906, lng: 80.6337, x: 49, y: 38, color: "#3b82f6", status: "done" },
  { label: "Warehouse", icon: "📦", city: "Peradeniya", lat: 7.2599, lng: 80.5977, x: 45, y: 43, color: "#8b5cf6", status: "done" },
  { label: "Retail Store", icon: "🏪", city: "Kandy City", lat: 7.2955, lng: 80.6356, x: 49, y: 39, color: "#f59e0b", status: "current" },
];

export const MAP_EMBED_URL =
  "https://www.google.com/maps?q=Cargills+Food+City+Kandy+Sri+Lanka&z=12&output=embed";

export const ROUTE_OVERVIEW_MAP_EMBED_URL =
  "https://www.google.com/maps?q=Kandy,Sri+Lanka&z=11&output=embed";

export const JOURNEY_SUMMARY = {
  totalDistance: "109 km",
  duration: "4h 15min",
  currentLocation: "Cargills Food City, Kandy",
  deliveryStatus: "Delivered",
};

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
  company: string;
  location: string;
  certification: string;
  verified: boolean;
  avatar: string;
  logo: string;
};

export const PARTICIPANTS: Participant[] = [
  {
    role: "Farmer",
    icon: "🌱",
    name: "Nimal Perera",
    company: "Green Valley Farm",
    location: "Matale, Sri Lanka",
    certification: "SLSI Organic Certified",
    verified: true,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&auto=format",
    logo: "🌿",
  },
  {
    role: "Processor",
    icon: "🏭",
    name: "Dilshan Fernando",
    company: "ABC Food Processing Center",
    location: "Kandy, Sri Lanka",
    certification: "HACCP Certified",
    verified: true,
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=120&h=120&fit=crop&auto=format",
    logo: "🏭",
  },
  {
    role: "Distributor",
    icon: "🚚",
    name: "Kasun Jayawardena",
    company: "XYZ Logistics",
    location: "Kandy, Sri Lanka",
    certification: "Cold-Chain Certified",
    verified: true,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&auto=format",
    logo: "🚚",
  },
  {
    role: "Retailer",
    icon: "🏪",
    name: "Pradeep Silva",
    company: "Cargills Food City",
    location: "Kandy, Sri Lanka",
    certification: "ISO 22000 Certified",
    verified: true,
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&h=120&fit=crop&auto=format",
    logo: "🏬",
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
    validity: "Valid until 09 Nov 2026",
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
    validity: "Valid until 05 Aug 2026",
    status: "Verified",
  },
];

export type SustainabilityMetric = {
  id: string;
  label: string;
  icon: string;
  value: number;
  max: number;
  unit: string;
  color: string;
};

export const SUSTAINABILITY: SustainabilityMetric[] = [
  { id: "carbon", label: "Carbon Footprint", icon: "🌱", value: 0.42, max: 1, unit: " kg CO₂e", color: "#22c55e" },
  { id: "distance", label: "Distance Travelled", icon: "🛣️", value: 109, max: 200, unit: " km", color: "#3b82f6" },
  { id: "water", label: "Water Usage", icon: "💧", value: 62, max: 150, unit: " L/kg", color: "#0ea5e9" },
  { id: "farmers", label: "Local Farmers Supported", icon: "🤝", value: 24, max: 50, unit: "", color: "#f59e0b" },
  { id: "renewable", label: "Renewable Energy Usage", icon: "⚡", value: 68, max: 100, unit: "%", color: "#8b5cf6" },
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
      { src: "https://images.unsplash.com/photo-1519096845289-95806ee03a1a?w=700&h=500&fit=crop&auto=format", caption: "Cold storage staging at Peradeniya warehouse" },
    ],
  },
  {
    id: "shelf",
    label: "Cargills Food City Shelf Display",
    icon: "🏪",
    images: [
      { src: "https://images.unsplash.com/photo-1770291326691-c19455e2263e?w=700&h=500&fit=crop&auto=format", caption: "Shelf-stocked and ready for sale" },
      { src: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=700&h=500&fit=crop&auto=format", caption: "Pradeep Silva, store manager" },
    ],
  },
];
