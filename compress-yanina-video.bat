@echo off
echo ========================================
echo Compress Yanina Video for Mobile
echo ========================================
echo.
echo The Yanina video is 101 MB - too large for mobile!
echo This script will compress it to a smaller size.
echo.
echo Make sure FFmpeg is installed and in your PATH.
echo Download FFmpeg from: https://ffmpeg.org/download.html
echo.
pause

cd /d "%~dp0assets\images\video testimonial"

if not exist "Yanina - Ghostwriter.mp4" (
    echo ERROR: Video file not found!
    echo Expected location: assets\images\video testimonial\Yanina - Ghostwriter.mp4
    pause
    exit /b 1
)

echo Creating backup of original file...
copy /y "Yanina - Ghostwriter.mp4" "Yanina - Ghostwriter-original.mp4"

echo.
echo Compressing video for mobile compatibility...
echo This will reduce file size from ~101 MB to ~15-20 MB
echo.

ffmpeg -i "Yanina - Ghostwriter-original.mp4" ^
    -c:v libx264 ^
    -crf 28 ^
    -preset slow ^
    -profile:v baseline ^
    -level 3.0 ^
    -pix_fmt yuv420p ^
    -c:a aac ^
    -b:a 128k ^
    -movflags +faststart ^
    -y ^
    "Yanina - Ghostwriter-compressed.mp4"

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo Compression successful!
    echo ========================================
    echo.
    echo Original file backed up as: Yanina - Ghostwriter-original.mp4
    echo.
    echo Replacing original with compressed version...
    del /f "Yanina - Ghostwriter.mp4"
    ren "Yanina - Ghostwriter-compressed.mp4" "Yanina - Ghostwriter.mp4"
    echo.
    echo Done! The video should now work on mobile devices.
    echo File size should be much smaller now.
) else (
    echo.
    echo ========================================
    echo Compression failed!
    echo ========================================
    echo.
    echo Make sure FFmpeg is installed and accessible.
    echo Download from: https://ffmpeg.org/download.html
    echo.
    echo Original file is still intact.
)

echo.
pause

















