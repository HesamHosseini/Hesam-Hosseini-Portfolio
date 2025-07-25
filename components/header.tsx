"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeSwitcher } from "./theme-switcher";

interface HeaderProps {
    dict: {
        home: string;
        about: string;
        experience: string;
        skills: string;
        projects: string;
        contact: string;
    };
    lang: string;
}

export function Header({ dict, lang }: HeaderProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        setActiveSection("hero"); // Set initial active section after hydration
    }, []);

    useEffect(() => {
        if (!isClient) return;

        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }

            // Get all sections
            const sections = ["hero", "about", "experience", "skills", "projects", "contact"];
            const scrollPosition = window.scrollY + 100; // Offset for header height
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;

            // Check if we're near the bottom of the page (within 100px)
            if (window.scrollY + windowHeight >= documentHeight - 100) {
                setActiveSection("contact");
                return;
            }

            // Find the current section based on scroll position
            for (let i = sections.length - 1; i >= 0; i--) {
                const section = document.getElementById(sections[i]);
                if (section) {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.offsetHeight;
                    const sectionMiddle = sectionTop + sectionHeight / 2;

                    // Check if we're in the middle portion of this section
                    if (scrollPosition >= sectionTop - 50 && scrollPosition <= sectionMiddle + 200) {
                        setActiveSection(sections[i]);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isClient]);

    const navItems = [
        { name: dict.home, href: `#hero`, id: "hero" },
        { name: dict.about, href: `#about`, id: "about" },
        { name: dict.experience, href: `#experience`, id: "experience" },
        { name: dict.skills, href: `#skills`, id: "skills" },
        { name: dict.projects, href: `#projects`, id: "projects" },
        { name: dict.contact, href: `#contact`, id: "contact" },
    ];

    // Helper for smooth scrolling
    const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        const hash = href.split("#")[1];
        if (hash) {
            e.preventDefault();
            const el = document.getElementById(hash);
            if (el) {
                el.scrollIntoView({ behavior: "smooth" });
            }
        }
    };

    return (
        <header
            className={cn(
                "fixed inset-x-0 top-0 z-50 transition-all duration-300",
                isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm py-2" : "bg-transparent py-4"
            )}
        >
            <div className="container flex h-14 items-center justify-between px-4 md:px-6">
                <a href={`/${lang}/#hero`} className="text-lg font-bold" onClick={(e) => handleSmoothScroll(e, `#hero`)}>
                    Hesam Hosseini
                </a>
                <nav className="hidden md:flex items-center gap-6">
                    {navItems.map((item) => (
                        <a
                            key={item.name}
                            href={`/${lang}${item.href}`}
                            className={cn(
                                "text-sm font-medium hover:text-primary transition-colors",
                                isClient && activeSection === item.id ? "text-primary font-semibold" : "text-muted-foreground"
                            )}
                            onClick={(e) => handleSmoothScroll(e, item.href)}
                        >
                            {item.name}
                        </a>
                    ))}
                    <LanguageSwitcher lang={lang} />
                    <ThemeSwitcher />
                </nav>
                <div className="md:hidden flex items-center gap-2">
                    <LanguageSwitcher lang={lang} />
                    <ThemeSwitcher />
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Toggle navigation menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side={lang === "fa" ? "right" : "left"}>
                            <div className="flex flex-col gap-4 py-6">
                                {navItems.map((item) => (
                                    <a
                                        key={item.name}
                                        href={`/${lang}${item.href}`}
                                        className={cn(
                                            "text-lg font-medium hover:text-primary transition-colors",
                                            isClient && activeSection === item.id ? "text-primary font-semibold" : "text-muted-foreground"
                                        )}
                                        onClick={(e) => handleSmoothScroll(e, item.href)}
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
