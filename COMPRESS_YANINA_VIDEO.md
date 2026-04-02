# How to Fix Yanina Video for Mobile

## Problem
The Yanina video file is **101 MB**, which is too large for mobile browsers. The other videos are only 5-16 MB and work fine.

## Solution: Re-encode the Video

You need to compress the Yanina video to a smaller file size (ideally under 20 MB).

### Option 1: Using FFmpeg (Recommended)

1. Download FFmpeg from: https://ffmpeg.org/download.html
2. Open Command Prompt in the video folder
3. Run this command:

```bash
ffmpeg -i "Yanina - Ghostwriter.mp4" -c:v libx264 -crf 28 -preset slow -c:a aac -b:a 128k -movflags +faststart "Yanina - Ghostwriter-compressed.mp4"
```

This will:
- Reduce file size significantly (should get it under 20 MB)
- Maintain good quality
- Make it mobile-friendly

### Option 2: Using HandBrake (Easier, GUI)

1. Download HandBrake: https://handbrake.fr/
2. Open the Yanina video
3. Use these settings:
   - Preset: "Fast 1080p30" or "Fast 720p30"
   - Video Codec: H.264
   - Quality: RF 28 (or adjust to get file size under 20 MB)
   - Audio: AAC, 128 kbps
4. Start encoding

### Option 3: Online Tools

Use online video compressors like:
- CloudConvert: https://cloudconvert.com/mp4-compressor
- FreeConvert: https://www.freeconvert.com/video-compressor

Upload the video and compress it to under 20 MB.

## After Compression

1. Replace the original file with the compressed version
2. Or rename the compressed file to "Yanina - Ghostwriter.mp4"
3. Test on mobile - it should work now!

## Current File Sizes for Reference:
- Cristi: 16.5 MB ✅
- Kardan: 5.5 MB ✅
- Darius: 6.2 MB ✅
- Yanina: **101 MB** ❌ (needs compression)

























