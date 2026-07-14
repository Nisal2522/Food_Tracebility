import { motion } from "motion/react";
import { useDeviceView } from "../../context/device-view";
import { cn } from "../ui/utils";

export function GlassCard({
  children,
  className = "",
  as: As = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}) {
  return (
    <As
      className={cn(
        "rounded-[20px] border border-white/60 bg-white/70 backdrop-blur-xl",
        "shadow-[0_8px_30px_rgba(16,64,32,0.06)]",
        className
      )}
    >
      {children}
    </As>
  );
}

export function Section({
  id,
  eyebrow,
  title,
  headerRight,
  children,
  className = "",
}: {
  id: string;
  eyebrow: string;
  title: string;
  headerRight?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  const { view } = useDeviceView();
  return (
    <motion.section
      id={id}
      className={cn(
        "relative mx-auto w-full px-5 py-10",
        view === "mobile" ? "max-w-2xl" : "max-w-7xl px-5 sm:px-10 lg:px-16",
        className
      )}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mb-5 flex items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">{eyebrow}</p>
          <h2
            className="mt-1 text-2xl font-bold text-gray-900"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {title}
          </h2>
        </div>
        {headerRight}
      </div>
      {children}
    </motion.section>
  );
}

export function StatusPill({ status }: { status: "Passed" | "Warning" | "Failed" | string }) {
  const styles: Record<string, string> = {
    Passed: "bg-emerald-100 text-emerald-700",
    Warning: "bg-amber-100 text-amber-700",
    Failed: "bg-red-100 text-red-700",
  };
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold",
        styles[status] ?? "bg-gray-100 text-gray-600"
      )}
    >
      {status}
    </span>
  );
}

export function OrganicBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-emerald-200/40 blur-3xl" />
      <div className="absolute -right-32 top-72 h-[28rem] w-[28rem] rounded-full bg-green-100/60 blur-3xl" />
      <div className="absolute left-1/3 top-[140vh] h-[26rem] w-[26rem] rounded-full bg-teal-100/50 blur-3xl" />
      <div className="absolute -right-24 top-[220vh] h-96 w-96 rounded-full bg-emerald-100/50 blur-3xl" />
      <div className="absolute left-0 top-[300vh] h-96 w-96 rounded-full bg-lime-100/40 blur-3xl" />
    </div>
  );
}
