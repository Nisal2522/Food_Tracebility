import { motion } from "motion/react";
import { QrCode, Leaf, ShieldCheck, Sparkles } from "lucide-react";
import { useDeviceView } from "../../context/device-view";
import { cn } from "../ui/utils";
import { OrganicBackdrop } from "../report/shared";

export function LandingScreen({ onScan }: { onScan: () => void }) {
  const { view } = useDeviceView();
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center overflow-hidden bg-[#f8faf8] px-6",
        view === "mobile" ? "min-h-full" : "min-h-screen"
      )}
    >
      <OrganicBackdrop />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-2"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-green-600">
          <Leaf className="h-[18px] w-[18px] text-white" />
        </div>
        <span className="text-sm font-bold tracking-wide text-gray-700" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          AgriTrace
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative mt-10 flex h-52 w-52 items-center justify-center"
      >
        <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-emerald-400/20 to-green-500/10 blur-2xl" />
        <div className="relative flex h-full w-full items-center justify-center rounded-[2.5rem] border border-white/60 bg-white/70 shadow-[0_20px_60px_rgba(16,64,32,0.12)] backdrop-blur-xl">
          <QrCode className="h-24 w-24 text-emerald-600" strokeWidth={1.4} />
          <motion.div
            className="absolute left-4 right-4 h-0.5 rounded-full bg-emerald-400/80"
            animate={{ top: ["18%", "78%", "18%"] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-9 max-w-sm text-center"
      >
        <h1 className="text-[28px] font-bold leading-tight text-gray-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Know exactly where<br />your food comes from
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-gray-500">
          Scan the QR code on any product to reveal its full farm-to-shelf journey — verified on the blockchain.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.6 }}
        className="mt-8 flex items-center gap-5 text-xs text-gray-400"
      >
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-emerald-500" /> Verified
        </span>
        <span className="flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-emerald-500" /> 100% Transparent
        </span>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.6 }}
        whileTap={{ scale: 0.97 }}
        onClick={onScan}
        className="mt-10 flex w-full max-w-xs items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 py-4 text-sm font-semibold text-white shadow-lg shadow-emerald-200 transition-shadow hover:shadow-xl"
      >
        <QrCode className="h-[18px] w-[18px]" /> Scan Product QR Code
      </motion.button>

      <p className="mt-5 text-xs text-gray-400">Point your camera at the QR code on the product label</p>
    </div>
  );
}
