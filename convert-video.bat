@echo off
echo ========================================
echo Convert Yanina Video for Mobile
echo ========================================
echo.
echo This script will convert VID_20251117_144649.mp4
echo (Yanina's video) to a mobile-compatible format.
echo.
echo Make sure FFmpeg is installed and in your PATH.
echo Download FFmpeg from: https://ffmpeg.org/download.html
echo.
pause

cd /d "%~dp0assets\images\video testimonial"

if not exist "VID_20251117_144649.mp4" (
    echo ERROR: Video file not found!
    echo Expected location: assets\images\video testimonial\VID_20251117_144649.mp4
    pause
    exit /b 1
)

echo Converting Yanina's video for mobile compatibility...
echo.

REM Create backup first
if not exist "VID_20251117_144649.mp4.backup" (
    copy "VID_20251117_144649.mp4" "VID_20251117_144649.mp4.backup" >nul
    echo Backup created: VID_20251117_144649.mp4.backup
    echo.
)

REM Convert to mobile-compatible format
ffmpeg -i "VID_20251117_144649.mp4" ^
    -c:v libx264 ^
    -profile:v baseline ^
    -level 3.0 ^
    -pix_fmt yuv420p ^
    -preset medium ^
    -crf 23 ^
    -c:a aac ^
    -b:a 128k ^
    -movflags +faststart ^
    -y ^
    "VID_20251117_144649_temp.mp4"

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo Conversion successful!
    echo ========================================
    echo.
    echo Replacing original file...
    move /y "VID_20251117_144649_temp.mp4" "VID_20251117_144649.mp4" >nul
    echo.
    echo Done! Yanina's video should now work on mobile devices.
    echo Original backed up as: VID_20251117_144649.mp4.backup
) else (
    echo.
    echo ========================================
    echo Conversion failed!
    echo ========================================
    echo.
    echo Make sure FFmpeg is installed and accessible.
    echo Download from: https://ffmpeg.org/download.html
    if exist "VID_20251117_144649_temp.mp4" del "VID_20251117_144649_temp.mp4"
)

echo.
pause





