/**
 * Shared constants for the Engineering Standards MCP Server
 */

import path from 'path';

/**
 * Server configuration
 */
export const SERVER_NAME = 'engineering-standards-mcp-server';
export const SERVER_VERSION = '1.0.0';
export const DEFAULT_PORT = 3000;

/**
 * Storage configuration
 */
export const STANDARDS_DIR = process.env.STANDARDS_DIR || path.join(process.cwd(), 'standards');

/**
 * Valid metadata values
 */
export const VALID_TYPES = ['principle', 'standard', 'practice', 'tech-stack', 'process'] as const;
export const VALID_TIERS = ['frontend', 'backend', 'database', 'infrastructure', 'security'] as const;
export const VALID_PROCESSES = ['development', 'testing', 'delivery', 'operations'] as const;
export const VALID_STATUSES = ['active', 'draft', 'deprecated'] as const;

/**
 * Search and pagination limits
 */
export const DEFAULT_SEARCH_LIMIT = 10;
export const MAX_SEARCH_LIMIT = 50;
export const SEARCH_CONTEXT_LENGTH = 200; // Characters of context around matches

/**
 * Response format constants
 */
export const DEFAULT_RESPONSE_FORMAT = 'markdown';

/**
 * File extensions
 */
export const MARKDOWN_EXTENSION = '.md';

/**
 * Version format
 */
export const VERSION_REGEX = /^\d+\.\d+\.\d+$/;

/**
 * Date format
 */
export const ISO_DATE_FORMAT = 'YYYY-MM-DD';

/**
 * Tool names (with service prefix for MCP)
 */
export const TOOL_NAMES = {
  LIST_INDEX: 'standards_list_index',
  GET: 'standards_get',
  SEARCH: 'standards_search',
  CREATE: 'standards_create',
  UPDATE: 'standards_update',
  GET_METADATA: 'standards_get_metadata',
} as const;

/**
 * Error messages
 */
export const ERROR_MESSAGES = {
  STANDARD_NOT_FOUND: 'Standard not found',
  INVALID_PATH: 'Invalid standard path',
  INVALID_METADATA: 'Invalid metadata format',
  INVALID_VERSION: 'Invalid version format (must be semver: X.Y.Z)',
  FILE_READ_ERROR: 'Error reading standard file',
  FILE_WRITE_ERROR: 'Error writing standard file',
  SEARCH_ERROR: 'Error performing search',
  MISSING_REQUIRED_FIELD: 'Missing required metadata field',
} as const;
