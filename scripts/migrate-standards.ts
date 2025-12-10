#!/usr/bin/env tsx
import fs from 'fs/promises';
import path from 'path';
import { glob } from 'glob';
import matter from 'gray-matter';
import { STANDARDS_DIR } from '../src/constants.js';
import { validateMetadata } from '../src/services/validator.js';
import { generateFilePath } from '../src/services/storage.js';

async function migrate(dryRun = true) {
  const pattern = path.join(STANDARDS_DIR, '**', '*.md');
  const files = await glob(pattern, { nodir: true });

  if (files.length === 0) {
    console.log('No markdown files found to migrate.');
    return;
  }

  for (const f of files) {
    const content = await fs.readFile(f, 'utf8');
    const parsed = matter(content);
    const metadataRaw = parsed.data as Record<string, any>;
    try {
      const metadata = validateMetadata(metadataRaw);

      // Use existing filename (without extension) as sanitized title base
      const originalBasename = path.basename(f).replace(/\.md$/i, '');
      const newFilename = generateFilePath(metadata, originalBasename);
      const newRelative = newFilename; // generateFilePath returns filename relative to standards dir
      const newFull = path.join(STANDARDS_DIR, newRelative);
      const curRelative = path.relative(STANDARDS_DIR, f);

      if (path.normalize(curRelative) !== path.normalize(newRelative)) {
        console.log(`Will move: ${curRelative} -> ${newRelative}`);
        if (!dryRun) {
          // Ensure target dir
          await fs.mkdir(path.dirname(newFull), { recursive: true });
          // Write updated frontmatter (ensure type is normalized)
          const newContent = matter.stringify(parsed.content, metadata);
          await fs.writeFile(newFull, newContent, 'utf8');
          // Remove old file
          await fs.unlink(f);
        }
      } else {
        // Still update frontmatter if type changed (e.g., plural -> singular)
        if (metadata.type !== metadataRaw.type) {
          console.log(`Will update frontmatter type: ${curRelative} -> ${metadata.type}`);
          if (!dryRun) {
            const newContent = matter.stringify(parsed.content, metadata);
            await fs.writeFile(f, newContent, 'utf8');
          }
        }
      }
    } catch (e) {
      console.error(`Skipping ${f} due to validation error: ${e}`);
    }
  }
}

// CLI
const argv = process.argv.slice(2);
const dryRun = !(argv.includes('--apply') || argv.includes('--run'));

console.log(`Running migration (dryRun=${dryRun})`);
migrate(dryRun)
  .then(() => console.log('Migration complete.'))
  .catch((err) => console.error('Migration failed:', err));
