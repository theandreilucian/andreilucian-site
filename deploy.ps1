# Quick Deploy Script
# Use this script to deploy changes after editing

Write-Host "🚀 Deploying Changes..." -ForegroundColor Green
Write-Host ""

# Check if we're in a git repo
if (-not (Test-Path .git)) {
    Write-Host "❌ Error: Not a git repository!" -ForegroundColor Red
    Write-Host "   Run setup-github.ps1 first" -ForegroundColor Yellow
    exit 1
}

# Show status
Write-Host "📋 Current changes:" -ForegroundColor Cyan
git status --short
Write-Host ""

# Ask for commit message
$commitMessage = Read-Host "Enter commit message (or press Enter for default)"

if ([string]::IsNullOrWhiteSpace($commitMessage)) {
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"
    $commitMessage = "Update website - $timestamp"
}

# Stage all changes
Write-Host ""
Write-Host "📦 Staging files..." -ForegroundColor Cyan
git add .

# Commit
Write-Host "💾 Committing changes..." -ForegroundColor Cyan
git commit -m "$commitMessage"

# Push
Write-Host "🚀 Pushing to GitHub..." -ForegroundColor Cyan
git push

Write-Host ""
Write-Host "✅ Done! Vercel will auto-deploy in 1-2 minutes" -ForegroundColor Green
Write-Host "   Check your site at: https://andreilucian.com" -ForegroundColor Cyan

