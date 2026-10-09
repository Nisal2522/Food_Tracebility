import { useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import terraxLogo from "../../../assets/terrax-logo.webp";

const SPLASH_MS = 1400;
const RING_RADIUS = 60;
const RING_LENGTH = 2 * Math.PI * RING_RADIUS;

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const done = setTimeout(onComplete, reduceMotion ? 400 : SPLASH_MS);
    return () => clearTimeout(done);
  }, [onComplete, reduceMotion]);

  return (
    <div
      className="flex h-[100dvh] w-full items-center justify-center bg-white"
      role="status"
      aria-label="Loading"
    >
      <div className="relative flex h-40 w-40 items-center justify-center">
        {/* Soft ripples spreading out from the logo */}
        {!reduceMotion &&
          [0, 1].map((i) => (
            <motion.span
              key={i}
              className="absolute h-24 w-24 rounded-full bg-emerald-100"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1.9, opacity: [0, 0.7, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, delay: 0.2 + i * 0.6, ease: "easeOut" }}
            />
          ))}

        {/* Progress ring drawing around the logo for the length of the splash */}
        <svg viewBox="0 0 140 140" className="absolute h-36 w-36 -rotate-90">
          <circle cx="70" cy="70" r={RING_RADIUS} fill="none" stroke="#ecfdf5" strokeWidth="3" />
          <motion.circle
            cx="70"
            cy="70"
            r={RING_RADIUS}
            fill="none"
            stroke="#10b981"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={RING_LENGTH}
            initial={{ strokeDashoffset: RING_LENGTH }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: (reduceMotion ? 600 : SPLASH_MS - 150) / 1000, ease: "easeInOut" }}
          />
        </svg>

        <motion.img
          src={terraxLogo}
          alt="TerraX"
          className="relative h-20 w-20 object-contain"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={reduceMotion ? { scale: 1, opacity: 1 } : { scale: [0.5, 1.08, 1, 1.04, 1], opacity: 1 }}
          transition={{ duration: 1, times: [0, 0.35, 0.55, 0.8, 1], ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
