# Date and Time MCP Server

[![smithery badge](https://smithery.ai/badge/@chirag127/date-and-time-mcp-server)](https://smithery.ai/server/@chirag127/date-and-time-mcp-server)

A Model Context Protocol (MCP) server that provides current date and time information to AI agents. This server allows AI agents to access the current date and time in various formats and timezones.

## Features

-   Get current date and time in various formats (ISO, Unix timestamp, RFC2822, HTTP, SQL, custom formats)
-   Support for timezone conversion with proper error handling
-   Configuration options for date formatting preferences
-   Comprehensive error handling and logging
-   Written in TypeScript with proper typing

## Installation

### Installing via Smithery

To install date-and-time-mcp-server for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@chirag127/date-and-time-mcp-server):

```bash
npx -y @smithery/cli install @chirag127/date-and-time-mcp-server --client claude
```

### Prerequisites

-   Node.js 18 or higher
-   npm or yarn

### Setup

1. Clone the repository:

```bash
git clone https://github.com/chirag127/date-and-time-mcp-server.git
cd date-and-time-mcp-server
```

2. Install dependencies:

```bash
npm install
```

3. Build the project:

```bash
npm run build
```

## Usage

### Starting the Server

To start the server with default settings:

```bash
npm start
```

With custom configuration:

```bash
npm start -- --timezone "America/New_York" --format "yyyy-MM-dd HH:mm:ss" --locale "en-US" --debug true
```

### Configuration Options

The server can be configured with the following options:

-   `timezone`: Default timezone (IANA timezone identifier, e.g., "UTC", "America/New_York")
-   `format`: Default date format (ISO, UNIX, RFC2822, HTTP, SQL, or a custom format string)
-   `locale`: Default locale for formatting (e.g., "en-US", "fr-FR")
-   `debug`: Enable debug logging (true/false)

## API Reference

### Tools

#### `getCurrentDateTime`

Gets the current date and time in the specified format and timezone.

**Parameters:**

-   `format` (optional): Format to return the date/time in (ISO, UNIX, RFC2822, HTTP, SQL, or a custom format string)
-   `timezone` (optional): Timezone to convert to (IANA timezone identifier)
-   `locale` (optional): Locale to use for formatting

**Response:**

```json
{
    "currentDateTime": "2023-05-15T12:30:45.000Z",
    "timestamp": 1684154445,
    "timezone": "UTC",
    "format": "ISO",
    "utcOffset": "+00:00"
}
```

#### `getTimezoneInfo`

Gets information about a timezone.

**Parameters:**

-   `timezone`: Timezone to get information about (IANA timezone identifier)

**Response:**

```json
{
    "name": "America/New_York",
    "offset": "-04:00",
    "abbreviation": "EDT",
    "currentTime": "2023-05-15T08:30:45.000-04:00",
    "isDST": true
}
```

## Example Usage for AI Agents

### Claude for Desktop

To use this MCP server with Claude for Desktop, add the following to your Claude for Desktop configuration file:

```json
{
    "mcpServers": {
        "dateTime": {
            "command": "node",
            "args": ["/path/to/date-and-time-mcp-server/dist/index.js"]
        }
    }
}
```

### Example Prompts

Here are some example prompts that an AI agent can use to interact with this MCP server:

1. "What is the current date and time in UTC?"
2. "What is the current time in Tokyo?"
3. "What is the current date in RFC2822 format?"
4. "What is the timezone offset for Los Angeles?"

## Development

### Project Structure

```
date-and-time-mcp-server/
├── src/
│   ├── index.ts           # Entry point
│   ├── server.ts          # MCP server implementation
│   ├── config.ts          # Configuration options
│   ├── types.ts           # TypeScript type definitions
│   ├── tools/
│   │   └── dateTime.ts    # Date and time tool implementation
│   └── utils/
│       ├── formatters.ts  # Date formatting utilities
│       └── timezones.ts   # Timezone utilities
├── tests/
│   └── dateTime.test.ts   # Tests for date and time functionality
├── dist/                  # Compiled JavaScript files
├── tsconfig.json          # TypeScript configuration
├── jest.config.js         # Jest configuration
├── package.json           # Project metadata and dependencies
└── README.md              # Documentation
```

### Running Tests

To run the tests:

```bash
npm test
```

### Building

To build the project:

```bash
npm run build
```

## License

ISC

## Author

Chirag Singhal ([@chirag127](https://github.com/chirag127))
