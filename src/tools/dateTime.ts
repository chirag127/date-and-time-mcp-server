import { z } from 'zod';
import { DateTime } from 'luxon';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { 
  GetCurrentDateTimeParams, 
  GetCurrentDateTimeResponse,
  DateTimeErrorResponse,
  DateTimeFormat
} from '../types.js';
import { config } from '../config.js';
import { formatDateTime, getCurrentDateTime } from '../utils/formatters.js';
import { isValidTimezone, getUtcOffset } from '../utils/timezones.js';

/**
 * Register the date and time tools with the MCP server
 * @param server - MCP server instance
 */
export function registerDateTimeTools(server: McpServer): void {
  // Register the getCurrentDateTime tool
  server.tool(
    'getCurrentDateTime',
    {
      format: z.string().optional().describe('Format to return the date/time in (ISO, UNIX, RFC2822, HTTP, SQL, or a custom format string)'),
      timezone: z.string().optional().describe('Timezone to convert to (IANA timezone identifier)'),
      locale: z.string().optional().describe('Locale to use for formatting')
    },
    async (params: GetCurrentDateTimeParams) => {
      try {
        // Get parameters with defaults from config
        const format = params.format || config.defaultFormat;
        const timezone = params.timezone || config.defaultTimezone;
        const locale = params.locale || config.defaultLocale;
        
        // Validate timezone
        if (!isValidTimezone(timezone)) {
          return {
            content: [{
              type: 'text',
              text: JSON.stringify({
                error: `Invalid timezone: ${timezone}`,
                code: 'INVALID_TIMEZONE'
              } as DateTimeErrorResponse)
            }],
            isError: true
          };
        }
        
        // Get current date and time in the specified timezone
        const dateTime = getCurrentDateTime(timezone);
        
        // Format the date and time
        const formattedDateTime = formatDateTime(dateTime, format, locale);
        
        // Get UTC offset
        const utcOffset = getUtcOffset(timezone) || '';
        
        // Create response
        const response: GetCurrentDateTimeResponse = {
          currentDateTime: formattedDateTime,
          timestamp: Math.floor(dateTime.toSeconds()),
          timezone,
          format: format.toString(),
          utcOffset
        };
        
        if (config.debug) {
          console.log('getCurrentDateTime response:', response);
        }
        
        return {
          content: [{
            type: 'text',
            text: JSON.stringify(response)
          }]
        };
      } catch (error) {
        console.error('Error in getCurrentDateTime tool:', error);
        
        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              error: `Error getting date and time: ${(error as Error).message}`,
              code: 'INTERNAL_ERROR'
            } as DateTimeErrorResponse)
          }],
          isError: true
        };
      }
    }
  );
  
  // Register the getTimezoneInfo tool
  server.tool(
    'getTimezoneInfo',
    {
      timezone: z.string().describe('Timezone to get information about (IANA timezone identifier)')
    },
    async ({ timezone }) => {
      try {
        // Validate timezone
        if (!isValidTimezone(timezone)) {
          return {
            content: [{
              type: 'text',
              text: JSON.stringify({
                error: `Invalid timezone: ${timezone}`,
                code: 'INVALID_TIMEZONE'
              } as DateTimeErrorResponse)
            }],
            isError: true
          };
        }
        
        // Get current date and time in the specified timezone
        const dateTime = getCurrentDateTime(timezone);
        
        // Get timezone information
        const info = {
          name: timezone,
          offset: dateTime.toFormat('ZZ'),
          abbreviation: dateTime.toFormat('ZZZZ'),
          currentTime: dateTime.toISO(),
          isDST: dateTime.isInDST
        };
        
        return {
          content: [{
            type: 'text',
            text: JSON.stringify(info)
          }]
        };
      } catch (error) {
        console.error('Error in getTimezoneInfo tool:', error);
        
        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              error: `Error getting timezone info: ${(error as Error).message}`,
              code: 'INTERNAL_ERROR'
            } as DateTimeErrorResponse)
          }],
          isError: true
        };
      }
    }
  );
}
