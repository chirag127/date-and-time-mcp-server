#!/bin/bash

echo "Testing Docker build process..."

# Check if all required files exist
echo "Checking required files..."
for file in package.json tsconfig.json Dockerfile smithery.yaml; do
  if [ ! -f "$file" ]; then
    echo "Error: $file not found"
    exit 1
  fi
done
echo "All required files exist"

# Check if package.json has the required scripts
echo "Checking package.json..."
if ! grep -q '"build"' package.json; then
  echo "Error: package.json is missing the 'build' script"
  exit 1
fi
echo "package.json has the required scripts"

# Check if the build script works
echo "Running build script..."
npm run build
if [ $? -ne 0 ]; then
  echo "Error: Build script failed"
  exit 1
fi
echo "Build script completed successfully"

# Check if the dist directory was created
echo "Checking dist directory..."
if [ ! -d "dist" ]; then
  echo "Error: Build did not create the 'dist' directory"
  exit 1
fi
echo "dist directory was created"

# Check if the server files exist
echo "Checking server files..."
if [ ! -f "dist/server.js" ] || [ ! -f "dist/index.js" ]; then
  echo "Error: Required server files are missing in the dist directory"
  exit 1
fi
echo "Server files exist in the dist directory"

echo "Docker build test completed successfully!"
echo "The Dockerfile and smithery.yaml files should now be ready for deployment."
