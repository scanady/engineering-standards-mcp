# Docker Deployment Guide

This guide explains how to deploy the Engineering Standards MCP Server using Docker.

## Prerequisites

- Docker Desktop (Windows) or Docker Engine (Linux)
- Docker Compose (included with Docker Desktop)

## Quick Start

### Using Docker Compose (Recommended)

1. **Build and start the container:**
   ```powershell
   docker-compose up -d
   ```

2. **View logs:**
   ```powershell
   docker-compose logs -f
   ```

3. **Stop the container:**
   ```powershell
   docker-compose down
   ```

### Using Docker CLI

1. **Build the image:**
   ```powershell
   npm run docker:build
   ```
   or
   ```powershell
   docker build -t engineering-standards-mcp-server .
   ```

2. **Run the container:**
   ```powershell
   npm run docker:run
   ```
   or
   ```powershell
   docker run -p 3000:3000 engineering-standards-mcp-server
   ```

## Configuration

### Environment Variables

Create a `.env` file based on `.env.example`:

```env
PORT=3000
NODE_ENV=production
```

### Port Configuration

By default, the server runs on port 3000. To use a different port:

**Docker Compose:**
```powershell
$env:PORT=8080; docker-compose up -d
```

**Docker CLI:**
```powershell
docker run -p 8080:3000 -e PORT=3000 engineering-standards-mcp-server
```

## Volume Mounts

The Docker Compose configuration mounts the `data` directory as a read-only volume, allowing you to update standards without rebuilding the image:

```yaml
volumes:
  - ./data:/app/data:ro
```

To update standards:
1. Edit files in the `./data` directory
2. Restart the container: `docker-compose restart`

## Health Checks

The container includes a health check endpoint. Monitor container health:

```powershell
docker ps
```

Look for the `STATUS` column showing `healthy` or `unhealthy`.

## Production Deployment

### Building for Production

```powershell
docker build -t engineering-standards-mcp-server:1.0.0 .
```

### Running in Production

```powershell
docker run -d `
  --name mcp-server `
  -p 3000:3000 `
  -e NODE_ENV=production `
  --restart unless-stopped `
  engineering-standards-mcp-server:1.0.0
```

### Using Docker Compose in Production

```powershell
docker-compose -f docker-compose.yml up -d
```

## Container Management

### View running containers
```powershell
docker ps
```

### View all containers (including stopped)
```powershell
docker ps -a
```

### Stop the container
```powershell
docker stop engineering-standards-mcp-server
```

### Remove the container
```powershell
docker rm engineering-standards-mcp-server
```

### View logs
```powershell
docker logs -f engineering-standards-mcp-server
```

### Execute commands in container
```powershell
docker exec -it engineering-standards-mcp-server sh
```

## Troubleshooting

### Container won't start
1. Check logs: `docker-compose logs`
2. Verify port is not in use: `netstat -an | Select-String "3000"`
3. Check environment variables: `docker-compose config`

### Permission issues
The container runs as a non-root user (`mcpserver:nodejs` with UID 1001). If you encounter permission issues with volume mounts, ensure the mounted directories have appropriate permissions.

### Build failures
1. Clear Docker cache: `docker builder prune`
2. Rebuild without cache: `docker-compose build --no-cache`

### Health check failing
1. Check if the application is listening on port 3000
2. Verify the health endpoint returns 200 status
3. Check logs for startup errors

## Multi-Stage Build Details

The Dockerfile uses a multi-stage build to optimize image size:

1. **deps**: Installs production dependencies only
2. **builder**: Compiles TypeScript to JavaScript
3. **runner**: Final production image with minimal size

This approach results in a smaller final image (~150MB vs ~1GB with build tools included).

## Security Considerations

- Container runs as non-root user (UID 1001)
- Production dependencies only in final image
- No build tools or source code in production image
- Health checks for monitoring
- Network isolation via Docker networks

## NPM Scripts

The following npm scripts are available for Docker operations:

- `npm run docker:build` - Build the Docker image
- `npm run docker:run` - Run the container
- `npm run docker:compose:up` - Start with Docker Compose
- `npm run docker:compose:down` - Stop Docker Compose services
- `npm run docker:compose:logs` - View Docker Compose logs

## Next Steps

- Set up container orchestration (Kubernetes, Docker Swarm)
- Configure reverse proxy (nginx, Traefik)
- Implement monitoring and logging solutions
- Set up CI/CD pipelines for automated builds
