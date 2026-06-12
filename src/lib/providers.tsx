import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import "../i18n";

type Theme = "light" | "dark";
type Lang = "en" | "ar";

interface AppCtx {
  theme: Theme;
  toggleTheme: () => void;
  lang: Lang;
  setLang: (l: Lang) => void;
  dir: "ltr" | "rtl";
}

const Ctx = createContext<AppCtx | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const { i18n } = useTranslation();
  const [theme, setTheme] = useState<Theme>("dark");
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const storedTheme = (localStorage.getItem("theme") as Theme) || "dark";
    const storedLang = (localStorage.getItem("lang") as Lang) || "en";
    setTheme(storedTheme);
    setLangState(storedLang);
    i18n.changeLanguage(storedLang);
  }, [i18n]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.setAttribute("dir", dir);
    document.documentElement.setAttribute("lang", lang);
    localStorage.setItem("lang", lang);
    i18n.changeLanguage(lang);
  }, [lang, i18n]);

  const value: AppCtx = {
    theme,
    toggleTheme: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
    lang,
    setLang: (l) => setLangState(l),
    dir: lang === "ar" ? "rtl" : "ltr",
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useApp() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
