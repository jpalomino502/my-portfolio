"use client";
import { useEffect, useState, useRef } from "react";
import Joseph from "@/src/assets/images/joseph.jpg";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  animation?: "fade-up" | "scale" | "slide-left" | "zoom-in";
  delay?: number;
}

function useOnScreen<T extends Element>(ref: React.RefObject<T | null>) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
    }, { threshold: 0.2 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
  return visible;
}

const Reveal = ({ children, className = "", animation = "fade-up", delay = 0 }: RevealProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isVisible = useOnScreen(ref);
  const getTransform = () => {
    switch (animation) {
      case "fade-up":
        return isVisible ? "translateY(0)" : "translateY(50px)";
      case "scale":
        return isVisible ? "scale(1)" : "scale(0.8)";
      case "slide-left":
        return isVisible ? "translateX(0)" : "translateX(-50px)";
      case "zoom-in":
        return isVisible ? "scale(1)" : "scale(1.1)";
      default:
        return "none";
    }
  };
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${className}`}
      style={{ opacity: isVisible ? 1 : 0, transform: getTransform(), transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default function AboutSection() {
  const t = useTranslations('Home.About');

  return (
    <section id="about" className="relative z-10 w-full min-h-screen rounded-t-4xl bg-white text-black py-16 md:py-32 px-8 md:px-12 border-t border-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
        <div className="space-y-12">
          <Reveal animation="fade-up">
            <h2 className="text-4xl md:text-5xl font-light tracking-tighter mb-8">
              {t('title')} <span className="text-[#486F99]">{t('titleSpan')}</span> {t('titleRole')}
            </h2>
          </Reveal>

          <Reveal animation="fade-up" delay={200}>
            <p
              className="text-xl md:text-2xl text-gray-800 leading-relaxed font-light max-w-lg"
              dangerouslySetInnerHTML={{ __html: t.raw('description1') }}
            />
          </Reveal>

          <Reveal animation="fade-up" delay={300} className="relative h-[400px] w-full my-8 lg:hidden rounded-4xl overflow-hidden">
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={Joseph}
                alt="Joseph"
                fill
                className="absolute inset-0 w-full h-full object-cover grayscale"
              />
            </div>
            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-60" />
          </Reveal>

          <Reveal animation="fade-up" delay={400}>
            <p className="text-xl md:text-2xl text-gray-800 leading-relaxed font-light max-w-lg">
              {t('description2')}
            </p>
          </Reveal>
        </div>

        <Reveal animation="fade-up" delay={200} className="relative h-[400px] md:h-[600px] w-full hidden lg:block">
          <div className="absolute inset-0 bg-gray-200 rounded-4xl overflow-hidden group">
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={Joseph}
                alt="Joseph work"
                fill
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 grayscale"
              />
            </div>
            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-60" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
