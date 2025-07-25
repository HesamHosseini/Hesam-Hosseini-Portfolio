"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { TypingAnimation } from "./typing-animation"

interface HeroSectionProps {
  dict: {
    name: string
    title: string
    tagline: string
    ctaResume: string
    ctaProjects: string
  }
  lang: string
}

export function HeroSection({ dict, lang }: HeroSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  }

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-primary/10 to-background py-20 text-center"
    >
      {/* Background animation elements */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div className="absolute -top-1/4 -left-1/4 h-1/2 w-1/2 rounded-full bg-purple-500/10 blur-3xl animate-blob-1" />
        <div className="absolute -bottom-1/4 -right-1/4 h-1/2 w-1/2 rounded-full bg-blue-500/10 blur-3xl animate-blob-2" />
        <div className="absolute top-1/4 right-1/4 h-1/3 w-1/3 rounded-full bg-pink-500/10 blur-3xl animate-blob-3" />
      </motion.div>

      <motion.div
        className="relative z-10 max-w-4xl px-4 space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          variants={itemVariants}
        >
          {dict.name}
        </motion.h1>
        <motion.p className="text-xl text-muted-foreground sm:text-2xl md:text-3xl" variants={itemVariants}>
          {dict.title}
        </motion.p>
        <motion.div variants={itemVariants}>
          <TypingAnimation
            text={dict.tagline}
            className="text-lg font-medium text-primary sm:text-xl md:text-2xl"
            speed={70}
            delay={1.5}
          />
        </motion.div>
        <motion.div className="flex flex-col sm:flex-row justify-center gap-4 pt-8" variants={itemVariants}>
          <Link
            href="https://docs.google.com/document/d/1sr5FYRHktZ0kVhx8h6r37mfHFDy9NPaQ0f2oFmJbAGE/export?tab=t.0&format=pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg" className="w-full sm:w-auto">
              {dict.ctaResume}
            </Button>
          </Link>
          <Link href={`/${lang}/#projects`} scroll={true}>
            <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
              {dict.ctaProjects}
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}
