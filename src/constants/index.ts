export const FILE_EXTENSIONS = {
  TYPESCRIPT: {
    PAGE: /^page\.(tsx)$/,
    LAYOUT: /^layout\.(tsx)$/,
    ROUTE: /^route\.(ts)$/,
  },
  JAVASCRIPT: {
    PAGE: /^page\.(jsx)$/,
    LAYOUT: /^layout\.(jsx)$/,
    ROUTE: /^route\.(js)$/,
  },
} as const

export const TEMPLATE_TYPES = {
  PAGE: 'page',
  LAYOUT: 'layout',
  ROUTE: 'route',
} as const

export const LANGUAGES = {
  TYPESCRIPT: 'typescript',
  JAVASCRIPT: 'javascript',
} as const

export const DEFAULT_CONFIG = {
  appDir: './app',
  enabled: true,
  typescript: true,
} as const