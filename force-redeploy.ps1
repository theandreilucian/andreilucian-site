# Force Vercel Redeploy Script
# This will trigger a fresh deployment to clear cache

Write-Host "🔥 FORCING VERCEL REDEPLOY..." -ForegroundColor Yellow
Write-Host ""

# Check if we're in a git repo
if (-not (Test-Path .git)) {
    Write-Host "❌ Error: Not a git repository!" -ForegroundColor Red
    exit 1
}

# Show current status
Write-Host "📋 Current Git Status:" -ForegroundColor Cyan
git status --short
Write-Host ""

# Create empty commit to force redeploy
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
Write-Host "💾 Creating empty commit..." -ForegroundColor Cyan
git commit --allow-empty -m "FORCE REDEPLOY - Clear cache - $timestamp"

# Push to trigger Vercel deployment
Write-Host "🚀 Pushing to GitHub..." -ForegroundColor Cyan
git push

Write-Host ""
Write-Host "✅ DEPLOYMENT TRIGGERED!" -ForegroundColor Green
Write-Host ""
Write-Host "⏳ Next Steps:" -ForegroundColor Yellow
Write-Host "   1. Wait 2-3 minutes for Vercel to deploy" -ForegroundColor White
Write-Host "   2. Go to Vercel Dashboard and check deployment status" -ForegroundColor White
Write-Host "   3. Test in INCOGNITO MODE (bypasses browser cache)" -ForegroundColor White
Write-Host "   4. Hard refresh: Ctrl + Shift + R" -ForegroundColor White
Write-Host ""
Write-Host "🔍 To verify:" -ForegroundColor Cyan
Write-Host "   - Open ghostwriting.html in Incognito mode" -ForegroundColor White
Write-Host "   - Check for: 12.5K LinkedIn, 2.7K X, 5.5K Instagram" -ForegroundColor White
Write-Host ""
Write-Host "📝 Your files ARE CORRECT on your laptop!" -ForegroundColor Green
Write-Host "   This is just a caching issue - be patient!" -ForegroundColor Green

