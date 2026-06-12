import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Target, Eye, Heart, Award } from "lucide-react";
import { Reveal, Counter, SectionHeading } from "@/components/motion";
import { heroStats } from "@/lib/data";
import quarry from "@/assets/factory-quarry.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Egyptian Stone Manufacturer & Exporter | Nile Stone" },
      { name: "description", content: "Our story, mission, vision and values — 18 years quarrying, crafting and exporting premium Egyptian marble & granite." },
    ],
  }),
  component: About,
});

function About() {
  const { t } = useTranslation();
  const mvv = [
    { k: "mission", Icon: Target }, { k: "vision", Icon: Eye }, { k: "values", Icon: Heart },
  ];
  return (
    <div className="pb-24">
      <section className="relative flex h-[55vh] min-h-[380px] items-center justify-center overflow-hidden">
        <img src={quarry} alt="Egyptian marble quarry" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="container-luxe relative z-10 text-center text-white">
          <h1 className="font-display text-4xl font-semibold md:text-6xl">{t("about.title")}</h1>
          <p className="mt-4 text-lg text-white/80">{t("about.subtitle")}</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container-luxe max-w-3xl text-center">
          <SectionHeading title={t("about.story")} />
          <Reveal><p className="mt-8 text-lg leading-relaxed text-muted-foreground">{t("about.storyText")}</p></Reveal>
        </div>
      </section>

      <section className="bg-card py-20">
        <div className="container-luxe grid gap-6 md:grid-cols-3">
          {mvv.map(({ k, Icon }, i) => (
            <Reveal key={k} delay={i * 0.08}>
              <div className="h-full rounded-xl border border-border bg-background p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 text-gold"><Icon className="h-5 w-5" /></div>
                <h3 className="mt-5 font-display text-xl">{t(`about.${k}`)}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t(`about.${k}Text`)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-20">
        <div className="container-luxe">
          <SectionHeading title={t("about.achievements")} />
          <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
            {heroStats.map((s, i) => (
              <Reveal key={s.key} delay={i * 0.08}>
                <div className="rounded-xl border border-border bg-card p-8 text-center">
                  <div className="font-display text-3xl font-semibold text-gold md:text-5xl"><Counter value={s.value} suffix={s.suffix} /></div>
                  <div className="mt-2 text-sm text-muted-foreground">{t(`stats.${s.key}`)}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-card py-20">
        <div className="container-luxe text-center">
          <SectionHeading title={t("about.certs")} />
          <Reveal className="mt-10 flex flex-wrap justify-center gap-4">
            {["ISO 9001", "CE Marking", "Egyptian Export Council", "ISO 14001", "Certificate of Origin"].map((c) => (
              <span key={c} className="flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm">
                <Award className="h-4 w-4 text-gold" /> {c}
              </span>
            ))}
          </Reveal>
        </div>
      </section>
    </div>
  );
}
