import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { LandingScreen } from "./components/flow/LandingScreen";
import { ScanningScreen } from "./components/flow/ScanningScreen";
import { LoadingScreen } from "./components/flow/LoadingScreen";
import { ReportPage } from "./components/report/ReportPage";
import { DeviceViewProvider, useDeviceView } from "./context/device-view";
import { DeviceViewToggle } from "./components/chrome/DeviceViewToggle";
import { PhoneFrame } from "./components/chrome/PhoneFrame";

type Stage = "landing" | "scanning" | "loading" | "report";

export default function App() {
  return (
    <DeviceViewProvider>
      <div style={{ fontFamily: "'Inter', sans-serif" }}>
        <DeviceViewToggle />
        <AppFlow />
      </div>
    </DeviceViewProvider>
  );
}

function AppFlow() {
  const [stage, setStage] = useState<Stage>("report");
  const { view } = useDeviceView();

  const content = (
    <AnimatePresence mode="wait">
      {stage === "landing" && (
        <motion.div key="landing" className="h-full" exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
          <LandingScreen onScan={() => setStage("scanning")} />
        </motion.div>
      )}
      {stage === "scanning" && (
        <motion.div key="scanning" className="h-full" exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
          <ScanningScreen onDetected={() => setStage("loading")} onCancel={() => setStage("landing")} />
        </motion.div>
      )}
      {stage === "loading" && (
        <motion.div key="loading" className="h-full" exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
          <LoadingScreen onComplete={() => setStage("report")} />
        </motion.div>
      )}
      {stage === "report" && (
        <motion.div
          key="report"
          className="h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <ReportPage onScanAnother={() => setStage("scanning")} />
        </motion.div>
      )}
    </AnimatePresence>
  );

  return view === "mobile" ? <PhoneFrame>{content}</PhoneFrame> : content;
}
