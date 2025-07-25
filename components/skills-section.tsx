"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip } from "recharts";

interface SkillData {
    skill: string;
    level: number;
    category: string;
}

interface TechnologyData {
    name: string;
    icon: string;
    category: string;
    description?: string;
}

interface SkillsSectionProps {
    dict: {
        title: string;
        categories: {
            languages: string;
            frameworks: string;
            tools: string;
            design: string;
            devtools: string;
            collaboration: string;
        };
        data: SkillData[];
        technologies?: TechnologyData[];
    };
    lang: string;
}

const technologies = [
    // Frontend Frameworks & Libraries
    { name: "React.js", icon: "⚛️", category: "frameworks", description: "Component-based UI library" },
    { name: "Next.js", icon: "▲", category: "frameworks", description: "Full-stack React framework" },
    { name: "Redux", icon: "🔄", category: "frameworks", description: "State management library" },
    { name: "Node.js", icon: "�", category: "frameworks", description: "JavaScript runtime" },
    { name: "Express.js", icon: "🚂", category: "frameworks", description: "Web framework for Node.js" },

    // UI Component Libraries
    { name: "Chakra UI", icon: "⚡", category: "frameworks", description: "Modular component library" },
    { name: "Material UI", icon: "🔵", category: "frameworks", description: "React component library based on Material Design" },
    { name: "ShadCN", icon: "�", category: "frameworks", description: "Modern UI components for React" },

    // Programming Languages
    { name: "Javascript", icon: "JS", category: "languages", description: "Dynamic programming language" },
    { name: "Typescript", icon: "TS", category: "languages", description: "Typed JavaScript superset" },
    { name: "HTML5", icon: "🌐", category: "languages", description: "Modern markup language" },
    { name: "CSS3", icon: "🎨", category: "languages", description: "Advanced styling language" },

    // Development Tools
    { name: "Git", icon: "🌿", category: "devtools", description: "Distributed version control system" },
    { name: "GitHub", icon: "🐙", category: "devtools", description: "Git hosting platform" },
    { name: "GitLab", icon: "🦊", category: "devtools", description: "DevOps platform" },
    { name: "Bitbucket", icon: "📦", category: "devtools", description: "Git repository hosting" },
    { name: "Npm", icon: "�", category: "devtools", description: "Package manager" },
    { name: "Yarn", icon: "🧶", category: "devtools", description: "Fast package manager" },
    { name: "Webpack", icon: "�", category: "devtools", description: "Module bundler" },
    { name: "ESLint", icon: "🔍", category: "devtools", description: "JavaScript linting utility" },
    { name: "Prettier", icon: "✨", category: "devtools", description: "Code formatting tool" },

    // Build & Deployment Tools
    { name: "Vercel", icon: "▲", category: "tools", description: "Deployment platform" },
    { name: "Firebase", icon: "�", category: "tools", description: "Backend-as-a-Service" },
    { name: "Weblate", icon: "🌍", category: "tools", description: "Translation platform" },
    { name: "Apollo GraphQL", icon: "🚀", category: "tools", description: "GraphQL client & server" },

    // Styling & CSS Tools
    { name: "Sass", icon: "�", category: "tools", description: "CSS preprocessor" },
    { name: "Styled-components", icon: "�", category: "tools", description: "CSS-in-JS styling" },
    { name: "Storybook", icon: "�", category: "tools", description: "Component development tool" },

    // Design Tools
    { name: "Figma", icon: "🎨", category: "design", description: "Collaborative design tool" },
    { name: "Adobe XD", icon: "🔶", category: "design", description: "User experience design software" },

    // Collaboration & Project Management
    { name: "Slack", icon: "💬", category: "collaboration", description: "Team communication platform" },
    { name: "Teams", icon: "👥", category: "collaboration", description: "Microsoft collaboration platform" },
    { name: "Jira", icon: "📊", category: "collaboration", description: "Project management and issue tracking" },
];

export function SkillsSection({ dict, lang }: SkillsSectionProps) {
    const [selectedTech, setSelectedTech] = useState<TechnologyData | null>(null);
    const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

    // Extended categories with defaults for new ones
    const extendedCategories = {
        languages: dict.categories.languages || "Languages",
        frameworks: dict.categories.frameworks || "Frameworks",
        tools: dict.categories.tools || "Tools",
        design: dict.categories.design || "Design",
        devtools: dict.categories.devtools || "Dev Tools",
        collaboration: dict.categories.collaboration || "Collaboration",
    };

    const categories = Object.values(extendedCategories);

    // Create chart data with proper rounding
    const chartData = categories.map((categoryName) => {
        const categoryKey = Object.keys(extendedCategories).find(
            (key) => extendedCategories[key as keyof typeof extendedCategories] === categoryName
        );

        // Get skills from dict.data for existing categories, or calculate average from technologies
        const skillsInCat = categoryKey && categoryKey in dict.categories ? dict.data.filter((s) => s.category === categoryKey) : [];

        // If no skills in dict.data, calculate from technologies
        if (skillsInCat.length === 0 && categoryKey) {
            const techsInCat = technologies.filter((t) => t.category === categoryKey);
            if (techsInCat.length > 0) {
                // Assign default proficiency levels based on category
                const defaultLevels: Record<string, number> = {
                    languages: 90,
                    frameworks: 85,
                    tools: 75,
                    design: 80,
                    devtools: 85,
                    collaboration: 75,
                };
                return {
                    category: categoryName,
                    level: defaultLevels[categoryKey] || 75,
                    fullMark: 100,
                };
            }
        }

        if (skillsInCat.length === 0) {
            return {
                category: categoryName,
                level: 0,
                fullMark: 100,
            };
        }

        const totalLevel = skillsInCat.reduce((sum, s) => sum + s.level, 0);
        const avgLevel = totalLevel / skillsInCat.length;

        return {
            category: categoryName,
            level: Math.round(avgLevel),
            fullMark: 100,
        };
    });

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    const handleTechClick = (tech: TechnologyData) => {
        setSelectedTech(selectedTech?.name === tech.name ? null : tech);
        const categoryName = extendedCategories[tech.category as keyof typeof extendedCategories];
        setHoveredCategory(selectedTech?.name === tech.name ? null : categoryName);
    };

    const getTechCategoryName = (techCategory: string) => {
        return extendedCategories[techCategory as keyof typeof extendedCategories];
    };

    // Custom radar component with highlighting
    const CustomRadar = (props: any) => {
        const { cx, cy, innerRadius, outerRadius, points } = props;

        return (
            <g>
                {points.map((point: any, index: number) => {
                    const isHighlighted = hoveredCategory === point.payload.category;
                    const isOthersSelected = hoveredCategory && hoveredCategory !== point.payload.category;

                    return (
                        <g key={index}>
                            <circle
                                cx={point.x}
                                cy={point.y}
                                r={6}
                                fill={
                                    isHighlighted ? "hsl(var(--primary))" : isOthersSelected ? "hsl(var(--muted))" : "hsl(var(--primary))"
                                }
                                stroke="hsl(var(--background))"
                                strokeWidth={2}
                                opacity={isOthersSelected ? 0.3 : 1}
                            />
                            {isHighlighted && (
                                <circle
                                    cx={point.x}
                                    cy={point.y}
                                    r={10}
                                    fill="none"
                                    stroke="hsl(var(--primary))"
                                    strokeWidth={2}
                                    opacity={0.5}
                                />
                            )}
                        </g>
                    );
                })}
                <path
                    d={`M${points.map((p: any) => `${p.x},${p.y}`).join("L")}Z`}
                    fill="hsl(var(--primary))"
                    fillOpacity={hoveredCategory ? 0.2 : 0.1}
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    opacity={hoveredCategory ? 1 : 0.8}
                />
            </g>
        );
    };

    return (
        <section id="skills" className="container py-16 md:py-24 lg:py-32">
            <h2 className="text-3xl font-bold text-center mb-16 md:text-4xl lg:text-5xl">{dict.title}</h2>

            <div className="grid gap-16 lg:grid-cols-2 items-start max-w-6xl mx-auto">
                {/* Left Side - Technologies */}
                <div className={cn("space-y-8", lang === "fa" ? "text-right" : "text-left")}>
                    <div>
                        <h3 className="text-xl font-medium text-muted-foreground mb-6">
                            {lang === "en" ? "Technology I've worked & " : "تکنولوژی‌هایی که با آن‌ها "}
                            <span className="text-primary/70">{lang === "en" ? "dabbled" : "کار کرده‌ام"}</span>
                            {lang === "en" ? " with:" : ":"}
                        </h3>

                        {/* Technology Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 relative">
                            {technologies.map((tech, index) => {
                                const isSelected = selectedTech?.name === tech.name;
                                const isRelatedCategory =
                                    selectedTech && getTechCategoryName(selectedTech.category) === getTechCategoryName(tech.category);
                                const isOtherCategory =
                                    selectedTech && getTechCategoryName(selectedTech.category) !== getTechCategoryName(tech.category);

                                return (
                                    <motion.div
                                        key={tech.name}
                                        className={cn(
                                            "flex items-center gap-3 p-3 rounded-lg transition-all cursor-pointer group relative min-h-[60px]",
                                            isSelected
                                                ? "bg-primary/20 border-2 border-primary shadow-lg scale-105"
                                                : isRelatedCategory
                                                ? "bg-primary/10 border border-primary/30"
                                                : isOtherCategory
                                                ? "opacity-40 hover:opacity-60"
                                                : "hover:bg-accent/50 hover:scale-105"
                                        )}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true, amount: 0.3 }}
                                        variants={itemVariants}
                                        transition={{ delay: index * 0.05 }}
                                        onClick={() => handleTechClick(tech)}
                                        whileHover={{ scale: isOtherCategory ? 1 : 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        style={{ zIndex: isSelected ? 100 : 1 }}
                                    >
                                        <div
                                            className={cn(
                                                "w-8 h-8 flex items-center justify-center text-lg transition-transform",
                                                isSelected ? "scale-125" : "group-hover:scale-110"
                                            )}
                                        >
                                            {tech.icon}
                                        </div>
                                        <span
                                            className={cn(
                                                "text-sm font-medium transition-colors",
                                                isSelected ? "text-primary font-semibold" : "text-foreground/80 group-hover:text-foreground"
                                            )}
                                        >
                                            {tech.name}
                                        </span>

                                        {/* Tooltip */}
                                        {isSelected && tech.description && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 p-3 bg-card border border-primary/20 rounded-md shadow-lg z-50 text-xs text-muted-foreground max-w-56 min-w-48"
                                                style={{
                                                    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                                                }}
                                            >
                                                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-card border-l border-t border-primary/20 rotate-45"></div>
                                                {tech.description}
                                            </motion.div>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Selected Technology Info */}
                        {selectedTech && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-6 p-4 bg-primary/10 border border-primary/20 rounded-lg"
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-2xl">{selectedTech.icon}</span>
                                    <h4 className="text-lg font-semibold text-primary">{selectedTech.name}</h4>
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">{selectedTech.description}</p>
                                <div className="flex items-center gap-2 text-xs">
                                    <span className="text-muted-foreground">Category:</span>
                                    <span className="px-2 py-1 bg-primary/20 text-primary rounded-full font-medium">
                                        {getTechCategoryName(selectedTech.category)}
                                    </span>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* Right Side - Radar Chart */}
                <div className={cn("space-y-6", lang === "fa" ? "text-right" : "text-left")}>
                    <h3 className="text-xl font-medium">
                        {lang === "en" ? "Main skill set " : "مهارت‌های اصلی "}
                        <span className="text-2xl">🚀</span>
                    </h3>

                    <motion.div
                        className="w-full h-[400px] lg:h-[450px] bg-card/30 rounded-lg p-6 relative"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart
                                cx="50%"
                                cy="50%"
                                outerRadius="70%"
                                data={chartData}
                                margin={{ top: 20, right: 30, bottom: 20, left: 30 }}
                            >
                                <PolarGrid stroke="hsl(var(--primary))" strokeOpacity={0.2} gridType="polygon" />
                                <PolarAngleAxis
                                    dataKey="category"
                                    tick={{
                                        fill: "hsl(var(--foreground))",
                                        fontSize: 13,
                                        fontWeight: 500,
                                    }}
                                />
                                <PolarRadiusAxis
                                    angle={90}
                                    domain={[0, 100]}
                                    tickFormatter={(value) => `${value}`}
                                    stroke="hsl(var(--primary))"
                                    strokeOpacity={0.3}
                                    tick={{
                                        fill: "hsl(var(--muted-foreground))",
                                        fontSize: 10,
                                    }}
                                    axisLine={false}
                                    tickCount={6}
                                />
                                <Radar
                                    name="Proficiency"
                                    dataKey="level"
                                    stroke="hsl(var(--primary))"
                                    fill="hsl(var(--primary))"
                                    fillOpacity={hoveredCategory ? 0.2 : 0.1}
                                    strokeWidth={2}
                                    dot={(props) => {
                                        const isHighlighted = hoveredCategory === props.payload.category;
                                        const isOthersSelected = hoveredCategory && hoveredCategory !== props.payload.category;

                                        return (
                                            <g>
                                                <circle
                                                    cx={props.cx}
                                                    cy={props.cy}
                                                    r={isHighlighted ? 6 : 4}
                                                    fill={
                                                        isHighlighted
                                                            ? "hsl(var(--primary))"
                                                            : isOthersSelected
                                                            ? "hsl(var(--muted))"
                                                            : "hsl(var(--primary))"
                                                    }
                                                    stroke="hsl(var(--background))"
                                                    strokeWidth={2}
                                                    opacity={isOthersSelected ? 0.5 : 1}
                                                />
                                                {isHighlighted && (
                                                    <circle
                                                        cx={props.cx}
                                                        cy={props.cy}
                                                        r={12}
                                                        fill="none"
                                                        stroke="hsl(var(--primary))"
                                                        strokeWidth={2}
                                                        opacity={0.5}
                                                    />
                                                )}
                                            </g>
                                        );
                                    }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "hsl(var(--card))",
                                        borderColor: "hsl(var(--primary))",
                                        borderRadius: "0.5rem",
                                        border: "1px solid hsl(var(--primary) / 0.2)",
                                    }}
                                    itemStyle={{ color: "hsl(var(--foreground))" }}
                                    labelStyle={{ color: "hsl(var(--primary))", fontWeight: 600 }}
                                    formatter={(value: any) => {
                                        const numValue = typeof value === "number" ? value : parseFloat(value) || 0;
                                        return [`${Math.round(numValue)}%`, "Proficiency"];
                                    }}
                                />
                            </RadarChart>
                        </ResponsiveContainer>

                        {/* Chart Instructions */}
                        {!selectedTech && (
                            <div className="absolute bottom-4 left-6 text-xs text-muted-foreground">
                                💡{" "}
                                {lang === "en"
                                    ? "Click on technologies to highlight categories"
                                    : "برای برجسته کردن دسته‌ها روی تکنولوژی‌ها کلیک کنید"}
                            </div>
                        )}

                        {/* Category Highlight Info */}
                        {hoveredCategory && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="absolute top-4 right-6 bg-primary/10 border border-primary/20 rounded-lg p-3"
                            >
                                <div className="text-sm font-medium text-primary">{hoveredCategory}</div>
                                <div className="text-xs text-muted-foreground mt-1">
                                    {chartData.find((d) => d.category === hoveredCategory)?.level}% proficiency
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
