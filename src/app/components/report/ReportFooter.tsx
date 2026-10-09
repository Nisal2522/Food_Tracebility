import { useDeviceView } from "../../context/device-view";
import { cn } from "../ui/utils";
import terraxLogo from "../../../assets/terrax-logo.png";

const BADGES = ["Digital Product Passport", "GS1 Compatible", "ISO 22095"];

export function ReportFooter() {
  const { view } = useDeviceView();
  return (
    // Extra bottom padding on smaller screens keeps the floating report button clear of the badges
    <footer className="border-t border-gray-200 bg-white pb-24 pt-6 lg:pb-6">
      <div
        className={cn(
          "mx-auto flex w-full gap-4 px-5",
          view === "mobile"
            ? "max-w-2xl flex-col"
            : "max-w-7xl flex-col sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-16"
        )}
      >
        <div className="flex items-center gap-3">
          <img src={terraxLogo} alt="TerraX logo" className="h-8 w-8 shrink-0 object-contain" />
          <div>
            <p
              className="text-sm font-semibold text-gray-900"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Powered by TerraX
            </p>
            <p className="text-sm text-gray-400">End-to-End Food Traceability</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {BADGES.map((badge) => (
            <span
              key={badge}
              className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-600"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
