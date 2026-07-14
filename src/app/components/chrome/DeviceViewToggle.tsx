import type { ReactNode } from "react";
import { Monitor, Smartphone } from "lucide-react";
import { useDeviceView } from "../../context/device-view";
import { cn } from "../ui/utils";

export function DeviceViewToggle() {
  const { view, setView } = useDeviceView();

  return (
    <div className="fixed right-3 top-3 z-[60] flex items-center gap-1 rounded-full border border-white/60 bg-white/80 p-1 shadow-lg backdrop-blur-xl sm:right-4 sm:top-4">
      <ToggleButton
        active={view === "desktop"}
        onClick={() => setView("desktop")}
        label="Desktop view"
        icon={<Monitor className="h-4 w-4" />}
      />
      <ToggleButton
        active={view === "mobile"}
        onClick={() => setView("mobile")}
        label="Mobile view"
        icon={<Smartphone className="h-4 w-4" />}
      />
    </div>
  );
}

function ToggleButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      title={label}
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-full transition-colors",
        active ? "bg-emerald-600 text-white shadow-sm" : "text-gray-500 hover:bg-emerald-50 hover:text-emerald-600"
      )}
    >
      {icon}
    </button>
  );
}
