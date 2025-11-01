# Quick Deployment Guide

## Deploy to Vercel (Recommended)

### Option 1: Deploy via CLI (Fastest)

```bash
# Install Vercel CLI globally
npm i -g vercel

# Navigate to project directory
cd /Volumes/Crisco/www/pickformula

# Login to Vercel (first time only)
vercel login

# Deploy to production
vercel --prod
```

Your site will be live at a URL like: `https://pickformula.vercel.app`

### Option 2: Deploy via GitHub + Vercel Dashboard

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Initial website deployment"
   git push origin main
   ```

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Click "Deploy"

3. **Configure Custom Domain:**
   - In Vercel dashboard, go to Project Settings
   - Navigate to "Domains"
   - Add `www.pickformula.com` and `pickformula.com`
   - Update your DNS records as shown

## Custom Domain Setup

After deployment, configure your custom domain:

### DNS Records to Add:

**For www.pickformula.com:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**For pickformula.com (root domain):**
```
Type: A
Name: @
Value: 76.76.21.21
```

Or use Vercel's nameservers for easier management.

## Local Preview

Test the site locally before deploying:

```bash
# Start local server
python3 -m http.server 8000

# Open in browser
open http://localhost:8000
```

## Post-Deployment

After deployment, verify:

- [ ] All pages load correctly
- [ ] Music links work (Ditto.fm URLs)
- [ ] Contact email link works
- [ ] Mobile responsiveness
- [ ] Navigation smooth scrolling
- [ ] Custom domain configured
- [ ] SSL certificate active (automatic with Vercel)

## Environment

- **Platform:** Vercel
- **Framework Preset:** Other (static HTML)
- **Build Command:** None required
- **Output Directory:** . (root)
- **Install Command:** None required

## Support

For Vercel support: [vercel.com/support](https://vercel.com/support)

For site issues: hello@pickformula.com

---

The site is production-ready and optimized for instant deployment.
