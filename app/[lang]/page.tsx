import { AboutMeSection } from "@/components/about-me-section";
import { ContactSection } from "@/components/contact-section";
import { ExperienceSection } from "@/components/experience-section";
import { HeroSection } from "@/components/hero-section";
import { ProjectsSection } from "@/components/projects-section";
import { SkillsSection } from "@/components/skills-section";
import { getDictionary } from "./dictionaries";

export default async function HomePage({ params }: { params: Promise<{ lang: "en" | "fa" }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang);

    return (
        <>
            <HeroSection dict={dict.hero} lang={lang} />
            <AboutMeSection dict={dict.about} lang={lang} />
            <ExperienceSection dict={dict.experience} lang={lang} />
            <SkillsSection dict={dict.skills} lang={lang} />
            <ProjectsSection dict={dict.projects} lang={lang} />
            <ContactSection dict={dict.contact} lang={lang} />
        </>
    );
}
