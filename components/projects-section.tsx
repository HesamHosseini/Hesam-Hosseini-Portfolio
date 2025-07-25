"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface Project {
    name: string;
    image: string;
    stack: string[];
    description: string;
    link: string;
}

interface ProjectsSectionProps {
    dict: {
        title: string;
        featured: Project[];
    };
    lang: string;
}

export function ProjectsSection({ dict, lang }: ProjectsSectionProps) {
    const cardVariants = {
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
        <section id="projects" className="container py-16 md:py-24 lg:py-32">
            <h2 className="text-3xl font-bold text-center mb-12 md:text-4xl lg:text-5xl">{dict.title}</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
                {dict.featured.map((project, index) => (
                    <motion.div
                        key={index}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={cardVariants}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                            <Link href={project.link} target="_blank" rel="noopener noreferrer">
                                <div className="relative w-full h-60 overflow-hidden">
                                    <Image
                                        src={project.image || "/placeholder.svg"}
                                        alt={project.name}
                                        fill
                                        className="object-cover transition-transform duration-300 hover:scale-105"
                                    />
                                </div>
                            </Link>
                            <CardHeader className="flex-grow">
                                <CardTitle className="text-primary">{project.name}</CardTitle>
                                <CardDescription className="text-muted-foreground">{project.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-wrap gap-2 pb-6">
                                {project.stack.map((tech, techIndex) => (
                                    <Badge key={techIndex} variant="secondary">
                                        {tech}
                                    </Badge>
                                ))}
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
