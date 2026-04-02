# Quick deploy: commit + push to origin/main (Vercel auto-deploys from GitHub)
# Usage:
#   .\DEPLOY_NOW.ps1                    # prompts for commit message
#   .\DEPLOY_NOW.ps1 -NonInteractive    # default message, no prompt

param(
    [switch]$NonInteractive,
    [string]$Message = ""
)

$ErrorActionPreference = "Stop"

# Ensure git.exe is on PATH (Git for Windows often not in PowerShell PATH)
$gitRoots = @(
    $(Join-Path $env:ProgramFiles "Git\cmd"),
    $(Join-Path $env:ProgramFiles "Git\bin"),
    $(Join-Path ${env:ProgramFiles(x86)} "Git\cmd"),
    $(Join-Path $env:LOCALAPPDATA "Programs\Git\cmd")
)
foreach ($root in $gitRoots) {
    if ($root -and (Test-Path (Join-Path $root "git.exe"))) {
        if ($env:Path -notlike "*$root*") {
            $env:Path = "$root;$env:Path"
        }
        break
    }
}

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host ""
    Write-Host "Git was not found. Install Git for Windows, then run this script again:" -ForegroundColor Red
    Write-Host "  https://git-scm.com/download/win" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "After install, restart Cursor and run:  .\DEPLOY_NOW.ps1" -ForegroundColor Cyan
    exit 1
}

Set-Location $PSScriptRoot

if (-not (Test-Path .git)) {
    Write-Host "Error: .git not found. Open this folder: $PSScriptRoot" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Deploy: staging, commit, push -> GitHub (Vercel will rebuild)" -ForegroundColor Green
Write-Host ""

git status --short

if ($Message) {
    $commitMessage = $Message
} elseif ($NonInteractive) {
    $commitMessage = "Site update - $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
} else {
    Write-Host ""
    $commitMessage = Read-Host "Commit message (Enter for default)"
    if ([string]::IsNullOrWhiteSpace($commitMessage)) {
        $commitMessage = "Update website - $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
    }
}

git add -A
$staged = git diff --cached --name-only
if (-not $staged) {
    Write-Host ""
    Write-Host "Nothing new to commit. If the live site is still old, try:" -ForegroundColor Yellow
    Write-Host "  git push origin main" -ForegroundColor White
    Write-Host ""
    git push origin main
    exit $LASTEXITCODE
}

git commit -m $commitMessage
if ($LASTEXITCODE -ne 0) {
    Write-Host "Commit failed (maybe nothing changed or hook error)." -ForegroundColor Red
    exit $LASTEXITCODE
}

Write-Host ""
Write-Host "Pushing to origin main..." -ForegroundColor Cyan
git push origin main
if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "Push failed. Sign in to GitHub (browser or token) and try again." -ForegroundColor Red
    exit $LASTEXITCODE
}

Write-Host ""
Write-Host "Done. Vercel should deploy in 1-3 minutes." -ForegroundColor Green
Write-Host "  https://andreilucian.com  |  hard refresh: Ctrl+F5" -ForegroundColor Cyan
Write-Host ""
