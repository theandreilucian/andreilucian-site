@echo off
echo ========================================
echo Compress Faith Video for Mobile
echo ========================================
echo.
echo This script will compress Faith's video for mobile compatibility.
echo.
echo Make sure FFmpeg is installed and in your PATH.
echo Download FFmpeg from: https://ffmpeg.org/download.html
echo.
pause

cd /d "%~dp0assets\images\video testimonial"

if not exist "Faith testimonial.mp4" (
    echo ERROR: Video file not found!
    echo Expected location: assets\images\video testimonial\Faith testimonial.mp4
    pause
    exit /b 1
)

echo Creating backup of original file...
copy /y "Faith testimonial.mp4" "Faith testimonial-original.mp4"

echo.
echo Compressing video for mobile compatibility...
echo This will optimize the video for mobile playback.
echo.

ffmpeg -i "Faith testimonial-original.mp4" ^
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
    "Faith testimonial-compressed.mp4"

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo Compression successful!
    echo ========================================
    echo.
    echo Original file backed up as: Faith testimonial-original.mp4
    echo.
    echo Replacing original with compressed version...
    del /f "Faith testimonial.mp4"
    ren "Faith testimonial-compressed.mp4" "Faith testimonial.mp4"
    echo.
    echo Done! The video should now work on mobile devices.
    echo The video has been optimized for mobile playback.
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

