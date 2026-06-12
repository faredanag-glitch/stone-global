import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { products as allProducts, type Category, type Product } from "@/lib/data";
import { Reveal } from "@/components/motion";

const cats: (Category | "all")[] = ["all", "marble", "granite", "limestone", "onyx"];

export function Collection({
  showSearch = true,
  initial,
  onInquire,
}: {
  showSearch?: boolean;
  initial?: Product[];
  onInquire?: (p: Product) => void;
}) {
  const { t } = useTranslation();
  const [cat, setCat] = useState<Category | "all">("all");
  const [q, setQ] = useState("");
  const source = initial ?? allProducts;

  const filtered = useMemo(() => {
    return source.filter(
      (p) =>
        (cat === "all" || p.category === cat) &&
        p.name.toLowerCase().includes(q.toLowerCase()),
    );
  }, [cat, q, source]);

  return (
    <div>
      <div className="mt-10 flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex flex-wrap justify-center gap-2">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                cat === c
                  ? "border-gold bg-gold text-primary-foreground"
                  : "border-border hover:border-gold hover:text-gold"
              }`}
            >
              {t(`collection.${c}`)}
            </button>
          ))}
        </div>
        {showSearch && (
          <div className="relative w-full md:w-64">
            <Search className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t("collection.search")}
              className="w-full rounded-full border border-border bg-card py-2.5 ps-10 pe-4 text-sm outline-none focus:border-gold"
            />
          </div>
        )}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-16 text-center text-muted-foreground">{t("collection.empty")}</p>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 0.08}>
              <motion.div
                whileHover={{ y: -6 }}
                className="group overflow-hidden rounded-lg border border-border bg-card"
              >
                <div className="relative aspect-4/5 overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <span className="absolute start-3 top-3 rounded-full bg-background/80 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold backdrop-blur">
                    {t(`collection.${p.category}`)}
                  </span>
                </div>
                <div className="flex items-center justify-between p-5">
                  <div>
                    <h3 className="font-display text-lg">{p.name}</h3>
                    <p className="text-xs text-muted-foreground">{p.finish} · {p.origin}</p>
                  </div>
                  <button
                    onClick={() => onInquire?.(p)}
                    className="rounded-full border border-gold px-4 py-1.5 text-xs font-semibold text-gold transition-colors hover:bg-gold hover:text-primary-foreground"
                  >
                    {t("collection.inquire")}
                  </button>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
