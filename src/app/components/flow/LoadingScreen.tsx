import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, Loader2 } from "lucide-react";
import { useDeviceView } from "../../context/device-view";
import { cn } from "../ui/utils";
import { OrganicBackdrop } from "../report/shared";

const STEPS = [
  "Connecting to blockchain ledger",
  "Verifying batch authenticity",
  "Fetching farm-to-shelf journey",
  "Compiling traceability report",
];

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [stepIndex, setStepIndex] = useState(0);
  const { view } = useDeviceView();

  useEffect(() => {
    if (stepIndex >= STEPS.length) {
      const finish = setTimeout(onComplete, 500);
      return () => clearTimeout(finish);
    }
    const timer = setTimeout(() => setStepIndex((i) => i + 1), 550);
    return () => clearTimeout(timer);
  }, [stepIndex, onComplete]);

  const progress = Math.min(stepIndex / STEPS.length, 1) * 100;

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center overflow-hidden bg-[#f8faf8] px-6",
        view === "mobile" ? "min-h-full" : "min-h-screen"
      )}
    >
      <OrganicBackdrop />

      <div className="relative h-28 w-28">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
          <circle cx="50" cy="50" r="44" fill="none" stroke="#dcfce7" strokeWidth="6" />
          <motion.circle
            cx="50"
            cy="50"
            r="44"
            fill="none"
            stroke="#22c55e"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 44}
            initial={{ strokeDashoffset: 2 * Math.PI * 44 }}
            animate={{ strokeDashoffset: 2 * Math.PI * 44 * (1 - progress / 100) }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="h-9 w-9 animate-spin text-emerald-500" strokeWidth={1.8} />
        </div>
      </div>

      <h2
        className="mt-7 text-xl font-bold text-gray-900"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        Verifying Authenticity
      </h2>
      <p className="mt-1 text-sm text-gray-400">This will only take a moment</p>

      <div className="mt-8 w-full max-w-xs space-y-3">
        {STEPS.map((step, i) => {
          const done = i < stepIndex;
          const active = i === stepIndex;
          return (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: i <= stepIndex ? 1 : 0.35, x: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-3"
            >
              <div
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                  done ? "bg-emerald-500" : active ? "bg-emerald-100" : "bg-gray-100"
                }`}
              >
                <AnimatePresence mode="wait">
                  {done ? (
                    <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }}>
                      <Check className="h-3.5 w-3.5 text-white" />
                    </motion.div>
                  ) : active ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin text-emerald-500" />
                  ) : null}
                </AnimatePresence>
              </div>
              <span className={`text-sm ${done || active ? "font-medium text-gray-700" : "text-gray-400"}`}>
                {step}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
