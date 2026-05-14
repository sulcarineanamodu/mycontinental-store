/**
 * link-product-images.js
 *
 * Fetches all WooCommerce products, fuzzy-matches them to backup images
 * already on the server, and updates each product with the correct image URL.
 *
 * Run: node scripts/link-product-images.js
 *
 * Requirements: Node.js 18+ (uses native fetch)
 */

const BASE_URL = 'https://mycontinentalfoodstore.co.uk';
const CONSUMER_KEY = 'ck_2cb62f5475ffb403993310308ebf310154754aae';
const CONSUMER_SECRET = 'cs_352f7cb8868056fec6ecc47772eb6dc0d24fb1b4';
const AUTH = 'Basic ' + Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString('base64');

// ─── Image index (files already on the live server from backup restore) ────────
// These paths map to: https://mycontinentalfoodstore.co.uk/wp-content/uploads/{path}
const IMAGE_PATHS = [
  "2025/07/African-Pride-Shea-Miracle-Twist.jpg",
  "2025/07/African-Pride-Edge-Styling-Wax-170g.jpg",
  "2025/07/Aunt-Jackies-Flaxseed-Elongating-Curling-Gel.jpg",
  "2025/07/All-Gold-Strawberry-Jam.jpg",
  "2025/07/African-Pride-Tea-Tree-Eucalyptus-Conditioner.jpg",
  "2025/07/Africas-Finest-Shito-Chilli-Sauce.jpg",
  "2025/07/Africas-Finest-Suya-Pepper-Mix.jpg",
  "2025/07/Africas-Finest-Obe-Ata-Seasoning.jpg",
  "2025/07/African-Pride-Olive-Miracle-7in1-Curl-Refresher.jpg",
  "2025/07/Africas-finest-Jollof.jpg",
  "2025/07/African-Pride-Olive-Miracle-2in1-Shampoo.jpg",
  "2025/07/African-Pride-Braid-Sheen-Spray-355ml.jpg",
  "2025/07/AFRICAN-OLIVE-MIRACLE-LEAVE-IN.jpg",
  "2025/07/AFRICAN-PRIDE-STRENGTHENING-OIL.jpg",
  "2025/07/African-Pride-Magical-Growth-Sheen-226ml.jpg",
  "2025/07/African-Essence-Control-Wig-Shampoo-355ml.jpg",
  "2025/07/African-Pride-Moisture-Miracle-Honey-Coconut.jpg",
  "2025/07/Africas-finest-smoked-catfish-chips.jpg",
  "2025/07/AFRICAN-PRIDE-Foam-setting-mousse.jpg",
  "2025/07/African-Pride-Moisture-Miracle.jpg",
  "2025/07/Africas-Finest-Stockfish-Cod.jpg",
  "2025/07/African-Essence-Weave-spray-6-in-1.jpg",
  "2025/07/Africas-Finest-Smoked-Mackerel-Fillets.jpg",
  "2025/07/Africas-finest-egusi.jpg",
  "2025/07/Africas-finest-palm-oil.jpg",
  "2025/07/Africas-Finest-Dried-Crayfish.jpg",
  "2025/07/Africas-Finest-Dried-Ede-Cocoyam.jpg",
  "2025/07/Africas-Finest-Ugwu-Leaf-Frozen.jpg",
  "2025/07/Africas-Finest-Bitter-Leaf.jpg",
  "2025/07/Africas-Finest-Peppersoup-Mix.jpg",
  "2025/07/Africas-Finest-Ogiri-Iru-Locust-Bean.jpg",
  "2025/07/Africas-Finest-Dried-Efinrin-Basil.jpg",
  "2025/07/Africas-Finest-Ogbono.jpg",
  "2025/07/Africas-Finest-Plantain-Flour.jpg",
  "2025/07/Africas-Finest-Wheat-Semolina.jpg",
  "2025/07/Africas-Finest-Fufu-Pounded-Yam-Flour.jpg",
  "2025/07/Africas-Finest-Poundo-Yam.jpg",
  "2025/07/Africas-Finest-Akara-Powder.jpg",
  "2025/07/Africas-Finest-Tuwo-Shinkafa.jpg",
  "2025/07/Africas-Finest-Masa-Rice-Flour.jpg",
  "2025/07/Africas-Finest-Crayfish-Ground.jpg",
  "2025/07/Africas-Finest-Dawadawa.jpg",
  "2025/07/Africas-Finest-Fermented-Locust-Bean.jpg",
  "2025/07/Africas-Finest-Tatashe-Powder.jpg",
  "2025/07/Africas-Finest-Dried-Ede-White-Cocoyam.jpg",
  "2025/07/Africas-Finest-Dried-Nsala-Uziza.jpg",
  "2025/07/Africas-Finest-Cameroon-Pepper.jpg",
  "2025/07/Africas-Finest-Suya-Pepper.jpg",
  "2025/07/Africas-Finest-Dried-Tomato-Powder.jpg",
  "2025/07/Africas-Finest-Dried-Onion-Powder.jpg",
  "2025/07/Africas-Finest-Dried-Garlic-Powder.jpg",
  "2025/07/Africas-Finest-Ogiri-Iru.jpg",
  "2025/07/Africas-Finest-Stockfish-Pieces.jpg",
  "2025/07/Africas-Finest-Smoked-Prawns.jpg",
  "2025/07/Africas-Finest-Dried-Ede-Yellow-Cocoyam.jpg",
  "2025/07/Africas-Finest-Dried-Ofor.jpg",
  "2025/07/Africas-Finest-Nsukka-Yellow-Pepper.jpg",
  "2025/07/Africas-Finest-Groundnut-Oil.jpg",
  "2025/07/Africas-Finest-Jollof-Seasoning.jpg",
  "2025/07/Africas-Finest-Banga-Soup-Mix.jpg",
  "2025/07/Africas-Finest-Oha-Leaf-Frozen.jpg",
  "2025/07/Africas-Finest-Achi-Thickener.jpg",
  "2025/07/Africas-Finest-Ozu-Nzu-Potash.jpg",
  "2025/07/Africas-Finest-Garden-Egg-Stew.jpg",
  "2025/07/Africas-Finest-Smoked-Catfish-Whole.jpg",
  "2025/07/Africas-Finest-Dried-Oha-Leaf.jpg",
  "2025/07/Africas-Finest-Ose-Oji-Pepper-Sauce.jpg",
  "2025/07/Africas-Finest-Nsala-Uziza-Leaf.jpg",
  "2025/07/Africas-Finest-Fermented-Oil-Bean.jpg",
  "2025/07/Africas-Finest-Udara-Agbalumo-Frozen.jpg",
  "2025/07/Africas-Finest-Dried-Catfish-Smoked.jpg",
  "2025/07/Africas-Finest-Dried-Shrimps.jpg",
  "2025/07/Africas-Finest-Dried-Periwinkle.jpg",
  "2025/07/Africas-Finest-Bitter-Cola.jpg",
  "2025/07/Africas-Finest-Kola-Nut.jpg",
  "2025/07/Africas-Finest-Ofe-Akwu-Palm-Nut-Cream.jpg",
  "2025/07/Africas-Finest-Ede-Cocoyam-Paste.jpg",
  "2025/07/Africas-Finest-Egusi-Melon-Seed.jpg",
  "2025/07/Africas-Finest-Smoked-Herrings.jpg",
  "2025/07/Africas-Finest-Fermented-Ohu-Uziza.jpg",
  "2025/07/Africas-Finest-Dried-Cameroon-Pepper.jpg",
  "2025/07/Africas-Finest-Pounded-Yam.jpg",
  "2025/07/Africas-Finest-Gari-White.jpg",
  "2025/07/Africas-Finest-Gari-Yellow.jpg",
  "2025/07/Africas-Finest-Oha-Soup-Leaf.jpg",
  "2025/07/Africas-Finest-Dried-Uziza-Leaf.jpg",
  "2025/07/Africas-Finest-Fermented-Okpehe-Locust-Bean.jpg",
  "2025/07/Africas-Finest-Dried-Efirin.jpg",
  "2025/07/Africas-Finest-Dried-Ehuru-Calabash-Nutmeg.jpg",
  "2025/07/Africas-Finest-Dried-Uziza-Seeds.jpg",
  "2025/07/Africas-Finest-Dried-Ogiri-Iru.jpg",
  "2025/07/Africas-Finest-Dried-Nsukka-Yellow-Pepper.jpg",
  "2025/07/Africas-Finest-Dried-Tatashe.jpg",
  "2025/07/Africas-Finest-Dried-Tomato.jpg",
  "2025/07/Africas-Finest-Dried-Scotch-Bonnet.jpg",
  "2025/07/Africas-Finest-Dried-Red-Pepper.jpg",
  "2025/07/Africas-Finest-Dried-Onion.jpg",
  "2025/07/Africas-Finest-Dried-Garlic.jpg",
  "2025/07/Africas-Finest-Dried-Ginger.jpg",
  "2025/07/Africas-Finest-Dried-Coriander.jpg",
  "2025/07/Africas-Finest-Dried-Cloves.jpg",
  "2025/07/Africas-Finest-Dried-Bay-Leaves.jpg",
  "2025/07/Africas-Finest-Dried-Baobab-Leaf.jpg",
  "2025/07/Africas-Finest-Dried-Alligator-Pepper.jpg",
  "2025/07/Africas-Finest-Dried-African-Nutmeg.jpg",
  "2025/07/Africas-Finest-Dried-African-Locust-Bean.jpg",
  "2025/07/Africas-Finest-Egusi-Soup-Mix.jpg",
  "2025/07/Africas-Finest-Dried-Ede-Cocoyam-Slices.jpg",
  "2025/07/Africas-Finest-Edikang-Ikong-Mix.jpg",
  "2025/07/Africas-Finest-Ofe-Nsala-Mix.jpg",
  "2025/07/Aunt-Jackies-Defining-Curl-Custard-426g.jpg",
  "2025/07/Aunt-Jackies-Dont-Shrink-Elongating-Curl-Gel-227g.jpg",
  "2025/07/Aunt-Jackies-Curls-Coils-Fix-My-Hair-Intensive-Repair-Conditioner.jpg",
  "2025/07/Aunt-Jackies-Curls-Coils-Quench-Moisture-Intensive-Leave-In.jpg",
  "2025/07/Aunt-Jackies-In-Control-Anti-Poof-Curl-Mousse-227g.jpg",
  "2025/07/Aunt-Jackies-Oh-So-Clean-Argan-Coconut-Moisturizing-Shampoo.jpg",
  "2025/07/Aunt-Jackies-Girls-Soft-Hold-Styling-Butter-213g.jpg",
  "2025/07/Aunt-Jackies-Oh-So-Sleek-Shine-Boosting-Conditioner.jpg",
  "2025/07/Cantu-Shea-Butter-Leave-In-Conditioning-Repair-Cream.jpg",
  "2025/07/Cantu-Shea-Butter-for-Natural-Hair-Moisturizing-Curl-Activator.jpg",
  "2025/07/Cantu-Shea-Butter-for-Natural-Hair-Grow-Strong-Strengthening-Treatment.jpg",
  "2025/07/Cantu-Sulfate-Free-Cleansing-Cream-Shampoo.jpg",
  "2025/07/Cantu-Shea-Butter-Natural-Hair-Daily-Oil-Moisturizer.jpg",
  "2025/07/Cantu-Shea-Butter-Repair-Cream-Deep-Treatment-Masque.jpg",
  "2025/07/Cantu-Argan-Oil-Shine-Hair-Polish-Serum.jpg",
  "2025/07/Goya-Olive-Oil-Extra-Virgin-3L.jpg",
  "2025/07/Goya-Black-Beans.jpg",
  "2025/07/Grace-Jerk-Seasoning.jpg",
  "2025/07/Grace-Festival-Dumpling-Mix.jpg",
  "2025/07/Grace-Cornmeal.jpg",
  "2025/07/Grace-Coconut-Milk.jpg",
];

// ─── Fuzzy match helper ────────────────────────────────────────────────────────
function normalise(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 1);
}

function scoreFuzzy(productName, imagePath) {
  const filename = imagePath.split('/').pop().replace(/\.[^.]+$/, '');
  const productWords = new Set(normalise(productName));
  const imageWords = normalise(filename);

  if (imageWords.length === 0) return 0;

  let matches = 0;
  for (const w of imageWords) {
    if (productWords.has(w)) matches++;
  }

  // Score = matched words / image word count (penalise very short matches)
  return matches / imageWords.length;
}

function findBestImage(productName) {
  let best = null;
  let bestScore = 0;

  for (const img of IMAGE_PATHS) {
    const score = scoreFuzzy(productName, img);
    if (score > bestScore) {
      bestScore = score;
      best = img;
    }
  }

  // Only return if score is good enough (>= 0.5 means half the image words matched)
  return bestScore >= 0.5 ? { path: best, score: bestScore } : null;
}

// ─── WooCommerce API helpers ───────────────────────────────────────────────────
async function getAllProducts() {
  let page = 1;
  let allProducts = [];

  console.log('📦 Fetching all WooCommerce products...');

  while (true) {
    const url = `${BASE_URL}/wp-json/wc/v3/products?per_page=100&page=${page}&status=publish`;
    const res = await fetch(url, { headers: { Authorization: AUTH } });

    if (!res.ok) {
      console.error(`API error: ${res.status} ${res.statusText}`);
      break;
    }

    const products = await res.json();
    if (!products.length) break;

    allProducts = allProducts.concat(products);
    console.log(`  Page ${page}: ${products.length} products (total: ${allProducts.length})`);
    page++;

    if (products.length < 100) break;
  }

  return allProducts;
}

async function updateProductImage(productId, imageUrl) {
  const url = `${BASE_URL}/wp-json/wc/v3/products/${productId}`;
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: AUTH,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      images: [{ src: imageUrl }],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`${res.status}: ${err}`);
  }

  return res.json();
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  const products = await getAllProducts();
  console.log(`\n✅ Found ${products.length} products total\n`);

  // Separate products with and without images
  const noImage = products.filter(p => !p.images || p.images.length === 0);
  const hasImage = products.filter(p => p.images && p.images.length > 0);

  console.log(`📊 Products with images:    ${hasImage.length}`);
  console.log(`📊 Products without images: ${noImage.length}`);
  console.log('');

  if (noImage.length === 0) {
    console.log('🎉 All products already have images!');
    return;
  }

  let matched = 0;
  let unmatched = 0;
  let updated = 0;
  let failed = 0;
  const unmatchedList = [];

  console.log('🔍 Matching products to images...\n');

  for (const product of noImage) {
    const match = findBestImage(product.name);

    if (match) {
      matched++;
      const imageUrl = `${BASE_URL}/wp-content/uploads/${match.path}`;
      process.stdout.write(`  ✓ [${product.id}] ${product.name.substring(0, 50)} → ${match.path.split('/').pop()} (${(match.score * 100).toFixed(0)}%)`);

      try {
        await updateProductImage(product.id, imageUrl);
        updated++;
        process.stdout.write(' ✅\n');
      } catch (err) {
        failed++;
        process.stdout.write(` ❌ ${err.message}\n`);
      }

      // Small delay to avoid hammering the API
      await new Promise(r => setTimeout(r, 200));
    } else {
      unmatched++;
      unmatchedList.push({ id: product.id, name: product.name });
    }
  }

  console.log('\n─────────────────────────────────────────');
  console.log(`✅ Matched & updated: ${updated}`);
  console.log(`❌ API errors:        ${failed}`);
  console.log(`⚠️  No match found:   ${unmatched}`);

  if (unmatchedList.length > 0) {
    console.log('\n📋 Products with no image match:');
    unmatchedList.forEach(p => console.log(`  [${p.id}] ${p.name}`));
  }
}

main().catch(console.error);
