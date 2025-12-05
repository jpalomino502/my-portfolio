"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/routing";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import NinaImg from "@/src/assets/images/thanks/niña.jpg";
import MomImg from "@/src/assets/images/thanks/mom.jpg";
import PaisajeImg from "@/src/assets/images/thanks/paisaje.jpg";
import QueChingonImg from "@/src/assets/images/thanks/quechingon.jpg";
import QueChingon2Img from "@/src/assets/images/thanks/quechingon2.jpg";
import SaraImg from "@/src/assets/images/thanks/sara.jpg";
import UnabImg from "@/src/assets/images/thanks/unab.jpg";
import FamiliaPng from "@/src/assets/images/thanks/familia.png";
import WillyImg from "@/src/assets/images/thanks/willy.jpg";
import GaboImg from "@/src/assets/images/thanks/gabo.jpg";
import ChiaImg from "@/src/assets/images/thanks/chia.jpg";

export default function ThanksPage() {
    const t = useTranslations('Thanks');

    return (
        <main className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-zinc-100">
            <div className="max-w-4xl mx-auto px-6 py-24 md:py-32">

                <header className="mb-24 text-center md:text-left">
                    <Link href="/" className="inline-flex items-center text-zinc-400 hover:text-zinc-900 transition-colors mb-12 group">
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        {t('back')}
                    </Link>

                    <div className="space-y-8 max-w-3xl">
                        <h1 className="text-4xl md:text-5xl tracking-tight text-zinc-900">
                            {t('title')}
                        </h1>
                        <p className="text-xl md:text-2xl font-light leading-relaxed text-zinc-600">
                            {t('intro')}
                        </p>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-y-24 gap-x-12">
                    <div className="md:col-span-7 space-y-8">
                        <p className="text-xl md:text-2xl font-light leading-relaxed text-zinc-800">
                            {t('family')}
                        </p>
                        <div className="flex gap-4">
                            <div className="relative w-48 h-64 rotate-3 shadow-sm border-4 border-white bg-white">
                                <Image src={MomImg} alt="Mamá" fill className="object-cover" />
                            </div>
                            <div className="relative w-40 h-40 -rotate-2 mt-12 shadow-sm border-4 border-white bg-white">
                                <Image src={FamiliaPng} alt="Familia" fill className="object-cover" />
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-5 md:pt-12 space-y-8">
                        <div className="relative w-full aspect-[4/5] rotate-1 mb-8 shadow-sm border-4 border-white bg-white">
                            <Image src={SaraImg} alt="Sara y amigos" fill className="object-cover" />
                        </div>
                        <p className="text-lg text-zinc-600 leading-relaxed">
                            {t('school')}
                        </p>
                    </div>

                    <div className="md:col-span-6 space-y-8">
                        <p className="text-lg text-zinc-600 leading-relaxed">
                            {t('mentors')}
                        </p>
                        <div className="relative w-full h-64 -rotate-1 shadow-sm border-4 border-white bg-white">
                            <Image src={PaisajeImg} alt="Paisaje" fill className="object-cover" />
                        </div>
                    </div>

                    <div className="md:col-span-6 space-y-8 md:pl-12">
                        <div className="relative w-full aspect-video rotate-2 mb-8 shadow-sm border-4 border-white bg-white">
                            <Image src={UnabImg} alt="UNAB" fill className="object-cover" />
                        </div>
                        <p className="text-lg text-zinc-600 leading-relaxed">
                            {t('friends')}
                        </p>
                    </div>

                    <div className="md:col-span-6 space-y-8">
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="relative w-full aspect-[3/4] rotate-2 shadow-sm border-4 border-white bg-white overflow-hidden">
                                <video
                                    src="/videos/mariana.mp4"
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="relative w-full aspect-[3/4] -rotate-2 mt-8 shadow-sm border-4 border-white bg-white overflow-hidden">
                                <video
                                    src="/videos/jorgeymariana.mp4"
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="col-span-2 relative w-full aspect-video rotate-1 shadow-sm border-4 border-white bg-white">
                                <Image src={WillyImg} alt="Willy" fill className="object-cover" />
                            </div>
                        </div>
                        <p className="text-lg text-zinc-600 leading-relaxed">
                            {t('community')}
                        </p>
                        <div className="space-y-8">
                            <p className="text-lg text-zinc-600 leading-relaxed">
                                {t('partners')}
                            </p>
                            <div className="flex gap-4">
                                <div className="relative w-32 h-32 rotate-2 shadow-sm border-4 border-white bg-white">
                                    <Image src={ChiaImg} alt="David Chia" fill className="object-cover" />
                                </div>
                                <div className="relative w-32 h-32 -rotate-2 shadow-sm border-4 border-white bg-white">
                                    <Image src={GaboImg} alt="Gabo" fill className="object-cover" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-6 space-y-8 md:pl-8">
                        <p className="text-xl md:text-2xl font-light leading-relaxed text-zinc-800">
                            {t('inspiration')}
                        </p>
                        <div className="flex flex-wrap gap-6">
                            <div className="relative w-40 h-40 -rotate-2 shadow-sm border-4 border-white bg-white">
                                <Image src={QueChingonImg} alt="Trabajo" fill className="object-cover" />
                            </div>
                            <div className="relative w-40 h-40 rotate-2 shadow-sm border-4 border-white bg-white">
                                <Image src={QueChingon2Img} alt="Trabajo 2" fill className="object-cover" />
                            </div>
                            <div className="relative w-40 h-64 -rotate-1 shadow-sm border-4 border-white bg-white overflow-hidden">
                                <video
                                    src="/videos/quechingo.mp4"
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-12 mt-12 border-t border-zinc-100 pt-12">
                        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                            <div className="relative w-48 h-48 rounded-full rotate-3 shadow-md border-4 border-white bg-white overflow-hidden">
                                <Image src={NinaImg} alt="Niña" fill className="object-cover" />
                            </div>
                            <p className="text-xl md:text-2xl font-light italic text-zinc-400 max-w-xl text-center md:text-left">
                                "{t('pet')}"
                            </p>
                        </div>
                    </div>

                    <div className="md:col-span-12 mt-12 text-center">
                        <p className="text-lg text-zinc-500 leading-relaxed max-w-2xl mx-auto">
                            {t('general')}
                        </p>
                    </div>

                </div>

                <footer className="mt-32 pt-12 border-t border-zinc-100 text-center">
                    <p className="text-zinc-400 text-sm font-mono">
                        jpalomino.dev
                    </p>
                </footer>

            </div>
        </main>
    );
}
