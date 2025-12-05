import Link from "next/link"
import { forwardRef } from "react"
import { useTranslations } from "next-intl";

const Connect = forwardRef<HTMLElement>((props, ref) => {
    const t = useTranslations('HR.Connect');
    return (
        <section id="connect" ref={ref} className="py-24 opacity-0">
            <div className="bg-black rounded-4xl p-8 sm:p-16 text-center text-white space-y-8">
                <h2 className="text-3xl sm:text-4xl font-light">{t('title')}</h2>
                <p className="text-zinc-400 max-w-xl mx-auto text-lg">
                    {t('description')}
                </p>
                <div className="pt-4 flex flex-col items-center gap-4">
                    <Link
                        href="mailto:joseph.palomino0102@gmail.com"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-white text-zinc-900 rounded-full font-medium hover:bg-zinc-100 transition-colors"
                    >
                        {t('cta')}
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </Link>
                </div>
            </div>

            <footer className="mt-24 flex flex-col sm:flex-row justify-between items-center gap-6 text-sm text-zinc-500 border-t border-zinc-100 pt-8">
                <div>{t('copyright')}</div>
                <div className="flex gap-6">
                    <Link href="https://www.linkedin.com/in/jpalomino502/" target="_blank" className="hover:text-zinc-900 transition-colors">{t('links.linkedin')}</Link>
                    <Link href="https://github.com/jpalomino502" target="_blank" className="hover:text-zinc-900 transition-colors">{t('links.github')}</Link>
                    <Link href="mailto:joseph.palomino0102@gmail.com" className="hover:text-zinc-900 transition-colors">{t('links.email')}</Link>
                </div>
            </footer>
        </section>
    )
})

Connect.displayName = "Connect"
export default Connect
