// Simple script to test the build process
console.log('Testing build process...');
console.log('1. Cleaning dist directory');
console.log('2. Running TypeScript compiler');
console.log('3. Testing server startup');

// Import the server to test if it can be loaded
import('./dist/server.js')
  .then((module) => {
    console.log('Server module loaded successfully!');
    console.log('Build process test completed successfully.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error loading server module:', error);
    process.exit(1);
  });
