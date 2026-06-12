import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { toast } from "sonner";
import { Ship, Package, Boxes, FileCheck, ClipboardList, Search } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/motion";
import { exportCountries } from "@/lib/data";
import shipping from "@/assets/export-shipping.jpg";

export const Route = createFileRoute("/export")({
  head: () => ({
    meta: [
      { title: "Export Services — Worldwide Marble & Granite Shipping | Nile Stone" },
      { name: "description", content: "Egyptian marble & granite export: process, packaging, container loading and international shipping to 20+ countries." },
    ],
  }),
  component: ExportPage,
});

const process = [
  { k: "p1", Icon: ClipboardList }, { k: "p2", Icon: Search }, { k: "p3", Icon: Boxes },
  { k: "p4", Icon: FileCheck }, { k: "p5", Icon: Package }, { k: "p6", Icon: Ship },
];
const pkgs = ["pkg1", "pkg2", "pkg3"];
const inputCls = "w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-gold";

function ExportPage() {
  const { t } = useTranslation();
  const [sent, setSent] = useState(false);

  return (
    <div className="pb-24">
      <section className="relative flex h-[60vh] min-h-[420px] items-center justify-center overflow-hidden">
        <img src={shipping} alt="Marble export shipping" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="container-luxe relative z-10 text-center text-white">
          <h1 className="font-display text-4xl font-semibold md:text-6xl">{t("exportPage.title")}</h1>
          <p className="mt-4 text-lg text-white/80">{t("exportPage.subtitle")}</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container-luxe">
          <SectionHeading title={t("exportPage.process")} />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {process.map(({ k, Icon }, i) => (
              <Reveal key={k} delay={(i % 3) * 0.08}>
                <div className="h-full rounded-xl border border-border bg-card p-7">
                  <Icon className="h-7 w-7 text-gold" />
                  <h3 className="mt-4 text-lg font-semibold">{t(`exportPage.${k}`)}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{t(`exportPage.${k}d`)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-card py-20">
        <div className="container-luxe">
          <SectionHeading title={t("exportPage.packaging")} />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {pkgs.map((k, i) => (
              <Reveal key={k} delay={i * 0.08}>
                <div className="h-full rounded-xl border border-border bg-background p-7">
                  <Package className="h-7 w-7 text-gold" />
                  <h3 className="mt-4 text-lg font-semibold">{t(`exportPage.${k}`)}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{t(`exportPage.${k}d`)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-luxe">
          <SectionHeading title={t("exportPage.countries")} />
          <Reveal className="mt-10 flex flex-wrap justify-center gap-3">
            {exportCountries.map((c) => (
              <span key={c} className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground">{c}</span>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="py-10">
        <div className="container-luxe max-w-2xl">
          <SectionHeading title={t("exportPage.inquiryTitle")} />
          {sent ? (
            <p className="mt-10 rounded-xl border border-gold bg-card p-8 text-center font-display text-xl">{t("exportPage.sent")}</p>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); setSent(true); toast.success(t("exportPage.sent")); }}
              className="mt-10 grid gap-4 rounded-2xl border border-border bg-card p-6 md:p-8"
            >
              <input required className={inputCls} placeholder={t("exportPage.inquiryName")} />
              <input required type="email" className={inputCls} placeholder={t("exportPage.inquiryEmail")} />
              <select className={inputCls} defaultValue=""><option value="" disabled>{t("exportPage.inquiryCountry")}</option>{exportCountries.map((c) => <option key={c}>{c}</option>)}</select>
              <input className={inputCls} placeholder={t("exportPage.inquiryProduct")} />
              <input className={inputCls} placeholder={t("exportPage.inquiryQty")} />
              <textarea rows={4} className={inputCls} placeholder={t("exportPage.inquiryMsg")} />
              <button className="rounded-full bg-gold px-8 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]">{t("exportPage.send")}</button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
