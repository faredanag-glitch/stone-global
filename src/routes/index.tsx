import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Globe, Award, Cog, Tag, Zap, Headphones, ArrowRight, MapPin,
} from "lucide-react";
import heroImg from "@/assets/hero.webp";
import { Reveal, Counter, SectionHeading } from "@/components/motion";
import { Collection } from "@/components/Collection";
import { SlabShowcase } from "@/components/SlabShowcase";
import { Testimonials } from "@/components/Testimonials";
import { QuoteWizard } from "@/components/QuoteWizard";
import { heroStats, applications, projects, exportCountries } from "@/lib/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nile Stone — Egyptian Marble & Granite Crafted For The World" },
      { name: "description", content: "Premium Egyptian marble & granite manufacturer and exporter. Slabs, projects and worldwide export for luxury developments." },
    ],
    links: [
      { rel: "preload", as: "image", href: heroImg, fetchpriority: "high" },
    ],
  }),
  component: Home,
});

const whyIcons = [Award, Globe, Cog, Tag, Zap, Headphones];

function Home() {
  const { t } = useTranslation();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <>
      {/* SECTION 1 — HERO */}
      <section ref={heroRef} className="relative flex h-screen min-h-[640px] items-center justify-center overflow-hidden">
        <motion.img
          src={heroImg}
          alt="Egyptian marble quarry and factory"
          fetchPriority="high"
          decoding="async"
          style={{ y }}
          className="absolute inset-0 h-[120%] w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background" />
        <motion.div style={{ opacity }} className="container-luxe relative z-10 text-center text-white">
          <motion.span
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="mb-5 inline-block text-xs font-semibold uppercase tracking-[0.35em] text-gold"
          >
            {t("hero.eyebrow")}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 }}
            className="mx-auto max-w-4xl font-display text-4xl font-semibold leading-[1.1] md:text-7xl"
          >
            {t("hero.title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.25 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-white/80"
          >
            {t("hero.subtitle")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.4 }}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            <Link to="/products" className="rounded-full bg-gold px-8 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105">
              {t("hero.cta1")}
            </Link>
            <a href="#quote" className="rounded-full border border-white/40 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/10">
              {t("hero.cta2")}
            </a>
          </motion.div>

          {/* animated statistics overlay */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.6 }}
            className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-6 border-t border-white/15 pt-8 md:grid-cols-4"
          >
            {heroStats.map((s) => (
              <div key={s.key}>
                <div className="font-display text-2xl font-semibold text-gold md:text-4xl">
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-1 text-xs text-white/70 md:text-sm">{t(`stats.${s.key}`)}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* SECTION 2 — HIGHLIGHTS */}
      <section className="bg-grain py-24">
        <div className="container-luxe">
          <SectionHeading title={t("highlights.title")} subtitle={t("highlights.subtitle")} />
          <div className="mt-14 grid grid-cols-2 gap-6 md:grid-cols-4">
            {heroStats.map((s, i) => (
              <Reveal key={s.key} delay={i * 0.08}>
                <div className="rounded-xl border border-border bg-card p-8 text-center">
                  <div className="font-display text-3xl font-semibold text-gold md:text-5xl">
                    <Counter value={s.value} suffix={s.suffix} />
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">{t(`stats.${s.key}`)}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — COLLECTION */}
      <section className="py-24">
        <div className="container-luxe">
          <SectionHeading eyebrow={t("brandTag")} title={t("collection.title")} subtitle={t("collection.subtitle")} />
          <Collection />
          <div className="mt-12 text-center">
            <Link to="/products" className="inline-flex items-center gap-2 text-sm font-semibold text-gold hover:gap-3 transition-all">
              {t("collection.viewAll")} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 4 — SLAB SHOWCASE */}
      <section className="bg-card py-24">
        <div className="container-luxe">
          <SectionHeading title={t("showcase.title")} subtitle={t("showcase.subtitle")} />
          <SlabShowcase />
        </div>
      </section>

      {/* SECTION 5 — APPLICATIONS */}
      <section className="py-24">
        <div className="container-luxe">
          <SectionHeading title={t("applications.title")} subtitle={t("applications.subtitle")} />
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {applications.map((a, i) => (
              <Reveal key={a.key} delay={(i % 3) * 0.08}>
                <div className="group relative aspect-4/3 overflow-hidden rounded-lg">
                  <img src={a.image} alt={t(`applications.${a.key}`)} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <h3 className="absolute bottom-5 start-5 font-display text-xl text-white">{t(`applications.${a.key}`)}</h3>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 — GLOBAL EXPORT MAP */}
      <section className="relative overflow-hidden bg-[#0B0B0B] py-24 text-white">
        <div className="container-luxe">
          <SectionHeading title={t("map.title")} subtitle={t("map.subtitle")} />
          <div className="mt-14 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <Reveal className="relative">
              <div className="relative aspect-2/1 rounded-xl border border-white/10 bg-white/5">
                <svg viewBox="0 0 800 400" className="h-full w-full opacity-30">
                  <path fill="currentColor" className="text-gold" d="M120 140q40-30 90-20t70 30 80-10 90 20 70-5 90 25 60 30v90q-60 20-130 10t-120 10-110-15-90 10-100-20-70-30z" />
                </svg>
                {[
                  { x: "22%", y: "40%" }, { x: "48%", y: "35%" }, { x: "55%", y: "50%" },
                  { x: "70%", y: "42%" }, { x: "80%", y: "55%" }, { x: "35%", y: "60%" },
                ].map((p, i) => (
                  <motion.span
                    key={i}
                    style={{ left: p.x, top: p.y }}
                    className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold"
                    animate={{ scale: [1, 1.8, 1], opacity: [1, 0.4, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  />
                ))}
              </div>
            </Reveal>
            <div className="grid gap-6">
              {[
                { v: 20, s: "+", k: "countriesServed" },
                { v: 500, s: "+", k: "projectsDone" },
                { v: 1200, s: "+", k: "containers" },
              ].map((m) => (
                <Reveal key={m.k}>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                    <div className="font-display text-4xl font-semibold text-gold">
                      <Counter value={m.v} suffix={m.s} />
                    </div>
                    <div className="mt-1 text-sm text-white/70">{t(`map.${m.k}`)}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal className="mt-10 flex flex-wrap justify-center gap-3">
            {exportCountries.slice(0, 14).map((c) => (
              <span key={c} className="flex items-center gap-1.5 rounded-full border border-white/10 px-4 py-1.5 text-xs text-white/70">
                <MapPin className="h-3 w-3 text-gold" /> {c}
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      {/* SECTION 7 — FACTORY JOURNEY */}
      <section className="py-24">
        <div className="container-luxe">
          <SectionHeading title={t("journey.title")} subtitle={t("journey.subtitle")} />
          <div className="relative mt-16">
            <div className="absolute start-4 top-0 hidden h-full w-px bg-border md:block" />
            <div className="grid gap-6 md:grid-cols-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <Reveal key={i} delay={(i % 2) * 0.1}>
                  <div className="relative rounded-xl border border-border bg-card p-6">
                    <span className="font-display text-5xl font-semibold text-gold/20">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-2 text-lg font-semibold">{t(`journey.s${i + 1}`)}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{t(`journey.d${i + 1}`)}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8 — FEATURED PROJECTS */}
      <section className="bg-card py-24">
        <div className="container-luxe">
          <SectionHeading title={t("featured.title")} subtitle={t("featured.subtitle")} />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 6).map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) * 0.08}>
                <div className="group overflow-hidden rounded-lg border border-border bg-background">
                  <div className="relative aspect-3/2 overflow-hidden">
                    <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <span className="absolute start-3 top-3 rounded-full bg-gold px-3 py-1 text-xs font-semibold text-primary-foreground">
                      {t(`featured.${p.sector}`)}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg">{p.name}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{p.country} · {p.material}</p>
                    <p className="mt-3 text-sm">{p.type} — {p.scope}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link to="/projects" className="inline-flex items-center gap-2 text-sm font-semibold text-gold hover:gap-3 transition-all">
              {t("nav.projects")} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 9 — WHY CHOOSE US */}
      <section className="py-24">
        <div className="container-luxe">
          <SectionHeading title={t("why.title")} subtitle={t("why.subtitle")} />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyIcons.map((Icon, i) => (
              <Reveal key={i} delay={(i % 3) * 0.08}>
                <div className="group h-full rounded-xl border border-border bg-card p-8 transition-colors hover:border-gold">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 text-gold transition-colors group-hover:bg-gold group-hover:text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold">{t(`why.r${i + 1}`)}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{t(`why.r${i + 1}d`)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 10 — TESTIMONIALS */}
      <section className="bg-card py-24">
        <div className="container-luxe">
          <SectionHeading title={t("testimonials.title")} subtitle={t("testimonials.subtitle")} />
          <Testimonials />
        </div>
      </section>

      {/* SECTION 11 — QUOTE WIZARD */}
      <section id="quote" className="scroll-mt-24 py-24">
        <div className="container-luxe">
          <SectionHeading title={t("quote.title")} subtitle={t("quote.subtitle")} />
          <QuoteWizard />
        </div>
      </section>
    </>
  );
}
