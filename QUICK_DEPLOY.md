# 🚀 Quick Deploy Guide - Upload to GitHub & Vercel

## ✅ Step-by-Step: Deploy Your Website Updates

### Method 1: Using PowerShell Script (Easiest)

1. **Open PowerShell in your website folder:**
   ```powershell
   cd D:\Website
   ```

2. **Run the deploy script:**
   ```powershell
   .\deploy.ps1
   ```

3. **Enter a commit message** (or press Enter for default)

4. **Wait 2-3 minutes** - Vercel will auto-deploy!

---

### Method 2: Manual Git Commands

1. **Open PowerShell in your website folder:**
   ```powershell
   cd D:\Website
   ```

2. **Check what changed:**
   ```powershell
   git status
   ```

3. **Add all files:**
   ```powershell
   git add .
   ```
   Or add specific files:
   ```powershell
   git add index.html ghostwriting.html
   ```

4. **Commit changes:**
   ```powershell
   git commit -m "Update website with latest changes"
   ```

5. **Push to GitHub:**
   ```powershell
   git push origin main
   ```

6. **Vercel auto-deploys** - Wait 2-3 minutes!

---

### Method 3: Force Redeploy (If Updates Don't Show)

If you've already pushed but don't see changes:

1. **Create empty commit to force rebuild:**
   ```powershell
   git commit --allow-empty -m "Force redeploy - $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
   git push origin main
   ```

2. **Or manually redeploy in Vercel:**
   - Go to: https://vercel.com/dashboard
   - Click your project
   - Go to "Deployments" tab
   - Click "..." on latest deployment
   - Click "Redeploy"

---

## 🔍 Verify Your Deployment

### Step 1: Check GitHub
- Go to: https://github.com/theandreilucian/andreilucian-site
- Click on `index.html` or `ghostwriting.html`
- Verify your changes are there

### Step 2: Check Vercel Deployment
- Go to: https://vercel.com/dashboard
- Click your project
- Check "Deployments" tab
- Latest should show "Ready" ✅

### Step 3: Test Your Website
- Open **Incognito Mode** (bypasses cache)
- Visit: https://andreilucian.com
- Right-click → "View Page Source"
- Search for your changes (e.g., "canonical")

---

## 🎯 What Happens Automatically

1. **You push to GitHub** → GitHub receives your code
2. **Vercel detects push** → Automatically starts building
3. **Vercel deploys** → Your site updates in 1-3 minutes
4. **DNS propagates** → Available at andreilucian.com

---

## ⚡ Quick Commands Reference

```powershell
# Check status
git status

# Add all files
git add .

# Commit
git commit -m "Your message here"

# Push to GitHub
git push origin main

# Force redeploy
git commit --allow-empty -m "Force redeploy"
git push origin main

# Check recent commits
git log --oneline -5
```

---

## 🐛 Troubleshooting

### Still seeing old version?

1. **Wait 3-5 minutes** - Vercel needs time to deploy
2. **Test in Incognito** - Browser cache might be showing old version
3. **Hard refresh:** `Ctrl + Shift + R`
4. **Check Vercel logs** - Dashboard → Deployments → Click latest → View logs
5. **Manual redeploy** - Vercel Dashboard → Deployments → Redeploy

### Git push fails?

- Make sure you're logged into GitHub
- Check: `git remote -v` (should show your repo)
- Try: `git pull` first, then `git push`

---

## ✅ Success Checklist

- [ ] Files committed to git
- [ ] Pushed to GitHub
- [ ] Vercel deployment shows "Ready"
- [ ] Website shows updates in Incognito mode
- [ ] Page source shows your changes

---

**Your website URL:** https://andreilucian.com  
**GitHub Repo:** https://github.com/theandreilucian/andreilucian-site  
**Vercel Dashboard:** https://vercel.com/dashboard


