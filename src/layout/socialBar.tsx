"use client";
import { SocialIcon } from "react-social-icons";
import { FileText } from "lucide-react";

export default function SocialBar() {
  return (
    <aside className="fixed right-0 md:right-4 bottom-6 z-40 flex flex-col items-center gap-4 mix-blend-difference">
      <SocialIcon
        url="https://www.linkedin.com/in/jpalomino502/"
        bgColor="transparent"
        fgColor="#ffffff"
        style={{ height: 50, width: 50, transition: "transform 0.1s ease-out" }}
        className="opacity-80 hover:opacity-100 hover:scale-105"
        target="_blank"
        rel="noopener noreferrer"
      />
      <SocialIcon
        url="mailto:joseph.palomino0102@gmail.com"
        bgColor="transparent"
        fgColor="#ffffff"
        style={{ height: 50, width: 50 }}
        className="opacity-80 hover:opacity-100 hover:scale-105"
        target="_blank"
      />
      <SocialIcon
        url="https://github.com/jpalomino502"
        bgColor="transparent"
        fgColor="#ffffff"
        style={{ height: 50, width: 50, transition: "transform 0.1s ease-out" }}
        className="opacity-80 hover:opacity-100 hover:scale-105"
        target="_blank"
        rel="noopener noreferrer"
      />

      <a
        href="/cv.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="opacity-80 hover:opacity-100 hover:scale-105 transition-transform flex items-center justify-center h-[50px] w-[50px]"
      >
        <FileText
          className="text-white h-[28px] w-[28px]"
          strokeWidth={1.4}
        />
      </a>
    </aside>
  );
}
