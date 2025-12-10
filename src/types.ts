/**
 * Core type definitions for the Engineering Standards MCP Server
 */

/**
 * Valid standard types
 */
export type StandardType = 'principle' | 'standard' | 'practice' | 'tech-stack' | 'process';

/**
 * Valid tier levels
 */
export type StandardTier = 'frontend' | 'backend' | 'database' | 'infrastructure' | 'security';

/**
 * Valid process categories
 */
export type StandardProcess = 'development' | 'testing' | 'delivery' | 'operations';

/**
 * Valid status values
 */
export type StandardStatus = 'active' | 'draft' | 'deprecated';

/**
 * Response format types
 */
export type ResponseFormat = 'json' | 'markdown';

/**
 * Version bump types
 */
export type VersionBump = 'major' | 'minor' | 'patch';

/**
 * Metadata structure for all standards
 */
export interface StandardMetadata {
  type: StandardType;
  tier: StandardTier;
  process: StandardProcess;
  tags: string[];
  version: string;
  created: string;  // ISO date string
  updated: string;  // ISO date string
  author: string;
  status: StandardStatus;
}

/**
 * Complete standard with content and metadata
 */
export interface Standard {
  metadata: StandardMetadata;
  content: string;
  path: string;
}

/**
 * Index entry for listing standards
 */
export interface IndexEntry {
  path: string;
  metadata: StandardMetadata;
}

/**
 * Hierarchical index structure
 */
export interface HierarchicalIndex {
  [type: string]: {
    [tier: string]: {
      [process: string]: IndexEntry[];
    };
  };
}

/**
 * Search result with context
 */
export interface SearchResult {
  standard: Standard;
  matches: SearchMatch[];
  score: number;
}

/**
 * Individual search match
 */
export interface SearchMatch {
  context: string;
  startIndex: number;
  endIndex: number;
}

/**
 * Filter options for querying standards
 */
export interface FilterOptions {
  type?: StandardType;
  tier?: StandardTier;
  process?: StandardProcess;
  tags?: string[];
  status?: StandardStatus;
}

/**
 * Pagination options
 */
export interface PaginationOptions {
  limit?: number;
  offset?: number;
}

/**
 * Tool response wrapper
 */
export interface ToolResponse<T = unknown> {
  content: Array<{
    type: 'text';
    text: string;
  }>;
  structuredContent?: T;
  isError?: boolean;
}
