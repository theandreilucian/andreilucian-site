# PowerShell script to compress Yanina video
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Compressing Yanina Video for Mobile" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Find FFmpeg
$ffmpegPath = $null

# Check common locations
$possiblePaths = @(
    "C:\ffmpeg\bin\ffmpeg.exe",
    "$env:USERPROFILE\ffmpeg\bin\ffmpeg.exe",
    "$env:ProgramFiles\ffmpeg\bin\ffmpeg.exe",
    "$env:ProgramFiles(x86)\ffmpeg\bin\ffmpeg.exe",
    "C:\Program Files\ffmpeg\bin\ffmpeg.exe",
    "C:\Program Files (x86)\ffmpeg\bin\ffmpeg.exe"
)

foreach ($path in $possiblePaths) {
    if (Test-Path $path) {
        $ffmpegPath = $path
        Write-Host "Found FFmpeg at: $ffmpegPath" -ForegroundColor Green
        break
    }
}

# If not found, search in Downloads
if (-not $ffmpegPath) {
    Write-Host "Searching for FFmpeg in Downloads..." -ForegroundColor Yellow
    $found = Get-ChildItem -Path "$env:USERPROFILE\Downloads" -Filter "ffmpeg.exe" -Recurse -ErrorAction SilentlyContinue | Select-Object -First 1
    if ($found) {
        $ffmpegPath = $found.FullName
        Write-Host "Found FFmpeg at: $ffmpegPath" -ForegroundColor Green
    }
}

# If still not found, ask user
if (-not $ffmpegPath) {
    Write-Host "FFmpeg not found automatically." -ForegroundColor Red
    Write-Host ""
    Write-Host "Please provide the full path to ffmpeg.exe" -ForegroundColor Yellow
    Write-Host "Example: C:\ffmpeg\bin\ffmpeg.exe" -ForegroundColor Yellow
    Write-Host "Or: C:\Users\YourName\Downloads\ffmpeg\bin\ffmpeg.exe" -ForegroundColor Yellow
    Write-Host ""
    $userPath = Read-Host "Enter FFmpeg path (or press Enter to exit)"
    
    if ([string]::IsNullOrWhiteSpace($userPath)) {
        Write-Host "Exiting. Please run this script again after installing FFmpeg." -ForegroundColor Yellow
        pause
        exit 1
    }
    
    $ffmpegPath = $userPath
    
    if (-not (Test-Path $ffmpegPath)) {
        Write-Host "Error: FFmpeg not found at that location!" -ForegroundColor Red
        Write-Host "Please make sure FFmpeg is installed and try again." -ForegroundColor Red
        pause
        exit 1
    }
}

# Set video paths
$videoDir = Join-Path $PSScriptRoot "assets\images\video testimonial"
$inputFile = Join-Path $videoDir "Yanina - Ghostwriter.mp4"
$backupFile = Join-Path $videoDir "Yanina - Ghostwriter-original.mp4"
$outputFile = Join-Path $videoDir "Yanina - Ghostwriter-compressed.mp4"

# Check if input file exists
if (-not (Test-Path $inputFile)) {
    Write-Host "Error: Video file not found!" -ForegroundColor Red
    Write-Host "Expected: $inputFile" -ForegroundColor Red
    pause
    exit 1
}

# Create backup
Write-Host ""
Write-Host "Creating backup of original file..." -ForegroundColor Yellow
if (-not (Test-Path $backupFile)) {
    Copy-Item $inputFile $backupFile -Force
    Write-Host "Backup created: $backupFile" -ForegroundColor Green
} else {
    Write-Host "Backup already exists, skipping..." -ForegroundColor Yellow
}

# Compress video
Write-Host ""
Write-Host "Compressing video (this may take a few minutes)..." -ForegroundColor Yellow
Write-Host "This will reduce file size from ~101 MB to ~15-20 MB" -ForegroundColor Yellow
Write-Host ""

$ffmpegArgs = @(
    "-i", "`"$inputFile`"",
    "-c:v", "libx264",
    "-crf", "28",
    "-preset", "slow",
    "-profile:v", "baseline",
    "-level", "3.0",
    "-pix_fmt", "yuv420p",
    "-c:a", "aac",
    "-b:a", "128k",
    "-movflags", "+faststart",
    "-y",
    "`"$outputFile`""
)

try {
    & $ffmpegPath $ffmpegArgs
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "========================================" -ForegroundColor Green
        Write-Host "Compression successful!" -ForegroundColor Green
        Write-Host "========================================" -ForegroundColor Green
        Write-Host ""
        
        # Get file sizes
        $originalSize = (Get-Item $backupFile).Length / 1MB
        $compressedSize = (Get-Item $outputFile).Length / 1MB
        
        Write-Host "Original size: $([math]::Round($originalSize, 2)) MB" -ForegroundColor Cyan
        Write-Host "Compressed size: $([math]::Round($compressedSize, 2)) MB" -ForegroundColor Cyan
        Write-Host ""
        
        # Replace original
        Write-Host "Replacing original file with compressed version..." -ForegroundColor Yellow
        Remove-Item $inputFile -Force
        Rename-Item $outputFile "Yanina - Ghostwriter.mp4"
        
        Write-Host ""
        Write-Host "Done! The video should now work on mobile devices." -ForegroundColor Green
        Write-Host "Test it on your mobile device!" -ForegroundColor Green
    } else {
        Write-Host ""
        Write-Host "Compression failed. Error code: $LASTEXITCODE" -ForegroundColor Red
        Write-Host "Original file is still intact." -ForegroundColor Yellow
    }
} catch {
    Write-Host ""
    Write-Host "Error during compression: $_" -ForegroundColor Red
    Write-Host "Original file is still intact." -ForegroundColor Yellow
}

Write-Host ""
pause

