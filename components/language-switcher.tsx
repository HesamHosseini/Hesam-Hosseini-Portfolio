"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import { useTransition } from "react"

export function LanguageSwitcher({ lang }: { lang: string }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  const changeLanguage = (newLang: string) => {
    const newPath = `/${newLang}${pathname.substring(3)}` // Assumes /en or /fa prefix
    startTransition(() => {
      router.replace(newPath)
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" disabled={isPending}>
          <Globe className="h-5 w-5" />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => changeLanguage("en")} disabled={lang === "en"}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage("fa")} disabled={lang === "fa"}>
          فارسی
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
