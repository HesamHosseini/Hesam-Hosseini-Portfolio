import { getDictionary } from "@/app/[lang]/dictionaries";

type Lang = "en" | "fa";

interface StructuredDataProps {
    lang: Lang;
    dict: Awaited<ReturnType<typeof getDictionary>>;
}

export function StructuredData({ lang, dict }: StructuredDataProps) {
    const baseUrl = "https://hesam-hosseini.vercel.app"; // Replace with your actual domain
    const ogImageUrl = `/og?title=${encodeURIComponent(dict.hero.name)}&subtitle=${encodeURIComponent(dict.hero.title)}&lang=${lang}`;

    const personSchema = {
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": `${baseUrl}/#person`,
        name: dict.hero.name,
        jobTitle: dict.hero.title,
        description: dict.about.content.substring(0, 200),
        url: `${baseUrl}/${lang}`,
        image: `${baseUrl}${ogImageUrl}`,
        sameAs: [
            // Add your social media profiles
            "https://github.com/HesamHosseini",
            "https://www.linkedin.com/in/hesam-hosseini-dev/",
        ],
        address: {
            "@type": "PostalAddress",
            addressCountry: "Iran",
        },
        knowsAbout: [
            "React.js",
            "Next.js",
            "TypeScript",
            "JavaScript",
            "Frontend Development",
            "Web Development",
            "User Interface Design",
            "Tailwind CSS",
            "Performance Optimization",
            "Responsive Design",
        ],
        worksFor: {
            "@type": "Organization",
            name: "Vikarno",
            url: "https://vikarno.com",
        },
        hasOccupation: {
            "@type": "Occupation",
            name: "Senior Frontend Developer",
            description: "Specializing in React, Next.js, and modern web technologies",
            skills: [
                "React Development",
                "Next.js Development",
                "TypeScript Programming",
                "Frontend Architecture",
                "Performance Optimization",
                "UI/UX Implementation",
            ],
        },
    };

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: baseUrl,
        name: `${dict.hero.name} Portfolio`,
        description: dict.about.content.substring(0, 200),
        publisher: {
            "@id": `${baseUrl}/#person`,
        },
        inLanguage: [
            {
                "@type": "Language",
                name: "English",
                alternateName: "en",
            },
            {
                "@type": "Language",
                name: "Persian",
                alternateName: "fa",
            },
        ],
        potentialAction: {
            "@type": "SearchAction",
            target: {
                "@type": "EntryPoint",
                urlTemplate: `${baseUrl}/search?q={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
        },
    };

    const portfolioSchema = {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "@id": `${baseUrl}/#portfolio`,
        name: `${dict.hero.name} Portfolio`,
        description: dict.about.content.substring(0, 200),
        url: `${baseUrl}/${lang}`,
        author: {
            "@id": `${baseUrl}/#person`,
        },
        creator: {
            "@id": `${baseUrl}/#person`,
        },
        dateCreated: "2024-01-01", // Adjust to your actual portfolio creation date
        dateModified: new Date().toISOString().split("T")[0],
        keywords:
            lang === "en"
                ? "React Developer, Next.js Developer, Frontend Developer, TypeScript, JavaScript, Web Development, UI/UX"
                : "توسعه‌دهنده React، توسعه‌دهنده Next.js، توسعه‌دهنده فرانت‌اند، TypeScript، JavaScript، توسعه وب",
        genre: "Portfolio",
        about: {
            "@type": "Thing",
            name: "Frontend Development",
            description: "Modern web development using React, Next.js, and TypeScript",
        },
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: `${baseUrl}/${lang}`,
            },
        ],
    };

    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": `${baseUrl}/#organization`,
        name: `${dict.hero.name} - Frontend Development Services`,
        description: "Professional frontend development services specializing in React, Next.js, and modern web technologies",
        url: `${baseUrl}/${lang}`,
        logo: `${baseUrl}${ogImageUrl}`,
        image: `${baseUrl}${ogImageUrl}`,
        founder: {
            "@id": `${baseUrl}/#person`,
        },
        address: {
            "@type": "PostalAddress",
            addressCountry: "Iran",
        },
        areaServed: {
            "@type": "Country",
            name: "Worldwide",
        },
        serviceType: [
            "Frontend Development",
            "React Development",
            "Next.js Development",
            "TypeScript Development",
            "Web Application Development",
            "UI/UX Implementation",
        ],
    };

    const schemas = [personSchema, websiteSchema, portfolioSchema, breadcrumbSchema, organizationSchema];

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(schemas),
            }}
        />
    );
}
