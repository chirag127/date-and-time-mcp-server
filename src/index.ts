import { startServer } from "./server.js";
import { updateConfig } from "./config.js";

// Parse command line arguments for configuration
const args = process.argv.slice(2);
const configOptions: Record<string, string> = {};

for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg.startsWith("--")) {
        const key = arg.slice(2);
        const value = args[i + 1];

        if (value && !value.startsWith("--")) {
            configOptions[key] = value;
            i++; // Skip the value in the next iteration
        } else {
            configOptions[key] = "true"; // Flag without value
        }
    }
}

// Update configuration from command line arguments
if (Object.keys(configOptions).length > 0) {
    const config: Record<string, any> = {};

    if (configOptions.timezone) {
        config.defaultTimezone = configOptions.timezone;
    }

    if (configOptions.format) {
        config.defaultFormat = configOptions.format;
    }

    if (configOptions.locale) {
        config.defaultLocale = configOptions.locale;
    }

    if (configOptions.debug) {
        config.debug = configOptions.debug === "true";
    }

    updateConfig(config);
}

// Start the server
startServer().catch((error) => {
    console.error("Failed to start server:", error);
    process.exit(1);
});
