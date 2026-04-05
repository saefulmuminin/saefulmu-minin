import fs from 'fs';

let code = fs.readFileSync('src/data/projects.ts', 'utf-8');

// Update types
code = code.replace(/description: string;/, 'description: { en: string; id: string; };');
code = code.replace(/problem:     string;/, 'problem:     { en: string; id: string; };');
code = code.replace(/solution:    string;/, 'solution:    { en: string; id: string; };');
code = code.replace(/features:    string\[\];/, 'features:    { en: string[]; id: string[]; };');

fs.writeFileSync('src/data/projects.ts', code);

// Update properties
// We will rely on simple regex for description, problem, solution. They are wrapped in double quotes.
// Wait, some descriptions might span multiple lines if there are line breaks, but here they seem to be one string literal.
// Let's use a simpler approach: import the file, write a JSON, but we lose formatting. 

