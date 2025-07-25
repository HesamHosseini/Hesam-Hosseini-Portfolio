"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Phone, Linkedin } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ContactSectionProps {
  dict: {
    title: string
    email: string
    phone: string
    linkedin: string
    form: {
      name: string
      email: string
      message: string
      send: string
      success: string
      error: string
    }
  }
  lang: string
}

export function ContactSection({ dict, lang }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus("idle")

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // In a real application, you would send this data to a backend API
    // For example:
    // const response = await fetch('/api/contact', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData),
    // });
    // if (response.ok) {
    //   setStatus('success');
    //   setFormData({ name: '', email: '', message: '' });
    // } else {
    //   setStatus('error');
    // }

    const success = Math.random() > 0.2 // 80% success rate for demo
    if (success) {
      setStatus("success")
      setFormData({ name: "", email: "", message: "" })
    } else {
      setStatus("error")
    }
    setIsSubmitting(false)
  }

  return (
    <section id="contact" className="container py-16 md:py-24 lg:py-32">
      <h2 className="text-3xl font-bold text-center mb-12 md:text-4xl lg:text-5xl">{dict.title}</h2>
      <div className="grid gap-12 md:grid-cols-2">
        <div className={cn("space-y-6", lang === "fa" ? "text-right" : "text-left")}>
          <p className="text-lg text-muted-foreground">
            {lang === "en"
              ? "Feel free to reach out to me through any of the following channels or by filling out the form."
              : "از طریق هر یک از کانال‌های زیر یا با پر کردن فرم با من در تماس باشید."}
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="h-6 w-6 text-primary" />
              <Link href={`mailto:${dict.email}`} className="text-lg hover:underline">
                {dict.email}
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-6 w-6 text-primary" />
              <Link href={`tel:${dict.phone}`} className="text-lg hover:underline">
                {dict.phone}
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <Linkedin className="h-6 w-6 text-primary" />
              <Link href={dict.linkedin} target="_blank" rel="noopener noreferrer" className="text-lg hover:underline">
                LinkedIn
              </Link>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-2">
            <Label htmlFor="name">{dict.form.name}</Label>
            <Input
              id="name"
              type="text"
              placeholder={dict.form.name}
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">{dict.form.email}</Label>
            <Input
              id="email"
              type="email"
              placeholder={dict.form.email}
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="message">{dict.form.message}</Label>
            <Textarea
              id="message"
              placeholder={dict.form.message}
              value={formData.message}
              onChange={handleChange}
              rows={5}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {lang === "en" ? "Sending..." : "در حال ارسال..."}
              </span>
            ) : (
              dict.form.send
            )}
          </Button>
          {status === "success" && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-green-500 text-center mt-4"
            >
              {dict.form.success}
            </motion.p>
          )}
          {status === "error" && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-center mt-4"
            >
              {dict.form.error}
            </motion.p>
          )}
        </form>
      </div>
    </section>
  )
}
