# WooCommerce Product Image Uploader

This script automatically uploads product images to your WordPress media library and links them to WooCommerce products by SKU.

## Setup Instructions

### 1. Generate WordPress App Password

You need to create an app password for the WordPress user to allow API authentication:

1. Go to: https://mycontinentalfoodstore.co.uk/wp-admin/
2. Navigate to: **Users** → **MyContinentalFoodStore** (edit profile)
3. Scroll down to **App Passwords** section
4. Enter an app name (e.g., "Image Uploader")
5. Click **Create App Password**
6. Copy the generated password (looks like: `xxxx xxxx xxxx xxxx xxxx xxxx`)

### 2. Set Environment Variable

Before running the script, set the WordPress app password as an environment variable:

```bash
export WORDPRESS_APP_PASSWORD="xxxx xxxx xxxx xxxx xxxx xxxx"
```

Or run the script with the variable inline:

```bash
WORDPRESS_APP_PASSWORD="xxxx xxxx xxxx xxxx xxxx xxxx" node scripts/upload-images.js
```

## How It Works

1. **Reads** all image files from: `/Users/princeademola/Desktop/My Claude Idea/02 Projects/Prestige Web Co/Clients/MyContinental Food Store/assets/product-images/`

2. **Extracts SKU** from filename (part before first dash)
   - Example: `EM4018-Gari-Garri.jpg` → SKU: `EM4018`

3. **For each image:**
   - Uploads to WordPress media library via REST API
   - Finds WooCommerce product by SKU
   - Updates product with the uploaded image
   - Logs success or error

4. **Processes one at a time** with 500ms delays to avoid overwhelming the server

## Usage

```bash
# Run the script
WORDPRESS_APP_PASSWORD="your_app_password_here" node scripts/upload-images.js
```

## Expected Output

```
🚀 Starting WooCommerce Product Image Uploader

📁 Reading images from: /Users/princeademola/Desktop/My Claude Idea/...

📸 Found 25 image file(s)

Starting upload process...

[1/25] Processing SKU: EM4018
  📤 Uploading to WordPress media library...
  ✓ Media ID: 12345
  🔍 Finding WooCommerce product by SKU...
  ✓ Found product ID: 567
  🔗 Linking image to product...
✅ EM4018 — uploaded and linked

[2/25] Processing SKU: EM5021
...

============================================================
📊 UPLOAD SUMMARY
============================================================
✅ Success: 24
❌ Failed: 1
📈 Total: 25
============================================================
```

## Supported Image Formats

- `.jpg` / `.jpeg`
- `.png`
- `.gif`
- `.webp`

## Troubleshooting

### "WORDPRESS_APP_PASSWORD environment variable not set"
- Generate an app password in WordPress admin (see Setup Instructions)
- Set it as environment variable before running

### "Product not found in WooCommerce"
- Check that the SKU in the filename matches a product SKU exactly
- Filenames must follow format: `SKU-ProductName.jpg`

### "HTTP 401: Unauthorized"
- Verify the WordPress app password is correct
- Verify WordPress username is set correctly (`MyContinentalFoodStore`)

### "HTTP 403: Forbidden"
- Check that the WooCommerce user has permission to upload media and edit products
- Verify API credentials in the script

## API Rate Limiting

The script adds a 500ms delay between requests to avoid overwhelming the server. You can adjust `DELAY_BETWEEN_REQUESTS` in the script if needed.

## Credentials Used

- **Site URL**: https://mycontinentalfoodstore.co.uk
- **WordPress Username**: MyContinentalFoodStore
- **WordPress App Password**: (set via environment variable)
- **WooCommerce Consumer Key**: (embedded in script)
- **WooCommerce Consumer Secret**: (embedded in script)
