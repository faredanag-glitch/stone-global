import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Play } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/motion";
import line from "@/assets/factory-line.webp";
import quarry from "@/assets/factory-quarry.webp";

export const Route = createFileRoute("/factory")({
  head: () => ({
    meta: [
      { title: "Our Factory — Marble & Granite Production | Nile Stone" },
      { name: "description", content: "Inside our state-of-the-art Egyptian marble & granite factory: production lines, machinery, quality control and warehousing." },
    ],
  }),
  component: Factory,
});

const features = ["f1", "f2", "f3", "f4", "f5", "f6"];

function Factory() {
  const { t } = useTranslation();
  return (
    <div className="pb-24">
      <section className="relative flex h-[60vh] min-h-[420px] items-center justify-center overflow-hidden">
        <img src={line} alt="Marble factory production line" fetchPriority="high" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="container-luxe relative z-10 text-center text-white">
          <h1 className="font-display text-4xl font-semibold md:text-6xl">{t("factoryPage.title")}</h1>
          <p className="mt-4 text-lg text-white/80">{t("factoryPage.subtitle")}</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container-luxe">
          <SectionHeading title={t("factoryPage.lines")} subtitle={t("brandTag")} />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((k, i) => (
              <Reveal key={k} delay={(i % 3) * 0.08}>
                <div className="h-full rounded-xl border border-border bg-card p-7">
                  <span className="font-display text-3xl font-semibold text-gold/30">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-2 text-lg font-semibold">{t(`factoryPage.${k}`)}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{t(`factoryPage.${k}d`)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-card py-20">
        <div className="container-luxe">
          <SectionHeading title={t("factoryPage.video")} />
          <Reveal className="mt-12">
            <div className="group relative aspect-video overflow-hidden rounded-2xl border border-border">
              <img src={quarry} alt={t("factoryPage.watch")} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gold/90 transition-transform group-hover:scale-110">
                  <Play className="h-8 w-8 text-primary-foreground" />
                </div>
              </div>
              <p className="absolute bottom-5 start-5 font-display text-xl text-white">{t("factoryPage.watch")}</p>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
