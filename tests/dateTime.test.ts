import { DateTime } from "luxon";
import {
    formatDateTime,
    getCurrentDateTime,
    parseDateTime,
} from "../src/utils/formatters.js";
import {
    isValidTimezone,
    getUtcOffset,
    convertTimezone,
} from "../src/utils/timezones.js";
import { DateTimeFormat } from "../src/types.js";

describe("Date and Time Utilities", () => {
    describe("Formatters", () => {
        test("formatDateTime should format dates correctly", () => {
            // Create a fixed date for testing with explicit UTC zone
            const dt = DateTime.fromISO("2023-01-15T12:30:45.000Z", {
                zone: "UTC",
            });

            // Test ISO format - ensure we're in UTC
            expect(formatDateTime(dt.toUTC(), DateTimeFormat.ISO)).toBe(
                "2023-01-15T12:30:45.000Z"
            );

            // Test UNIX format
            expect(formatDateTime(dt, DateTimeFormat.UNIX)).toBe("1673785845");

            // Test RFC2822 format
            expect(formatDateTime(dt.toUTC(), DateTimeFormat.RFC2822)).toMatch(
                /Sun, 15 Jan 2023 12:30:45 \+0000/
            );

            // Test HTTP format
            expect(formatDateTime(dt, DateTimeFormat.HTTP)).toMatch(
                /Sun, 15 Jan 2023 12:30:45 GMT/
            );

            // Test SQL format
            expect(formatDateTime(dt.toUTC(), DateTimeFormat.SQL)).toBe(
                "2023-01-15 12:30:45"
            );

            // Test custom format
            expect(formatDateTime(dt.toUTC(), "yyyy/MM/dd HH:mm")).toBe(
                "2023/01/15 12:30"
            );
        });

        test("getCurrentDateTime should return the current date and time", () => {
            const now = getCurrentDateTime();

            // Should be a valid DateTime object
            expect(now.isValid).toBe(true);

            // Should be close to now
            const diffInSeconds = Math.abs(now.diffNow().as("seconds"));
            expect(diffInSeconds).toBeLessThan(5);
        });

        test("parseDateTime should parse date strings correctly", () => {
            // Test ISO format
            const isoDate = parseDateTime("2023-01-15T12:30:45.000Z");
            expect(isoDate?.toISO()).toBe("2023-01-15T12:30:45.000Z");

            // Test RFC2822 format
            const rfcDate = parseDateTime("Sun, 15 Jan 2023 12:30:45 +0000");
            expect(rfcDate?.toFormat("yyyy-MM-dd HH:mm:ss")).toBe(
                "2023-01-15 12:30:45"
            );

            // Test custom format
            const customDate = parseDateTime(
                "2023/01/15 12:30",
                "yyyy/MM/dd HH:mm"
            );
            expect(customDate?.toFormat("yyyy-MM-dd HH:mm:ss")).toBe(
                "2023-01-15 12:30:00"
            );

            // Test invalid date
            const invalidDate = parseDateTime("not a date");
            expect(invalidDate).toBeNull();
        });
    });

    describe("Timezones", () => {
        test("isValidTimezone should validate timezones correctly", () => {
            // Valid timezones
            expect(isValidTimezone("UTC")).toBe(true);
            expect(isValidTimezone("America/New_York")).toBe(true);
            expect(isValidTimezone("Europe/London")).toBe(true);

            // Invalid timezones
            expect(isValidTimezone("Not_A_Timezone")).toBe(false);
            expect(isValidTimezone("")).toBe(false);
        });

        test("getUtcOffset should return the correct offset", () => {
            // UTC should have +00:00 offset
            expect(getUtcOffset("UTC")).toBe("+00:00");

            // Invalid timezone should return null
            expect(getUtcOffset("Not_A_Timezone")).toBeNull();
        });

        test("convertTimezone should convert between timezones", () => {
            // Create a fixed date in UTC
            const utcDate = DateTime.fromISO("2023-01-15T12:00:00.000Z");

            // Convert to New York time (EST/EDT)
            const nyDate = convertTimezone(utcDate, "America/New_York");

            // The hour should be different due to timezone offset
            expect(nyDate?.hour).not.toBe(utcDate.hour);

            // The date should still be valid
            expect(nyDate?.isValid).toBe(true);

            // Invalid timezone should return null
            expect(convertTimezone(utcDate, "Not_A_Timezone")).toBeNull();
        });
    });
});
