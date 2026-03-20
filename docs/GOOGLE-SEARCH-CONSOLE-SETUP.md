# Google Search Console Setup — Abheet Singh Portfolio

## Step 1: Deploy to Vercel (if not already)

Your portfolio is already configured for Vercel (`@vercel/analytics`, `@vercel/speed-insights`).

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd C:\Users\abhay\Downloads\portfolio
vercel

# Set production domain
vercel --prod
```

Your site will be live at: `https://abheet-singh.vercel.app` (or your custom domain)

---

## Step 2: Go to Google Search Console

1. Open: https://search.google.com/search-console
2. Sign in with your Google account (use `abheet8360@gmail.com`)
3. Click **"Add Property"**

---

## Step 3: Choose Verification Method

### Option A: URL Prefix (Recommended for Vercel)

1. Select **"URL prefix"**
2. Enter: `https://abheet-singh.vercel.app` (your deployed URL)
3. Click **Continue**

### Verification — HTML Meta Tag (Easiest)

1. Google will show you a meta tag like:
   ```html
   <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
   ```
2. Copy that tag
3. Add it to `public/index.html` inside `<head>`:
   ```html
   <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
   ```
4. Commit and deploy:
   ```bash
   git add public/index.html
   git commit -m "add Google Search Console verification"
   git push
   ```
5. Wait 1-2 minutes for Vercel to deploy
6. Go back to Google Search Console and click **Verify**

---

## Step 4: Submit Sitemap

Your React app is a SPA (Single Page Application). Create a sitemap:

### Create `public/sitemap.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.w3.org/2000/sitemaps/org/protocol/sitemap/0.9">
  <url>
    <loc>https://abheet-singh.vercel.app/</loc>
    <lastmod>2026-03-21</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://abheet-singh.vercel.app/about</loc>
    <lastmod>2026-03-21</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://abheet-singh.vercel.app/projects</loc>
    <lastmod>2026-03-21</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://abheet-singh.vercel.app/articles</loc>
    <lastmod>2026-03-21</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://abheet-singh.vercel.app/contact</loc>
    <lastmod>2026-03-21</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>
```

### Create `public/robots.txt`

```
User-agent: *
Allow: /

Sitemap: https://abheet-singh.vercel.app/sitemap.xml
```

### Submit in Search Console

1. Go to **Sitemaps** in the left sidebar
2. Enter: `sitemap.xml`
3. Click **Submit**

---

## Step 5: Request Indexing

1. In Search Console, go to **URL Inspection**
2. Enter your homepage URL: `https://abheet-singh.vercel.app`
3. Click **Request Indexing**
4. Repeat for each page:
   - `https://abheet-singh.vercel.app/about`
   - `https://abheet-singh.vercel.app/projects`
   - `https://abheet-singh.vercel.app/contact`
   - `https://abheet-singh.vercel.app/articles`

---

## Step 6: Google Business Profile (Optional but Powerful)

If you want to appear in local searches ("developer in Amritsar"):

1. Go to: https://business.google.com
2. Create a profile as a **Freelance Software Developer**
3. Add your details:
   - Name: Abheet Singh
   - Category: Software Developer / IT Services
   - Location: Amritsar, Punjab, India
   - Website: your portfolio URL
   - Services: Full-Stack Development, AI Engineering, Minecraft Development

---

## Step 7: Monitor & Optimize

### Check Weekly
- **Performance** tab → see which keywords bring clicks
- **Coverage** tab → fix any indexing errors
- **Core Web Vitals** tab → monitor LCP, FID, CLS

### Timeline
| Action | Expected Result |
|--------|----------------|
| Day 1 | Verification complete, sitemap submitted |
| Day 2-3 | Pages start getting crawled |
| Week 1 | Homepage indexed, appears for "Abheet Singh" search |
| Week 2-4 | Inner pages indexed, long-tail keywords start ranking |
| Month 2-3 | Ranking improves for competitive keywords |

---

## What's Already Done in Your Portfolio

| SEO Feature | Status |
|-------------|--------|
| Meta titles (unique per page) | Done |
| Meta descriptions (unique per page) | Done |
| Meta keywords (150+ total) | Done |
| Open Graph tags | Done |
| Twitter Card tags | Done |
| JSON-LD Person schema | Done |
| JSON-LD Website schema | Done |
| Canonical URL | Done |
| Robots meta | Done |
| Semantic HTML (h1-h6, main, nav, footer) | Done |
| Alt text on images | Done |
| Aria labels on links | Done |
| Mobile responsive | Done |
| Fast loading (code-split, lazy load) | Done |
| Sitemap | **Create now** (instructions above) |
| robots.txt | **Create now** (instructions above) |
| Google verification tag | **Add after GSC setup** |

---

## Quick Checklist

- [ ] Deploy latest build to Vercel
- [ ] Sign up at search.google.com/search-console
- [ ] Add URL prefix property
- [ ] Add verification meta tag to `index.html`
- [ ] Deploy again with verification tag
- [ ] Verify in Search Console
- [ ] Create `public/sitemap.xml`
- [ ] Create `public/robots.txt`
- [ ] Deploy with sitemap + robots
- [ ] Submit sitemap in Search Console
- [ ] Request indexing for all 5 pages
- [ ] Wait 1-2 weeks for indexing
- [ ] Monitor Performance tab weekly
