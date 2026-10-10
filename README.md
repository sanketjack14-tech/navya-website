# Navya Intel Website

Modern Applicant Tracking System marketing website replica with platform product tours and lead capture.

## Structure
- `index.html`: Main landing page
- `assets/css/styles.css`: Stylesheet
- `assets/js/main.js`: Interactive scripts
- `assets/images/`: Logos, icons, and product screenshots
- `assets/fonts/`: Clash Display webfont

## Custom Domain Setup (GoDaddy)

### Method 1: GitHub Pages
1. Go to repository **Settings** -> **Pages**.
2. Under **Build and deployment**, select `Deploy from a branch`, choose branch `main` and folder `/ (root)`.
3. Under **Custom domain**, enter your GoDaddy domain (e.g. `navyaintel.com` or `www.navyaintel.com`) and save.
4. In your **GoDaddy DNS Management**:
   - For Apex domain (`navyaintel.com`), add 4 `A` records pointing to GitHub Pages IPs:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - For `www` subdomain, add a `CNAME` record:
     - Name: `www`
     - Value: `<your-username>.github.io`
5. Check **Enforce HTTPS** in GitHub Pages settings.

### Method 2: Vercel / Netlify / Cloudflare Pages (Recommended for easiest DNS & SSL)
1. Import this GitHub repository into [Vercel](https://vercel.com) or [Netlify](https://netlify.com).
2. Go to **Domains** and enter your GoDaddy domain.
3. Follow the 1-click DNS configuration guide provided by Vercel/Netlify.
