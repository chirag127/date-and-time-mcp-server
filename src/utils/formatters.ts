import { DateTime } from "luxon";
import { DateTimeFormat } from "../types.js";
import { formatMapping } from "../config.js";

/**
 * Format a DateTime object according to the specified format
 * @param dateTime - DateTime object to format
 * @param format - Format to use (predefined or custom format string)
 * @param locale - Locale to use for formatting
 * @returns Formatted date string
 */
export function formatDateTime(
    dateTime: DateTime,
    format: DateTimeFormat | string = DateTimeFormat.ISO,
    locale: string = "en-US"
): string {
    // Set the locale
    const dt = dateTime.setLocale(locale);

    // Handle predefined formats
    if (format === DateTimeFormat.ISO) {
        return dt.toISO() || "";
    }

    if (format === DateTimeFormat.UNIX) {
        return Math.floor(dt.toSeconds()).toString();
    }

    // Use format mapping for predefined formats or use the format string directly
    const formatString =
        (formatMapping as Record<string, string>)[format] || format;

    // For HTTP format, ensure it's in UTC
    if (format === DateTimeFormat.HTTP) {
        return dt.toUTC().toFormat(formatString);
    }

    return dt.toFormat(formatString);
}

/**
 * Get the current date and time
 * @param timezone - IANA timezone identifier
 * @returns DateTime object in the specified timezone
 */
export function getCurrentDateTime(timezone: string = "UTC"): DateTime {
    return DateTime.now().setZone(timezone);
}

/**
 * Parse a date string into a DateTime object
 * @param dateString - Date string to parse
 * @param format - Format of the date string
 * @param timezone - IANA timezone identifier
 * @returns DateTime object or null if parsing fails
 */
export function parseDateTime(
    dateString: string,
    format?: string,
    timezone: string = "UTC"
): DateTime | null {
    let dt: DateTime;

    if (format) {
        dt = DateTime.fromFormat(dateString, format, { zone: timezone });
    } else {
        // Try to parse as ISO
        dt = DateTime.fromISO(dateString, { zone: timezone });

        // If that fails, try other common formats
        if (!dt.isValid) {
            dt = DateTime.fromRFC2822(dateString, { zone: timezone });
        }

        if (!dt.isValid) {
            dt = DateTime.fromHTTP(dateString, { zone: timezone });
        }

        if (!dt.isValid) {
            dt = DateTime.fromSQL(dateString, { zone: timezone });
        }
    }

    return dt.isValid ? dt : null;
}
