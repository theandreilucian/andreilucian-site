# ⚡ Quick Start - Integration Setup

## ✅ What I've Already Done For You:

1. ✅ Initialized Git repository
2. ✅ Created `.gitignore` file
3. ✅ Created `vercel.json` configuration for Vercel
4. ✅ Staged all your website files
5. ✅ Created helper scripts:
   - `setup-github.ps1` - One-click GitHub setup
   - `deploy.ps1` - Easy deployment script

---

## 🚀 Next Steps (Do These Now):

### Step 1: Setup GitHub (5 minutes)

1. **Create GitHub repository:**
   - Go to: https://github.com/new
   - Repository name: `andreilucian-site`
   - Choose Public or Private
   - **DO NOT** initialize with README
   - Click "Create repository"

2. **Run the setup script:**
   ```powershell
   .\setup-github.ps1
   ```
   
   This script will:
   - Configure your git identity
   - Connect to GitHub
   - Make initial commit
   - Push everything to GitHub

---

### Step 2: Deploy to Vercel (3 minutes)

1. Go to: https://vercel.com
2. Click "Sign Up" → Use "Continue with GitHub"
3. Authorize Vercel to access GitHub
4. Click "Add New..." → "Project"
5. Find and import `andreilucian-site`
6. Framework: Select "Other" (or leave default)
7. Click "Deploy"
8. Wait 1-2 minutes → ✅ You'll get a `.vercel.app` URL

---

### Step 3: Connect Your Domain (5 minutes)

**In Vercel:**
1. Go to your project → Settings → Domains
2. Click "Add" button
3. Add: `andreilucian.com`
4. Add: `www.andreilucian.com`
5. Set `andreilucian.com` as Primary domain
6. Note the DNS records Vercel shows you

**In Namecheap:**
1. Go to: https://www.namecheap.com
2. Domain List → Manage `andreilucian.com`
3. Click "Advanced DNS" tab
4. **DELETE** any existing A record for `@`
5. **ADD** these records:
   - **A Record:**
     - Host: `@`
     - Value: `76.76.21.21`
     - TTL: `Automatic`
   - **CNAME Record:**
     - Host: `www`
     - Value: `cname.vercel-dns.com`
     - TTL: `Automatic`
6. Save All Changes

**Back in Vercel:**
1. Click "Verify" next to both domains
2. Wait for green checkmarks ✅
3. Enable "Enforce HTTPS"
4. Wait 5-30 minutes, visit: https://andreilucian.com

---

### Step 4: Setup Substack Newsletter (5 minutes)

**In Namecheap:**
1. Still in Advanced DNS
2. Add New Record:
   - **CNAME Record:**
     - Host: `newsletter`
     - Value: `YOURPUBLICATION.substack.com`
     - (Replace YOURPUBLICATION with your Substack publication name)
     - TTL: `Automatic`
3. Save All Changes

**In Substack:**
1. Go to your Substack dashboard
2. Settings → Domain
3. Add custom domain: `newsletter.andreilucian.com`
4. Follow verification steps
5. Wait for SSL certificate (5-30 minutes)
6. Test: https://newsletter.andreilucian.com

---

## ✅ You're Done!

### Daily Workflow (After Setup):

**After editing files in Cursor:**

```powershell
.\deploy.ps1
```

Or manually:
```powershell
git add .
git commit -m "Your changes"
git push
```

Vercel will **automatically deploy** your changes in 1-2 minutes! 🎉

---

## 📚 Need More Help?

See `DEPLOYMENT_GUIDE.md` for detailed step-by-step instructions with screenshots descriptions.

---

## 🎯 Checklist

- [ ] Run `setup-github.ps1` and push to GitHub
- [ ] Deploy to Vercel
- [ ] Add domains in Vercel
- [ ] Update DNS in Namecheap
- [ ] Verify domains in Vercel
- [ ] Setup Substack newsletter subdomain
- [ ] Test website: https://andreilucian.com
- [ ] Test newsletter: https://newsletter.andreilucian.com

**Start with Step 1! Run:** `.\setup-github.ps1`

