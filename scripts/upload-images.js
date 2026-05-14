#!/usr/bin/env node

/**
 * WooCommerce Product Image Uploader
 * Reads images from local directory, uploads to WordPress media library,
 * and links them to WooCommerce products by SKU
 */

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

// Configuration
const PRODUCT_IMAGES_DIR = '/Users/princeademola/Desktop/My Claude Idea/02 Projects/Prestige Web Co/Clients/MyContinental Food Store/assets/product-images';
const SITE_URL = 'https://mycontinentalfoodstore.co.uk';
const CONSUMER_KEY = 'ck_2cb62f5475ffb403993310308ebf310154754aae';
const CONSUMER_SECRET = 'cs_352f7cb8868056fec6ecc47772eb6dc0d24fb1b4';
const WORDPRESS_USERNAME = 'MyContinentalFoodStore';
// Note: WordPress app password needs to be generated via WordPress admin panel
const WORDPRESS_APP_PASSWORD = process.env.WORDPRESS_APP_PASSWORD || '';

const DELAY_BETWEEN_REQUESTS = 500; // ms to wait between API calls to avoid rate limiting

// Helper function to create Basic Auth header
function getBasicAuthHeader(username, password) {
  const credentials = `${username}:${password}`;
  return 'Basic ' + Buffer.from(credentials).toString('base64');
}

// Helper function to get WooCommerce Auth header
function getWooCommerceAuthHeader() {
  const credentials = `${CONSUMER_KEY}:${CONSUMER_SECRET}`;
  return 'Basic ' + Buffer.from(credentials).toString('base64');
}

// Fetch wrapper with error handling
async function fetchAPI(url, options = {}) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    return response;
  } catch (error) {
    throw new Error(`API request failed: ${error.message}`);
  }
}

// Upload image to WordPress media library
async function uploadImageToWordPress(imagePath, filename) {
  console.log(`  Uploading image: ${filename}`);

  if (!WORDPRESS_APP_PASSWORD) {
    throw new Error(
      'WORDPRESS_APP_PASSWORD environment variable not set. Generate an app password in WordPress admin and set it.'
    );
  }

  try {
    const fileBuffer = fs.readFileSync(imagePath);
    const formData = new FormData();
    const blob = new Blob([fileBuffer], { type: 'image/jpeg' });
    formData.append('file', blob, filename);

    const response = await fetchAPI(
      `${SITE_URL}/wp-json/wp/v2/media`,
      {
        method: 'POST',
        headers: {
          Authorization: getBasicAuthHeader(WORDPRESS_USERNAME, WORDPRESS_APP_PASSWORD),
        },
        body: formData,
      }
    );

    const data = await response.json();
    return data.id;
  } catch (error) {
    throw new Error(`Failed to upload image to WordPress: ${error.message}`);
  }
}

// Find WooCommerce product by SKU
async function findProductBySku(sku) {
  try {
    const response = await fetchAPI(
      `${SITE_URL}/wp-json/wc/v3/products?sku=${encodeURIComponent(sku)}`,
      {
        method: 'GET',
        headers: {
          Authorization: getWooCommerceAuthHeader(),
          'Content-Type': 'application/json',
        },
      }
    );

    const products = await response.json();
    if (!products || products.length === 0) {
      return null;
    }
    return products[0];
  } catch (error) {
    throw new Error(`Failed to find product by SKU: ${error.message}`);
  }
}

// Update WooCommerce product with image
async function updateProductImage(productId, mediaId) {
  try {
    const response = await fetchAPI(
      `${SITE_URL}/wp-json/wc/v3/products/${productId}`,
      {
        method: 'POST',
        headers: {
          Authorization: getWooCommerceAuthHeader(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          images: [
            {
              id: mediaId,
            },
          ],
        }),
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Failed to update product image: ${error.message}`);
  }
}

// Extract SKU from filename (part before first dash)
function extractSkuFromFilename(filename) {
  const match = filename.match(/^([A-Z0-9]+)-/);
  return match ? match[1] : null;
}

// Sleep helper for delays
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Main upload function
async function uploadImages() {
  console.log('🚀 Starting WooCommerce Product Image Uploader\n');
  console.log(`📁 Reading images from: ${PRODUCT_IMAGES_DIR}\n`);

  // Check if directory exists
  if (!fs.existsSync(PRODUCT_IMAGES_DIR)) {
    console.error(`❌ Directory not found: ${PRODUCT_IMAGES_DIR}`);
    process.exit(1);
  }

  // Read all files from directory
  const files = fs.readdirSync(PRODUCT_IMAGES_DIR);

  // Filter for image files
  const imageFiles = files.filter((file) => {
    const ext = path.extname(file).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
  });

  if (imageFiles.length === 0) {
    console.log('⚠️  No image files found in directory');
    process.exit(0);
  }

  console.log(`📸 Found ${imageFiles.length} image file(s)\n`);
  console.log('Starting upload process...\n');

  let successCount = 0;
  let errorCount = 0;
  const results = [];

  // Process images one at a time
  for (let i = 0; i < imageFiles.length; i++) {
    const filename = imageFiles[i];
    const imagePath = path.join(PRODUCT_IMAGES_DIR, filename);
    const sku = extractSkuFromFilename(filename);

    if (!sku) {
      console.log(`❌ ${filename} — could not extract SKU from filename`);
      errorCount++;
      results.push({
        filename,
        sku: 'UNKNOWN',
        status: 'error',
        reason: 'Invalid filename format',
      });
      continue;
    }

    try {
      console.log(`\n[${i + 1}/${imageFiles.length}] Processing SKU: ${sku}`);

      // Step 1: Upload image to WordPress
      console.log('  📤 Uploading to WordPress media library...');
      const mediaId = await uploadImageToWordPress(imagePath, filename);
      console.log(`  ✓ Media ID: ${mediaId}`);

      // Small delay to avoid rate limiting
      await sleep(DELAY_BETWEEN_REQUESTS);

      // Step 2: Find product by SKU
      console.log('  🔍 Finding WooCommerce product by SKU...');
      const product = await findProductBySku(sku);

      if (!product) {
        console.log(`❌ ${sku} — product not found in WooCommerce`);
        errorCount++;
        results.push({
          filename,
          sku,
          status: 'error',
          reason: 'Product not found',
        });
        continue;
      }

      console.log(`  ✓ Found product ID: ${product.id}`);

      // Small delay to avoid rate limiting
      await sleep(DELAY_BETWEEN_REQUESTS);

      // Step 3: Update product with image
      console.log('  🔗 Linking image to product...');
      await updateProductImage(product.id, mediaId);

      console.log(`✅ ${sku} — uploaded and linked`);
      successCount++;
      results.push({
        filename,
        sku,
        status: 'success',
        productId: product.id,
        mediaId,
      });
    } catch (error) {
      console.log(`❌ ${sku} — ${error.message}`);
      errorCount++;
      results.push({
        filename,
        sku,
        status: 'error',
        reason: error.message,
      });
    }

    // Add delay between iterations to avoid overwhelming server
    if (i < imageFiles.length - 1) {
      await sleep(DELAY_BETWEEN_REQUESTS);
    }
  }

  // Print summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 UPLOAD SUMMARY');
  console.log('='.repeat(60));
  console.log(`✅ Success: ${successCount}`);
  console.log(`❌ Failed: ${errorCount}`);
  console.log(`📈 Total: ${imageFiles.length}`);
  console.log('='.repeat(60) + '\n');

  // Print detailed results if there were errors
  if (errorCount > 0) {
    console.log('Failed uploads:');
    results
      .filter((r) => r.status === 'error')
      .forEach((r) => {
        console.log(`  • ${r.sku} (${r.filename}): ${r.reason}`);
      });
    console.log();
  }

  // Exit with appropriate code
  process.exit(errorCount > 0 ? 1 : 0);
}

// Check prerequisites
if (!CONSUMER_KEY || !CONSUMER_SECRET) {
  console.error('❌ WooCommerce credentials not configured');
  console.error('Set environment variables or update the script with credentials');
  process.exit(1);
}

// Run the upload
uploadImages().catch((error) => {
  console.error('❌ Fatal error:', error.message);
  process.exit(1);
});
