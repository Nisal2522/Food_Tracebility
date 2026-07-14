import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { MEDIA_GALLERY } from "../../data/traceability";
import { GlassCard, Section } from "./shared";
import { cn } from "../ui/utils";

export function MediaGallerySection() {
  const [activeCategory, setActiveCategory] = useState(MEDIA_GALLERY[0].id);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const category = MEDIA_GALLERY.find((c) => c.id === activeCategory) ?? MEDIA_GALLERY[0];
  const images = category.images;

  const closeLightbox = () => setLightboxIndex(null);
  const showPrev = () => setLightboxIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length));
  const showNext = () => setLightboxIndex((i) => (i === null ? null : (i + 1) % images.length));

  return (
    <Section id="media" eyebrow="Behind The Scenes" title="Media Gallery">
      <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1">
        {MEDIA_GALLERY.map((cat) => {
          const active = cat.id === activeCategory;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-3.5 py-2 text-xs font-semibold transition-colors",
                active
                  ? "border-emerald-500 bg-emerald-600 text-white"
                  : "border-emerald-100 bg-white text-gray-600 hover:bg-emerald-50"
              )}
            >
              <span>{cat.icon}</span>
              {cat.label}
            </button>
          );
        })}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {images.map((img, i) => (
          <motion.button
            key={img.src + i}
            type="button"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.35 }}
            onClick={() => setLightboxIndex(i)}
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl"
          >
            <img
              src={img.src}
              alt={img.caption}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-black/0 to-black/0 p-2 opacity-0 transition-opacity group-hover:opacity-100">
              <span className="flex items-center gap-1 text-[11px] font-medium text-white">
                <Expand className="h-3 w-3" /> View
              </span>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 p-6"
            onClick={closeLightbox}
          >
            <button
              type="button"
              onClick={closeLightbox}
              aria-label="Close preview"
              className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md"
            >
              <X className="h-5 w-5" />
            </button>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Previous photo"
                  onClick={(e) => {
                    e.stopPropagation();
                    showPrev();
                  }}
                  className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md sm:left-6"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  aria-label="Next photo"
                  onClick={(e) => {
                    e.stopPropagation();
                    showNext();
                  }}
                  className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md sm:right-6"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}

            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-lg"
            >
              <img
                src={images[lightboxIndex].src}
                alt={images[lightboxIndex].caption}
                className="max-h-[70vh] w-full rounded-2xl object-cover"
              />
              <p className="mt-3 text-center text-sm text-white/80">{images[lightboxIndex].caption}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
