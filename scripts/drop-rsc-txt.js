// scripts/drop-rsc-txt.js
const fs = require("fs");
const path = require("path");

const OUT_DIR = path.join(process.cwd(), "out");

let deleted = 0;
let skipped = 0;

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    } else if (entry.name.endsWith(".txt")) {
      if (entry.name === "robots.txt") {
        skipped++;
        continue;
      }
      fs.unlinkSync(full);
      deleted++;
    }
  }
}

if (!fs.existsSync(OUT_DIR)) {
  console.error("❌ Folder out/ tidak ditemukan. Jalankan `next build` dulu.");
  process.exit(1);
}

console.log("⏳ Menghapus file .txt RSC payload...");
walk(OUT_DIR);

let totalFiles = 0;
function countFiles(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) countFiles(full);
    else totalFiles++;
  }
}
countFiles(OUT_DIR);

console.log(`✅ Dihapus ${deleted} file .txt (${skipped} dipertahankan)`);
console.log(`📦 Total file akhir: ${totalFiles}`);