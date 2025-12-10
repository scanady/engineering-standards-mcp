/**
 * Zod validation schemas for the Engineering Standards MCP Server
 */

import { z } from 'zod';
import {
  VALID_TYPES,
  VALID_TIERS,
  VALID_PROCESSES,
  VALID_STATUSES,
  VERSION_REGEX,
  MAX_SEARCH_LIMIT,
} from '../constants.js';

/**
 * Base metadata schema
 */
export const StandardMetadataSchema = z.object({
  type: z.enum(VALID_TYPES).describe('Category type of the standard'),
  tier: z.enum(VALID_TIERS).describe('Technical tier the standard applies to'),
  process: z.enum(VALID_PROCESSES).describe('Process category the standard belongs to'),
  tags: z.array(z.string()).describe('List of tags for categorization'),
  version: z
    .string()
    .regex(VERSION_REGEX, 'Version must be in semver format (e.g., 1.0.0)')
    .describe('Semantic version number'),
  created: z.string().describe('ISO date string when the standard was created'),
  updated: z.string().describe('ISO date string when the standard was last updated'),
  author: z.string().describe('Author or team who created the standard'),
  status: z.enum(VALID_STATUSES).describe('Current status of the standard'),
});

/**
 * Partial metadata schema for updates
 */
export const PartialStandardMetadataSchema = StandardMetadataSchema.partial();

/**
 * Response format schema
 */
export const ResponseFormatSchema = z
  .enum(['json', 'markdown'])
  .default('markdown')
  .describe('Output format: "json" for structured data or "markdown" for human-readable text');

/**
 * Version bump schema
 */
export const VersionBumpSchema = z
  .enum(['major', 'minor', 'patch'])
  .default('patch')
  .describe('Version increment type');

/**
 * Tool input schemas
 */

// standards_list_index
export const ListIndexInputSchema = z
  .object({
    filter_type: z.enum(VALID_TYPES).optional().describe('Filter by standard type'),
    filter_tier: z.enum(VALID_TIERS).optional().describe('Filter by tier'),
    filter_process: z.enum(VALID_PROCESSES).optional().describe('Filter by process'),
    filter_status: z.enum(VALID_STATUSES).optional().describe('Filter by status'),
    response_format: ResponseFormatSchema,
  })
  .strict();

// standards_get
export const GetStandardInputSchema = z
  .object({
    path: z.string().optional().describe('Exact file path to the standard relative to the standards directory (e.g., standard-backend-development-spring-boot-security-active.md). For backward compatibility the server accepts shorter names (e.g. spring-boot-security.md or standards/spring-boot-security.md)'),
    type: z.enum(VALID_TYPES).optional().describe('Standard type to search for'),
    tier: z.enum(VALID_TIERS).optional().describe('Tier to search for'),
    process: z.enum(VALID_PROCESSES).optional().describe('Process to search for'),
    tags: z.array(z.string()).optional().describe('Tags to filter by (must match all)'),
    response_format: ResponseFormatSchema,
  })
  .strict()
  .refine((data) => data.path || (data.type && data.tier && data.process), {
    message: 'Must provide either path or combination of type, tier, and process',
  });

// standards_search
export const SearchStandardsInputSchema = z
  .object({
    query: z.string().min(2).describe('Search query string (minimum 2 characters)'),
    filter_type: z.enum(VALID_TYPES).optional().describe('Filter results by type'),
    filter_tier: z.enum(VALID_TIERS).optional().describe('Filter results by tier'),
    filter_process: z.enum(VALID_PROCESSES).optional().describe('Filter results by process'),
    filter_tags: z.array(z.string()).optional().describe('Filter results by tags'),
    limit: z
      .number()
      .int()
      .min(1)
      .max(MAX_SEARCH_LIMIT)
      .default(10)
      .describe(`Maximum number of results to return (1-${MAX_SEARCH_LIMIT})`),
    response_format: ResponseFormatSchema,
  })
  .strict();

// standards_create
export const CreateStandardInputSchema = z
  .object({
    metadata: z
      .object({
        type: z.enum(VALID_TYPES).describe('Category type of the standard'),
        tier: z.enum(VALID_TIERS).describe('Technical tier'),
        process: z.enum(VALID_PROCESSES).describe('Process category'),
        tags: z.array(z.string()).describe('Tags for categorization'),
        author: z.string().describe('Author or team name'),
        status: z.enum(VALID_STATUSES).describe('Status of the standard'),
      })
      .strict(),
    content: z.string().min(1).describe('Markdown content of the standard'),
    filename: z.string().optional().describe('Optional custom filename (without extension)'),
  })
  .strict();

// standards_update
export const UpdateStandardInputSchema = z
  .object({
    path: z.string().describe('Path to the standard to update'),
    content: z.string().optional().describe('New content for the standard'),
    metadata: PartialStandardMetadataSchema.optional().describe('Metadata fields to update'),
    version_bump: VersionBumpSchema,
  })
  .strict()
  .refine((data) => data.content || data.metadata, {
    message: 'Must provide either content or metadata to update',
  });

// standards_get_metadata
export const GetMetadataInputSchema = z
  .object({
    filter_type: z.enum(VALID_TYPES).optional().describe('Filter by type'),
    filter_tier: z.enum(VALID_TIERS).optional().describe('Filter by tier'),
    filter_process: z.enum(VALID_PROCESSES).optional().describe('Filter by process'),
    filter_tags: z.array(z.string()).optional().describe('Filter by tags'),
    filter_status: z.enum(VALID_STATUSES).optional().describe('Filter by status'),
    response_format: ResponseFormatSchema,
  })
  .strict();

/**
 * Type inference helpers
 */
export type ListIndexInput = z.infer<typeof ListIndexInputSchema>;
export type GetStandardInput = z.infer<typeof GetStandardInputSchema>;
export type SearchStandardsInput = z.infer<typeof SearchStandardsInputSchema>;
export type CreateStandardInput = z.infer<typeof CreateStandardInputSchema>;
export type UpdateStandardInput = z.infer<typeof UpdateStandardInputSchema>;
export type GetMetadataInput = z.infer<typeof GetMetadataInputSchema>;
