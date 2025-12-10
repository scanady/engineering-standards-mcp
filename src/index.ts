/**
 * Engineering Standards MCP Server
 * Main entry point
 */

import express from 'express';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import {
  SERVER_NAME,
  SERVER_VERSION,
  DEFAULT_PORT,
  TOOL_NAMES,
  MAX_SEARCH_LIMIT,
} from './constants.js';
import {
  ListIndexInputSchema,
  GetStandardInputSchema,
  SearchStandardsInputSchema,
  GetMetadataInputSchema,
  CreateStandardInputSchema,
  UpdateStandardInputSchema,
} from './schemas/metadata.js';
import { listIndex } from './tools/list.js';
import { getStandard } from './tools/get.js';
import { searchStandardsTool } from './tools/search.js';
import { getMetadata } from './tools/metadata.js';
import { createStandardTool } from './tools/create.js';
import { updateStandardTool } from './tools/update.js';
import { ensureDirectoryStructure } from './services/storage.js';
import { initializeIndex } from './services/indexer.js';

/**
 * Creates and configures the MCP server
 */
function createMcpServer(): McpServer {
  const server = new McpServer({
    name: SERVER_NAME,
    version: SERVER_VERSION,
  });

  // Tool 1: standards_list_index (READ-ONLY)
  server.registerTool(
    TOOL_NAMES.LIST_INDEX,
    {
      title: 'List Standards Index',
      description: `Returns a hierarchical index of all engineering standards, organized by type, tier, and process.

This tool provides an overview of all available standards in the knowledge base, making it easy to browse and discover standards by category.

Args:
  - filter_type (optional): Filter by standard type ('principle' | 'standard' | 'practice' | 'tech-stack' | 'process')
  - filter_tier (optional): Filter by tier ('frontend' | 'backend' | 'database' | 'infrastructure' | 'security')
  - filter_process (optional): Filter by process ('development' | 'testing' | 'delivery' | 'operations')
  - filter_status (optional): Filter by status ('active' | 'draft' | 'deprecated')
  - response_format (optional): Output format ('json' | 'markdown'), default 'markdown'

Returns:
  For JSON format: Structured data with hierarchical index
  {
    "totalCount": number,
    "index": {
      "[type]": {
        "[tier]": {
          "[process]": [
            {
              "path": "string",
              "metadata": { ... }
            }
          ]
        }
      }
    }
  }

Examples:
  - List all standards: No filters
  - List backend standards: filter_tier="backend"
  - List active principles: filter_type="principles", filter_status="active"`,
      inputSchema: ListIndexInputSchema,
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false,
      },
    },
    listIndex
  );

  // Tool 2: standards_get (READ-ONLY)
  server.registerTool(
    TOOL_NAMES.GET,
    {
      title: 'Get Standard',
      description: `Retrieves a specific standard by exact path or by metadata combination.

Use this tool to read the complete content and metadata of one or more standards. You can retrieve by exact file path or by specifying type, tier, and process.

Args:
  - path (optional): Exact file path relative to the standards directory (e.g., 'standard-backend-development-spring-boot-security-active.md'). For backward compatibility, 'standards/spring-boot-security.md' and 'spring-boot-security.md' will also be accepted.
  - type (optional): Standard type to search for
  - tier (optional): Tier to search for
  - process (optional): Process to search for
  - tags (optional): Array of tags to filter by (must match all)
  - response_format (optional): Output format ('json' | 'markdown'), default 'markdown'

Note: Must provide either 'path' OR combination of 'type', 'tier', and 'process'.

Returns:
  Complete standard with metadata and content. If multiple standards match metadata criteria, returns all matches.

Examples:
  - Get by path: path="standard-backend-development-spring-boot-security-active.md"
  - Get by metadata: type="standards", tier="backend", process="development"
  - Get with tags: type="practices", tier="frontend", process="testing", tags=["unit-testing"]`,
      inputSchema: GetStandardInputSchema,
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false,
      },
    },
    getStandard
  );

  // Tool 3: standards_search (READ-ONLY)
  server.registerTool(
    TOOL_NAMES.SEARCH,
    {
      title: 'Search Standards',
      description: `Full-text search across all standards with optional filtering by metadata.

Searches through both content and metadata of standards, returning results ranked by relevance score. Provides context snippets around matches.

Args:
  - query (string, required): Search query (minimum 2 characters)
  - filter_type (optional): Filter results by type
  - filter_tier (optional): Filter results by tier
  - filter_process (optional): Filter results by process
  - filter_tags (optional): Filter results by tags
  - limit (optional): Max results to return (1-${MAX_SEARCH_LIMIT}), default 10
  - response_format (optional): Output format ('json' | 'markdown'), default 'markdown'

Returns:
  Array of matching standards with:
  - Relevance score
  - Match count
  - Context snippets showing where matches were found
  - Complete metadata

Examples:
  - Search all: query="authentication"
  - Search backend only: query="security", filter_tier="backend"
  - Search with limit: query="testing", limit=5`,
      inputSchema: SearchStandardsInputSchema,
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false,
      },
    },
    searchStandardsTool
  );

  // Tool 4: standards_get_metadata (READ-ONLY)
  server.registerTool(
    TOOL_NAMES.GET_METADATA,
    {
      title: 'Get Standards Metadata',
      description: `Retrieves metadata for standards without loading full content. Useful for browsing and discovery.

This tool is more efficient than standards_get when you only need to see what standards exist and their metadata, without loading the full content.

Args:
  - filter_type (optional): Filter by type
  - filter_tier (optional): Filter by tier
  - filter_process (optional): Filter by process
  - filter_tags (optional): Filter by tags array
  - filter_status (optional): Filter by status
  - response_format (optional): Output format ('json' | 'markdown'), default 'markdown'

Returns:
  Array of metadata entries with path information (no content).

Examples:
  - Get all metadata: No filters
  - Get backend metadata: filter_tier="backend"
  - Get active frontend practices: filter_type="practices", filter_tier="frontend", filter_status="active"`,
      inputSchema: GetMetadataInputSchema,
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false,
      },
    },
    getMetadata
  );

  // Tool 5: standards_create (DESTRUCTIVE)
  server.registerTool(
    TOOL_NAMES.CREATE,
    {
      title: 'Create Standard',
      description: `Creates a new standard with metadata and content.

Use this tool to add new standards to the knowledge base. The system will automatically:
- Generate version 1.0.0
- Set created and updated dates
- Generate file path from metadata
- Create directory structure as needed

Args:
  - metadata (required): Object with required fields:
    - type: 'principle' | 'standard' | 'practice' | 'tech-stack' | 'process'
    - tier: 'frontend' | 'backend' | 'database' | 'infrastructure' | 'security'
    - process: 'development' | 'testing' | 'delivery' | 'operations'
    - tags: Array of strings for categorization
    - author: Author or team name
    - status: 'active' | 'draft' | 'deprecated'
  - content (required): Markdown content of the standard
  - filename (optional): Custom filename (auto-generated if not provided)

Returns:
  Created standard with generated path and complete metadata.

Examples:
  - Create backend standard:
    metadata: { type: "standards", tier: "backend", process: "development", tags: ["api", "rest"], author: "Tech Team", status: "active" }
    content: "# API Standards\\n\\n..."`,
      inputSchema: CreateStandardInputSchema,
      annotations: {
        readOnlyHint: false,
        destructiveHint: true,
        idempotentHint: false,
        openWorldHint: false,
      },
    },
    createStandardTool
  );

  // Tool 6: standards_update (DESTRUCTIVE)
  server.registerTool(
    TOOL_NAMES.UPDATE,
    {
      title: 'Update Standard',
      description: `Updates an existing standard's content and/or metadata.

Use this tool to modify existing standards. The system will automatically:
- Bump the version number (major/minor/patch)
- Update the 'updated' timestamp
- Refresh the index

Args:
  - path (required): Path to the standard to update
  - content (optional): New markdown content
  - metadata (optional): Partial metadata object with fields to update
  - version_bump (optional): Version increment type ('major' | 'minor' | 'patch'), default 'patch'

Note: Must provide either 'content' or 'metadata' (or both).
Note: Cannot modify the 'created' date.

Returns:
  Updated standard with new version and metadata.

Examples:
  - Update content only: path="standard-backend-development-api-active.md", content="# Updated API Standards\\n..."
  - Update metadata: path="...", metadata={ status: "deprecated" }
  - Major update: path="...", content="...", version_bump="major"
  - Note: If metadata fields that affect the filename (type, tier, process, status) are updated, the server will rename the file on disk to reflect the new metadata.`,
      inputSchema: UpdateStandardInputSchema,
      annotations: {
        readOnlyHint: false,
        destructiveHint: true,
        idempotentHint: false,
        openWorldHint: false,
      },
    },
    updateStandardTool
  );

  return server;
}

/**
 * Starts the HTTP server
 */
async function startServer(): Promise<void> {
  // Initialize storage and index
  console.error('Initializing standards directory...');
  await ensureDirectoryStructure();

  console.error('Loading standards index...');
  await initializeIndex();

  console.error('Creating MCP server...');
  const mcpServer = createMcpServer();

  // Set up Express
  const app = express();
  app.use(express.json());

  // Health check endpoint
  app.get('/health', (_req, res) => {
    res.json({ status: 'ok', server: SERVER_NAME, version: SERVER_VERSION });
  });

  // MCP endpoint
  app.post('/mcp', async (req, res) => {
    try {
      // Create new transport for each request (stateless)
      const transport = new StreamableHTTPServerTransport({
        sessionIdGenerator: undefined,
        enableJsonResponse: true,
      });

      res.on('close', () => {
        transport.close();
      });

      await mcpServer.connect(transport);
      await transport.handleRequest(req, res, req.body);
    } catch (error) {
      console.error('Error handling MCP request:', error);
      if (!res.headersSent) {
        res.status(500).json({
          jsonrpc: '2.0',
          error: {
            code: -32603,
            message: 'Internal server error',
          },
          id: null,
        });
      }
    }
  });

  // Start listening
  const port = parseInt(process.env.PORT || String(DEFAULT_PORT));
  app.listen(port, () => {
    console.error(`\n${'='.repeat(60)}`);
    console.error(`${SERVER_NAME} v${SERVER_VERSION}`);
    console.error(`${'='.repeat(60)}`);
    console.error(`\n✓ Server running on http://localhost:${port}/mcp`);
    console.error(`✓ Health check: http://localhost:${port}/health`);
    console.error('\nReady to accept MCP connections.\n');
  });
}

// Start the server
startServer().catch((error) => {
  console.error('Fatal error starting server:', error);
  process.exit(1);
});
