import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Maximize2, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { slabImages } from "@/lib/data";

const slabs = [
  { key: "marble", img: slabImages.marble, name: "Galala Cream" },
  { key: "granite", img: slabImages.granite, name: "Aswan Black" },
  { key: "onyx", img: slabImages.onyx, name: "Egyptian Onyx" },
  { key: "limestone", img: slabImages.limestone, name: "Silvia Limestone" },
];

export function SlabShowcase() {
  const { t } = useTranslation();
  const [active, setActive] = useState(0);
  const [full, setFull] = useState(false);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [zoom, setZoom] = useState(false);

  const slab = slabs[active];

  return (
    <div className="mt-12 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
      <div
        className="relative aspect-video cursor-zoom-in overflow-hidden rounded-xl border border-border"
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          setPos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
        }}
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => setZoom(false)}
        onClick={() => setFull(true)}
      >
        <img
          src={slab.img}
          alt={slab.name}
          className="h-full w-full object-cover transition-transform duration-200"
          style={{
            transform: zoom ? "scale(2)" : "scale(1)",
            transformOrigin: `${pos.x}% ${pos.y}%`,
          }}
        />
        <div className="absolute bottom-4 start-4 rounded-full bg-background/80 px-4 py-2 text-sm font-medium backdrop-blur">
          {slab.name}
        </div>
        <button className="absolute bottom-4 end-4 rounded-full bg-background/80 p-2 backdrop-blur">
          <Maximize2 className="h-4 w-4 text-gold" />
        </button>
        <span className="absolute top-4 start-4 text-xs text-background/0">{t("showcase.zoom")}</span>
      </div>

      <div className="flex flex-col justify-center gap-3">
        <p className="text-sm text-muted-foreground">{t("showcase.hint")}</p>
        {slabs.map((s, i) => (
          <button
            key={s.key}
            onClick={() => setActive(i)}
            className={`flex items-center gap-4 rounded-lg border p-3 text-start transition-all ${
              active === i ? "border-gold bg-card" : "border-border hover:border-gold/50"
            }`}
          >
            <img src={s.img} alt={s.name} loading="lazy" className="h-14 w-14 rounded-md object-cover" />
            <div>
              <p className="font-medium">{s.name}</p>
              <p className="text-xs text-muted-foreground">{t(`collection.${s.key}`)}</p>
            </div>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {full && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-6"
            onClick={() => setFull(false)}
          >
            <button className="absolute end-6 top-6 text-white" onClick={() => setFull(false)}>
              <X className="h-7 w-7" />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              src={slab.img}
              alt={slab.name}
              className="max-h-full max-w-full rounded-lg object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
