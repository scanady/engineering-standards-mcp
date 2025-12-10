/**
 * Tool: standards_get_metadata
 * Gets metadata for standards without loading full content
 */

import { GetMetadataInput } from '../schemas/metadata.js';
import { ToolResponse } from '../types.js';
import { getMetadataList } from '../services/indexer.js';
import { formatMetadataList } from '../services/parser.js';

/**
 * Gets metadata for standards matching filter criteria
 */
export async function getMetadata(params: GetMetadataInput): Promise<ToolResponse> {
  try {
    const { filter_type, filter_tier, filter_process, filter_tags, filter_status, response_format } =
      params;

    // Get filtered metadata list
    const metadataList = getMetadataList({
      type: filter_type,
      tier: filter_tier,
      process: filter_process,
      tags: filter_tags,
      status: filter_status,
    });

    if (metadataList.length === 0) {
      return {
        content: [
          {
            type: 'text',
            text: 'No standards found matching the specified criteria.',
          },
        ],
        structuredContent: {
          count: 0,
          standards: [],
        },
      };
    }

    // Format output
    const outputText = formatMetadataList(metadataList, response_format);
    const structuredOutput = {
      count: metadataList.length,
      standards: metadataList,
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
          text: `Error retrieving metadata: ${(error as Error).message}`,
        },
      ],
      isError: true,
    };
  }
}
