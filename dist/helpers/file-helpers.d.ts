import type { Language, TemplateType } from '../types/index.js';
export declare function getFileInfo(fileName: string): {
    type: TemplateType;
    language: Language;
} | null;
export declare function isPageFile(fileName: string): boolean;
export declare function isLayoutFile(fileName: string): boolean;
export declare function isRouteFile(fileName: string): boolean;
export declare function fillFileIfEmpty(filePath: string, template: string, fileType: string): void;
//# sourceMappingURL=file-helpers.d.ts.map