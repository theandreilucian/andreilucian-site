# Re-encode All Videos for Mobile Compatibility

## Quick Method: Use Online Converter (Easiest - No Software)

### Option 1: CloudConvert (Recommended)

1. **Go to**: https://cloudconvert.com/mp4-to-mp4
2. **Upload each video** from `assets/images/video testimonial/`:
   - Cristi Ghidu testimonial.mp4
   - Kardan testimonial .mp4
   - f02cbb1b-71b5-4529-bcc2-5ccdad7ccb1f_XBnSYEoi.mp4
   - VID_20251117_144649.mp4
3. **Click "Show advanced options"** for each video
4. **Set these settings**:
   - **Video Codec**: H.264
   - **Video Profile**: Baseline
   - **Video Quality**: Medium (or High)
   - **Audio Codec**: AAC
   - **Audio Bitrate**: 128k
5. **Click "Convert"** for each video
6. **Download** the converted files
7. **Replace** the original files in `assets/images/video testimonial/`

---

## Method 2: Use FFmpeg (If Installed)

### Install FFmpeg (if not installed)

1. **Download**: https://ffmpeg.org/download.html
2. **Windows**: Download the Windows build and add to PATH
3. **Or use**: https://www.gyan.dev/ffmpeg/builds/ (pre-built Windows binaries)

### Run the Conversion Script

1. **Double-click**: `convert-all-videos.bat`
2. **Wait** for all videos to convert
3. **Done!** Videos are now mobile-compatible

### Or Convert Manually

Open PowerShell in the video folder and run for each video:

```powershell
cd "assets\images\video testimonial"

# Convert each video
ffmpeg -i "Cristi Ghidu testimonial.mp4" -c:v libx264 -profile:v baseline -level 3.0 -pix_fmt yuv420p -preset medium -crf 23 -c:a aac -b:a 128k -movflags +faststart "Cristi Ghidu testimonial_mobile.mp4"

ffmpeg -i "Kardan testimonial .mp4" -c:v libx264 -profile:v baseline -level 3.0 -pix_fmt yuv420p -preset medium -crf 23 -c:a aac -b:a 128k -movflags +faststart "Kardan testimonial _mobile.mp4"

ffmpeg -i "f02cbb1b-71b5-4529-bcc2-5ccdad7ccb1f_XBnSYEoi.mp4" -c:v libx264 -profile:v baseline -level 3.0 -pix_fmt yuv420p -preset medium -crf 23 -c:a aac -b:a 128k -movflags +faststart "f02cbb1b-71b5-4529-bcc2-5ccdad7ccb1f_XBnSYEoi_mobile.mp4"

ffmpeg -i "VID_20251117_144649.mp4" -c:v libx264 -profile:v baseline -level 3.0 -pix_fmt yuv420p -preset medium -crf 23 -c:a aac -b:a 128k -movflags +faststart "VID_20251117_144649_mobile.mp4"
```

Then replace the original files with the `_mobile.mp4` versions.

---

## Method 3: Use HandBrake (Desktop App)

1. **Download HandBrake**: https://handbrake.fr/ (Free)
2. **Open HandBrake**
3. For each video:
   - Click "Open Source" → Select video file
   - Choose Preset: **"Fast 1080p30"** or **"Fast 720p30"**
   - **Important**: In Video tab, set:
     - Encoder: H.264 (x264)
     - Profile: Baseline
     - Level: 3.0
   - Click "Start Encode"
   - Replace original file with converted version

---

## What These Settings Do

- **H.264 Baseline Profile**: Maximum mobile compatibility
- **Level 3.0**: Works on all mobile devices
- **yuv420p**: Standard color format for mobile
- **AAC Audio**: Universal mobile audio support
- **faststart**: Allows video to start playing while downloading

---

## After Converting

1. **Test on mobile device** - videos should now play
2. **Commit the new video files** to git
3. **Push to deploy** - videos will work on your live site

---

## File Size Note

The converted videos might be slightly larger or smaller depending on the original encoding. This is normal. The important thing is they'll work on mobile!

