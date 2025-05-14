import { DateTime } from 'luxon';

/**
 * Check if a timezone is valid
 * @param timezone - IANA timezone identifier to check
 * @returns True if the timezone is valid, false otherwise
 */
export function isValidTimezone(timezone: string): boolean {
  try {
    return !!DateTime.now().setZone(timezone).isValid;
  } catch (error) {
    return false;
  }
}

/**
 * Get the UTC offset for a timezone
 * @param timezone - IANA timezone identifier
 * @returns The UTC offset (e.g., '+02:00') or null if the timezone is invalid
 */
export function getUtcOffset(timezone: string): string | null {
  try {
    const dt = DateTime.now().setZone(timezone);
    if (!dt.isValid) {
      return null;
    }
    return dt.toFormat('ZZ');
  } catch (error) {
    return null;
  }
}

/**
 * Convert a date from one timezone to another
 * @param dateTime - DateTime object to convert
 * @param targetTimezone - Target IANA timezone identifier
 * @returns The converted DateTime object or null if the timezone is invalid
 */
export function convertTimezone(dateTime: DateTime, targetTimezone: string): DateTime | null {
  try {
    const converted = dateTime.setZone(targetTimezone);
    return converted.isValid ? converted : null;
  } catch (error) {
    return null;
  }
}

/**
 * Get a list of all valid IANA timezone identifiers
 * @returns Array of timezone identifiers
 */
export function getAllTimezones(): string[] {
  return Intl.supportedValuesOf('timeZone');
}

/**
 * Get information about a timezone
 * @param timezone - IANA timezone identifier
 * @returns Object with timezone information or null if the timezone is invalid
 */
export function getTimezoneInfo(timezone: string): { 
  name: string; 
  offset: string; 
  abbreviation: string; 
} | null {
  try {
    const dt = DateTime.now().setZone(timezone);
    if (!dt.isValid) {
      return null;
    }
    
    return {
      name: timezone,
      offset: dt.toFormat('ZZ'),
      abbreviation: dt.toFormat('ZZZZ')
    };
  } catch (error) {
    return null;
  }
}
