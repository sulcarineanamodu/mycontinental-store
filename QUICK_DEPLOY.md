# 🚀 Quick Deploy Checklist

## ✅ Completed
- [x] Git initialized and committed
- [x] .env.local configured with WooCommerce API
- [x] vercel.json created with environment variables
- [x] Commit: "Initial MyContinental store build"

---

## 📝 Commands to Run (Copy & Paste)

### 1️⃣ Create GitHub Repo & Push Code

```bash
git remote add origin https://github.com/YOUR_USERNAME/mycontinental-store.git
git branch -M main
git push -u origin main
```

**Replace `YOUR_USERNAME` with your GitHub username**

### 2️⃣ Install & Login to Vercel

```bash
npm install -g vercel
vercel login
```

### 3️⃣ Deploy to Vercel (One Command)

```bash
cd /Users/princeademola/Desktop/mycontinental-store
vercel --prod
```

When asked, answer:
- Setup and deploy? → **Y**
- Which scope? → **Your GitHub username**
- Link to existing project? → **N**
- Project name? → **mycontinental-store**
- Directory? → **.**
- Modify settings? → **N**

### 4️⃣ Add Custom Domain

```bash
vercel domains add www.mycontinentalfoodstore.co.uk
```

### 5️⃣ Add DNS Records at Namecheap

Vercel will output DNS records. Add them to:
**https://www.namecheap.com/ → Manage Domains → mycontinentalfoodstore.co.uk → Advanced DNS**

---

## ✨ Configuration Summary

| Variable | Value |
|----------|-------|
| NEXT_PUBLIC_WOOCOMMERCE_URL | https://mycontinentalfoodstore.co.uk |
| WOOCOMMERCE_CONSUMER_KEY | ck_2cb62f5475ffb403993310308ebf310154754aae |
| WOOCOMMERCE_CONSUMER_SECRET | cs_352f7cb8868056fec6ecc47772eb6dc0d24fb1b4 |

All in:
- ✅ `.env.local` (local development)
- ✅ `vercel.json` (production on Vercel)

---

## 🌍 Domain Routing

```
Browser → www.mycontinentalfoodstore.co.uk (Vercel)
          ↓
        Next.js Frontend
          ↓
        Calls → https://mycontinentalfoodstore.co.uk (Namecheap/WordPress)
          ↓
        WooCommerce API
```

---

## 🎯 Verify Deployment

After DNS propagates (1-48 hours):

```
✅ https://www.mycontinentalfoodstore.co.uk        → Frontend loads
✅ /api/products/featured                            → API works
✅ /api/categories                                   → Categories load
✅ WhatsApp button visible (bottom-right)
✅ All animations smooth
```

---

## 📚 Full Guides

- **`GITHUB_AND_VERCEL_DEPLOY.md`** — Detailed step-by-step
- **`DEPLOYMENT.md`** — Alternative deployment methods

---

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| Build fails | Check Vercel logs: dashboard → Deployments |
| Domain not connecting | Verify DNS records at Namecheap match Vercel output |
| WooCommerce API error | Check env vars in Vercel Settings → Environment Variables |
| Site slow | Normal (Vercel cold start ~1-2s), improves with traffic |

---

## 📞 Next Steps

1. Create GitHub repo (if you don't have one)
2. Run `git remote add origin ...` and `git push`
3. Install Vercel CLI: `npm install -g vercel`
4. Login: `vercel login`
5. Deploy: `vercel --prod`
6. Add domain: `vercel domains add www.mycontinentalfoodstore.co.uk`
7. Add DNS records at Namecheap
8. Wait 1-48 hours for DNS propagation
9. Visit https://www.mycontinentalfoodstore.co.uk

**That's it!** 🎉

---

For full instructions, see: **GITHUB_AND_VERCEL_DEPLOY.md**
