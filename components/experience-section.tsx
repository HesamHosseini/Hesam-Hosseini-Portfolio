"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ExperienceEntry {
    company: string;
    title: string;
    duration: string;
    description: string;
}

interface ExperienceSectionProps {
    dict: {
        title: string;
        entries: ExperienceEntry[];
    };
    lang: string;
}

export function ExperienceSection({ dict, lang }: ExperienceSectionProps) {
    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring" as const,
                stiffness: 100,
                damping: 10,
            },
        },
    };

    return (
        <section id="experience" className="container py-16 md:py-24 lg:py-32">
            <h2 className="text-3xl font-bold text-center mb-12 md:text-4xl lg:text-5xl">{dict.title}</h2>
            <div className="relative max-w-3xl mx-auto">
                {/* Vertical line - only visible on desktop */}
                <div className={cn("absolute top-0 bottom-0 w-0.5 bg-primary/20 hidden md:block", "left-1/2 transform -translate-x-1/2")} />

                {dict.entries.map((entry, index) => (
                    <motion.div
                        key={index}
                        className="relative mb-8 md:mb-12"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={itemVariants}
                    >
                        {/* Mobile Layout */}
                        <div className={cn("flex md:hidden", lang === "fa" ? "flex-row-reverse" : "flex-row")}>
                            {/* Circle for mobile */}
                            <div
                                className={cn(
                                    "flex-shrink-0 w-4 h-4 rounded-full bg-primary border-2 border-background mt-2",
                                    lang === "fa" ? "ml-4" : "mr-4"
                                )}
                            />

                            {/* Content for mobile */}
                            <div className={cn("flex-1 p-4 rounded-lg shadow-md bg-card", lang === "fa" ? "text-right" : "text-left")}>
                                <h3 className="text-xl font-semibold text-primary">{entry.company}</h3>
                                <p className="text-lg font-medium text-foreground">{entry.title}</p>
                                <p className="text-sm text-muted-foreground mb-2">{entry.duration}</p>
                                <p className="text-muted-foreground">{entry.description}</p>
                            </div>
                        </div>

                        {/* Desktop Layout */}
                        <div
                            className={cn(
                                "hidden md:flex items-center w-full",
                                index % 2 === 0
                                    ? lang === "fa"
                                        ? "justify-end"
                                        : "justify-start"
                                    : lang === "fa"
                                    ? "justify-start"
                                    : "justify-end"
                            )}
                        >
                            {/* Circle for desktop */}
                            <div className="absolute left-1/2 transform -translate-x-1/2 z-10 w-4 h-4 rounded-full bg-primary border-2 border-background" />

                            {/* Content for desktop */}
                            <div
                                className={cn(
                                    "w-1/2 p-4 rounded-lg shadow-md bg-card",
                                    index % 2 === 0 ? (lang === "fa" ? "pl-8" : "pr-8") : lang === "fa" ? "pr-8" : "pl-8",
                                    lang === "fa" ? "text-right" : "text-left"
                                )}
                            >
                                <h3 className="text-xl font-semibold text-primary">{entry.company}</h3>
                                <p className="text-lg font-medium text-foreground">{entry.title}</p>
                                <p className="text-sm text-muted-foreground mb-2">{entry.duration}</p>
                                <p className="text-muted-foreground">{entry.description}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
