import { Link, useRouterState } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useApp } from "@/lib/providers";
import { Moon, Sun, Menu, X, Gem } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  { to: "/", key: "home" },
  { to: "/products", key: "products" },
  { to: "/projects", key: "projects" },
  { to: "/export", key: "export" },
  { to: "/factory", key: "factory" },
  { to: "/about", key: "about" },
  { to: "/contact", key: "contact" },
] as const;

export function Header() {
  const { t } = useTranslation();
  const { theme, toggleTheme, lang, setLang } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="container-luxe flex h-20 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2">
          <Gem className="h-6 w-6 text-gold" />
          <span className="font-display text-lg font-semibold tracking-wide">{t("brand")}</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((l) => {
            const active = pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`relative text-sm font-medium transition-colors hover:text-gold ${
                  active ? "text-gold" : "text-foreground/80"
                }`}
              >
                {t(`nav.${l.key}`)}
                {active && (
                  <motion.span layoutId="nav-underline" className="absolute -bottom-1.5 inset-x-0 h-px bg-gold" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setLang(lang === "en" ? "ar" : "en")}
            className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold transition-colors hover:border-gold hover:text-gold"
            aria-label="Switch language"
          >
            {lang === "en" ? "العربية" : "EN"}
          </button>
          <button
            onClick={toggleTheme}
            className="rounded-full border border-border p-2 transition-colors hover:border-gold hover:text-gold"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <Link
            to="/contact"
            className="hidden rounded-full bg-gold px-5 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105 md:inline-block"
          >
            {t("nav.quote")}
          </Link>
          <button className="lg:hidden p-2" onClick={() => setOpen((o) => !o)} aria-label="Menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-border bg-background lg:hidden"
          >
            <div className="container-luxe flex flex-col py-4">
              {links.map((l) => (
                <Link key={l.to} to={l.to} className="py-3 text-sm font-medium hover:text-gold">
                  {t(`nav.${l.key}`)}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
