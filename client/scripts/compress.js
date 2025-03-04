const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const buildDir = path.join(__dirname, "../build");

function compressFiles(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      compressFiles(fullPath); // Recursively process directories
    } else if (/\.(js|css|html)$/.test(file)) {
      const gzPath = `${fullPath}.gz`;
      const fileContents = fs.readFileSync(fullPath);
      const compressed = zlib.gzipSync(fileContents, { level: 9 });
      fs.writeFileSync(gzPath, compressed);
      console.log(`Compressed: ${gzPath}`);
    }
  });
}

compressFiles(buildDir);
