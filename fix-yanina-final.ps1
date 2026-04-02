# Final fix for Yanina video - rename and re-encode with ultra-compatible settings
Write-Host "Final fix for Yanina video..." -ForegroundColor Cyan
Write-Host ""

$ffmpegPath = "C:\Users\Ted Bundy\ffmpeg\ffmpeg-8.0.1-essentials_build\bin\ffmpeg.exe"
$videoDir = "d:\Website\assets\images\video testimonial"
$inputFile = Join-Path $videoDir "Yanina - Ghostwriter.mp4"
$outputFile = Join-Path $videoDir "Yanina-Ghostwriter.mp4"  # No spaces!
$backupFile = Join-Path $videoDir "Yanina - Ghostwriter-backup-final.mp4"

# Create backup
if (Test-Path $inputFile) {
    Copy-Item $inputFile $backupFile -Force
    Write-Host "Backup created." -ForegroundColor Green
}

Write-Host "Re-encoding with ultra-compatible mobile settings..." -ForegroundColor Yellow
Write-Host ""

# Ultra-compatible mobile settings - match working videos exactly
$ffmpegArgs = @(
    "-i", "`"$inputFile`"",
    # Video - ultra compatible
    "-c:v", "libx264",
    "-profile:v", "baseline",
    "-level", "3.0",                    # Level 3.0 (most compatible)
    "-pix_fmt", "yuv420p",
    "-crf", "28",                       # Good compression
    "-preset", "fast",                  # Faster encoding
    "-vf", "scale=720:1280:flags=lanczos",  # 720p with good scaling
    "-r", "30",                         # 30fps
    "-g", "30",                         # GOP size
    "-keyint_min", "15",
    "-sc_threshold", "0",
    "-bf", "0",                         # No B-frames for maximum compatibility
    "-refs", "1",                       # Single reference frame
    # Audio - standard
    "-c:a", "aac",
    "-b:a", "128k",
    "-ar", "48000",                     # 48kHz (standard)
    "-ac", "1",                         # Mono (like original)
    # Container optimizations
    "-movflags", "+faststart",
    "-brand", "isom",
    "-f", "mp4",
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
        
        $newSize = (Get-Item $outputFile).Length / 1MB
        Write-Host "New file size: $([math]::Round($newSize, 2)) MB" -ForegroundColor Cyan
        Write-Host "File name: Yanina-Ghostwriter.mp4 (no spaces)" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "Now updating HTML to use the new filename..." -ForegroundColor Yellow
        
        # Update HTML file
        $htmlFile = "d:\Website\ghostwriting.html"
        $htmlContent = Get-Content $htmlFile -Raw
        
        # Replace the video source
        $htmlContent = $htmlContent -replace 'assets/images/video testimonial/Yanina - Ghostwriter\.mp4', 'assets/images/video testimonial/Yanina-Ghostwriter.mp4'
        $htmlContent = $htmlContent -replace 'assets/images/video%20testimonial/Yanina%20-%20Ghostwriter\.mp4', 'assets/images/video testimonial/Yanina-Ghostwriter.mp4'
        
        Set-Content -Path $htmlFile -Value $htmlContent -NoNewline
        
        Write-Host ""
        Write-Host "Done! Video renamed and HTML updated." -ForegroundColor Green
        Write-Host "The video should now work on mobile!" -ForegroundColor Green
    } else {
        Write-Host "Re-encoding failed. Error code: $LASTEXITCODE" -ForegroundColor Red
    }
} catch {
    Write-Host "Error: $_" -ForegroundColor Red
}

Write-Host ""
pause

























