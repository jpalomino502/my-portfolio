"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/src/i18n/routing";
import { Globe } from "lucide-react";

export default function LanguageSwitcher({ className = "" }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = () => {
    const newLocale = locale === "en" ? "es" : "en";
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <button
      onClick={switchLocale}
      className={`flex items-center gap-2 text-sm uppercase tracking-wider hover:opacity-70 transition-opacity ${className}`}
    >
      <Globe size={16} />
      <span>{locale === "en" ? "ES" : "EN"}</span>
    </button>
  );
}
