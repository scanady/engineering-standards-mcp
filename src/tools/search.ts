/**
 * Tool: standards_search
 * Full-text search across all standards
 */

import { SearchStandardsInput } from '../schemas/metadata.js';
import { ToolResponse } from '../types.js';
import { searchStandards } from '../services/indexer.js';
import { formatSearchResults } from '../services/parser.js';

/**
 * Searches standards by query string with optional filters
 */
export async function searchStandardsTool(params: SearchStandardsInput): Promise<ToolResponse> {
  try {
    const { query, filter_type, filter_tier, filter_process, filter_tags, limit, response_format } =
      params;

    // Perform search
    const results = searchStandards(
      query,
      {
        type: filter_type,
        tier: filter_tier,
        process: filter_process,
        tags: filter_tags,
      },
      limit
    );

    if (results.length === 0) {
      return {
        content: [
          {
            type: 'text',
            text: `No results found for query: "${query}"`,
          },
        ],
        structuredContent: {
          query,
          count: 0,
          results: [],
        },
      };
    }

    // Format results
    const outputText = formatSearchResults(results, response_format);
    const structuredOutput = {
      query,
      count: results.length,
      results: results.map((r) => ({
        path: r.standard.path,
        metadata: r.standard.metadata,
        score: r.score,
        matchCount: r.matches.length,
        matches: r.matches,
      })),
    };

    return {
      content: [
        {
          type: 'text',
          text: outputText,
        },
      ],
      structuredContent: structuredOutput,
    };
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error searching standards: ${(error as Error).message}`,
        },
      ],
      isError: true,
    };
  }
}
