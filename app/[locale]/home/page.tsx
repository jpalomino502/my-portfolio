import Hero from "@/src/components/home/hero";
import About from "@/src/components/home/about";
import Data from "@/src/components/home/data";
import Projects from "@/src/components/home/Projects";

export default function Home() {
    return (
        <main>
            <Hero />
            <About />
            <Data />
            <Projects />
        </main>
    );
}
