import { useTranslations } from "next-intl";

interface NavigationProps {
    activeSection: string
}

export default function Navigation({ activeSection }: NavigationProps) {
    const t = useTranslations('HR.Navigation');
    
    const navItems = [
        { id: "intro", label: t("intro") },
        { id: "experience", label: t("experience") },
        { id: "projects", label: t("projects") },
        { id: "connect", label: t("connect") }
    ];

    return (
        <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
            <div className="flex flex-col gap-6">
                {navItems.map(({ id, label }) => (
                    <button
                        key={id}
                        onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
                        className={`group flex items-center gap-4`}
                        aria-label={`Navigate to ${label}`}
                    >
                        <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${activeSection === id ? "bg-zinc-900 scale-150" : "bg-zinc-300 group-hover:bg-zinc-400"}`} />
                        <span className={`text-xs font-medium tracking-widest uppercase transition-all duration-500 ${activeSection === id ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 pointer-events-none"}`}>
                            {label}
                        </span>
                    </button>
                ))}
            </div>
        </nav>
    )
}
