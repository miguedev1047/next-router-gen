# next-router-gen

A library to automatically generate Next.js App Router boilerplate files when creating new directories in your application.

## Features

- 🔍 Watches for changes in the Next.js `app/` directory
- 📄 Automatically generates `page.tsx`, `layout.tsx`, and `route.ts` files
- ⚙️ Support for both TypeScript and JavaScript
- 🚀 Configurable and easy to use
- 📦 CLI included for direct usage

## Installation

```bash
# npm
npm install -D next-router-gen

# yarn
yarn add -D next-router-gen

# pnpm
pnpm add -D next-router-gen

# bun
bun add next-router-gen -d
```

## Show Case

![Showcase](./src/assets/video-demo.gif)

## Usage

### Quick Start with Next.js (Only work with App Router)

1. **Install the package** in your Next.js project:

```bash
npm install -D next-router-gen
```

2. **Option A: Simple setup (recommended)**

```json
{
  "scripts": {
    "dev": "next-router-gen & next dev",
    "watch-routes": "next-router-gen",
    "build": "next build",
    "start": "next start"
  }
}
```

3. **Option B: Using concurrently for better control**

```bash
npm install -D concurrently
```

```json
{
  "scripts": {
    "dev": "concurrently \"next dev\" \"next-router-gen\"",
    "watch-routes": "next-router-gen",
    "build": "next build",
    "start": "next start"
  }
}
```

4. **Start development with auto-generation**:

```bash
npm run dev
```

5. **Create new routes** - just add empty files and they'll be auto-filled:

```bash
# Create these empty files in your app directory:
touch app/dashboard/page.tsx          # → Auto-filled with page component
touch app/dashboard/layout.tsx        # → Auto-filled with layout component
touch app/api/users/route.ts          # → Auto-filled with API route handlers
```

### Configuration

The generator will automatically create a `next-router-gen.json` file in your project root the first time it runs:

```json
{
  "appDir": "./app",
  "enabled": true,
  "typescript": true
}
```

#### Configuration options:

- `appDir`: Next.js application directory (default: `"./app"`)
- `enabled`: Enable/disable the watcher (default: `true`)
- `typescript`: Use TypeScript or JavaScript templates (default: `true`)

### Usage Methods

#### Method 1: CLI (Recommended)

```bash
# Run once
npx next-router-gen

# Or use the configured script
npm run dev  # (if you set up the scripts above)
```

#### Method 2: Programmatic usage

```typescript
// scripts/watch-routes.js
import { startWatcher } from 'next-router-gen'

const watcher = startWatcher({
  appDir: './app', // Optional: configuration override
  enabled: true, // Optional: enable/disable
  typescript: true, // Optional: use TypeScript or JavaScript
})

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Stopping watcher...')
  watcher.close()
  process.exit(0)
})
```

### Real-world Example

```bash
# Your Next.js project structure
my-nextjs-app/
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
├── package.json
└── next-router-gen.json

# Start the watcher
npm run dev

# Create new routes (empty files)
touch app/about/page.tsx              # → Page component
touch app/blog/page.tsx               # → Blog listing page
touch app/blog/[slug]/page.tsx        # → Dynamic blog post page
touch app/blog/[slug]/layout.tsx      # → Blog post layout
touch app/api/posts/route.ts          # → API route with GET/POST
touch app/api/posts/[id]/route.ts     # → Dynamic API route

# All files are automatically filled with appropriate boilerplate! ✨
```

### What gets generated?

When you create an empty file, the generator detects the file type and fills it with the appropriate template:

- **`page.tsx/jsx`** → React page component with basic structure
- **`layout.tsx/jsx`** → Layout component with children prop and basic styling
- **`route.ts/js`** → API route handlers (GET, POST, PUT, DELETE)

The generator respects your file extension:

- `.tsx/.ts` files get TypeScript templates with proper typing
- `.jsx/.js` files get JavaScript templates without type annotations

## Development

```bash
# Build the package
npm run build

# Development with watch mode
npm run dev

# Linting
npm run lint

# Type checking
npm run check-types
```

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.
