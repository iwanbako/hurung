// scripts/clean-build.js
const fs = require("fs");
const path = require("path");

const dirs = ["out", ".next"];

for (const dir of dirs) {
  const full = path.join(process.cwd(), dir);
  if (fs.existsSync(full)) {
    fs.rmSync(full, { recursive: true, force: true });
    console.log(`🧹 Dihapus: ${dir}/`);
  }
}

console.log("✅ Clean build selesai");