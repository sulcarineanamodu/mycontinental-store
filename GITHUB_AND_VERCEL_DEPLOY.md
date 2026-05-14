# GitHub & Vercel Deployment Instructions

## ✅ Completed: Git Commit
```
Initial MyContinental store build — 25 files committed
```

---

## 📋 Domain Architecture

Your setup will be:
- **WordPress API**: `mycontinentalfoodstore.co.uk` (stays on Namecheap)
- **Next.js Frontend**: `www.mycontinentalfoodstore.co.uk` (Vercel)
- **Next.js connects to**: `https://mycontinentalfoodstore.co.uk` for WooCommerce API

---

# PART 1: Create GitHub Repository & Push Code

## Step 1: Create GitHub Account (if you don't have one)

1. Go to https://github.com/signup
2. Enter email, create password, choose username
3. Verify email
4. Continue to step 2

## Step 2: Create New Repository on GitHub

1. Go to https://github.com/new
2. Enter repository name: `mycontinental-store`
3. Description: `Premium African & Caribbean grocery e-commerce platform`
4. Keep it **PUBLIC** (free tier)
5. Do NOT initialize README, .gitignore, or license (we have these)
6. Click **"Create Repository"**
7. Copy the HTTPS URL (looks like: `https://github.com/YOUR_USERNAME/mycontinental-store.git`)

## Step 3: Connect Local Repo to GitHub

Run these commands in your terminal:

```bash
# Navigate to project
cd /Users/princeademola/Desktop/mycontinental-store

# Add GitHub as remote origin
git remote add origin https://github.com/YOUR_USERNAME/mycontinental-store.git

# Rename branch to main (if needed)
git branch -M main

# Push code to GitHub
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username**

You should see:
```
Enumerating objects: 50, done.
Counting objects: 100% (50/50), done.
...
To https://github.com/YOUR_USERNAME/mycontinental-store.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

## Step 4: Verify on GitHub

1. Go to https://github.com/YOUR_USERNAME/mycontinental-store
2. You should see all your files
3. You should see the commit: "Initial MyContinental store build"

---

# PART 2: Deploy to Vercel (Free)

## Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

## Step 2: Authenticate with Vercel

```bash
vercel login
```

This will:
1. Open browser to login page
2. Sign up or log in with GitHub
3. Authorize "Vercel CLI"
4. Return to terminal with success message

## Step 3: Deploy to Vercel

Run this from your project directory:

```bash
cd /Users/princeademola/Desktop/mycontinental-store
vercel --prod
```

Vercel will ask questions. Answer like this:

```
? Set up and deploy "mycontinental-store"? [Y/n] 
→ Y

? Which scope do you want to deploy to? 
→ Your GitHub username (select your account)

? Link to existing project? [y/N]
→ N

? What's your project's name?
→ mycontinental-store

? In which directory is your code located?
→ .

? Want to modify these settings? [y/N]
→ N
```

Wait for deployment to complete (2-3 minutes). You'll see:

```
✓ Uploaded 50 files (123 kB)
✓ Build step took 45 seconds
✓ Deployment complete
🎉 Success! Project deployed to mycontinental-store.vercel.app
```

## Step 4: Add Custom Domain (www subdomain)

### Option A: Using Vercel CLI (Easiest)

```bash
vercel domains add www.mycontinentalfoodstore.co.uk --scope YOUR_USERNAME
```

**Replace `YOUR_USERNAME` with your Vercel username**

Vercel will show you DNS records to add.

### Option B: Using Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Click your **mycontinental-store** project
3. Go to **Settings** → **Domains**
4. Add domain: `www.mycontinentalfoodstore.co.uk`
5. Click **"Add"**
6. Vercel shows DNS records

## Step 5: Add DNS Records at Namecheap

1. Log into Namecheap: https://www.namecheap.com/
2. Go to **Manage Domains** → **mycontinentalfoodstore.co.uk**
3. Click **"Advanced DNS"** tab
4. Find or add DNS records:

**Vercel will give you records like:**

```
Type: A        | Host: www | Value: 76.76.19.96
Type: CNAME    | Host: www | Value: cname.vercel-dns.com
```

**Add to Namecheap:**
1. Scroll to **Host Records**
2. For each record Vercel gives:
   - Click **"Add Record"** button
   - Select Type (A or CNAME)
   - Enter Host (e.g., "www")
   - Enter Value (the IP or CNAME)
   - Leave TTL as default (1800)
   - Click checkmark to save
3. Click **"Save All"** at bottom

**DNS propagation takes 5-48 hours** (usually 30 minutes)

## Step 6: Verify Domain on Vercel

```bash
# Check status
vercel domains ls
```

Or in dashboard → **Settings** → **Domains** → Check for green checkmark

Once checkmark appears:
✅ Domain is verified
✅ SSL certificate auto-provisioned
✅ Site accessible at https://www.mycontinentalfoodstore.co.uk

---

# PART 3: Verify Everything Works

## Test 1: Frontend Loads
```
https://www.mycontinentalfoodstore.co.uk
```

Should see:
- ✅ Hero slider auto-playing
- ✅ Category cards
- ✅ Featured products loading
- ✅ Subscription boxes section
- ✅ WhatsApp button in bottom-right
- ✅ All animations smooth

## Test 2: API Routes Work
```
https://www.mycontinentalfoodstore.co.uk/api/products/featured
```

Should return JSON array of products from WooCommerce

## Test 3: WooCommerce Connection
```
https://www.mycontinentalfoodstore.co.uk/api/categories
```

Should return JSON array of categories

---

# PART 4: Update DNS for Root Domain (Optional)

**If you want root domain to redirect:**

Add this DNS record at Namecheap:

```
Type: A      | Host: @  | Value: 76.76.19.96
Type: CNAME  | Host: @  | Value: cname.vercel-dns.com
```

Then in Vercel dashboard, add both domains:
- `www.mycontinentalfoodstore.co.uk`
- `mycontinentalfoodstore.co.uk`

And set root domain to redirect to www:
1. Vercel dashboard → **Settings** → **Domains**
2. Click `mycontinentalfoodstore.co.uk`
3. Enable **"Redirect to www"**

---

# Troubleshooting

## "Build failed on Vercel"
1. Check build logs: Vercel dashboard → **Deployments** → Click failed deployment
2. Look for error (usually missing env var or TypeScript error)
3. Fix locally: `npm run build`
4. Commit and push: `git push origin main`
5. Vercel auto-redeploys

## "Domain not connecting after 24 hours"
1. Verify DNS records added to Namecheap (exact match)
2. Check Namecheap Advanced DNS settings (sometimes there are conflicts)
3. Use MXToolbox to verify DNS: https://mxtoolbox.com/
4. Try flushing DNS locally: `ipconfig /flushdns` (Windows) or `sudo dscacheutil -flushcache` (Mac)

## "WooCommerce API not responding"
1. Test locally first: `npm run dev` and check `/api/products`
2. Check Environment Variables in Vercel Settings
3. Verify `NEXT_PUBLIC_WOOCOMMERCE_URL` is exactly: `https://mycontinentalfoodstore.co.uk`
4. WordPress may be blocking Vercel's IP — check WordPress settings

## "Getting 403 Forbidden from WooCommerce"
1. Check WooCommerce Consumer Key and Secret are correct in Environment Variables
2. Re-generate keys in WooCommerce: WooCommerce → Settings → Advanced → REST API
3. Update keys in Vercel Environment Variables
4. Redeploy: `vercel --prod`

---

# How to Deploy Updates

Every time you make changes:

```bash
# Make your changes
# Test locally: npm run dev

# Commit changes
git add .
git commit -m "Your message"

# Push to GitHub (auto-triggers Vercel deployment)
git push origin main

# Or deploy directly to Vercel
vercel --prod
```

Vercel auto-deploys on every `git push` to main branch.

---

# Monitoring

View deployments and logs:

```bash
# List all deployments
vercel deployments

# View most recent deployment
vercel inspect

# View live logs
vercel logs
```

Or use dashboard: https://vercel.com/dashboard

---

# Summary

| Service | Domain | Status |
|---------|--------|--------|
| WordPress (WooCommerce API) | mycontinentalfoodstore.co.uk | Namecheap |
| Next.js Frontend | www.mycontinentalfoodstore.co.uk | Vercel |
| DNS Provider | Both | Namecheap |
| Deployments | Auto on `git push` | GitHub → Vercel |

---

## Next Steps

1. ✅ Create GitHub repo and push code
2. ✅ Deploy to Vercel with `vercel --prod`
3. ✅ Add custom domain `www.mycontinentalfoodstore.co.uk`
4. ✅ Update DNS at Namecheap
5. ✅ Test site loading
6. ✅ Monitor performance in Vercel dashboard

**Estimated time: 30 minutes (plus 24-48 hours for DNS propagation)**

Good luck! 🚀
