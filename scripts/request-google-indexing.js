// Convenience wrapper: runs the indexing script from the domeinoverzicht directory
// where the googleapis package and OAuth credentials are located.
//
// Usage: node scripts/request-google-indexing.js

const { execSync } = require('child_process');
const path = require('path');

const domeinoverzichtDir = path.resolve(__dirname, '../../domeinoverzicht');

console.log('Running indexing script from domeinoverzicht directory...');
console.log(`Directory: ${domeinoverzichtDir}\n`);

try {
  execSync('node request-indexing-go2thailand.js', {
    cwd: domeinoverzichtDir,
    stdio: 'inherit',
  });
} catch (err) {
  process.exit(err.status || 1);
}
