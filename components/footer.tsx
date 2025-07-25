"use client"

import Link from "next/link"
import { LanguageSwitcher } from "./language-switcher"
import { ThemeSwitcher } from "./theme-switcher"
import { ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FooterProps {
  dict: {
    copyright: string
    scrollToTop: string
  }
  lang: string
}

export function Footer({ dict, lang }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="border-t py-8 md:py-12">
      <div className="container flex flex-col items-center justify-between gap-6 px-4 md:flex-row md:px-6">
        <p className="text-sm text-muted-foreground text-center md:text-left">
          &copy; {new Date().getFullYear()} {dict.copyright}
        </p>
        <div className="flex items-center gap-4">
          <LanguageSwitcher lang={lang} />
          <ThemeSwitcher />
          <Button
            variant="outline"
            size="icon"
            onClick={scrollToTop}
            className="rounded-full bg-transparent"
            aria-label={dict.scrollToTop}
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
        </div>
        <nav className="flex gap-4 text-sm text-muted-foreground">
          <Link href={`/${lang}/#about`} className="hover:underline underline-offset-4">
            {lang === "en" ? "About" : "درباره"}
          </Link>
          <Link href={`/${lang}/#projects`} className="hover:underline underline-offset-4">
            {lang === "en" ? "Projects" : "پروژه‌ها"}
          </Link>
          <Link href={`/${lang}/#contact`} className="hover:underline underline-offset-4">
            {lang === "en" ? "Contact" : "تماس"}
          </Link>
        </nav>
      </div>
    </footer>
  )
}
