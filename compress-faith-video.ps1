# Compress Faith Video for Mobile
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Compress Faith Video for Mobile" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$videoDir = Join-Path $PSScriptRoot "assets\images\video testimonial"
$inputFile = Join-Path $videoDir "Faith testimonial.mp4"
$backupFile = Join-Path $videoDir "Faith testimonial-original.mp4"
$outputFile = Join-Path $videoDir "Faith testimonial-compressed.mp4"

# Check if video exists
if (-not (Test-Path $inputFile)) {
    Write-Host "ERROR: Video file not found!" -ForegroundColor Red
    Write-Host "Expected location: $inputFile" -ForegroundColor Yellow
    pause
    exit 1
}

# Check for FFmpeg
$ffmpegExe = $null

# First, check if FFmpeg is in PATH
try {
    $null = Get-Command ffmpeg -ErrorAction Stop
    $ffmpegExe = "ffmpeg"
    Write-Host "FFmpeg found in PATH." -ForegroundColor Green
} catch {
    # Check common installation locations
    $possiblePaths = @(
        "$env:USERPROFILE\ffmpeg\bin\ffmpeg.exe",
        "$env:ProgramFiles\ffmpeg\bin\ffmpeg.exe",
        "$env:ProgramFiles(x86)\ffmpeg\bin\ffmpeg.exe",
        "C:\ffmpeg\bin\ffmpeg.exe"
    )
    
    foreach ($path in $possiblePaths) {
        if (Test-Path $path) {
            $ffmpegExe = $path
            Write-Host "FFmpeg found at: $path" -ForegroundColor Green
            break
        }
    }
    
    if (-not $ffmpegExe) {
        Write-Host "FFmpeg not found. Downloading and installing..." -ForegroundColor Yellow
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
                    Write-Host "FFmpeg installed successfully!" -ForegroundColor Green
                    Write-Host "Location: $ffmpegExe" -ForegroundColor Cyan
                } else {
                    Write-Host "FFmpeg.exe not found after extraction!" -ForegroundColor Red
                    pause
                    exit 1
                }
            } else {
                Write-Host "Could not find FFmpeg folder after extraction!" -ForegroundColor Red
                pause
                exit 1
            }
            
            # Cleanup
            Remove-Item $downloadPath -Force -ErrorAction SilentlyContinue
            
        } catch {
            Write-Host "Error downloading FFmpeg: $_" -ForegroundColor Red
            Write-Host ""
            Write-Host "You can manually download FFmpeg from:" -ForegroundColor Yellow
            Write-Host "https://www.gyan.dev/ffmpeg/builds/ffmpeg-release-essentials.zip" -ForegroundColor Cyan
            pause
            exit 1
        }
    }
}

# Backup original
Write-Host ""
Write-Host "Creating backup of original file..." -ForegroundColor Yellow
if (-not (Test-Path $backupFile)) {
    Copy-Item $inputFile $backupFile -Force
    Write-Host "Backup created." -ForegroundColor Green
} else {
    Write-Host "Backup already exists, skipping..." -ForegroundColor Cyan
}

# Get original size
$originalSize = (Get-Item $inputFile).Length / 1MB
Write-Host ""
Write-Host "Original file size: $([math]::Round($originalSize, 2)) MB" -ForegroundColor Cyan
Write-Host ""

# Compress video
Write-Host "Compressing video for mobile compatibility..." -ForegroundColor Yellow
Write-Host "This will optimize the video for mobile playback." -ForegroundColor Yellow
Write-Host "This may take a few minutes..." -ForegroundColor Yellow
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

& $ffmpegExe $ffmpegArgs

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "Compression successful!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    
    $compressedSize = (Get-Item $outputFile).Length / 1MB
    
    Write-Host "Original: $([math]::Round($originalSize, 2)) MB" -ForegroundColor Cyan
    Write-Host "Compressed: $([math]::Round($compressedSize, 2)) MB" -ForegroundColor Cyan
    Write-Host "Size reduction: $([math]::Round($originalSize - $compressedSize, 2)) MB" -ForegroundColor Green
    Write-Host ""
    
    # Replace original
    Write-Host "Replacing original with compressed version..." -ForegroundColor Yellow
    Remove-Item $inputFile -Force
    Rename-Item $outputFile "Faith testimonial.mp4"
    
    Write-Host ""
    Write-Host "Done! The video should now work on mobile devices." -ForegroundColor Green
    Write-Host "The video has been optimized for mobile playback." -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "Compression failed!" -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "Error code: $LASTEXITCODE" -ForegroundColor Red
    Write-Host "Original file is still intact." -ForegroundColor Yellow
}

Write-Host ""
pause

