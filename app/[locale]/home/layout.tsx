import Header from "@/src/layout/header";
import Footer from "@/src/layout/footer";

export default function HomeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div suppressHydrationWarning={true} className="bg-white">
                <Header />
                <main>
                    {children}
                </main>
                <Footer />
            </div>
        </>

    );
}
