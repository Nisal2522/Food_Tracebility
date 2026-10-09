import { motion } from "motion/react";
import { SOURCE_LOTS } from "../../data/traceability";
import { GlassCard, Section } from "./shared";

const formatLitres = (value: number) => `${value.toFixed(2)} L`;

export function SourceLotsSection() {
  return (
    <Section id="lots" eyebrow="Batch Composition" title="Source Lots">
      <GlassCard className="overflow-hidden">
        {/* Table on wider screens */}
        <table className="hidden w-full text-left text-sm sm:table">
          <thead className="bg-gray-50/80 text-xs text-gray-400">
            <tr>
              <th className="px-4 py-3 font-medium">Lot ID</th>
              <th className="px-4 py-3 font-medium">Processed</th>
              <th className="px-4 py-3 font-medium">Factory</th>
              <th className="px-4 py-3 font-medium">Export WH</th>
              <th className="px-4 py-3 text-right font-medium">Farmers</th>
              <th className="px-4 py-3 text-right font-medium">Plots</th>
              <th className="px-4 py-3 text-right font-medium">Volume</th>
            </tr>
          </thead>
          <tbody>
            {SOURCE_LOTS.map((lot, i) => (
              <motion.tr
                key={lot.lotId}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="border-t border-gray-100"
              >
                <td className="px-4 py-3 font-mono text-xs font-semibold text-gray-800">{lot.lotId}</td>
                <td className="px-4 py-3 text-xs text-gray-500">{lot.date}</td>
                <td className="px-4 py-3 text-xs text-gray-700">{lot.factory}</td>
                <td className="px-4 py-3 text-xs text-gray-700">{lot.warehouse}</td>
                <td className="px-4 py-3 text-right text-xs text-gray-700">{lot.farmers}</td>
                <td className="px-4 py-3 text-right text-xs text-gray-700">{lot.plots}</td>
                <td className="px-4 py-3 text-right text-xs font-semibold text-gray-900">{formatLitres(lot.volume)}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>

        {/* Stacked cards on phones */}
        <div className="divide-y divide-gray-100 sm:hidden">
          {SOURCE_LOTS.map((lot) => (
            <div key={lot.lotId} className="p-4">
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-xs font-semibold text-gray-800">{lot.lotId}</span>
                <span className="text-xs font-semibold text-gray-900">{formatLitres(lot.volume)}</span>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                {lot.factory} → {lot.warehouse}
              </p>
              <p className="mt-0.5 text-[11px] text-gray-400">
                {lot.date} · {lot.farmers} farmers · {lot.plots} plots
              </p>
            </div>
          ))}
        </div>
      </GlassCard>
    </Section>
  );
}
