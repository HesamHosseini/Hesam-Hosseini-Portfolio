"use client";

import { cn } from "@/lib/utils";

interface AboutMeSectionProps {
    dict: {
        title: string;
        content: string;
        bullets: string[];
    };
    lang: string;
}

export function AboutMeSection({ dict, lang }: AboutMeSectionProps) {
    return (
        <section id="about" className="container py-16 md:py-24 lg:py-32">
            <h2 className="text-3xl font-bold text-center mb-12 md:text-4xl lg:text-5xl">{dict.title}</h2>
            <div className={cn("grid gap-8 md:grid-cols-2 items-center", lang === "fa" ? "md:grid-flow-col-dense" : "")}>
                <div className={cn("space-y-6", lang === "fa" ? "text-right" : "text-left")}>
                    <p className="text-lg text-muted-foreground leading-relaxed">{dict.content}</p>
                    <ul className="space-y-3 text-muted-foreground">
                        {dict.bullets.map((bullet, index) => (
                            <li key={index} className="flex items-start gap-2">
                                <span className="text-primary mt-1">{lang === "fa" ? "•" : "•"}</span>
                                <span>{bullet}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex justify-center">
                    <img
                        src="/profile.jpeg"
                        alt="Hesam Hosseini"
                        className="rounded-full w-64 h-64 md:w-80 md:h-80 object-cover shadow-lg"
                    />
                </div>
            </div>
        </section>
    );
}
