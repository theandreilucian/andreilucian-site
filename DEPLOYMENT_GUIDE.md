# Integration Recap: GitHub + Vercel + Namecheap + Substack with Cursor

## 🎯 Quick Recap - What We're Integrating:

| Service | Purpose | Status |
|---------|---------|--------|
| **GitHub** | Code repository & version control | Need to set up |
| **Vercel** | Free website hosting & auto-deploy | Need to connect |
| **Namecheap** | Your domain (andreilucian.com) | Already have |
| **Substack** | Newsletter hosting | Need to connect |
| **Cursor** | Code editor (where you edit) | ✅ Using now |

## 📋 The Complete Integration Flow:

```
Cursor (edit code) 
    ↓
GitHub (save code)
    ↓
Vercel (auto-deploys site)
    ↓
Namecheap (points domain to Vercel)
    ↓
Your Website Live! 🎉
```

## What You Need:
1. GitHub account (free) - to store your code
2. Vercel account (free) - to host your website
3. Your Namecheap domain (andreilucian.com)
4. Substack account (for newsletter)

---

## PART 1: Put Your Site on GitHub

### Step 1: Create GitHub Account
- Go to: https://github.com
- Sign up (it's free)

### Step 2: Create New Repository
- Click green "New" button
- Name it: `andreilucian-site`
- Click "Create repository"

### Step 3: Upload Your Files
Open PowerShell (Windows key, type "PowerShell") and run:

```powershell
cd D:\Website
git init
git add .
git commit -m "Initial website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/andreilucian-site.git
git push -u origin main
```

(Replace YOUR_USERNAME with your actual GitHub username)

---

## PART 2: Deploy to Vercel

### Step 4: Sign Up for Vercel
- Go to: https://vercel.com
- Click "Sign Up" → Use GitHub to sign in

### Step 5: Deploy Your Site
- Click "Add New..." → "Project"
- Find your `andreilucian-site` repository
- Click "Import"
- Framework: Select "Other"
- Click "Deploy"
- Wait 1-2 minutes
- ✅ You'll get a URL like: `andreilucian-site.vercel.app`

---

## PART 3: Connect Your Domain (andreilucian.com)

### Step 6: Add Domain in Vercel
- In your Vercel project, click "Settings"
- Click "Domains" tab
- Click "Add" button
- Type: `andreilucian.com` → Click "Add"
- Type: `www.andreilucian.com` → Click "Add"
- Set `andreilucian.com` as Primary domain

### Step 7: Update Namecheap DNS
- Go to: https://www.namecheap.com
- Click "Domain List" → Click "Manage" next to andreilucian.com
- Click "Advanced DNS" tab
- **DELETE** the A record for `@` that points to `172.66.0.70`
- **ADD** these new records:
  - **A Record**: 
    - Host: `@`
    - Value: `76.76.21.21`
    - TTL: `Automatic`
  - **CNAME Record**:
    - Host: `www`
    - Value: `cname.vercel-dns.com`
    - TTL: `Automatic`
- Click "Save All Changes"

### Step 8: Verify in Vercel
- Go back to Vercel → Settings → Domains
- Click "Verify" next to both domains
- Wait until both show green checkmarks ✅
- Enable "Enforce HTTPS"
- Wait 5-30 minutes, then visit: https://andreilucian.com

---

## PART 4: Connect Substack Newsletter

### Step 9: Create Newsletter Subdomain in Namecheap
- Still in Namecheap → Advanced DNS
- Click "Add New Record"
- **CNAME Record**:
  - Host: `newsletter`
  - Value: `YOURPUBLICATION.substack.com`
  - (Replace YOURPUBLICATION with your actual Substack publication name)
  - TTL: `Automatic`
- Click "Save All Changes"

### Step 10: Configure in Substack
- Go to your Substack dashboard
- Settings → Domain
- Add custom domain: `newsletter.andreilucian.com`
- Follow the verification steps
- Wait for SSL certificate (usually 5-30 minutes)

### Step 11: Test Your Newsletter Links
- Your website code is ALREADY set up to redirect to Substack!
- Visit: https://newsletter.andreilucian.com
- Click any "Newsletter" button on your site - it should go to Substack

---

## ✅ You're Done!

Now:
- Your website is live at: **andreilucian.com**
- Your newsletter is at: **newsletter.andreilucian.com**
- When you edit in Cursor → push to GitHub → Vercel auto-updates your site!

---

## 🔄 Daily Workflow with Cursor (After Setup)

### Step 1: Edit in Cursor
- Open your project in Cursor
- Edit HTML, CSS, JS files as needed
- Use Cursor's AI features to help code

### Step 2: Save Changes to GitHub
Open PowerShell (or Cursor's integrated terminal) in `D:\Website`:

```powershell
git add .
git commit -m "Update website - [describe your changes]"
git push
```

### Step 3: Vercel Auto-Deploys! 🚀
- Vercel automatically detects the GitHub push
- It rebuilds and deploys your site (takes ~1-2 minutes)
- Your changes go live automatically at andreilucian.com

**No manual deployment needed!** Just edit → commit → push → done! ✅

---

## 📝 Quick Command Reference

### First Time Setup (run once):
```powershell
cd D:\Website
git init
git add .
git commit -m "Initial website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/andreilucian-site.git
git push -u origin main
```

### Daily Updates (run after editing):
```powershell
cd D:\Website
git add .
git commit -m "Your change description"
git push
```

### Check Status:
```powershell
git status          # See what files changed
git log             # See commit history
```

---

## 🌐 Final Setup Checklist

- [ ] GitHub repository created and code pushed
- [ ] Vercel account connected to GitHub
- [ ] Site deployed on Vercel (get .vercel.app URL)
- [ ] Domain added in Vercel (andreilucian.com + www)
- [ ] DNS records updated in Namecheap
- [ ] Domain verified in Vercel (green checkmarks)
- [ ] HTTPS enabled in Vercel
- [ ] Substack newsletter subdomain configured
- [ ] Test website at https://andreilucian.com
- [ ] Test newsletter at https://newsletter.andreilucian.com

---

## Need Help?
- GitHub: https://docs.github.com
- Vercel: https://vercel.com/docs
- Namecheap: https://www.namecheap.com/support/
- Substack: https://substack.com/support




