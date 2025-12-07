"use client";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/src/components/LanguageSwitcher";

export default function Header() {
  const t = useTranslations('Home.Header');
  const [hidden, setHidden] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    let inactivityTimer: NodeJS.Timeout;

    const startInactivityTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        setHidden(false);
      }, 2000);
    };

    const handleScroll = () => {
      if (isMobileMenuOpen) return;

      const current = window.scrollY;

      if (current > lastScroll && current > 50) {
        setHidden(true);
      } else if (current < lastScroll) {
        setHidden(false);
      }

      setLastScroll(current);
      startInactivityTimer();
    };

    const handleActivity = () => {
      startInactivityTimer();
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("touchmove", handleActivity);

    startInactivityTimer();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("touchmove", handleActivity);
      clearTimeout(inactivityTimer);
    };
  }, [lastScroll, isMobileMenuOpen]);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    if (id === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 z-50 
          px-6 md:px-20 font-normal mix-blend-difference text-white
          transition-transform duration-500 ease-out
          ${hidden && !isMobileMenuOpen ? "-translate-y-full" : "translate-y-0"}
        `}
      >
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between py-6 md:px-10 relative">

          <nav className="hidden md:flex items-center gap-6 w-1/3 justify-start">
            <button
              onClick={() => scrollToSection("about")}
              className="text-xl  cursor-pointer text-white/80 hover:text-white transition"
            >
              {t('about')}
            </button>
            <a
              href="/"
              className="text-xl  cursor-pointer text-white/80 hover:text-white transition"
            >
              {t('home')}
            </a>
          </nav>

          <h1 className="font-urban text-3xl md:text-4xl text-white w-auto md:w-1/3 text-left md:text-center z-50 relative">
            Joseph
          </h1>

          <button
            className="md:hidden z-50 relative p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          <nav className="hidden md:flex items-center gap-6 w-1/3 justify-end">
            <button
              onClick={() => scrollToSection("data")}
              className="text-xl  cursor-pointer text-white/80 hover:text-white transition"
            >
              {t('data')}
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="text-xl  cursor-pointer text-white/80 hover:text-white transition"
            >
              {t('projects')}
            </button>
            <LanguageSwitcher className="ml-4" />
          </nav>
        </div>
      </header>

      <div
        className={`
          fixed inset-0 bg-black/95 backdrop-blur-sm z-40 flex flex-col items-center justify-center gap-8
          transition-all duration-300 ease-in-out md:hidden
          ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}
        `}
      >
        <div className="absolute top-6 right-6">
          <LanguageSwitcher />
        </div>
        <nav className="flex flex-col items-center gap-8 text-2xl  text-white">
          <button onClick={() => scrollToSection("hero")} className="hover:text-gray-400 transition">
            {t('home')}
          </button>
          <button onClick={() => scrollToSection("about")} className="hover:text-gray-400 transition">
            {t('about')}
          </button>
          <button onClick={() => scrollToSection("data")} className="hover:text-gray-400 transition">
            {t('data')}
          </button>
          <button onClick={() => scrollToSection("projects")} className="hover:text-gray-400 transition">
            {t('projects')}
          </button>
        </nav>
      </div>
    </>
  );
}
