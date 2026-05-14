const https = require('https');
const fs = require('fs');
const path = require('path');

const desktopDir = path.join(require('os').homedir(), 'Desktop');

const images = [
  {
    filename: 'product-fresh-produce.jpg',
    category: 'Fresh Produce',
    prompt: 'Fresh green plantains and yams on a clean white background, professional product photography, soft studio lighting, isolated, food product shot',
    seed: 111,
  },
  {
    filename: 'product-hair-care.jpg',
    category: 'Hair Care',
    prompt: 'African hair care products shea butter cream and hair oil bottles on white background, professional product photography, studio lighting, clean minimal',
    seed: 222,
  },
  {
    filename: 'product-spices.jpg',
    category: 'Spices & Seasoning',
    prompt: 'African spices and seasoning packets suya pepper and crayfish on white background, professional product photography, studio lighting, clean minimal',
    seed: 333,
  },
];

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    function fetch(fetchUrl) {
      https.get(fetchUrl, (response) => {
        if (response.statusCode === 301 || response.statusCode === 302) {
          fetch(response.headers.location);
          return;
        }
        const file = fs.createWriteStream(filepath);
        response.pipe(file);
        file.on('finish', () => { file.close(); resolve(); });
        file.on('error', reject);
      }).on('error', reject);
    }
    fetch(url);
  });
}

async function main() {
  console.log('🎨 Generating product images...\n');

  for (const img of images) {
    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(img.prompt)}?width=800&height=800&nologo=true&seed=${img.seed}`;
    const filepath = path.join(desktopDir, img.filename);

    process.stdout.write(`[${img.category}] Generating ${img.filename}... `);
    try {
      await downloadImage(url, filepath);
      const size = (fs.statSync(filepath).size / 1024).toFixed(0);
      console.log(`✅ Done (${size}KB)`);
    } catch (err) {
      console.log(`❌ Failed: ${err.message}`);
    }
  }

  console.log('\n✅ All 3 product images saved to your Desktop!');
}

main();
