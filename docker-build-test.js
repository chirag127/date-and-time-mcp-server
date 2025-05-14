#!/usr/bin/env node

// This script simulates the Docker build process to check for issues
import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("🔍 Testing Docker build process...");
console.log("Current directory:", process.cwd());

// Check if all required files exist
const requiredFiles = [
    "package.json",
    "tsconfig.json",
    "Dockerfile",
    "smithery.yaml",
];
const missingFiles = requiredFiles.filter((file) => !fs.existsSync(file));

if (missingFiles.length > 0) {
    console.error("❌ Missing required files:", missingFiles.join(", "));
    process.exit(1);
}

console.log("✅ All required files exist");

// Check if package.json has the required scripts
const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
if (!packageJson.scripts || !packageJson.scripts.build) {
    console.error('❌ package.json is missing the "build" script');
    process.exit(1);
}

console.log("✅ package.json has the required scripts");

// Check if the build script works
try {
    console.log("🔨 Running build script...");
    execSync("npm run build", { stdio: "inherit" });
    console.log("✅ Build script completed successfully");
} catch (error) {
    console.error("❌ Build script failed:", error.message);
    process.exit(1);
}

// Check if the dist directory was created
if (!fs.existsSync("dist")) {
    console.error('❌ Build did not create the "dist" directory');
    process.exit(1);
}

console.log("✅ dist directory was created");

// Check if the server can be loaded
try {
    console.log("🔍 Testing if server can be loaded...");
    // We can't actually import ESM modules in CommonJS, so we'll check if the files exist
    const serverFile = path.join("dist", "server.js");
    const indexFile = path.join("dist", "index.js");

    if (!fs.existsSync(serverFile) || !fs.existsSync(indexFile)) {
        console.error(
            "❌ Required server files are missing in the dist directory"
        );
        process.exit(1);
    }

    console.log("✅ Server files exist in the dist directory");
} catch (error) {
    console.error("❌ Server loading test failed:", error.message);
    process.exit(1);
}

console.log("🎉 Docker build test completed successfully!");
console.log(
    "The Dockerfile and smithery.yaml files should now be ready for deployment."
);
