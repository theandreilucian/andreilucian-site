@echo off
echo ========================================
echo Video Conversion Script for Mobile
echo ========================================
echo.
echo This script will convert VID_20251117_144649.mp4
echo to a mobile-compatible format using FFmpeg.
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

echo Converting video for mobile compatibility...
echo.

ffmpeg -i "VID_20251117_144649.mp4" ^
    -c:v libx264 ^
    -profile:v baseline ^
    -level 3.0 ^
    -pix_fmt yuv420p ^
    -c:a aac ^
    -b:a 128k ^
    -movflags +faststart ^
    -y ^
    "VID_20251117_144649_mobile.mp4"

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo Conversion successful!
    echo ========================================
    echo.
    echo Backup created: VID_20251117_144649_original.mp4
    echo New mobile-compatible file: VID_20251117_144649_mobile.mp4
    echo.
    echo Now replacing original file...
    move /y "VID_20251117_144649.mp4" "VID_20251117_144649_original.mp4"
    move /y "VID_20251117_144649_mobile.mp4" "VID_20251117_144649.mp4"
    echo.
    echo Done! The video should now work on mobile devices.
) else (
    echo.
    echo ========================================
    echo Conversion failed!
    echo ========================================
    echo.
    echo Make sure FFmpeg is installed and accessible.
    echo Download from: https://ffmpeg.org/download.html
)

echo.
pause

