import { Urbanist } from "next/font/google";

const urbanist = Urbanist({
    subsets: ["latin"],
    variable: "--font-urbanist",
});

export default function HRLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className={`${urbanist.className} bg-white text-black`}>
            <main>{children}</main>
        </div>
    );
}
