# GitHub Setup Script
# Run this after creating your GitHub repository

Write-Host "🚀 GitHub Setup Script" -ForegroundColor Green
Write-Host ""

# Check if git is configured
$gitUser = git config user.name
$gitEmail = git config user.email

if (-not $gitUser) {
    Write-Host "⚠️  Git user not configured!" -ForegroundColor Yellow
    $userName = Read-Host "Enter your name (for git commits)"
    $userEmail = Read-Host "Enter your email (for git commits)"
    git config user.name "$userName"
    git config user.email "$userEmail"
    Write-Host "✅ Git configured!" -ForegroundColor Green
} else {
    Write-Host "✅ Git is configured: $gitUser <$gitEmail>" -ForegroundColor Green
}

Write-Host ""
Write-Host "📝 Step 1: Create repository on GitHub.com" -ForegroundColor Cyan
Write-Host "   - Go to: https://github.com/new" -ForegroundColor Gray
Write-Host "   - Repository name: andreilucian-site" -ForegroundColor Gray
Write-Host "   - Make it PUBLIC or PRIVATE (your choice)" -ForegroundColor Gray
Write-Host "   - DO NOT initialize with README" -ForegroundColor Gray
Write-Host "   - Click 'Create repository'" -ForegroundColor Gray
Write-Host ""

$githubUsername = Read-Host "Enter your GitHub username"
$repoUrl = "https://github.com/$githubUsername/andreilucian-site.git"

Write-Host ""
Write-Host "🔗 Adding remote repository..." -ForegroundColor Cyan

# Check if remote already exists
$remoteExists = git remote get-url origin 2>$null
if ($remoteExists) {
    Write-Host "⚠️  Remote 'origin' already exists: $remoteExists" -ForegroundColor Yellow
    $overwrite = Read-Host "Do you want to update it? (y/n)"
    if ($overwrite -eq "y" -or $overwrite -eq "Y") {
        git remote set-url origin $repoUrl
        Write-Host "✅ Remote updated!" -ForegroundColor Green
    }
} else {
    git remote add origin $repoUrl
    Write-Host "✅ Remote added!" -ForegroundColor Green
}

Write-Host ""
Write-Host "📦 Creating initial commit..." -ForegroundColor Cyan
git add .
git commit -m "Initial website deployment"

Write-Host ""
Write-Host "🌿 Setting branch to main..." -ForegroundColor Cyan
git branch -M main

Write-Host ""
Write-Host "🚀 Pushing to GitHub..." -ForegroundColor Cyan
Write-Host "   (You may be prompted for GitHub credentials)" -ForegroundColor Yellow
git push -u origin main

Write-Host ""
Write-Host "✅ Done! Your code is now on GitHub!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Go to: https://vercel.com" -ForegroundColor White
Write-Host "2. Sign up with GitHub" -ForegroundColor White
Write-Host "3. Import your repository: andreilucian-site" -ForegroundColor White

