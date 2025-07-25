"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface TypingAnimationProps {
  text: string
  speed?: number
  delay?: number
  className?: string
}

export function TypingAnimation({ text, speed = 100, delay = 0, className }: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text.charAt(index))
        setIndex((prev) => prev + 1)
      }
    }, speed)

    return () => clearTimeout(timer)
  }, [index, text, speed])

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: delay, duration: 0.5 }}
      className={className}
    >
      {displayedText}
      <motion.span
        className="inline-block w-0.5 h-full bg-foreground ml-1"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.8 }}
      />
    </motion.span>
  )
}
