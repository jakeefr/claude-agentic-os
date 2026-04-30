'use client'

import { motion } from 'framer-motion'

// TODO: Update these links with your own URLs
const LINKS = [
  { label: 'GMAIL', href: 'https://mail.google.com', enabled: true },
  { label: 'CALENDAR', href: 'https://calendar.google.com', enabled: true },
  { label: 'DRIVE', href: 'https://drive.google.com', enabled: true },
  { label: 'GITHUB', href: 'https://github.com/YOUR_GITHUB', enabled: true },
  { label: 'WEBSITE', href: 'https://your-website.com', enabled: true },
  { label: 'X / TWITTER', href: 'https://x.com/YOUR_X_HANDLE', enabled: true },
  { label: 'NOTION', href: '#', enabled: false },
]

export function QuickLinks() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.6 }}
      className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg p-5 space-y-3"
    >
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold tracking-[0.15em] text-white uppercase">
          QUICK LINKS
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {LINKS.map((link) => (
          <a
            key={link.label}
            href={link.enabled ? link.href : undefined}
            target={link.enabled ? '_blank' : undefined}
            rel={link.enabled ? 'noopener noreferrer' : undefined}
            className={`block border rounded-lg px-3 py-2 text-[10px] font-medium uppercase tracking-[0.1em] text-center transition-colors ${
              link.enabled
                ? 'border-[rgba(255,255,255,0.1)] text-[#9CA3AF] hover:text-[#D97706] hover:border-[#D97706]/40 cursor-pointer'
                : 'border-[rgba(255,255,255,0.05)] text-[#333] cursor-default'
            }`}
          >
            {link.label}
          </a>
        ))}
      </div>
    </motion.div>
  )
}
