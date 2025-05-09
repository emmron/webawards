const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Find all TypeScript files
const files = glob.sync('**/*.{ts,tsx,js,jsx}', {
  ignore: ['node_modules/**', '.next/**', '.contentlayer/**', 'scripts/fixContentlayerImports.js']
});

// Patterns to match
const contentlayerPattern = /from\s+['"]contentlayer\/generated['"]/g;
const contentlayer2Pattern = /from\s+['"]contentlayer2\/generated['"]/g;

// Replace all occurrences
files.forEach(file => {
  try {
    const filePath = path.resolve(file);
    const content = fs.readFileSync(filePath, 'utf8');

    // Skip files that don't have contentlayer imports
    if (!content.includes('contentlayer/generated') && !content.includes('contentlayer2/generated')) {
      return;
    }

    console.log(`Fixing imports in ${file}`);

    // Replace the imports
    const updatedContent = content.replace(contentlayerPattern, "from '.contentlayer/generated'")
                                  .replace(contentlayer2Pattern, "from '.contentlayer/generated'");

    fs.writeFileSync(filePath, updatedContent);
  } catch (error) {
    console.error(`Error processing ${file}:`, error);
  }
});

console.log('All contentlayer imports have been updated to use .contentlayer/generated');