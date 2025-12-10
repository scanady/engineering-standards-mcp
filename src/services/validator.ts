/**
 * Validator service for metadata validation and version management
 */

import { StandardMetadata, VersionBump } from '../types.js';
import { VERSION_REGEX, ERROR_MESSAGES } from '../constants.js';
import { StandardMetadataSchema } from '../schemas/metadata.js';

/**
 * Map plural type names (legacy) to singular form used by the application.
 */
const PLURAL_TYPE_TO_SINGULAR: Record<string, string> = {
  principles: 'principle',
  standards: 'standard',
  practices: 'practice',
  'technical-stack': 'tech-stack',
};

function normalizeMetadataType(metadata: Record<string, any>): Record<string, any> {
  const copy = { ...metadata };
  if (copy.type && typeof copy.type === 'string') {
    const lower = copy.type.toLowerCase();
    if (PLURAL_TYPE_TO_SINGULAR[lower]) {
      copy.type = PLURAL_TYPE_TO_SINGULAR[lower];
    }
  }
  return copy;
}

/**
 * Validates that metadata is complete and properly formatted
 */
export function validateMetadata(metadata: unknown): StandardMetadata {
  try {
    // If metadata is an object and contains a type, normalize plural -> singular
    const normalized = (metadata && typeof metadata === 'object') ? normalizeMetadataType(metadata as Record<string, any>) : metadata;
    return StandardMetadataSchema.parse(normalized);
  } catch (error) {
    throw new Error(`${ERROR_MESSAGES.INVALID_METADATA}: ${error}`);
  }
}

/**
 * Validates a semantic version string
 */
export function validateVersion(version: string): boolean {
  return VERSION_REGEX.test(version);
}

/**
 * Increments a semantic version based on bump type
 */
export function bumpVersion(currentVersion: string, bump: VersionBump): string {
  if (!validateVersion(currentVersion)) {
    throw new Error(ERROR_MESSAGES.INVALID_VERSION);
  }

  const [major, minor, patch] = currentVersion.split('.').map(Number);

  switch (bump) {
    case 'major':
      return `${major + 1}.0.0`;
    case 'minor':
      return `${major}.${minor + 1}.0`;
    case 'patch':
      return `${major}.${minor}.${patch + 1}`;
    default:
      throw new Error(`Invalid version bump type: ${bump}`);
  }
}

/**
 * Generates initial version for new standards
 */
export function generateInitialVersion(): string {
  return '1.0.0';
}

/**
 * Validates date string is in ISO format
 */
export function validateISODate(dateString: string): boolean {
  const date = new Date(dateString);
  return !isNaN(date.getTime()) && dateString === date.toISOString().split('T')[0];
}

/**
 * Generates current date in ISO format
 */
export function generateISODate(): string {
  return new Date().toISOString().split('T')[0];
}

/**
 * Validates that all required metadata fields are present
 */
export function validateRequiredFields(metadata: Partial<StandardMetadata>): string[] {
  const requiredFields: (keyof StandardMetadata)[] = [
    'type',
    'tier',
    'process',
    'tags',
    'version',
    'created',
    'updated',
    'author',
    'status',
  ];

  const missingFields: string[] = [];

  for (const field of requiredFields) {
    if (metadata[field] === undefined || metadata[field] === null) {
      missingFields.push(field);
    }
  }

  return missingFields;
}

/**
 * Merges partial metadata updates with existing metadata
 */
export function mergeMetadata(
  existing: StandardMetadata,
  updates: Partial<StandardMetadata>
): StandardMetadata {
  return {
    ...existing,
    ...updates,
    updated: generateISODate(), // Always update the updated date
  };
}

/**
 * Validates that a metadata update is valid
 */
export function validateMetadataUpdate(
  existing: StandardMetadata,
  updates: Partial<StandardMetadata>
): void {
  // Prevent changing created date
  if (updates.created && updates.created !== existing.created) {
    throw new Error('Cannot modify the created date of an existing standard');
  }

  // Validate version if provided
  if (updates.version && !validateVersion(updates.version)) {
    throw new Error(ERROR_MESSAGES.INVALID_VERSION);
  }

  // Validate dates if provided
  if (updates.created && !validateISODate(updates.created)) {
    throw new Error('Invalid created date format (must be ISO: YYYY-MM-DD)');
  }

  if (updates.updated && !validateISODate(updates.updated)) {
    throw new Error('Invalid updated date format (must be ISO: YYYY-MM-DD)');
  }
}
