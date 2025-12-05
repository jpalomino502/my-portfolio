"use client";
import { SocialIcon } from "react-social-icons";
import { FileText } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations('Home');
  const tHeader = useTranslations('Home.Header');
  const year = new Date().getFullYear();
  const scrollToId = (id: string) => {
    if (id === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <footer className="bg-black md:rounded-4xl md:m-4 text-white py-16">
      <div className=" max-w-6xl mx-auto w-full px-6 md:px-12 py-16">
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-8 border-b border-white/10 pb-10">
          <div className="text-left">
            <h4 className="text-3xl md:text-4xl font-light text-white tracking-tight">{t('Footer.idea')}</h4>
          </div>
          <a
            href="mailto:joseph.palomino0102@gmail.com"
            className="inline-flex items-center justify-center bg-[#486F99] text-black px-8 py-3 rounded-full hover:scale-110 transition-transform"
          >
            {t('Footer.talk')}
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pt-10">
          <div className="space-y-3 text-center md:text-left">
            <p className="text-xs text-[#486F99]">PORTFOLIO</p>
            <h5 className="text-2xl text-white font-light">Joseph</h5>
            <p className="text-sm text-gray-400">{t('Footer.role')}</p>
          </div>

          <nav className="grid grid-cols-2 gap-3 md:gap-2 text-white/80 justify-items-center md:justify-items-start text-center md:text-left">
            <button onClick={() => scrollToId("hero")} className="text-left hover:text-white transition-colors">{tHeader('home')}</button>
            <button onClick={() => scrollToId("about")} className="text-left hover:text-white transition-colors">{tHeader('about')}</button>
            <button onClick={() => scrollToId("data")} className="text-left hover:text-white transition-colors">{tHeader('data')}</button>
            <button onClick={() => scrollToId("projects")} className="text-left hover:text-white transition-colors">{tHeader('projects')}</button>
          </nav>

          <div className="flex items-center gap-4 justify-center md:justify-end">
            <SocialIcon
              url="https://www.linkedin.com/in/jpalomino502/"
              bgColor="transparent"
              fgColor="#ffffff"
              style={{ height: 40, width: 40, transition: "transform 0.1s ease-out" }}
              className="opacity-80 hover:opacity-100 hover:scale-105"
              target="_blank"
              rel="noopener noreferrer"
            />
            <SocialIcon
              url="mailto:joseph.palomino0102@gmail.com"
              bgColor="transparent"
              fgColor="#ffffff"
              style={{ height: 40, width: 40 }}
              className="opacity-80 hover:opacity-100 hover:scale-105"
              target="_blank"
            />
            <SocialIcon
              url="https://github.com/jpalomino502"
              bgColor="transparent"
              fgColor="#ffffff"
              style={{ height: 40, width: 40, transition: "transform 0.1s ease-out" }}
              className="opacity-80 hover:opacity-100 hover:scale-105"
              target="_blank"
              rel="noopener noreferrer"
            />
            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-80 hover:opacity-100 hover:scale-105 transition-transform flex items-center justify-center h-[40px] w-[40px]"
            >
              <FileText className="text-white h-[24px] w-[24px]" strokeWidth={1.4} />
            </a>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto w-full px-6 md:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-gray-500">© {year} Joseph. {t('Footer.rights')}</p>
        <p className="text-xs text-gray-500">{t('Footer.madeWith')}</p>
      </div>
    </footer>
  );
}
