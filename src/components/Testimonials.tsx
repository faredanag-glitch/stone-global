import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/lib/data";

export function Testimonials() {
  const { t } = useTranslation();
  const [i, setI] = useState(0);
  const item = testimonials[i];
  const go = (d: number) => setI((p) => (p + d + testimonials.length) % testimonials.length);

  return (
    <div className="mx-auto mt-12 max-w-3xl">
      <div className="relative min-h-[16rem] rounded-2xl border border-border bg-card p-8 text-center md:p-12">
        <Quote className="mx-auto h-10 w-10 text-gold" />
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4 }}
          >
            <p className="mt-6 font-display text-xl leading-relaxed md:text-2xl">“{item.text}”</p>
            <p className="mt-6 font-semibold text-gold">{item.name}</p>
            <p className="text-sm text-muted-foreground">{item.role}</p>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="mt-6 flex items-center justify-center gap-4">
        <button onClick={() => go(-1)} className="rounded-full border border-border p-2 hover:border-gold hover:text-gold">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="flex gap-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              className={`h-2 rounded-full transition-all ${idx === i ? "w-6 bg-gold" : "w-2 bg-border"}`}
              aria-label={`${t("testimonials.title")} ${idx + 1}`}
            />
          ))}
        </div>
        <button onClick={() => go(1)} className="rounded-full border border-border p-2 hover:border-gold hover:text-gold">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
