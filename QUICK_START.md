# Engineering Standards MCP Server - Quick Start Guide

## 🎉 Project Status: COMPLETE AND READY TO USE

Your Engineering Standards MCP Server has been successfully implemented with all features.

---

## 📦 What You Have

### Project Archive
**File:** `engineering-standards-mcp-server.zip` (55 KB)

**Contents:**
- Complete source code for all 6 MCP tools
- 4 service layers (validator, parser, storage, indexer)
- Full TypeScript implementation with strict mode
- 2 sample standards (Spring Boot Security, Frontend Principles)
- Package configuration and dependencies list
- Comprehensive documentation

---

## 🚀 Getting Started (3 Steps)

### 1. Extract the Archive

```bash
unzip engineering-standards-mcp-server.zip
cd engineering-standards-mcp-server
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required dependencies (~192 packages).

### 3. Start the Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:3000/mcp` by default.

**Expected Output:**
```
Initializing standards directory...
Loading standards index...
Creating MCP server...

============================================================
engineering-standards-mcp-server v1.0.0
============================================================

✓ Server running on http://localhost:3000/mcp
✓ Health check: http://localhost:3000/health

Ready to accept MCP connections.
```

---

## 🔧 Configuration

### Environment Variables

```bash
# Change server port
PORT=3001 npm run dev

# Change standards directory location
STANDARDS_DIR=/path/to/standards npm run dev
```

---

## 🔌 Connecting Clients

### Option 1: Claude Code

```bash
claude mcp add --transport http engineering-standards http://localhost:3000/mcp
```

### Option 2: MCP Inspector (for testing)

```bash
npx @modelcontextprotocol/inspector
```

Then connect to: `http://localhost:3000/mcp`

### Option 3: VS Code

```bash
code --add-mcp '{"name":"engineering-standards","type":"http","url":"http://localhost:3000/mcp"}'
```

---

## 🛠️ Available Tools

Once connected, you'll have access to 6 tools:

### Read-Only Tools

1. **standards_list_index** - Browse all standards in hierarchical format
2. **standards_get** - Retrieve specific standards by path or metadata
3. **standards_search** - Full-text search across all standards
4. **standards_get_metadata** - Get metadata without loading full content

### Write Tools

5. **standards_create** - Create new standards
6. **standards_update** - Update existing standards

---

## 📝 Example Usage

### With Claude Code

```
You: "List all backend development standards"
→ Claude uses: standards_list_index with filter_tier="backend"

You: "Show me the Spring Boot security standard"
→ Claude uses: standards_get to retrieve the standard

You: "Search for OAuth authentication examples"
→ Claude uses: standards_search with query="OAuth authentication"

You: "Create a new API design standard for REST APIs"
→ Claude uses: standards_create with appropriate metadata
```

---

## 📂 Project Structure

```
engineering-standards-mcp-server/
├── src/
│   ├── index.ts              # Server entry point
│   ├── types.ts              # TypeScript definitions
│   ├── constants.ts          # Configuration
│   ├── schemas/
│   │   └── metadata.ts       # Zod validation schemas
│   ├── services/
│   │   ├── validator.ts      # Metadata validation
│   │   ├── parser.ts         # Markdown processing
│   │   ├── storage.ts        # File operations
│   │   └── indexer.ts        # Search & indexing
│   └── tools/
│       ├── list.ts           # List index tool
│       ├── get.ts            # Get standard tool
│       ├── search.ts         # Search tool
│       ├── metadata.ts       # Get metadata tool
│       ├── create.ts         # Create tool
│       └── update.ts         # Update tool
├── standards/                # Your standards directory (root-only, markdown files)
├── package.json
├── tsconfig.json
└── README.md
```

---

## 📚 Sample Standards Included

1. **Spring Boot Security Standards**
   - Path: `standard-backend-development-spring-boot-security-active.md` (paths are filenames relative to `standards/`. The server also accepts `standards/spring-boot-security.md` and `spring-boot-security.md` for backward compatibility.)
   - Topics: OAuth2, authentication, authorization, security headers

2. **Frontend Development Principles**
   - Path: `principle-frontend-development-nextjs-principles-active.md` (paths are filenames relative to `standards/`. The server also accepts `standards/nextjs-principles.md` and `nextjs-principles.md` for backward compatibility.)
   - Topics: NextJS, React, performance, accessibility

---

## ➕ Adding Your Own Standards

### Option 1: Use the Create Tool

Use `standards_create` tool through Claude or MCP Inspector:

```typescript
{
  "metadata": {
      "type": "tech-stack",    
   "tier": "backend",
    "process": "development",
    "tags": ["java", "spring-boot"],
    "author": "Technology Office",
    "status": "active"
  },
  "content": "# Your Standard Title\n\nYour content here...",
  "filename": "my-standard.md"
}
```

### Option 2: Create Files Manually

Create a markdown file in the appropriate directory with frontmatter:

```markdown
---
type: standard
tier: backend
process: development
tags:
  - api
  - rest
version: 1.0.0
created: 2024-12-09
updated: 2024-12-09
author: Technology Office
status: active
---

# Your Standard Content

Write your standard here using markdown...
```

Save to: `standards/<type>-<tier>-<process>-<sanitizedTitle>-<status>.md` (e.g., `standard-backend-development-api-principles-active.md`) — files must be kebab-case and include metadata information.

Note: If you update metadata that influences the filename (type, tier, process, status), the server will rename the file automatically to match the new metadata.

Then restart the server to reload the index.

---

## 🔍 Testing Checklist

After starting the server, verify:

- [ ] Server starts without errors
- [ ] Health check responds: `curl http://localhost:3000/health`
- [ ] 2 sample standards are loaded
- [ ] Can connect with MCP Inspector
- [ ] Can list standards with `standards_list_index`
- [ ] Can retrieve standards with `standards_get`
- [ ] Can search with `standards_search`

---

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Use a different port
PORT=3001 npm run dev
```

### Standards Not Loading

```bash
# Check if standards directory exists
ls -la standards/

# Check if sample files exist
ls -la standards/
```

### TypeScript Errors

```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

## 🚢 Production Deployment

When ready for production:

1. **Set up environment variables**
   ```bash
   export PORT=80
   export STANDARDS_DIR=/var/standards
   ```

2. **Use a process manager**
   ```bash
   # With PM2
   pm2 start npm --name "mcp-server" -- start
   ```

3. **Configure reverse proxy** (nginx, Apache)

4. **Set up SSL/TLS** for HTTPS

5. **Configure monitoring and logging**

---

## 💡 Next Steps

1. **Add Your Standards**
   - Document your organization's engineering practices
   - Convert existing documentation to the standard format

2. **Integrate with Your Workflow**
   - Connect Claude Code to reference standards while coding
   - Use search to find relevant standards quickly

3. **Expand Coverage**
   - Add standards for all technology tiers
   - Document processes across the SDLC

4. **Train Your Team**
   - Show them how to use the MCP server
   - Encourage contributions to the knowledge base

---

## 🎯 Key Features

✅ **6 Fully Functional Tools** - Complete CRUD operations
✅ **Type-Safe** - Full TypeScript with strict mode
✅ **Validated** - Zod schemas for all inputs
✅ **Searchable** - Full-text search with relevance scoring
✅ **Organized** - Multi-dimensional categorization
✅ **Versioned** - Semantic versioning support
✅ **Flexible** - JSON and Markdown output formats
✅ **Fast** - In-memory indexing for quick reads
✅ **MCP Compliant** - Follows all MCP best practices

---

## ✨ Success!

Your Engineering Standards MCP Server is ready to use. Start the server and begin building your organization's knowledge base of engineering standards, practices, and principles.

**Happy standardizing! 🚀**
