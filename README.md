# Andreilucian.com Website

Personal website and portfolio hosted on Vercel.

## 🚀 Quick Start

### First Time Setup

1. **Run the GitHub setup script:**
   ```powershell
   .\setup-github.ps1
   ```
   This will guide you through connecting to GitHub.

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Click "Add New..." → "Project"
   - Import `andreilucian-site` repository
   - Click "Deploy"

3. **Connect your domain:**
   - In Vercel: Settings → Domains → Add `andreilucian.com` and `www.andreilucian.com`
   - In Namecheap: Update DNS records (see DEPLOYMENT_GUIDE.md)

### Daily Updates

After editing files in Cursor, simply run:
```powershell
.\deploy.ps1
```

Or manually:
```powershell
git add .
git commit -m "Your changes"
git push
```

Vercel will automatically deploy your changes! 🎉

## 📁 Project Structure

- `index.html` - Homepage
- `blog.html` - Blog page
- `offers.html` - Services/Offers page
- `ghostwriting.html` - Ghostwriting page
- `assets/` - Images and media files
- `style.css` / `styles.css` - Styling
- `script.js` - JavaScript functionality

## 🔗 Links

- **Website:** https://andreilucian.com
- **Newsletter:** https://theandreilucian.substack.com (Substack)

## 📚 Documentation

See `DEPLOYMENT_GUIDE.md` for detailed setup instructions.

