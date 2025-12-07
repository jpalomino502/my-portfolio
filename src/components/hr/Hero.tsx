"use client";

import { forwardRef } from "react";
import joseph from "@/src/assets/images/joseph.jpg";
import { useTranslations } from "next-intl";
import NextImage from "next/image";

const Hero = forwardRef<HTMLElement>((props, ref) => {
    const t = useTranslations('HR.Hero');
    return (
        <header
            id="intro"
            ref={ref}
            className="min-h-screen flex items-center justify-center py-10 lg:py-20 opacity-0 animate-in fade-in duration-700 fill-mode-forwards"
        >
            <div className="container mx-auto px-4 flex flex-col lg:grid lg:grid-cols-2 lg:gap-16 items-center lg:items-start w-full max-w-6xl">

                <div className="space-y-6 lg:space-y-8 flex-1 w-full order-1 lg:order-0">

                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 text-xs font-medium text-zinc-600 tracking-wide uppercase w-fit">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        {t('available')}
                    </div>

                    <div className="flex flex-row items-center justify-between gap-4">
                        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-light tracking-tight leading-[1.1]">
                            Joseph
                        </h1>

                        <div className="block lg:hidden flex-shrink-0">
                            <div className="relative w-20 h-20 rounded-full overflow-hidden bg-zinc-100 shadow-md ring-2 ring-zinc-50/50">
                                <NextImage src={joseph} alt="Joseph" fill className="object-cover w-full h-full grayscale" />
                            </div>
                        </div>
                    </div>

                    <p className="text-lg sm:text-xl text-zinc-600 leading-relaxed max-w-lg">
                        {t('description')}
                    </p>

                    <div className="flex flex-wrap gap-2 sm:gap-3 pt-2">
                        {["Next.js", "React", "Tailwind CSS", "Supabase", "Vite.js", "Firebase", "Python", "C#", "C++"].map((tech) => (
                            <span
                                key={tech}
                                className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white border border-zinc-200 rounded-4xl text-sm font-medium text-zinc-600 shadow-sm whitespace-nowrap"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>

                    <div className="pt-6 sm:pt-8 flex flex-row gap-3 sm:gap-4 w-full sm:w-auto">
                        <button
                            onClick={() =>
                                document
                                    .getElementById("experience")?.scrollIntoView({ behavior: "smooth" })
                            }
                            className="flex-1 sm:flex-none px-4 sm:px-8 py-4 bg-zinc-900 text-white rounded-full font-medium hover:bg-zinc-800 transition-colors text-center text-sm sm:text-base whitespace-nowrap"
                        >
                            {t('viewExperience')}
                        </button>
                        <a
                            href="/cv.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 sm:flex-none px-4 sm:px-8 py-4 bg-white border border-zinc-200 text-zinc-900 rounded-full font-medium hover:bg-zinc-50 transition-colors text-center text-sm sm:text-base whitespace-nowrap"
                        >
                            {t('downloadCV')}
                        </a>
                    </div>
                </div>

                <div className="hidden lg:flex justify-end order-0 lg:order-1 h-full w-full">
                    <div className="relative w-[28rem] h-[28rem] rounded-full overflow-hidden bg-zinc-100 shadow-2xl ring-8 ring-zinc-50/50">
                        <div className="absolute inset-0 bg-gradient-to-br from-zinc-100 to-zinc-200 flex items-center justify-center text-zinc-400">
                            <NextImage src={joseph} alt="Joseph" fill className="object-cover grayscale w-full h-full" />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
});

Hero.displayName = "Hero";
export default Hero;
