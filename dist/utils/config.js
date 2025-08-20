import fs from 'fs';
import path from 'path';
import { DEFAULT_CONFIG } from '../constants/index.js';
// Create default configuration file
function createDefaultConfig(configPath) {
    try {
        fs.writeFileSync(configPath, JSON.stringify(DEFAULT_CONFIG, null, 2), 'utf-8');
        console.log(`✅ Created default config file: ${configPath}`);
    }
    catch (error) {
        console.warn(`⚠️ Failed to create default config file: ${configPath}`, error);
    }
}
// Load configuration from file or use defaults
export function loadConfig(options = {}) {
    const configPath = path.resolve(process.cwd(), 'next-router-gen.json');
    let fileConfig = {};
    if (fs.existsSync(configPath)) {
        try {
            const configContent = fs.readFileSync(configPath, 'utf-8');
            const parsedConfig = JSON.parse(configContent);
            // Extract only the properties we care about, ignore $schema
            fileConfig = {
                appDir: parsedConfig.appDir,
                enabled: parsedConfig.enabled,
                typescript: parsedConfig.typescript,
            };
            console.log(`📋 Loaded config from: ${configPath}`);
        }
        catch (error) {
            console.warn(`⚠️ Failed to parse config file: ${configPath}`, error);
        }
    }
    else {
        // Create default config file if it doesn't exist
        createDefaultConfig(configPath);
        fileConfig = DEFAULT_CONFIG;
    }
    return {
        appDir: options.appDir || fileConfig.appDir || path.resolve(process.cwd(), 'app'),
        enabled: options.enabled ?? fileConfig.enabled ?? true,
        typescript: options.typescript ?? fileConfig.typescript ?? true,
    };
}
//# sourceMappingURL=config.js.map