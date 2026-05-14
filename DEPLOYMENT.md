# Deployment Guide: MyContinental Food Store to Vercel

## Free Vercel Deployment with Custom Domain

Follow these exact steps to deploy to Vercel and connect your domain.

---

## Step 1: Create Vercel Account (if you don't have one)

1. Go to https://vercel.com/signup
2. Click **"Continue with GitHub"** (or your preferred provider)
3. Authorize and create account
4. You'll be redirected to Vercel dashboard

---

## Step 2: Connect Your GitHub Repository to Vercel

### Option A: If your repo is already on GitHub

1. Go to https://vercel.com/new
2. Click **"Import Project"**
3. Paste your GitHub repo URL: `https://github.com/YOUR_USERNAME/mycontinental-store`
4. Click **"Continue"**
5. Vercel will auto-detect Next.js
6. Click **"Deploy"**
7. Wait ~2 minutes for build to complete

### Option B: If repo is NOT on GitHub yet

1. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Add Vercel configuration and deployment setup"
   git push origin main
   ```

2. Then follow Option A above

---

## Step 3: Environment Variables on Vercel

**These are already in vercel.json, but verify they're set:**

1. After deployment, go to **Project Settings** → **Environment Variables**
2. Verify these variables exist:
   - `NEXT_PUBLIC_WOOCOMMERCE_URL` = `https://mycontinentalfoodstore.co.uk`
   - `WOOCOMMERCE_CONSUMER_KEY` = `ck_2cb62f5475ffb403993310308ebf310154754aae`
   - `WOOCOMMERCE_CONSUMER_SECRET` = `cs_352f7cb8868056fec6ecc47772eb6dc0d24fb1b4`

3. If missing, add them manually:
   - Click **"Add New"**
   - Enter name and value
   - Set to **"Production"**, **"Preview"**, **"Development"**
   - Click **"Save"**

---

## Step 4: Connect Custom Domain (mycontinentalfoodstore.co.uk)

### 4A. Add Domain to Vercel

1. Go to your Vercel project dashboard
2. Click **"Settings"** tab
3. Click **"Domains"** in left sidebar
4. Enter: `mycontinentalfoodstore.co.uk`
5. Click **"Add"**
6. Vercel will show you **DNS records to add**

### 4B. Update DNS at Your Domain Registrar

Where you purchased your domain (GoDaddy, Namecheap, etc.):

1. Go to **DNS Settings** for `mycontinentalfoodstore.co.uk`
2. Add the DNS records Vercel provided:
   - Usually 2-4 records (A records, CNAME records)
   - Copy **exactly** as shown by Vercel
3. Save changes
4. **Wait 5-48 hours** for DNS to propagate

### 4C: Verify Domain on Vercel

1. Go back to Vercel project → **Settings** → **Domains**
2. Check if domain shows **"Valid Configuration"** (checkmark)
3. If not valid yet, wait and refresh in 1-2 hours

---

## Step 5: Enable HTTPS (Automatic)

Vercel automatically provisions an SSL certificate once the domain is verified.

1. After DNS propagates and domain is valid, you'll see **"SSL/TLS Certificate"** section
2. Status should show **"Valid"** with certificate issued
3. Your site will automatically redirect HTTP → HTTPS

---

## Step 6: Test the Deployment

Once domain is verified:

1. Open https://mycontinentalfoodstore.co.uk
2. Verify site loads
3. Check:
   - ✅ Auto-playing hero slider
   - ✅ Featured products loading from WooCommerce
   - ✅ Categories loading from API
   - ✅ Subscription boxes section
   - ✅ WhatsApp button in bottom-right
   - ✅ All links work

---

## Step 7: Set Up Automatic Deployments

**Already configured:** Every time you push to GitHub, Vercel automatically deploys.

```bash
# Deploy automatically on push:
git push origin main
```

Check deployment status:
1. Go to Vercel dashboard
2. Click your project
3. **Deployments** tab shows all past deployments

---

## What's Included in This Deployment

✅ **Production-ready Next.js app**
- Auto-scaling
- Global CDN
- Automatic HTTPS
- Zero downtime deployments

✅ **Environment variables** for WooCommerce API
- Secured and encrypted
- Different values per environment (dev/preview/production)

✅ **Automatic deployments**
- Triggers on every GitHub push
- Preview deployments for pull requests

✅ **Free tier features**
- Up to 3 concurrent deployments
- 100GB bandwidth/month
- Unlimited sites
- Custom domains

---

## Troubleshooting

### Domain not connecting

1. Check DNS records are added **exactly** as Vercel specified
2. Wait full 48 hours (DNS propagation can be slow)
3. Use online tool to verify DNS: https://mxtoolbox.com/
4. Vercel dashboard shows propagation status

### Build fails on Vercel

1. Check **Deployments** tab for error logs
2. Common issues:
   - Environment variables missing → Add to Settings
   - Node modules issue → Run `npm install` locally first
   - TypeScript errors → Run `npm run build` locally to debug

### Slow initial page load

1. Vercel cold starts are ~1-2 seconds (normal)
2. Subsequent loads are instant (cached)
3. First-time visitors may see ~2s load time
4. This improves with more traffic (keeps functions warm)

### WooCommerce API not responding

1. Check `/api/products` endpoint on deployed site
2. Verify WooCommerce credentials in Environment Variables
3. Test locally: `npm run dev` and check console errors
4. WooCommerce may be blocking Vercel's IP → Check WooCommerce firewall

---

## Monitoring & Analytics

Once deployed, monitor your site:

1. **Vercel Dashboard** → **Analytics** tab
2. See:
   - Page views
   - Response times
   - Errors
   - Deployment history

---

## Rollback if Needed

To rollback to previous deployment:

1. Go to **Deployments** tab
2. Find previous working deployment
3. Click **"..." menu** → **"Rollback to this deployment"**
4. Automatic rollback in ~30 seconds

---

## Next Steps

After deployment:

1. **Monitor** site performance in Analytics
2. **Set up** Google Analytics (optional)
3. **Test** all features with real domain
4. **Update** any hardcoded URLs if needed
5. **Set up** email notifications for failed deployments
   - Settings → Notifications → Check "Failed Deployments"

---

## Support

- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- Deploy troubleshooting: https://vercel.com/support

---

**Estimated deployment time: 5-10 minutes (including DNS propagation wait time)**
