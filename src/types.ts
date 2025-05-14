/**
 * Types for the date and time MCP server
 */

/**
 * Supported date and time formats
 */
export enum DateTimeFormat {
  ISO = 'ISO',
  UNIX = 'UNIX',
  RFC2822 = 'RFC2822',
  HTTP = 'HTTP',
  SQL = 'SQL',
  CUSTOM = 'CUSTOM'
}

/**
 * Configuration options for the date and time server
 */
export interface DateTimeConfig {
  /**
   * Default timezone (IANA timezone identifier)
   * @default 'UTC'
   */
  defaultTimezone: string;
  
  /**
   * Default date format
   * @default DateTimeFormat.ISO
   */
  defaultFormat: DateTimeFormat | string;
  
  /**
   * Default locale for formatting
   * @default 'en-US'
   */
  defaultLocale: string;
  
  /**
   * Enable debug logging
   * @default false
   */
  debug: boolean;
}

/**
 * Parameters for the getCurrentDateTime tool
 */
export interface GetCurrentDateTimeParams {
  /**
   * Format to return the date/time in
   * Can be a predefined format (ISO, UNIX, etc.) or a custom format string
   * @default DateTimeFormat.ISO
   */
  format?: DateTimeFormat | string;
  
  /**
   * Timezone to convert to (IANA timezone identifier)
   * @default 'UTC'
   */
  timezone?: string;
  
  /**
   * Locale to use for formatting
   * @default 'en-US'
   */
  locale?: string;
}

/**
 * Response from the getCurrentDateTime tool
 */
export interface GetCurrentDateTimeResponse {
  /**
   * Current date and time in the requested format and timezone
   */
  currentDateTime: string;
  
  /**
   * Unix timestamp (seconds since epoch)
   */
  timestamp: number;
  
  /**
   * Timezone used
   */
  timezone: string;
  
  /**
   * Format used
   */
  format: string;
  
  /**
   * UTC offset of the timezone (e.g., '+02:00')
   */
  utcOffset: string;
}

/**
 * Error response for the date and time tools
 */
export interface DateTimeErrorResponse {
  /**
   * Error message
   */
  error: string;
  
  /**
   * Error code
   */
  code: string;
}
