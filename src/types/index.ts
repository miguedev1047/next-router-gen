export interface WatcherConfig {
  appDir?: string
  enabled?: boolean
  typescript?: boolean
}

export type WatcherOptions = WatcherConfig

export type Language = 'typescript' | 'javascript'
export type TemplateType = 'page' | 'layout' | 'route'