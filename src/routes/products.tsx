import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { SectionHeading } from "@/components/motion";
import { Collection } from "@/components/Collection";
import type { Product } from "@/lib/data";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products — Egyptian Marble & Granite Catalog | Nile Stone" },
      { name: "description", content: "Browse our premium catalog of Egyptian marble, granite, limestone and onyx with finishes and origins." },
    ],
  }),
  component: Products,
});

function Products() {
  const { t } = useTranslation();
  const inquire = (p: Product) => toast.success(`${t("products.inquire")}: ${p.name}`);
  return (
    <div className="pt-32 pb-24">
      <div className="container-luxe">
        <SectionHeading eyebrow={t("brandTag")} title={t("products.title")} subtitle={t("products.subtitle")} />
        <Collection onInquire={inquire} />
      </div>
    </div>
  );
}
