import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Gem, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="border-t border-border bg-card">
      <div className="container-luxe grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-2">
            <Gem className="h-6 w-6 text-gold" />
            <span className="font-display text-lg font-semibold">{t("brand")}</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">{t("footer.tag")}</p>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-gold">{t("footer.explore")}</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/products" className="hover:text-gold">{t("nav.products")}</Link></li>
            <li><Link to="/projects" className="hover:text-gold">{t("nav.projects")}</Link></li>
            <li><Link to="/export" className="hover:text-gold">{t("nav.export")}</Link></li>
            <li><Link to="/factory" className="hover:text-gold">{t("nav.factory")}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-gold">{t("footer.company")}</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-gold">{t("nav.about")}</Link></li>
            <li><Link to="/contact" className="hover:text-gold">{t("nav.contact")}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-gold">{t("footer.contact")}</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-gold" /> +20 100 000 0000</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-gold" /> export@nilestone.com</li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-gold" /> {t("contact.address")}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-6">
        <p className="container-luxe text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} {t("brand")}. {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
}
