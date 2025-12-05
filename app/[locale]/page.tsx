"use client";

import { useEffect, useState } from "react";
import { useRouter } from "@/src/i18n/routing";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/src/components/LanguageSwitcher";

export default function SelectorPage() {
  const router = useRouter();
  const t = useTranslations('Selector');
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredSide, setHoveredSide] = useState<'creative' | 'professional' | null>(null);


  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedPreference = localStorage.getItem("portfolio_preference");
      if (savedPreference) {
        router.push(savedPreference);
        setTimeout(() => setIsLoading(false), 1000);
      } else {
        setTimeout(() => setIsLoading(false), 0);
      }
    }
  }, [router]);

  const handleSelection = (path: string) => {
    if (dontShowAgain) {
      localStorage.setItem("portfolio_preference", path);
    }
    router.push(path);
  };

  if (isLoading) return null;

  const getWidthClass = (side: 'creative' | 'professional') => {
    if (hoveredSide === null) return 'md:w-1/2';
    return hoveredSide === side ? 'md:w-[70%]' : 'md:w-[30%]';
  };

  return (
    <>
      <main className="flex flex-col md:flex-row h-screen w-full overflow-hidden bg-black text-white relative">

        <div className="absolute top-6 right-6 z-50 mix-blend-difference">
          <LanguageSwitcher className="ml-4" />
        </div>

        <div
          className="absolute top-12 left-1/2 -translate-x-1/2 z-50 pointer-events-none mix-blend-difference opacity-100"
        >
          <p className="text-white font-clean text-[10px] md:text-xs tracking-[0.3em] uppercase whitespace-nowrap font-medium">
            {t('title')}
          </p>
        </div>


        <div
          onMouseEnter={() => setHoveredSide('creative')}
          onMouseLeave={() => setHoveredSide(null)}
          onClick={() => handleSelection("/home")}
          className={`
            relative h-[50vh] md:h-screen transition-all duration-700 ease-in-out cursor-pointer overflow-hidden
            bg-neutral-900 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-neutral-800
            ${getWidthClass('creative')}
          `}
        >
          <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none" />
          <div className="absolute inset-0 bg-black opacity-60" />
          <div className="relative z-10 flex flex-col items-center p-6 text-center">
            <div className={`transition-all duration-500 ${hoveredSide === 'creative' ? 'scale-110 mb-6' : 'scale-100 mb-4'}`}>
            </div>

            <h2 className={`font-urban text-3xl md:text-6xl lg:text-7xl text-white transition-all duration-500 ${hoveredSide === 'professional' ? 'opacity-50 blur-sm scale-90' : 'opacity-100 scale-100'}`}>
              {t('creative')}
            </h2>

            <p className={`mt-4  text-neutral-400 uppercase tracking-[0.2em] text-xs md:text-sm transition-all duration-500 delay-100 ${hoveredSide === 'creative' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              {t('creativeDesc')}
            </p>

            <div className={`mt-8 px-6 py-2 border border-[#486F99] rounded-full text-[#486F99] text-sm font-urban opacity-0 transition-all duration-500 ${hoveredSide === 'creative' ? 'opacity-100 translate-y-0' : 'translate-y-8'}`}>
              {t('viewPortfolio')}
            </div>
          </div>
        </div>

        <div
          onMouseEnter={() => setHoveredSide('professional')}
          onMouseLeave={() => setHoveredSide(null)}
          onClick={() => handleSelection("/hr")}
          className={`
            relative h-[50vh] md:h-screen transition-all duration-700 ease-in-out cursor-pointer overflow-hidden
            bg-white text-black flex flex-col items-center justify-center
            ${getWidthClass('professional')}
          `}
        >
          <div className="absolute inset-0 bg-grid-dots opacity-40 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-transparent opacity-50" />
          <div className="relative z-10 flex flex-col items-center p-6 text-center">
            <div className={`transition-all duration-500 ${hoveredSide === 'professional' ? 'scale-110 mb-6' : 'scale-100 mb-4'}`}>
            </div>

            <h2 className={` text-4xl md:text-6xl lg:text-7xl text-black tracking-tight transition-all duration-500 ${hoveredSide === 'creative' ? 'opacity-40 blur-[2px] scale-90' : 'opacity-100 scale-100'}`}>
              {t('professional')}
            </h2>

            <p className={`mt-4  text-zinc-900 font-medium tracking-wide text-xs md:text-sm transition-all duration-500 delay-100 ${hoveredSide === 'professional' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              {t('professionalDesc')}
            </p>

            <div className={`mt-8 px-6 py-2 border border-black rounded-full text-black text-sm  font-semibold opacity-0 transition-all duration-500 ${hoveredSide === 'professional' ? 'opacity-100 translate-y-0' : 'translate-y-8'}`}>
              {t('viewPortfolio')}
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 mix-blend-difference">
          <div
            className="group flex items-center gap-3 px-5 py-2.5 rounded-full cursor-pointer transition-all"
            onClick={(e) => {
              e.stopPropagation();
              setDontShowAgain(!dontShowAgain);
            }}
          >
            <div
              className={`w-4 h-4 border rounded flex items-center justify-center transition-colors ${dontShowAgain ? "bg-white border-white" : "border-white/50 bg-transparent"}`}
            >
              {dontShowAgain && <Check className="w-3 h-3 text-black" strokeWidth={3} />}
            </div>
            <span className="text-xs text-white tracking-wide select-none group-hover:opacity-80 transition-opacity">
              {t('dontShowAgain')}
            </span>
          </div>
        </div>

      </main>
    </>
  );
}
