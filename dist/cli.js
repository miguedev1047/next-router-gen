#!/usr/bin/env node
import { startWatcher } from './core/watcher.js';
console.log(' ');
console.log('🚀 Starting Next.js Router Generator...');
console.log('💡 Create a "next-router-gen.json" file to customize configuration');
console.log(' ');
const watcher = startWatcher();
if (watcher.close) {
    process.on('SIGINT', () => {
        console.log(' ');
        console.log('\n👋 Stopping watcher...');
        console.log(' ');
        watcher.close();
        process.exit(0);
    });
}
else {
    console.log(' ');
    console.log('ℹ️ Watcher is disabled. Check your configuration.');
    console.log(' ');
    process.exit(0);
}
//# sourceMappingURL=cli.js.map