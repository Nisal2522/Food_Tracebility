import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Flag, AlertTriangle, Headset, X, MessageSquareWarning } from "lucide-react";

const ACTIONS = [
  { label: "Report Fake Product", icon: Flag, color: "bg-red-500" },
  { label: "Report Damage", icon: AlertTriangle, color: "bg-amber-500" },
  { label: "Contact Support", icon: Headset, color: "bg-blue-500" },
];

export function ReportFAB() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState<string | null>(null);

  const handleAction = (label: string) => {
    setOpen(false);
    setSent(label);
    setTimeout(() => setSent(null), 2800);
  };

  return (
    <>
      <div className="fixed bottom-6 right-5 z-50 flex flex-col items-end gap-3">
        <AnimatePresence>
          {open &&
            ACTIONS.map((action, i) => (
              <motion.button
                key={action.label}
                initial={{ opacity: 0, y: 12, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.8 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => handleAction(action.label)}
                className="flex items-center gap-2.5 rounded-full border border-white/60 bg-white/90 py-2.5 pl-4 pr-3 shadow-lg backdrop-blur-md transition-transform hover:scale-105"
              >
                <span className="text-sm font-medium text-gray-800">{action.label}</span>
                <span className={`flex h-8 w-8 items-center justify-center rounded-full ${action.color}`}>
                  <action.icon className="h-4 w-4 text-white" />
                </span>
              </motion.button>
            ))}
        </AnimatePresence>

        <motion.button
          onClick={() => setOpen((v) => !v)}
          whileTap={{ scale: 0.92 }}
          className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-xl shadow-emerald-300/50"
        >
          <motion.span animate={{ rotate: open ? 135 : 0 }} transition={{ duration: 0.2 }}>
            {open ? <X className="h-6 w-6" /> : <MessageSquareWarning className="h-6 w-6" />}
          </motion.span>
        </motion.button>
      </div>

      <AnimatePresence>
        {sent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded-full bg-gray-900 px-4 py-2.5 text-sm text-white shadow-xl"
          >
            {sent} submitted — our team will follow up shortly.
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
