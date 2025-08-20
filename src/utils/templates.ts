import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import type { Language, TemplateType } from '../types/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load template based on language and type
function loadTemplate(templateType: TemplateType, language: Language): string {
  const langFolder = language === 'typescript' ? 'ts' : 'js'
  const templatePath = path.resolve(
    __dirname,
    '..',
    '..',
    'boilterplate',
    langFolder,
    `${templateType}.txt`
  )
  return fs.readFileSync(templatePath, 'utf-8')
}

// Get templates for a specific language
export function getTemplates(language: Language) {
  return {
    page: loadTemplate('page', language),
    layout: loadTemplate('layout', language),
    route: loadTemplate('route', language),
  }
}

// Legacy exports for backward compatibility (defaults to TypeScript)
export const pageTemplate = loadTemplate('page', 'typescript')
export const layoutTemplate = loadTemplate('layout', 'typescript')
export const routeTemplate = loadTemplate('route', 'typescript')