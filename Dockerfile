# Dockerfile สำหรับ Phumpat MCP Thinking
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# Expose port
EXPOSE 3000

# Set environment variable for HTTP mode
ENV MCP_HTTP_MODE=true
ENV PORT=3000

# Start server
CMD ["npm", "run", "start:http"]