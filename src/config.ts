import { DateTimeConfig, DateTimeFormat } from './types.js';

/**
 * Default configuration for the date and time server
 */
export const defaultConfig: DateTimeConfig = {
  defaultTimezone: 'UTC',
  defaultFormat: DateTimeFormat.ISO,
  defaultLocale: 'en-US',
  debug: false
};

/**
 * Current configuration (can be modified at runtime)
 */
export let config: DateTimeConfig = { ...defaultConfig };

/**
 * Update the configuration
 * @param newConfig - New configuration options
 * @returns The updated configuration
 */
export function updateConfig(newConfig: Partial<DateTimeConfig>): DateTimeConfig {
  config = {
    ...config,
    ...newConfig
  };
  
  if (config.debug) {
    console.log('Configuration updated:', config);
  }
  
  return config;
}

/**
 * Reset the configuration to defaults
 * @returns The default configuration
 */
export function resetConfig(): DateTimeConfig {
  config = { ...defaultConfig };
  return config;
}

/**
 * Get the current configuration
 * @returns The current configuration
 */
export function getConfig(): DateTimeConfig {
  return { ...config };
}

/**
 * Format mapping for predefined formats
 */
export const formatMapping = {
  [DateTimeFormat.ISO]: 'ISO',
  [DateTimeFormat.UNIX]: 'UNIX',
  [DateTimeFormat.RFC2822]: 'ccc, dd LLL yyyy HH:mm:ss ZZZ',
  [DateTimeFormat.HTTP]: 'EEE, dd MMM yyyy HH:mm:ss \'GMT\'',
  [DateTimeFormat.SQL]: 'yyyy-MM-dd HH:mm:ss'
};
