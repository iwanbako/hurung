const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(process.cwd(), 'out'); // sesuaikan dengan folder output build kamu

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith('.txt') && entry.name !== 'robots.txt') {
      fs.unlinkSync(full);
    }
  }
}

if (fs.existsSync(OUT_DIR)) {
  walk(OUT_DIR);
  console.log('✅ File .txt payload RSC berhasil dihapus');
}