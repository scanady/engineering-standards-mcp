/**
 * Parser service for markdown files with frontmatter
 */

import matter from 'gray-matter';
import { Standard, StandardMetadata, ResponseFormat } from '../types.js';
import { validateMetadata } from './validator.js';
import { ERROR_MESSAGES } from '../constants.js';

/**
 * Parses a markdown file with frontmatter into a Standard object
 */
export function parseStandard(fileContent: string, filePath: string): Standard {
  try {
    const parsed = matter(fileContent);

    // Validate and parse metadata
    const metadata = validateMetadata(parsed.data);

    return {
      metadata,
      content: parsed.content.trim(),
      path: filePath,
    };
  } catch (error) {
    throw new Error(`${ERROR_MESSAGES.INVALID_METADATA} in ${filePath}: ${error}`);
  }
}

/**
 * Serializes a Standard object back to markdown with frontmatter
 */
export function serializeStandard(standard: Standard): string {
  return matter.stringify(standard.content, standard.metadata);
}

/**
 * Formats a standard for output based on response format
 */
export function formatStandard(standard: Standard, format: ResponseFormat): string {
  if (format === 'json') {
    return JSON.stringify(standard, null, 2);
  }

  // Markdown format
  return formatStandardAsMarkdown(standard);
}

/**
 * Formats a standard as human-readable markdown
 */
function formatStandardAsMarkdown(standard: Standard): string {
  const { metadata, content, path } = standard;

  return `# Standard: ${path}

## Metadata
- **Type**: ${metadata.type}
- **Tier**: ${metadata.tier}
- **Process**: ${metadata.process}
- **Tags**: ${metadata.tags.join(', ')}
- **Version**: ${metadata.version}
- **Status**: ${metadata.status}
- **Author**: ${metadata.author}
- **Created**: ${metadata.created}
- **Last Updated**: ${metadata.updated}

## Content

${content}
`;
}

/**
 * Formats multiple standards for output
 */
export function formatStandards(standards: Standard[], format: ResponseFormat): string {
  if (format === 'json') {
    return JSON.stringify(standards, null, 2);
  }

  // Markdown format
  if (standards.length === 0) {
    return 'No standards found.';
  }

  return standards.map((s, i) => `${i + 1}. ${formatStandardAsMarkdown(s)}\n---\n`).join('\n');
}

/**
 * Formats metadata only (without content) for output
 */
export function formatMetadata(
  metadata: StandardMetadata,
  path: string,
  format: ResponseFormat
): string {
  if (format === 'json') {
    return JSON.stringify({ path, metadata }, null, 2);
  }

  // Markdown format
  return `**${path}**
- Type: ${metadata.type}
- Tier: ${metadata.tier}
- Process: ${metadata.process}
- Tags: ${metadata.tags.join(', ')}
- Version: ${metadata.version}
- Status: ${metadata.status}
- Author: ${metadata.author}
- Updated: ${metadata.updated}`;
}

/**
 * Formats multiple metadata entries for output
 */
export function formatMetadataList(
  entries: Array<{ path: string; metadata: StandardMetadata }>,
  format: ResponseFormat
): string {
  if (format === 'json') {
    return JSON.stringify(entries, null, 2);
  }

  // Markdown format
  if (entries.length === 0) {
    return 'No standards found.';
  }

  return entries.map((entry) => formatMetadata(entry.metadata, entry.path, format)).join('\n\n');
}

/**
 * Extracts a snippet of text around a search match
 */
export function extractContext(
  text: string,
  matchIndex: number,
  contextLength: number = 200
): string {
  const halfContext = Math.floor(contextLength / 2);
  const start = Math.max(0, matchIndex - halfContext);
  const end = Math.min(text.length, matchIndex + halfContext);

  let snippet = text.slice(start, end);

  // Add ellipsis if we're not at the start/end
  if (start > 0) snippet = '...' + snippet;
  if (end < text.length) snippet = snippet + '...';

  return snippet;
}

/**
 * Formats search results for output
 */
export function formatSearchResults(
  results: Array<{
    standard: Standard;
    matches: Array<{ context: string }>;
    score: number;
  }>,
  format: ResponseFormat
): string {
  if (format === 'json') {
    return JSON.stringify(results, null, 2);
  }

  // Markdown format
  if (results.length === 0) {
    return 'No results found.';
  }

  return results
    .map((result, i) => {
      const { standard, matches, score } = result;
      const matchContexts = matches.map((m) => `  > ${m.context}`).join('\n');

      return `${i + 1}. **${standard.path}** (score: ${score.toFixed(2)})
   Type: ${standard.metadata.type} | Tier: ${standard.metadata.tier} | Process: ${standard.metadata.process}
   Tags: ${standard.metadata.tags.join(', ')}
   
   Matches:
${matchContexts}
`;
    })
    .join('\n');
}
