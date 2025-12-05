"use client";
import { useEffect, useRef, useState } from "react";
import { SocialIcon } from "react-social-icons";
import { FileText } from "lucide-react";
import { useTranslations } from "next-intl";

interface VantaEffect {
  destroy: () => void;
}

interface Vanta {
  FOG: (options: Record<string, unknown>) => VantaEffect;
}

declare global {
  interface Window {
    VANTA: Vanta;
    THREE: unknown;
  }
}

export default function Hero() {
  const t = useTranslations('Home.Hero');
  const vantaRef = useRef<HTMLDivElement | null>(null);
  const [vantaEffect, setVantaEffect] = useState<VantaEffect | null>(null);
  const [ascii, setAscii] = useState("");
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const threeScriptSrc = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js";
    const vantaScriptSrc = "https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.fog.min.js";

    const loadScript = (src: string) =>
      new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve(true);
          return;
        }
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.onload = () => resolve(true);
        script.onerror = () => reject(new Error(`Error loading ${src}`));
        document.body.appendChild(script);
      });

    const initVanta = async () => {
      try {
        await loadScript(threeScriptSrc);
        await loadScript(vantaScriptSrc);

        let attempts = 0;
        while (!window.THREE && attempts < 20) {
          await new Promise((r) => setTimeout(r, 100));
          attempts++;
        }

        if (!window.THREE) {
          console.error("THREE.js failed to load or attach to window");
          return;
        }

        if (!vantaEffect && vantaRef.current && window.VANTA) {
          const effect = window.VANTA.FOG({
            el: vantaRef.current,
            THREE: window.THREE,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: window.innerHeight,
            minWidth: window.innerWidth,
            highlightColor: 0x1a1a1a,
            midtoneColor: 0x0a0a0a,
            lowlightColor: 0x000000,
            baseColor: 0x000000,
            blurFactor: 0.9,
            speed: 2.2,
            zoom: 1.2,
          });
          setVantaEffect(effect);
        }
      } catch (err) {
        console.error(err);
      }
    };

    initVanta();
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  useEffect(() => {
    fetch("/joseph-standard.txt")
      .then((res) => res.text())
      .then((text) => setAscii(text));
  }, []);

  return (
    <section
      id="hero"
      ref={vantaRef}
      className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-center items-center bg-black text-white"
    >
      <h1
        className="text-4xl md:text-5xl font-light tracking-tight text-center z-20 relative"
        style={{ transform: `translateY(${scrollY * 0.2}px) scaleY(1.05)` }}
      >
        {t('title1')} <br />
        {t('title2')}
      </h1>

      <div
        className="w-full md:w-[720px] h-[140px] flex justify-center items-center overflow-hidden z-20 relative"
        style={{ transform: `translateY(${scrollY * 0.15}px)` }}
      >
        <pre
          style={{
            fontFamily: "monospace",
            fontSize: "6px",
            lineHeight: "6px",
            letterSpacing: "0px",
            whiteSpace: "pre",
            margin: 0,
            padding: 0,
          }}
        >
          {ascii}
        </pre>
      </div>

      <p
        className="max-w-xl  text-neutral-400 text-base md:text-lg text-center z-20 relative"
        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
      >
        {t('subtitle')}
      </p>

      <div className="flex md:hidden items-center justify-center gap-4 mt-6 z-20">
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

      <aside className="hidden md:flex absolute right-0 md:right-4 bottom-6 z-40 flex-col items-center gap-4 mix-blend-difference">
        <SocialIcon
          url="https://www.linkedin.com/in/jpalomino502/"
          bgColor="transparent"
          fgColor="#ffffff"
          style={{ height: 50, width: 50, transition: "transform 0.1s ease-out" }}
          className="opacity-80 hover:opacity-100 hover:scale-105"
          target="_blank"
          rel="noopener noreferrer"
        />
        <SocialIcon
          url="mailto:joseph.palomino0102@gmail.com"
          bgColor="transparent"
          fgColor="#ffffff"
          style={{ height: 50, width: 50 }}
          className="opacity-80 hover:opacity-100 hover:scale-105"
          target="_blank"
        />
        <SocialIcon
          url="https://github.com/jpalomino502"
          bgColor="transparent"
          fgColor="#ffffff"
          style={{ height: 50, width: 50, transition: "transform 0.1s ease-out" }}
          className="opacity-80 hover:opacity-100 hover:scale-105"
          target="_blank"
          rel="noopener noreferrer"
        />

        <a
          href="/cv.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="opacity-80 hover:opacity-100 hover:scale-105 transition-transform flex items-center justify-center h-[50px] w-[50px]"
        >
          <FileText
            className="text-white h-[28px] w-[28px]"
            strokeWidth={1.4}
          />
        </a>
      </aside>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 opacity-70 hover:opacity-100 transition-opacity duration-300 cursor-pointer">
        <span className="text-[10px] tracking-widest uppercase  text-gray-500">{t('scroll')}</span>
        <div className="w-[30px] h-[50px] border-2 border-gray-400/30 rounded-full flex justify-center p-1 backdrop-blur-sm">
          <div className="w-1.5 h-3 bg-gray-400 rounded-full animate-bounce mt-1" />
        </div>
      </div>
    </section>
  );
}
