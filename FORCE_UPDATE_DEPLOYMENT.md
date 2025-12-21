# 🔄 Force Website Update on Vercel

If your website is showing the old version, follow these steps:

## ✅ Step 1: Update Cache Versions (DONE)
- ✅ Updated CSS version: `styles.css?v=20251221154510`
- ✅ Updated JS version: `script.js?v=20251221154510`
- ✅ Updated `vercel.json` with proper cache headers

## 🚀 Step 2: Force Redeploy

### Option A: Using Git (Recommended)
```powershell
# Run the deploy script
.\deploy.ps1

# Or manually:
git add .
git commit -m "Force update - clear cache $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
git push
```

### Option B: Manual Vercel Redeploy
1. Go to https://vercel.com/dashboard
2. Find your project (`andreilucian-site` or similar)
3. Click on the project
4. Go to **"Deployments"** tab
5. Find the latest deployment
6. Click the **"..."** menu (three dots)
7. Select **"Redeploy"**
8. Confirm the redeploy

### Option C: Trigger via Vercel CLI
```powershell
# If you have Vercel CLI installed
vercel --prod --force
```

## 🧹 Step 3: Clear Browser Cache

After deployment, clear your browser cache:

### Chrome/Edge:
1. Press `Ctrl + Shift + Delete`
2. Select "Cached images and files"
3. Time range: "All time"
4. Click "Clear data"
5. Or hard refresh: `Ctrl + Shift + R` or `Ctrl + F5`

### Firefox:
1. Press `Ctrl + Shift + Delete`
2. Select "Cache"
3. Time range: "Everything"
4. Click "Clear Now"
5. Or hard refresh: `Ctrl + Shift + R` or `Ctrl + F5`

### Safari:
1. Press `Cmd + Option + E` (Mac) to clear cache
2. Or hard refresh: `Cmd + Shift + R`

## 🔍 Step 4: Verify Update

1. Open your site in **Incognito/Private mode** (bypasses cache)
2. Or add `?v=test` to your URL: `https://andreilucian.com?v=test`
3. Check the page source (Ctrl+U) and verify:
   - CSS link shows: `styles.css?v=20251221154510`
   - JS link shows: `script.js?v=20251221154510`

## ⚡ Quick Test

Open browser console (F12) and run:
```javascript
// Check CSS version
document.querySelector('link[href*="styles.css"]').href

// Check JS version  
document.querySelector('script[src*="script.js"]').src
```

Both should show the new version number: `20251221154510`

## 🐛 Still Not Working?

1. **Check Vercel Deployment Logs:**
   - Go to Vercel Dashboard → Your Project → Deployments
   - Click on the latest deployment
   - Check if it shows "Ready" status
   - Look for any errors in the logs

2. **Verify Files Are Committed:**
   ```powershell
   git status
   git log --oneline -5
   ```

3. **Check CDN Cache:**
   - Vercel uses Edge Network caching
   - Wait 2-5 minutes after deployment
   - Or purge cache in Vercel dashboard (if available)

4. **Domain Cache:**
   - If using custom domain, DNS might cache
   - Wait up to 24 hours for full propagation
   - Or check DNS TTL settings

## 📝 Notes

- Vercel deployments usually take 1-2 minutes
- Edge cache can take 2-5 minutes to clear globally
- Browser cache persists until cleared manually
- Always test in Incognito mode first to bypass browser cache

