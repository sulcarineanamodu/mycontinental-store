const https = require('https');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');

const images = [
  {
    filename: 'hero-1.jpg',
    prompt: 'African Caribbean grocery store interior full shelves authentic food products plantain yams spices canned goods warm golden lighting professional retail photography wide angle photorealistic',
    seed: 101,
  },
  {
    filename: 'hero-2.jpg',
    prompt: 'Colorful African Caribbean fresh produce display plantains yams peppers tropical vegetables vibrant colors professional grocery store photography wide angle photorealistic warm lighting',
    seed: 202,
  },
  {
    filename: 'hero-3.jpg',
    prompt: 'African Caribbean grocery store shelves packed with authentic products hair care beauty spices sauces colorful organized professional retail photography wide angle photorealistic',
    seed: 303,
  },
];

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        // Follow redirect
        https.get(response.headers.location, (res) => {
          res.pipe(file);
          file.on('finish', () => { file.close(); resolve(); });
        }).on('error', reject);
      } else {
        response.pipe(file);
        file.on('finish', () => { file.close(); resolve(); });
      }
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

async function main() {
  console.log('🎨 Generating hero images with AI...\n');

  for (const img of images) {
    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(img.prompt)}?width=1920&height=1080&nologo=true&seed=${img.seed}`;
    const filepath = path.join(publicDir, img.filename);

    process.stdout.write(`Generating ${img.filename}... `);
    try {
      await downloadImage(url, filepath);
      const size = (fs.statSync(filepath).size / 1024).toFixed(0);
      console.log(`✅ Done (${size}KB)`);
    } catch (err) {
      console.log(`❌ Failed: ${err.message}`);
    }
  }

  console.log('\n✅ All hero images saved to public/');
  console.log('Now run: git add public/ && git commit -m "feat: add AI hero images" && git push');
}

main();
