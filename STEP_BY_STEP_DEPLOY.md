# 📋 Step-by-Step: Deploy Your Website to GitHub & Vercel

## ✅ Complete Step-by-Step Instructions

---

## 🎯 STEP 1: Open PowerShell

1. Press `Windows Key + X`
2. Click **"Windows PowerShell"** or **"Terminal"**
3. Navigate to your website folder:
   ```powershell
   cd D:\Website
   ```
4. Press **Enter**

---

## 🔍 STEP 2: Check What Changed

Type this command to see what files you modified:
```powershell
git status
```

**What you'll see:**
- Files in **green** = Already staged (ready to commit)
- Files in **red** = Modified but not staged yet

---

## 📦 STEP 3: Add Your Files

**Option A: Add ALL files (recommended)**
```powershell
git add .
```

**Option B: Add specific files only**
```powershell
git add index.html ghostwriting.html
```

Press **Enter** after typing the command.

---

## 💾 STEP 4: Commit Your Changes

Type this command:
```powershell
git commit -m "Update website"
```

**Or use a more descriptive message:**
```powershell
git commit -m "Update index.html and ghostwriting.html with andreilucian.com meta tags"
```

Press **Enter**.

**What happens:** Git saves your changes with a message.

---

## 🚀 STEP 5: Push to GitHub

Type this command:
```powershell
git push origin main
```

Press **Enter**.

**What happens:**
- Your files upload to GitHub
- You might need to enter your GitHub username/password
- If you see "Success" or similar, it worked!

---

## ⏳ STEP 6: Wait for Vercel (Automatic)

**Vercel automatically detects your push!**

1. **Wait 2-3 minutes** (Vercel needs time to build)
2. **Check Vercel Dashboard:**
   - Go to: https://vercel.com/dashboard
   - Click on your project
   - Go to **"Deployments"** tab
   - Look for latest deployment
   - Status should say **"Ready"** ✅

---

## ✅ STEP 7: Verify Your Website

1. **Open Incognito/Private Window:**
   - Chrome/Edge: `Ctrl + Shift + N`
   - Firefox: `Ctrl + Shift + P`

2. **Visit your website:**
   - Go to: https://andreilucian.com

3. **Check if updates are live:**
   - Right-click on page → **"View Page Source"**
   - Press `Ctrl + F` to search
   - Type: `canonical`
   - You should see: `<link rel="canonical" href="https://andreilucian.com/">`

---

## 🎉 DONE! Your Website is Updated!

---

## 🚨 TROUBLESHOOTING

### Problem: "git push" asks for password

**Solution:**
- Use a Personal Access Token instead of password
- Or use GitHub Desktop app

### Problem: Still see old version after 5 minutes

**Solution 1: Force Redeploy**
```powershell
git commit --allow-empty -m "Force redeploy"
git push origin main
```

**Solution 2: Manual Redeploy in Vercel**
1. Go to: https://vercel.com/dashboard
2. Click your project
3. Go to **"Deployments"** tab
4. Click **"..."** (three dots) on latest deployment
5. Click **"Redeploy"**

**Solution 3: Clear Browser Cache**
- Open Incognito mode (bypasses cache)
- Or hard refresh: `Ctrl + Shift + R`

---

## 📝 QUICK REFERENCE

**Copy-paste these commands one by one:**

```powershell
# 1. Check status
git status

# 2. Add all files
git add .

# 3. Commit
git commit -m "Update website"

# 4. Push to GitHub
git push origin main

# 5. Wait 2-3 minutes, then check Vercel dashboard
```

---

## 🎯 WHAT EACH STEP DOES

| Step | Command | What It Does |
|------|---------|--------------|
| 1 | `git status` | Shows what files changed |
| 2 | `git add .` | Prepares files to be saved |
| 3 | `git commit -m "message"` | Saves changes with a message |
| 4 | `git push origin main` | Uploads to GitHub |
| 5 | (Automatic) | Vercel detects and deploys |

---

## 🔗 IMPORTANT LINKS

- **GitHub Repo:** https://github.com/theandreilucian/andreilucian-site
- **Vercel Dashboard:** https://vercel.com/dashboard
- **Your Website:** https://andreilucian.com

---

## 💡 PRO TIP: Use the Script!

Instead of typing commands manually, just run:
```powershell
.\DEPLOY_NOW.ps1
```

This does everything automatically! 🚀


