# Re-encode Yanina video with mobile-optimized settings
Write-Host "Re-encoding Yanina video for mobile compatibility..." -ForegroundColor Cyan
Write-Host ""

$ffmpegPath = "C:\Users\Ted Bundy\ffmpeg\ffmpeg-8.0.1-essentials_build\bin\ffmpeg.exe"
$videoDir = "d:\Website\assets\images\video testimonial"
$inputFile = Join-Path $videoDir "Yanina - Ghostwriter.mp4"
$outputFile = Join-Path $videoDir "Yanina - Ghostwriter-mobile.mp4"
$backupFile = Join-Path $videoDir "Yanina - Ghostwriter-backup2.mp4"

# Create backup
if (Test-Path $inputFile) {
    Copy-Item $inputFile $backupFile -Force
    Write-Host "Backup created." -ForegroundColor Green
}

Write-Host "Re-encoding with mobile-optimized settings..." -ForegroundColor Yellow
Write-Host "This will create a smaller, more compatible file..." -ForegroundColor Yellow
Write-Host ""

# Mobile-optimized encoding settings
$ffmpegArgs = @(
    "-i", "`"$inputFile`"",
    # Video codec settings - very mobile-friendly
    "-c:v", "libx264",
    "-profile:v", "baseline",           # Baseline profile for maximum compatibility
    "-level", "3.1",                    # Level 3.1 for better mobile support
    "-pix_fmt", "yuv420p",              # Standard pixel format
    "-crf", "23",                       # Better quality (lower number = better)
    "-preset", "medium",                # Balance between speed and compression
    "-vf", "scale=720:1280",            # Scale to 720p (mobile-friendly resolution)
    "-r", "30",                         # Frame rate 30fps
    "-g", "60",                         # GOP size
    "-keyint_min", "30",
    "-sc_threshold", "0",
    # Audio settings
    "-c:a", "aac",
    "-b:a", "128k",
    "-ar", "44100",                     # Standard audio sample rate
    "-ac", "2",                         # Stereo audio
    # Mobile streaming optimizations
    "-movflags", "+faststart",          # Enable fast start for streaming
    "-brand", "isom",                   # ISO Media brand
    "-y",
    "`"$outputFile`""
)

try {
    & $ffmpegPath $ffmpegArgs
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "========================================" -ForegroundColor Green
        Write-Host "Re-encoding successful!" -ForegroundColor Green
        Write-Host "========================================" -ForegroundColor Green
        Write-Host ""
        
        # Get file sizes
        $originalSize = (Get-Item $backupFile).Length / 1MB
        $newSize = (Get-Item $outputFile).Length / 1MB
        
        Write-Host "Original: $([math]::Round($originalSize, 2)) MB" -ForegroundColor Cyan
        Write-Host "New size: $([math]::Round($newSize, 2)) MB" -ForegroundColor Cyan
        Write-Host ""
        
        # Replace original
        Write-Host "Replacing original file..." -ForegroundColor Yellow
        Remove-Item $inputFile -Force
        Rename-Item $outputFile "Yanina - Ghostwriter.mp4"
        
        Write-Host ""
        Write-Host "Done! Video is now optimized for mobile!" -ForegroundColor Green
        Write-Host "Test it on your mobile device now." -ForegroundColor Green
    } else {
        Write-Host "Re-encoding failed. Error code: $LASTEXITCODE" -ForegroundColor Red
    }
} catch {
    Write-Host "Error: $_" -ForegroundColor Red
}

Write-Host ""
pause

