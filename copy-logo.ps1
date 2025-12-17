# Script to copy logo image to assets/images/logo.png
param(
    [Parameter(Mandatory=$true)]
    [string]$ImagePath
)

$targetPath = "assets\images\logo.png"

# Check if source file exists
if (-not (Test-Path $ImagePath)) {
    Write-Host "Error: Image file not found at: $ImagePath" -ForegroundColor Red
    exit 1
}

# Create target directory if it doesn't exist
$targetDir = Split-Path -Parent $targetPath
if (-not (Test-Path $targetDir)) {
    New-Item -ItemType Directory -Path $targetDir -Force | Out-Null
}

# Copy the file
Copy-Item -Path $ImagePath -Destination $targetPath -Force

Write-Host "Successfully copied image to: $targetPath" -ForegroundColor Green
Write-Host "Your website will now use this logo!" -ForegroundColor Green



