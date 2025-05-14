import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { registerDateTimeTools } from './tools/dateTime.js';
import { config } from './config.js';

/**
 * Create and configure the MCP server
 * @returns The configured MCP server
 */
export function createServer(): McpServer {
  // Create the MCP server
  const server = new McpServer({
    name: 'Date and Time',
    version: '1.0.0'
  });
  
  // Register the date and time tools
  registerDateTimeTools(server);
  
  if (config.debug) {
    console.log('MCP server created with configuration:', config);
  }
  
  return server;
}

/**
 * Start the MCP server
 * @returns A promise that resolves when the server is connected
 */
export async function startServer(): Promise<void> {
  try {
    // Create the server
    const server = createServer();
    
    // Create the transport
    const transport = new StdioServerTransport();
    
    // Log startup
    console.log('Starting Date and Time MCP server...');
    
    // Connect the server to the transport
    await server.connect(transport);
    
    console.log('Date and Time MCP server connected and ready');
    
    // Handle process termination
    process.on('SIGINT', () => {
      console.log('Shutting down Date and Time MCP server...');
      server.close();
      process.exit(0);
    });
    
    process.on('SIGTERM', () => {
      console.log('Shutting down Date and Time MCP server...');
      server.close();
      process.exit(0);
    });
  } catch (error) {
    console.error('Error starting MCP server:', error);
    process.exit(1);
  }
}
