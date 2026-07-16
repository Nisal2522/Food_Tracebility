import { motion } from "motion/react";
import { ScanLine } from "lucide-react";
import { useDeviceView } from "../../context/device-view";
import { cn } from "../ui/utils";
import { HeroSection } from "./HeroSection";
import { JourneyTimelineSection } from "./JourneyTimelineSection";
import { RouteMapSection } from "./RouteMapSection";
import { QualitySection } from "./QualitySection";
import { ParticipantsSection } from "./ParticipantsSection";
import { CertificationsSection } from "./CertificationsSection";
import { SustainabilitySection } from "./SustainabilitySection";
import { MediaGallerySection } from "./MediaGallerySection";
import { ReportFAB } from "./ReportFAB";
import { OrganicBackdrop } from "./shared";

export function ReportPage({ onScanAnother }: { onScanAnother: () => void }) {
  const { view } = useDeviceView();
  return (
    <div className={cn("relative bg-[#f8faf8]", view === "mobile" ? "min-h-full" : "min-h-screen")}>
      <OrganicBackdrop />

      <HeroSection />
      <JourneyTimelineSection />
      <RouteMapSection />
      <QualitySection />
      <ParticipantsSection />
      <CertificationsSection />
      <SustainabilitySection />
      <MediaGallerySection />

      <div className={cn("mx-auto w-full px-5 pb-28 pt-4 text-center", view === "mobile" ? "max-w-2xl" : "max-w-7xl")}>
        <motion.button
          onClick={onScanAnother}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-5 py-3 text-sm font-semibold text-emerald-700 shadow-sm transition-colors hover:bg-emerald-50"
        >
          <ScanLine className="h-4 w-4" /> Scan Another Product
        </motion.button>
        <p className="mt-6 text-xs text-gray-400">Secured by AgriTrace Ledger · Farm-to-shelf transparency for Sri Lankan agriculture</p>
      </div>

      <ReportFAB />
    </div>
  );
}
