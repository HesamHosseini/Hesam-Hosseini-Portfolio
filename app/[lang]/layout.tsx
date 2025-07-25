import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { StructuredData } from "@/components/structured-data";
import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Inter, Vazirmatn } from "next/font/google";
import type React from "react";
import "../globals.css";
import { getDictionary } from "./dictionaries";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

const vazirmatn = Vazirmatn({
    subsets: ["arabic"],
    variable: "--font-vazirmatn",
});

type Lang = "en" | "fa";

export async function generateStaticParams() {
    return [{ lang: "en" }, { lang: "fa" }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: Lang }> }): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    const title = dict.hero.name + " – " + dict.hero.title;
    const description = dict.about.content.substring(0, 160); // SEO-friendly length
    const baseUrl = "https://hesam-hosseini.vercel.app"; // Replace with your actual domain
    const currentUrl = `${baseUrl}/${lang}`;

    // Enhanced keywords based on skills and expertise
    const keywords =
        lang === "en"
            ? [
                  "Hesam Hosseini",
                  "Senior Frontend Developer",
                  "React Developer",
                  "Next.js Developer",
                  "TypeScript Developer",
                  "Tailwind CSS Expert",
                  "JavaScript Engineer",
                  "UI/UX Developer",
                  "Tehran Frontend Developer",
                  "Freelance Web Developer",
                  "React.js Specialist",
                  "Modern Web Development",
                  "Responsive Design",
                  "Web Application Development",
                  "Frontend Engineering",
                  "ShadCN UI",
                  "Framer Motion",
                  "Performance Optimization",
                  "Multilingual Web Apps",
                  "E-commerce Development",
                  "Crypto Dashboard Development",
                  "SSR",
                  "CSR",
                  "App Router",
                  "i18n Implementation",
              ]
            : [
                  "حسام حسینی",
                  "توسعه‌دهنده ارشد فرانت‌اند",
                  "توسعه‌دهنده React",
                  "توسعه‌دهنده Next.js",
                  "توسعه‌دهنده TypeScript",
                  "متخصص Tailwind CSS",
                  "مهندس JavaScript",
                  "توسعه‌دهنده UI/UX",
                  "توسعه‌دهنده فرانت‌اند تهران",
                  "توسعه‌دهنده وب فریلنس",
                  "متخصص React.js",
                  "توسعه وب مدرن",
                  "طراحی ریسپانسیو",
                  "توسعه اپلیکیشن وب",
                  "مهندسی فرانت‌اند",
                  "بهینه‌سازی عملکرد",
                  "اپلیکیشن‌های چندزبانه",
                  "توسعه تجارت الکترونیک",
                  "توسعه داشبورد کریپتو",
              ];

    return {
        title: {
            default: title,
            template: `%s | ${dict.hero.name} Portfolio`,
        },
        description: description,
        keywords: keywords,
        authors: [{ name: dict.hero.name, url: currentUrl }],
        creator: dict.hero.name,
        publisher: dict.hero.name,
        formatDetection: {
            email: false,
            address: false,
            telephone: false,
        },
        metadataBase: new URL(baseUrl),
        alternates: {
            canonical: currentUrl,
            languages: {
                "en-US": `${baseUrl}/en`,
                "fa-IR": `${baseUrl}/fa`,
                "x-default": `${baseUrl}/en`,
            },
        },
        openGraph: {
            title: title,
            description: description,
            url: currentUrl,
            siteName: `${dict.hero.name} Portfolio`,
            images: [
                {
                    url: `/og?title=${encodeURIComponent(dict.hero.name)}&subtitle=${encodeURIComponent(dict.hero.title)}&lang=${lang}`,
                    width: 1200,
                    height: 630,
                    alt: `${dict.hero.name} - ${dict.hero.title}`,
                    type: "image/png",
                },
                {
                    url: "/og-image-square.jpg", // Square version for some platforms
                    width: 1080,
                    height: 1080,
                    alt: `${dict.hero.name} Portfolio`,
                    type: "image/jpeg",
                },
            ],
            locale: lang === "en" ? "en_US" : "fa_IR",
            type: "website",
            countryName: "Iran",
        },
        twitter: {
            card: "summary_large_image",
            title: title,
            description: description,
            images: [`/og?title=${encodeURIComponent(dict.hero.name)}&subtitle=${encodeURIComponent(dict.hero.title)}&lang=${lang}`],
            creator: "@hesamhosseini", // Add your Twitter handle
            site: "@hesamhosseini", // Add your Twitter handle
        },
        robots: {
            index: true,
            follow: true,
            nocache: false,
            googleBot: {
                index: true,
                follow: true,
                noimageindex: false,
                "max-video-preview": -1,
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        },
        verification: {
            google: "your-google-verification-code", // Add your Google Search Console verification
            // yandex: "your-yandex-verification-code", // Add if targeting Russian/Eastern European markets
            // other: "your-other-verification-codes",
        },
        category: "technology",
        classification: "portfolio",
        referrer: "origin-when-cross-origin",
        applicationName: `${dict.hero.name} Portfolio`,
        generator: "Next.js",
        abstract:
            lang === "en"
                ? "I am a Senior Frontend Developer specializing in React, Next.js, and TypeScript. I build scalable, performant web applications with modern technologies."
                : "من یک توسعه‌دهنده ارشد فرانت‌اند متخصص در React، Next.js و TypeScript هستم. من برنامه‌های وب مقیاس‌پذیر و با عملکرد بالا با تکنولوژی‌های مدرن می‌سازم.",
        manifest: "/manifest.json", // Create this later
        other: {
            "apple-mobile-web-app-capable": "yes",
            "apple-mobile-web-app-status-bar-style": "default",
            "apple-mobile-web-app-title": dict.hero.name,
            "mobile-web-app-capable": "yes",
            "theme-color": "#000000", // Adjust based on your theme
            "color-scheme": "dark light",
        },
    };
}

export default async function RootLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ lang: Lang }>;
}>) {
    const { lang } = await params;
    const dict = await getDictionary(lang);

    return (
        <html lang={lang} dir={lang === "fa" ? "rtl" : "ltr"} suppressHydrationWarning>
            <head>
                <StructuredData lang={lang} dict={dict} />
            </head>
            <body
                className={`min-h-screen bg-background font-sans antialiased ${inter.variable} ${vazirmatn.variable}`}
                suppressHydrationWarning
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                    storageKey="hesam-portfolio-theme"
                >
                    <Header dict={dict.header} lang={lang} />
                    <main>{children}</main>
                    <Footer dict={dict.footer} lang={lang} />
                </ThemeProvider>
            </body>
        </html>
    );
}
