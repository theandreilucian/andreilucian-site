@echo off
echo ========================================
echo Convert All Videos for Mobile Compatibility
echo ========================================
echo.
echo This script will convert ALL video testimonials
echo to mobile-compatible format using FFmpeg.
echo.
echo Make sure FFmpeg is installed and in your PATH.
echo Download FFmpeg from: https://ffmpeg.org/download.html
echo.
pause

cd /d "%~dp0assets\images\video testimonial"

echo Checking for FFmpeg...
ffmpeg -version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: FFmpeg is not installed or not in PATH!
    echo.
    echo Please install FFmpeg from: https://ffmpeg.org/download.html
    echo Or use the online method in QUICK_VIDEO_FIX.md
    pause
    exit /b 1
)

echo FFmpeg found! Starting conversion...
echo.

set "videos[0]=Cristi Ghidu testimonial.mp4"
set "videos[1]=Kardan testimonial .mp4"
set "videos[2]=f02cbb1b-71b5-4529-bcc2-5ccdad7ccb1f_XBnSYEoi.mp4"
set "videos[3]=VID_20251117_144649.mp4"

set count=0
:loop
if %count% geq 4 goto done

call set "video=%%videos[%count%]%%"

if exist "%video%" (
    echo ========================================
    echo Converting: %video%
    echo ========================================
    echo.
    
    REM Create backup
    if not exist "%video%.backup" (
        copy "%video%" "%video%.backup" >nul
        echo Backup created: %video%.backup
    )
    
    REM Convert to mobile-compatible format
    ffmpeg -i "%video%" ^
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
        "%video%.temp"
    
    if %errorlevel% equ 0 (
        move /y "%video%.temp" "%video%" >nul
        echo ✓ Successfully converted: %video%
        echo.
    ) else (
        echo ✗ Failed to convert: %video%
        echo.
        if exist "%video%.temp" del "%video%.temp"
    )
) else (
    echo ⚠ File not found: %video%
    echo.
)

set /a count+=1
goto loop

:done
echo ========================================
echo Conversion Complete!
echo ========================================
echo.
echo All videos have been converted for mobile compatibility.
echo Original files backed up with .backup extension.
echo.
echo Test the videos on your mobile device now!
echo.
pause

