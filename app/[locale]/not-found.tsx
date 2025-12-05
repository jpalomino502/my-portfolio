"use client";

import { Link } from "@/src/i18n/routing";
import { useTranslations } from "next-intl";

export default function NotFound() {
    const t = useTranslations('NotFound');
    return (
        <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center p-4 text-center font-sans selection:bg-zinc-900 selection:text-white">
            <div className="max-w-2xl w-full space-y-8 animate-fade-in-up">
                <h1 className="text-6xl md:text-8xl text-zinc-900 leading-none">
                    {t('title')} <br />
                    <span className="text-zinc-400 font-urban">{t('titleSpan')}</span>
                </h1>

                <p className="text-xl md:text-2xl text-zinc-600 max-w-lg mx-auto leading-relaxed">
                    {t('description')} <span className="font-urban text-3xl text-zinc-500">{t('descriptionSpan')}</span> {t('descriptionEnd')}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                    <Link
                        href="/hr"
                        className="w-full sm:w-auto px-8 py-4 bg-zinc-900 text-white rounded-full text-lg hover:bg-zinc-800 transition-all hover:scale-105"
                    >
                        {t('viewProfessional')}
                    </Link>

                    <Link
                        href="/home"
                        className="w-full sm:w-auto px-8 py-4 bg-white border border-zinc-200 text-zinc-900 rounded-full text-lg hover:bg-zinc-50 transition-all hover:scale-105 font-urban text-2xl"
                    >
                        {t('exploreCreative')}
                    </Link>
                </div>

            </div>
        </div>
    )
}
