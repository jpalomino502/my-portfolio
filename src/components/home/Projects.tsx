"use client";
import { useEffect, useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import NextImage from "next/image";
import AthlosImg from "@/src/assets/images/projects/Athlos.png";
import ChefSyncImg from "@/src/assets/images/projects/chefsync.png";
import CondecoroImg from "@/src/assets/images/projects/condecoro.png";
import WebnovaImg from "@/src/assets/images/projects/webnova.png";

export default function Projects() {
  const t = useTranslations('Home.Projects'); 
  const tp = useTranslations('Projects');
  const horizontalSectionRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const [maxTranslate, setMaxTranslate] = useState(0);

  useEffect(() => {
    let rafId: number;

    const handleScroll = () => {
      if (horizontalSectionRef.current && scrollContainerRef.current) {
        const section = horizontalSectionRef.current;
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const windowHeight = window.innerHeight;

        const startScroll = sectionTop;
        const endScroll = sectionTop + sectionHeight - windowHeight;
        const currentScroll = window.scrollY;

        let percentage = 0;

        if (currentScroll >= startScroll && currentScroll <= endScroll) {
          const scrolled = currentScroll - startScroll;
          const maxScroll = endScroll - startScroll;
          percentage = (scrolled / maxScroll) * 100;
        } else if (currentScroll > endScroll) {
          percentage = 100;
        }

        rafId = requestAnimationFrame(() => {
          if (scrollContainerRef.current) {
            const translateValue = (percentage / 100) * maxTranslate;
            scrollContainerRef.current.style.transform = `translateX(-${translateValue}px)`;
          }
          if (progressBarRef.current) {
            progressBarRef.current.style.width = `${percentage}%`;
          }
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [maxTranslate]);

  useEffect(() => {
    const updateMaxTranslate = () => {
      if (scrollContainerRef.current) {
        const totalWidth = scrollContainerRef.current.scrollWidth;
        const viewportWidth = scrollContainerRef.current.clientWidth;
        const max = Math.max(totalWidth - viewportWidth, 0);
        setMaxTranslate(max);
      }
    };
    updateMaxTranslate();
    const el = scrollContainerRef.current;
    const ro = new ResizeObserver(updateMaxTranslate);
    if (el) ro.observe(el);
    const mo = new MutationObserver(updateMaxTranslate);
    if (el) mo.observe(el, { childList: true, subtree: true });
    const imgs = el?.querySelectorAll("img") || [];
    imgs.forEach((img) => {
      if (!(img as HTMLImageElement).complete) {
        (img as HTMLImageElement).addEventListener("load", updateMaxTranslate, { once: true });
      }
    });
    window.addEventListener("resize", updateMaxTranslate);
    window.addEventListener("load", updateMaxTranslate);
    return () => {
      window.removeEventListener("resize", updateMaxTranslate);
      window.removeEventListener("load", updateMaxTranslate);
      ro.disconnect();
      mo.disconnect();
      imgs.forEach((img) => {
        (img as HTMLImageElement).removeEventListener("load", updateMaxTranslate);
      });
    };
  }, []);

  const projects = tp.raw('items') as Array<{
    id: string;
    title: string;
    category: string;
    description: string;
    tags: string[];
    imageKey: string;
    url?: string;
  }>;

  const imageMap: Record<string, string> = {
    Athlos: AthlosImg.src,
    chefsync: ChefSyncImg.src,
    condecoro: CondecoroImg.src,
    webnova: WebnovaImg.src,
  };

  return (
    <section
      id="projects"
      ref={horizontalSectionRef}
      className="relative w-full h-[300vh] bg-white"
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-center">

        <div className="relative w-full px-8 md:px-12 mb-14 z-20">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-4xl font-urban md:text-5xl font-light text-black tracking-tight">
              {t('title')} <span className="text-[#486F99]">{t('titleSpan')}</span>
            </h3>
            <p className="text-gray-500 text-sm mt-2 font-mono">
              {t('scroll')}
            </p>
          </div>
        </div>

        <div className="px-8 md:px-12 w-full">
          <div
            ref={scrollContainerRef}
            className="flex gap-10 will-change-transform max-w-6xl mx-auto"
          >
            {projects.map((project) => (
              <div
                key={project.id}
                className="relative w-[85vw] md:w-[60vw] lg:w-[45vw] h-[60vh] shrink-0 group"
              >
                <div className="w-full h-full bg-white rounded-4xl overflow-hidden border border-black/10 relative transition-transform duration-500 group-hover:scale-[1.02]">
                  <NextImage
                    src={imageMap[project.imageKey]}
                    alt={project.title}
                    fill
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent opacity-100" />
                  <div className="absolute bottom-0 left-0 p-8 w-full">
                    <div className="flex justify-between items-center mb-4 border-b border-white/20 pb-4">
                      <span className="text-white text-xs font-mono border border-white px-2 py-1 rounded-full">
                        {project.category}
                      </span>
                      <span className="text-4xl font-mono text-white/60">{project.id}</span>
                    </div>

                    <div className="flex justify-between items-end gap-4">
                      <div className="flex-1">
                        <h4 className="text-4xl text-white font-medium mb-2">{project.title}</h4>
                        <p className="text-white/80 text-sm max-w-lg line-clamp-3 mb-4 font-light">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag, i) => (
                            <span key={i} className="text-[10px] uppercase tracking-wider text-white/70 bg-white/10 px-2 py-1 rounded-sm backdrop-blur-md border border-white/10">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shrink-0"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ArrowUpRight className="w-5 h-5 text-black" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-10 left-10 right-10 h-1 bg-black/10 rounded-full overflow-hidden">
          <div
            ref={progressBarRef}
            className="h-full bg-black"
            style={{ width: "0%" }}
          />
        </div>
      </div>
    </section>
  );
}
