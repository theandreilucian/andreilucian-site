# 🔥 FORCE VERCEL TO PULL LATEST GITHUB VERSION
# This script forces Vercel to redeploy from GitHub

Write-Host "`n🔥 FORCING VERCEL TO PULL LATEST GITHUB VERSION...`n" -ForegroundColor Yellow

# Check git status
Write-Host "📋 Checking Git status..." -ForegroundColor Cyan
$status = git status --short
if ($status) {
    Write-Host "⚠️  You have uncommitted changes!" -ForegroundColor Yellow
    Write-Host "   Staging and committing them first...`n" -ForegroundColor Gray
    git add .
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    git commit -m "Update files before force redeploy - $timestamp"
}

# Show latest commits
Write-Host "`n📝 Latest commits:" -ForegroundColor Cyan
git log --oneline -3
Write-Host ""

# Verify remote
Write-Host "🔗 Checking remote repository..." -ForegroundColor Cyan
$remote = git remote get-url origin
Write-Host "   Remote: $remote" -ForegroundColor Gray
Write-Host ""

# Create empty commit to force redeploy
Write-Host "💾 Creating force redeploy commit..." -ForegroundColor Cyan
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
git commit --allow-empty -m "FORCE VERCEL REDEPLOY - Pull latest from GitHub - $timestamp"

# Push to GitHub
Write-Host "🚀 Pushing to GitHub..." -ForegroundColor Cyan
git push origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ SUCCESS! Pushed to GitHub!`n" -ForegroundColor Green
    
    Write-Host "⏳ What happens next:" -ForegroundColor Yellow
    Write-Host "   1. GitHub receives your push ✅" -ForegroundColor White
    Write-Host "   2. Vercel webhook should trigger automatically" -ForegroundColor White
    Write-Host "   3. Vercel pulls latest code from GitHub" -ForegroundColor White
    Write-Host "   4. Vercel builds and deploys (2-3 minutes)`n" -ForegroundColor White
    
    Write-Host "🔍 VERIFY DEPLOYMENT:" -ForegroundColor Cyan
    Write-Host "   • GitHub: https://github.com/theandreilucian/andreilucian-site" -ForegroundColor White
    Write-Host "   • Vercel: https://vercel.com/dashboard" -ForegroundColor White
    Write-Host "   • Check 'Deployments' tab for new deployment`n" -ForegroundColor White
    
    Write-Host "⚠️  IF VERCEL STILL DOESN'T DEPLOY:" -ForegroundColor Yellow
    Write-Host "   1. Go to Vercel Dashboard" -ForegroundColor White
    Write-Host "   2. Click your project" -ForegroundColor White
    Write-Host "   3. Go to 'Deployments' tab" -ForegroundColor White
    Write-Host "   4. Click '...' on latest deployment" -ForegroundColor White
    Write-Host "   5. Click 'Redeploy'`n" -ForegroundColor White
    
    Write-Host "💡 Or check Vercel Settings → Git:" -ForegroundColor Cyan
    Write-Host "   Make sure GitHub integration is connected`n" -ForegroundColor Gray
} else {
    Write-Host "`n❌ Push failed! Check your GitHub connection." -ForegroundColor Red
    Write-Host "   Make sure you're logged into GitHub.`n" -ForegroundColor Yellow
}

