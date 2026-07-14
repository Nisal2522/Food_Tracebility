import { useEffect } from "react";
import { motion } from "motion/react";
import { X, QrCode } from "lucide-react";
import { useDeviceView } from "../../context/device-view";
import { cn } from "../ui/utils";

export function ScanningScreen({ onDetected, onCancel }: { onDetected: () => void; onCancel: () => void }) {
  const { view } = useDeviceView();
  useEffect(() => {
    const timer = setTimeout(onDetected, 2200);
    return () => clearTimeout(timer);
  }, [onDetected]);

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center overflow-hidden bg-black px-6",
        view === "mobile" ? "min-h-full" : "min-h-screen"
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/40 via-black to-black" />

      <button
        onClick={onCancel}
        className="absolute right-5 top-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md"
      >
        <X className="h-5 w-5" />
      </button>

      <div className="relative z-10 flex flex-col items-center">
        <p className="mb-8 text-sm font-medium text-white/70">Point your camera at the QR code</p>

        <div className="relative h-64 w-64">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 rounded-[28px] border-2 border-emerald-400/50"
          />
          {[
            "left-0 top-0 rounded-tl-[24px] border-l-4 border-t-4",
            "right-0 top-0 rounded-tr-[24px] border-r-4 border-t-4",
            "left-0 bottom-0 rounded-bl-[24px] border-l-4 border-b-4",
            "right-0 bottom-0 rounded-br-[24px] border-r-4 border-b-4",
          ].map((cls, i) => (
            <div key={i} className={`absolute h-9 w-9 border-emerald-400 ${cls}`} />
          ))}

          <div className="absolute inset-4 flex items-center justify-center">
            <QrCode className="h-24 w-24 text-white/20" strokeWidth={1} />
          </div>

          <motion.div
            className="absolute left-3 right-3 h-0.5 rounded-full bg-emerald-400 shadow-[0_0_12px_2px_rgba(52,211,153,0.7)]"
            animate={{ top: ["8%", "88%", "8%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            className="absolute -inset-2 rounded-[32px] border-2 border-emerald-300/40"
            animate={{ scale: [1, 1.06, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-xs font-medium uppercase tracking-widest text-emerald-400"
        >
          Scanning…
        </motion.p>
      </div>
    </div>
  );
}
