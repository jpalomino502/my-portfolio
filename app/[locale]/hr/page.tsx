"use client"

import { useEffect, useRef, useState } from "react"
import Navigation from "@/src/components/hr/Navigation"
import Hero from "@/src/components/hr/Hero"
import Experience from "@/src/components/hr/Experience"
import Projects from "@/src/components/hr/Projects"
import Connect from "@/src/components/hr/Connect"
import LanguageSwitcher from "@/src/components/LanguageSwitcher"

export default function Home() {
    const [activeSection, setActiveSection] = useState("")
    const sectionsRef = useRef<(HTMLElement | null)[]>([])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("animate-fade-in-up")
                        setActiveSection(entry.target.id)
                    }
                })
            },
            { threshold: 0.2, rootMargin: "0px 0px -20% 0px" },
        )

        sectionsRef.current.forEach((section) => {
            if (section) observer.observe(section)
        })

        return () => observer.disconnect()
    }, [])

    return (
        <div className="min-h-screen bg-white text-zinc-900 relative selection:bg-zinc-900 selection:text-white">
            <div className="absolute top-6 right-6 z-50">
                <LanguageSwitcher className="ml-4" />
            </div>
            <Navigation activeSection={activeSection} />

            <main className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
                <Hero ref={(el) => { sectionsRef.current[0] = el }} />
                <Experience ref={(el) => { sectionsRef.current[1] = el }} />
                <Projects ref={(el) => { sectionsRef.current[2] = el }} />
                <Connect ref={(el) => { sectionsRef.current[3] = el }} />
            </main>
        </div>
    )
}
