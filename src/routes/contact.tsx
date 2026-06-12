import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { toast } from "sonner";
import { Phone, Mail, MessageCircle, Clock, MapPin } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/motion";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Request a Marble & Granite Quote | Nile Stone" },
      { name: "description", content: "Contact our export team by phone, WhatsApp or email for premium Egyptian marble & granite quotations." },
    ],
  }),
  component: Contact,
});

const inputCls = "w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-gold";

function Contact() {
  const { t } = useTranslation();
  const [sent, setSent] = useState(false);
  const info = [
    { Icon: Phone, label: t("contact.phoneLabel"), value: "+20 100 000 0000" },
    { Icon: MessageCircle, label: t("contact.whatsapp"), value: "+20 100 000 0000" },
    { Icon: Mail, label: t("contact.emailLabel"), value: "export@nilestone.com" },
    { Icon: Clock, label: t("contact.hours"), value: t("contact.hoursText") },
    { Icon: MapPin, label: t("contact.findUs"), value: t("contact.address") },
  ];

  return (
    <div className="pt-32 pb-24">
      <div className="container-luxe">
        <SectionHeading eyebrow={t("brandTag")} title={t("contact.title")} subtitle={t("contact.subtitle")} />

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          <Reveal>
            <div className="grid gap-4">
              {info.map(({ Icon, label, value }) => (
                <div key={label} className="flex items-start gap-4 rounded-xl border border-border bg-card p-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold"><Icon className="h-5 w-5" /></div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{label}</p>
                    <p className="mt-1 font-medium">{value}</p>
                  </div>
                </div>
              ))}
              <div className="overflow-hidden rounded-xl border border-border">
                <iframe
                  title={t("contact.findUs")}
                  className="h-64 w-full"
                  loading="lazy"
                  src="https://www.google.com/maps?q=Cairo,Egypt&output=embed"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            {sent ? (
              <div className="flex h-full items-center justify-center rounded-2xl border border-gold bg-card p-10 text-center">
                <p className="font-display text-2xl">{t("contact.sent")}</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); setSent(true); toast.success(t("contact.sent")); }}
                className="grid gap-4 rounded-2xl border border-border bg-card p-6 md:p-8"
              >
                <input required className={inputCls} placeholder={t("contact.name")} />
                <input required type="email" className={inputCls} placeholder={t("contact.email")} />
                <input className={inputCls} placeholder={t("contact.phone")} />
                <textarea required rows={6} className={inputCls} placeholder={t("contact.message")} />
                <button className="rounded-full bg-gold px-8 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]">{t("contact.send")}</button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </div>
  );
}
