# 🚀 Quick Deploy Script - Upload to GitHub & Vercel
# Run this script to deploy your website updates instantly

Write-Host "`n🚀 DEPLOYING YOUR WEBSITE TO GITHUB & VERCEL...`n" -ForegroundColor Green

# Check if we're in a git repo
if (-not (Test-Path .git)) {
    Write-Host "❌ Error: Not a git repository!" -ForegroundColor Red
    Write-Host "   Please run setup-github.ps1 first" -ForegroundColor Yellow
    exit 1
}

# Show current status
Write-Host "📋 Checking changes..." -ForegroundColor Cyan
$status = git status --short
if ($status) {
    Write-Host $status -ForegroundColor Gray
} else {
    Write-Host "   No changes to commit" -ForegroundColor Yellow
}

Write-Host "`n💬 Enter commit message (or press Enter for default):" -ForegroundColor Cyan
$commitMessage = Read-Host

if ([string]::IsNullOrWhiteSpace($commitMessage)) {
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $commitMessage = "Update website - $timestamp"
}

# Stage all changes
Write-Host "`n📦 Staging all files..." -ForegroundColor Cyan
git add .

# Commit
Write-Host "💾 Committing changes..." -ForegroundColor Cyan
git commit -m "$commitMessage"

if ($LASTEXITCODE -eq 0) {
    # Push to GitHub
    Write-Host "🚀 Pushing to GitHub..." -ForegroundColor Cyan
    git push origin main
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "`n✅ SUCCESS! Your changes are being deployed!`n" -ForegroundColor Green
        
        Write-Host "📝 What happens next:" -ForegroundColor Yellow
        Write-Host "   1. GitHub receives your code ✅" -ForegroundColor White
        Write-Host "   2. Vercel detects the push (automatic)" -ForegroundColor White
        Write-Host "   3. Vercel builds and deploys (1-3 minutes)" -ForegroundColor White
        Write-Host "   4. Your site updates at andreilucian.com`n" -ForegroundColor White
        
        Write-Host "🔍 Verify deployment:" -ForegroundColor Cyan
        Write-Host "   • GitHub: https://github.com/theandreilucian/andreilucian-site" -ForegroundColor White
        Write-Host "   • Vercel: https://vercel.com/dashboard" -ForegroundColor White
        Write-Host "   • Website: https://andreilucian.com`n" -ForegroundColor White
        
        Write-Host "💡 Tip: Test in Incognito mode to bypass browser cache!" -ForegroundColor Yellow
        Write-Host "   Press Ctrl+Shift+N (Chrome/Edge) or Ctrl+Shift+P (Firefox)`n" -ForegroundColor Gray
    } else {
        Write-Host "`n❌ Push failed! Check your GitHub connection." -ForegroundColor Red
    }
} else {
    Write-Host "`n⚠️  Nothing to commit (no changes detected)" -ForegroundColor Yellow
    Write-Host "   Your files are already up to date!`n" -ForegroundColor Green
}


