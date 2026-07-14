import { createContext, useContext, useState, type ReactNode } from "react";

export type DeviceView = "desktop" | "mobile";

interface DeviceViewContextValue {
  view: DeviceView;
  setView: (view: DeviceView) => void;
}

const DeviceViewContext = createContext<DeviceViewContextValue | null>(null);

export function DeviceViewProvider({ children }: { children: ReactNode }) {
  const [view, setView] = useState<DeviceView>("desktop");
  return (
    <DeviceViewContext.Provider value={{ view, setView }}>
      {children}
    </DeviceViewContext.Provider>
  );
}

export function useDeviceView() {
  const ctx = useContext(DeviceViewContext);
  if (!ctx) throw new Error("useDeviceView must be used within a DeviceViewProvider");
  return ctx;
}
