import { Link } from "@/src/i18n/routing"
import { forwardRef } from "react"
import { useTranslations } from "next-intl";
import NextImage from "next/image";
import AthlosImg from "@/src/assets/images/projects/Athlos.png";
import ChefSyncImg from "@/src/assets/images/projects/chefsync.png";
import CondecoroImg from "@/src/assets/images/projects/condecoro.png";
import WebnovaImg from "@/src/assets/images/projects/webnova.png";

const Projects = forwardRef<HTMLElement>((props, ref) => {
    const t = useTranslations('HR.Projects');
    const tp = useTranslations('Projects');

    const projects = tp.raw('items') as Array<{
        id: string;
        title: string;
        description: string;
        tags: string[];
        color: string;
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
            ref={ref}
            className="min-h-screen py-24 opacity-0"
        >
            <div className="space-y-16">
                <div className="flex items-end justify-between">
                    <h2 className="text-sm font-bold tracking-widest uppercase text-zinc-400">{t('title')}</h2>
                    <Link href="/home" className="text-sm font-medium text-zinc-900 underline underline-offset-4 hover:text-zinc-600">
                        {t('viewCreative')}
                    </Link>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <div key={index} className="group cursor-pointer">
                            <div className={`aspect-video w-full rounded-4xl ${project.color} mb-6 overflow-hidden relative shadow-sm`}>
                                {imageMap[project.imageKey] && (
                                    <NextImage
                                        src={imageMap[project.imageKey]}
                                        alt={project.title}
                                        fill
                                        className="absolute inset-0 w-full h-full object-cover "
                                    />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                                <div className="absolute inset-0 flex items-center justify-center text-zinc-300/60 font-medium uppercase tracking-widest ">
                                    {t('preview')}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl font-medium text-zinc-900 group-hover:text-zinc-600 transition-colors">{project.title}</h3>
                                    {project.url && (
                                        <a href={project.url} target="_blank" rel="noopener noreferrer" className="inline-flex">
                                            <svg className="w-5 h-5 text-zinc-400 -rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </a>
                                    )}
                                </div>
                                <p className="text-zinc-500 leading-relaxed">{project.description}</p>
                                <div className="flex gap-3 text-sm text-zinc-400">
                                    {project.tags.join(" • ")}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
})

Projects.displayName = "Projects"
export default Projects
