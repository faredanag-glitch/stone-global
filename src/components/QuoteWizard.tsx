import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { toast } from "sonner";
import { exportCountries } from "@/lib/data";

const inputCls =
  "w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-gold";

export function QuoteWizard() {
  const { t } = useTranslation();
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    product: "marble", quantity: "", dimensions: "", destination: "",
    name: "", email: "", phone: "", message: "",
  });
  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));
  const steps = ["s1", "s2", "s3", "s4", "s5"];

  const submit = () => {
    setDone(true);
    toast.success(t("quote.success"));
  };

  if (done) {
    return (
      <div className="mx-auto mt-12 max-w-xl rounded-2xl border border-gold bg-card p-12 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold">
          <Check className="h-8 w-8 text-primary-foreground" />
        </div>
        <p className="mt-6 font-display text-2xl">{t("quote.success")}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-12 max-w-xl rounded-2xl border border-border bg-card p-6 md:p-10">
      <div className="mb-8 flex items-center gap-2">
        {steps.map((_, i) => (
          <div key={i} className="flex-1">
            <div className={`h-1.5 rounded-full transition-colors ${i <= step ? "bg-gold" : "bg-border"}`} />
          </div>
        ))}
      </div>
      <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-gold">
        {t("quote.step")} {step + 1} {t("quote.of")} 5
      </p>
      <h3 className="mb-6 font-display text-2xl">{t(`quote.${steps[step]}`)}</h3>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          {step === 0 && (
            <select className={inputCls} value={form.product} onChange={(e) => set("product", e.target.value)}>
              {["marble", "granite", "limestone", "onyx"].map((c) => (
                <option key={c} value={c}>{t(`collection.${c}`)}</option>
              ))}
            </select>
          )}
          {step === 1 && (
            <input className={inputCls} type="number" placeholder={t("quote.quantity")} value={form.quantity} onChange={(e) => set("quantity", e.target.value)} />
          )}
          {step === 2 && (
            <input className={inputCls} placeholder={t("quote.dimensions")} value={form.dimensions} onChange={(e) => set("dimensions", e.target.value)} />
          )}
          {step === 3 && (
            <select className={inputCls} value={form.destination} onChange={(e) => set("destination", e.target.value)}>
              <option value="">{t("quote.destination")}</option>
              {exportCountries.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          )}
          {step === 4 && (
            <div className="space-y-4">
              <input className={inputCls} placeholder={t("quote.name")} value={form.name} onChange={(e) => set("name", e.target.value)} />
              <input className={inputCls} type="email" placeholder={t("quote.email")} value={form.email} onChange={(e) => set("email", e.target.value)} />
              <input className={inputCls} placeholder={t("quote.phone")} value={form.phone} onChange={(e) => set("phone", e.target.value)} />
              <textarea className={inputCls} rows={3} placeholder={t("quote.message")} value={form.message} onChange={(e) => set("message", e.target.value)} />
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 flex justify-between gap-4">
        <button
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="rounded-full border border-border px-6 py-2.5 text-sm font-semibold disabled:opacity-40"
        >
          {t("quote.back")}
        </button>
        {step < 4 ? (
          <button onClick={() => setStep((s) => s + 1)} className="rounded-full bg-gold px-8 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105">
            {t("quote.next")}
          </button>
        ) : (
          <button onClick={submit} className="rounded-full bg-gold px-8 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105">
            {t("quote.submit")}
          </button>
        )}
      </div>
    </div>
  );
}
