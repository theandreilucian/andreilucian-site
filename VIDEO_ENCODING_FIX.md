# How to Fix Video Encoding for Mobile Compatibility

## Problem
The video file `VID_20251117_144649.mp4` (Yanina Alvarez testimonial) is not playing on mobile devices because it's likely encoded in a format that mobile browsers don't support.

## Solution: Re-encode the Video

You need to re-encode the video file with **H.264 codec** which is the most compatible format for mobile browsers.

### Option 1: Using FFmpeg (Recommended - Free)

1. **Download FFmpeg**: https://ffmpeg.org/download.html
2. **Open Command Prompt/Terminal** in the folder containing your video
3. **Run this command**:

```bash
ffmpeg -i "VID_20251117_144649.mp4" -c:v libx264 -profile:v baseline -level 3.0 -pix_fmt yuv420p -c:a aac -b:a 128k -movflags +faststart "VID_20251117_144649_mobile.mp4"
```

**What this does:**
- `-c:v libx264`: Uses H.264 video codec (mobile-compatible)
- `-profile:v baseline`: Uses baseline profile (most compatible)
- `-level 3.0`: Sets H.264 level for compatibility
- `-pix_fmt yuv420p`: Ensures color format is compatible
- `-c:a aac`: Uses AAC audio codec
- `-b:a 128k`: Sets audio bitrate
- `-movflags +faststart`: Allows video to start playing before fully downloaded

4. **Replace the original file** with the new one, or update the HTML to use the new filename

### Option 2: Using Online Tools

1. **HandBrake** (Free Desktop App): https://handbrake.fr/
   - Open the video
   - Preset: "Fast 1080p30" or "Fast 720p30"
   - Video Codec: H.264 (x264)
   - Encoder Preset: Fast or Medium
   - Click "Start Encode"

2. **CloudConvert** (Online): https://cloudconvert.com/
   - Upload your video
   - Format: MP4
   - Video Codec: H.264
   - Download and replace

### Option 3: Using VLC Media Player (Free)

1. Open VLC
2. Media → Convert/Save
3. Add your video file
4. Click Convert/Save
5. Profile: "Video - H.264 + MP3 (MP4)"
6. Click Start

## After Re-encoding

1. Replace the file: `assets/images/video testimonial/VID_20251117_144649.mp4`
2. Test on mobile device
3. The video should now play correctly

## Quick Test Command (FFmpeg)

To check if your video is mobile-compatible, run:
```bash
ffmpeg -i "VID_20251117_144649.mp4" 2>&1 | findstr "Video:"
```

Look for "h264" in the output. If you see "hevc" or "h265", that's why it's not working on mobile.


















