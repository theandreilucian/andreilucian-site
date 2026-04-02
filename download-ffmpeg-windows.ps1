# Download FFmpeg Windows Build
Write-Host "Downloading FFmpeg for Windows..." -ForegroundColor Cyan
Write-Host ""

$downloadUrl = "https://www.gyan.dev/ffmpeg/builds/ffmpeg-release-essentials.zip"
$downloadPath = "$env:TEMP\ffmpeg-essentials.zip"
$extractPath = "$env:USERPROFILE\ffmpeg"

try {
    Write-Host "Downloading FFmpeg (this may take a few minutes)..." -ForegroundColor Yellow
    $ProgressPreference = 'SilentlyContinue'
    Invoke-WebRequest -Uri $downloadUrl -OutFile $downloadPath
    
    Write-Host "Extracting FFmpeg..." -ForegroundColor Yellow
    
    # Create extract directory
    if (Test-Path $extractPath) {
        Remove-Item $extractPath -Recurse -Force
    }
    New-Item -ItemType Directory -Path $extractPath -Force | Out-Null
    
    # Extract
    Expand-Archive -Path $downloadPath -DestinationPath $extractPath -Force
    
    # Find the actual folder (it might be nested)
    $ffmpegFolder = Get-ChildItem -Path $extractPath -Directory | Where-Object { $_.Name -like "*ffmpeg*" } | Select-Object -First 1
    
    if ($ffmpegFolder) {
        $ffmpegExe = Join-Path $ffmpegFolder.FullName "bin\ffmpeg.exe"
        if (Test-Path $ffmpegExe) {
            Write-Host ""
            Write-Host "========================================" -ForegroundColor Green
            Write-Host "FFmpeg installed successfully!" -ForegroundColor Green
            Write-Host "========================================" -ForegroundColor Green
            Write-Host ""
            Write-Host "Location: $ffmpegExe" -ForegroundColor Cyan
            Write-Host ""
            Write-Host "Now compressing Yanina video..." -ForegroundColor Yellow
            Write-Host ""
            
            # Now compress the video
            $videoDir = Join-Path $PSScriptRoot "assets\images\video testimonial"
            $inputFile = Join-Path $videoDir "Yanina - Ghostwriter.mp4"
            $backupFile = Join-Path $videoDir "Yanina - Ghostwriter-original.mp4"
            $outputFile = Join-Path $videoDir "Yanina - Ghostwriter-compressed.mp4"
            
            if (Test-Path $inputFile) {
                # Backup
                if (-not (Test-Path $backupFile)) {
                    Copy-Item $inputFile $backupFile -Force
                    Write-Host "Backup created." -ForegroundColor Green
                }
                
                # Compress
                Write-Host "Compressing video (this will take a few minutes)..." -ForegroundColor Yellow
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
                
                & $ffmpegExe $ffmpegArgs
                
                if ($LASTEXITCODE -eq 0) {
                    Write-Host ""
                    Write-Host "========================================" -ForegroundColor Green
                    Write-Host "Video compressed successfully!" -ForegroundColor Green
                    Write-Host "========================================" -ForegroundColor Green
                    
                    $originalSize = (Get-Item $backupFile).Length / 1MB
                    $compressedSize = (Get-Item $outputFile).Length / 1MB
                    
                    Write-Host ""
                    Write-Host "Original: $([math]::Round($originalSize, 2)) MB" -ForegroundColor Cyan
                    Write-Host "Compressed: $([math]::Round($compressedSize, 2)) MB" -ForegroundColor Cyan
                    Write-Host ""
                    
                    # Replace original
                    Remove-Item $inputFile -Force
                    Rename-Item $outputFile "Yanina - Ghostwriter.mp4"
                    
                    Write-Host "Done! Video should now work on mobile!" -ForegroundColor Green
                } else {
                    Write-Host "Compression failed. Error code: $LASTEXITCODE" -ForegroundColor Red
                }
            } else {
                Write-Host "Video file not found at: $inputFile" -ForegroundColor Red
            }
        } else {
            Write-Host "FFmpeg.exe not found after extraction!" -ForegroundColor Red
        }
    } else {
        Write-Host "Could not find FFmpeg folder after extraction!" -ForegroundColor Red
    }
    
    # Cleanup
    Remove-Item $downloadPath -Force -ErrorAction SilentlyContinue
    
} catch {
    Write-Host "Error: $_" -ForegroundColor Red
    Write-Host ""
    Write-Host "You can manually download FFmpeg from:" -ForegroundColor Yellow
    Write-Host "https://www.gyan.dev/ffmpeg/builds/ffmpeg-release-essentials.zip" -ForegroundColor Cyan
}

Write-Host ""
pause

























