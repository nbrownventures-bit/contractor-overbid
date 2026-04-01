import fs from 'fs'
import path from 'path'
import { Report } from '@/types'

// Use /tmp on Vercel (serverless), data/ locally
const DATA_DIR = process.env.VERCEL
  ? path.join('/tmp', 'reports')
  : path.join(process.cwd(), 'data', 'reports')

function ensureDirectoryExists(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }
}

export function saveReport(report: Report): void {
  ensureDirectoryExists()
  const filePath = path.join(DATA_DIR, `${report.id}.json`)
  fs.writeFileSync(filePath, JSON.stringify(report, null, 2), 'utf-8')
}

export function getReport(id: string): Report | null {
  ensureDirectoryExists()
  const filePath = path.join(DATA_DIR, `${id}.json`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  try {
    const data = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(data) as Report
  } catch (error) {
    console.error(`Error reading report ${id}:`, error)
    return null
  }
}

export function updateReport(id: string, updates: Partial<Report>): Report | null {
  const existing = getReport(id)

  if (!existing) {
    return null
  }

  const updated: Report = { ...existing, ...updates }
  saveReport(updated)
  return updated
}
