import fs from 'fs'
import path from 'path'
import { FILE_EXTENSIONS } from '../constants/index.js'
import type { Language, TemplateType } from '../types/index.js'

// Helper functions to identify file types and language
export function getFileInfo(fileName: string): { type: TemplateType; language: Language } | null {
  // Check TypeScript files
  if (FILE_EXTENSIONS.TYPESCRIPT.PAGE.test(fileName)) {
    return { type: 'page', language: 'typescript' }
  }
  if (FILE_EXTENSIONS.TYPESCRIPT.LAYOUT.test(fileName)) {
    return { type: 'layout', language: 'typescript' }
  }
  if (FILE_EXTENSIONS.TYPESCRIPT.ROUTE.test(fileName)) {
    return { type: 'route', language: 'typescript' }
  }

  // Check JavaScript files
  if (FILE_EXTENSIONS.JAVASCRIPT.PAGE.test(fileName)) {
    return { type: 'page', language: 'javascript' }
  }
  if (FILE_EXTENSIONS.JAVASCRIPT.LAYOUT.test(fileName)) {
    return { type: 'layout', language: 'javascript' }
  }
  if (FILE_EXTENSIONS.JAVASCRIPT.ROUTE.test(fileName)) {
    return { type: 'route', language: 'javascript' }
  }

  return null
}

// Legacy functions for backward compatibility
export function isPageFile(fileName: string): boolean {
  return /^page\.(tsx?|jsx?)$/.test(fileName)
}

export function isLayoutFile(fileName: string): boolean {
  return /^layout\.(tsx?|jsx?)$/.test(fileName)
}

export function isRouteFile(fileName: string): boolean {
  return /^route\.(ts|js)$/.test(fileName)
}

export function fillFileIfEmpty(filePath: string, template: string, fileType: string) {
  try {
    // Check if file exists and read its content
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️ File not found: ${filePath}`)
      return
    }

    const content = fs.readFileSync(filePath, 'utf-8')

    // Only fill if the file is empty or contains only whitespace
    if (content.trim().length === 0) {
      fs.writeFileSync(filePath, template, 'utf-8')
      console.log(
        `✅ Filled empty ${fileType}: ${path.relative(process.cwd(), filePath)}`
      )
    } else {
      console.log(
        `ℹ️ Skipped ${fileType} (already has content): ${path.relative(
          process.cwd(),
          filePath
        )}`
      )
    }
  } catch (error) {
    console.error(`❌ Failed to fill ${fileType} at ${filePath}:`, error)
  }
}