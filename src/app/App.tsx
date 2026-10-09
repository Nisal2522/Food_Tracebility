import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { LandingScreen } from "./components/flow/LandingScreen";
import { ScanningScreen } from "./components/flow/ScanningScreen";
import { LoadingScreen } from "./components/flow/LoadingScreen";
import { SplashScreen } from "./components/flow/SplashScreen";
import { ReportPage } from "./components/report/ReportPage";
import { DeviceViewProvider, useDeviceView } from "./context/device-view";
import { PhoneFrame } from "./components/chrome/PhoneFrame";

type Stage = "landing" | "scanning" | "loading" | "report";

export default function App() {
  return (
    <DeviceViewProvider>
      <div style={{ fontFamily: "'Inter', sans-serif" }}>
        <AppFlow />
        <Splash />
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
          <ReportPage />
        </motion.div>
      )}
    </AnimatePresence>
  );

  return view === "mobile" ? <PhoneFrame>{content}</PhoneFrame> : content;
}

// Branded splash shown over the report on first open; the report renders underneath so it's ready when this fades out
function Splash() {
  const [visible, setVisible] = useState(true);
  const hide = useCallback(() => setVisible(false), []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[100]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
        >
          <SplashScreen onComplete={hide} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
