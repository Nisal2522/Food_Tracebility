import { useDeviceView } from "../../context/device-view";
import { cn } from "../ui/utils";
import terraxLogo from "../../../assets/terrax-logo.webp";

export function ReportFooter() {
  const { view } = useDeviceView();
  return (
    <footer className="border-t border-gray-200 bg-white py-6">
      <div
        className={cn(
          "mx-auto flex w-full gap-4 px-4",
          view === "mobile"
            ? "max-w-2xl flex-col"
            : "max-w-7xl sm:px-10 lg:px-16"
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
            <p className="text-sm text-gray-500">End-to-End Food Traceability</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
