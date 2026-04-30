#!/usr/bin/env npx tsx
import 'dotenv/config'
import nodemailer from 'nodemailer'

function parseArgs(args: string[]): Record<string, string> {
  const result: Record<string, string> = {}
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--') && i + 1 < args.length) {
      result[args[i].slice(2)] = args[i + 1]
      i++
    }
  }
  return result
}

async function readStdin(): Promise<string> {
  if (process.stdin.isTTY) return ''
  const chunks: Buffer[] = []
  for await (const chunk of process.stdin) chunks.push(chunk)
  return Buffer.concat(chunks).toString('utf-8')
}

async function main() {
  const { GMAIL_USER, GMAIL_APP_PASSWORD } = process.env
  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
    console.error('Missing GMAIL_USER or GMAIL_APP_PASSWORD in .env')
    process.exit(1)
  }

  const parsed = parseArgs(process.argv.slice(2))
  const to = parsed.to
  const subject = parsed.subject
  let body = parsed.body

  if (!to || !subject) {
    console.error('Usage: npx tsx automations/send-email.ts --to <addr> --subject <subj> [--body <text>]')
    console.error('If --body is omitted, reads from stdin.')
    process.exit(1)
  }

  if (!body) {
    body = await readStdin()
    if (!body) {
      console.error('No --body provided and stdin is empty.')
      process.exit(1)
    }
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
  })

  const info = await transporter.sendMail({
    from: GMAIL_USER,
    to,
    subject,
    text: body,
  })

  console.log(`Sent: ${info.messageId}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
