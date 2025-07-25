import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Hesam Hosseini Portfolio",
    description: "Full-stack Developer Portfolio",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return children;
}
