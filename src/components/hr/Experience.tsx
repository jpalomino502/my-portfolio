import { forwardRef } from "react"
import { useTranslations } from "next-intl";

const Experience = forwardRef<HTMLElement>((props, ref) => {
    const t = useTranslations('HR.Experience');

    const jobs = t.raw('jobs') as Array<{
        year: string;
        role: string;
        company: string;
        description: string;
        tags: string[];
    }>;

    const education = t.raw('education') as Array<{
        year: string;
        role: string;
        company: string;
        description: string;
    }>;

    return (
        <section
            id="experience"
            ref={ref}
            className="min-h-screen py-24 opacity-0"
        >
            <div className="max-w-3xl mx-auto">
                <h2 className="text-sm font-bold tracking-widest uppercase text-zinc-400 mb-12">{t('experienceTitle')}</h2>

                <div className="space-y-12 mb-24">
                    {jobs.map((job, index) => (
                        <div key={index} className="group relative pl-8 border-l border-zinc-200 hover:border-zinc-400 transition-colors duration-300">
                            <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-white border-2 border-zinc-300 group-hover:border-zinc-900 transition-colors duration-300" />

                            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                                <h3 className="text-2xl font-medium text-zinc-900">{job.role}</h3>
                                <span className="text-sm font-medium text-zinc-500">{job.year}</span>
                            </div>

                            <div className="text-lg text-zinc-500 mb-4">{job.company}</div>
                            <p className="text-zinc-600 leading-relaxed mb-6 max-w-2xl">{job.description}</p>

                            <div className="flex flex-wrap gap-2">
                                {job.tags.map(tag => (
                                    <span key={tag} className="px-2 py-1 bg-zinc-50 text-xs font-medium text-zinc-500 rounded">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <h2 className="text-sm font-bold tracking-widest uppercase text-zinc-400 mb-12">{t('educationTitle')}</h2>

                <div className="space-y-12">
                    {education.map((edu, index) => (
                        <div key={index} className="group relative pl-8 border-l border-zinc-200 hover:border-zinc-400 transition-colors duration-300">
                            <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-white border-2 border-zinc-300 group-hover:border-zinc-900 transition-colors duration-300" />

                            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                                <h3 className="text-xl font-medium text-zinc-900">{edu.role}</h3>
                                <span className="text-sm font-medium text-zinc-500">{edu.year}</span>
                            </div>

                            <div className="text-lg text-zinc-500 mb-2">{edu.company}</div>
                            <p className="text-zinc-600 leading-relaxed max-w-2xl">{edu.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
})

Experience.displayName = "Experience"
export default Experience
