import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useMemo, useState } from "react";
import { Reveal, SectionHeading } from "@/components/motion";
import { projects } from "@/lib/data";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Global Marble & Granite Portfolio | Nile Stone" },
      { name: "description", content: "Explore landmark hotels, malls, residences and government projects built with Egyptian stone." },
    ],
  }),
  component: Projects,
});

const sectors = ["all", "hotels", "malls", "residential", "government", "commercial"];

function Projects() {
  const { t } = useTranslation();
  const [sector, setSector] = useState("all");
  const [country, setCountry] = useState("all");
  const countries = useMemo(() => ["all", ...Array.from(new Set(projects.map((p) => p.country)))], []);

  const filtered = projects.filter(
    (p) => (sector === "all" || p.sector === sector) && (country === "all" || p.country === country),
  );

  return (
    <div className="pt-32 pb-24">
      <div className="container-luxe">
        <SectionHeading eyebrow={t("brandTag")} title={t("projectsPage.title")} subtitle={t("projectsPage.subtitle")} />

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {sectors.map((s) => (
            <button
              key={s}
              onClick={() => setSector(s)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                sector === s ? "border-gold bg-gold text-primary-foreground" : "border-border hover:border-gold hover:text-gold"
              }`}
            >
              {s === "all" ? t("collection.all") : t(`featured.${s}`)}
            </button>
          ))}
          <select value={country} onChange={(e) => setCountry(e.target.value)} className="rounded-full border border-border bg-card px-4 py-2 text-sm outline-none focus:border-gold">
            {countries.map((c) => <option key={c} value={c}>{c === "all" ? t("projectsPage.filterCountry") : c}</option>)}
          </select>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 0.08}>
              <div className="group overflow-hidden rounded-lg border border-border bg-card">
                <div className="relative aspect-3/2 overflow-hidden">
                  <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <span className="absolute start-3 top-3 rounded-full bg-gold px-3 py-1 text-xs font-semibold text-primary-foreground">{t(`featured.${p.sector}`)}</span>
                </div>
                <div className="space-y-1 p-5 text-sm">
                  <h3 className="font-display text-lg">{p.name}</h3>
                  <p className="text-muted-foreground">{t("featured.country")}: {p.country}</p>
                  <p className="text-muted-foreground">{t("featured.material")}: {p.material}</p>
                  <p className="text-muted-foreground">{t("featured.type")}: {p.type}</p>
                  <p className="text-muted-foreground">{t("featured.scope")}: {p.scope}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
