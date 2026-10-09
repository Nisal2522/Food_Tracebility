import { useDeviceView } from "../../context/device-view";
import { cn } from "../ui/utils";
import { HeroSection } from "./HeroSection";
import { JourneyTimelineSection } from "./JourneyTimelineSection";
import { RouteMapSection } from "./RouteMapSection";
import { OriginSummarySection } from "./OriginSummarySection";
import { CertificationsSection } from "./CertificationsSection";
import { ReportFAB } from "./ReportFAB";
import { ReportFooter } from "./ReportFooter";
import { OrganicBackdrop } from "./shared";

export function ReportPage() {
  const { view } = useDeviceView();
  return (
    <div className={cn("relative flex flex-col gap-8 bg-[#f8faf8]", view === "mobile" ? "min-h-full" : "min-h-screen")}>
      <OrganicBackdrop />

      <HeroSection />
      <CertificationsSection />
      <JourneyTimelineSection />
      <RouteMapSection />
      <OriginSummarySection />

      <ReportFooter />

      <ReportFAB />
    </div>
  );
}
