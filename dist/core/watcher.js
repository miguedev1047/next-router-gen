import fs from 'fs';
import path from 'path';
import chokidar from 'chokidar';
import { loadConfig } from '../utils/config.js';
import { getTemplates } from '../utils/templates.js';
import { getFileInfo, fillFileIfEmpty } from '../helpers/file-helpers.js';
export function startWatcher(options = {}) {
    const config = loadConfig(options);
    if (!config.enabled) {
        console.log('⏸️ Watcher is disabled by configuration');
        return { close: () => { } }; // Return a dummy watcher
    }
    let appDir = config.appDir;
    // Validate that the directory exists
    if (!fs.existsSync(appDir)) {
        const alternatives = ['./app', './src/app'];
        const found = alternatives.find((dir) => fs.existsSync(dir));
        if (!found) {
            throw new Error(`❌ Could not find app directory. Tried: ${alternatives.join(', ')}`);
        }
        appDir = found;
    }
    console.log(' ');
    console.log(`🔍 Watching for new files in: ${appDir}`);
    console.log(`📋 Will auto-fill boilerplate for:`);
    console.log(`   - page.tsx/jsx → Page component`);
    console.log(`   - layout.tsx/jsx → Layout component`);
    console.log(`   - route.ts/js → Route handler`);
    console.log(' ');
    const watcher = chokidar.watch(appDir, {
        ignored: /(^|[/\\])\../,
        persistent: true,
        ignoreInitial: true,
        depth: 10, // Watch nested directories
    });
    watcher.on('ready', () => {
        console.log('👀 Watcher is ready and monitoring for file changes...');
    });
    watcher.on('add', (filePath) => {
        const fileName = path.basename(filePath);
        const fileInfo = getFileInfo(fileName);
        if (fileInfo) {
            // Determine which language to use based on config or file extension
            const useLanguage = config.typescript ? 'typescript' : fileInfo.language;
            const templates = getTemplates(useLanguage);
            const template = templates[fileInfo.type];
            const fileTypeLabel = `${fileInfo.type} component`;
            fillFileIfEmpty(filePath, template, fileTypeLabel);
        }
    });
    watcher.on('error', (error) => {
        console.error('❌ Watcher error:', error);
    });
    return watcher;
}
//# sourceMappingURL=watcher.js.map