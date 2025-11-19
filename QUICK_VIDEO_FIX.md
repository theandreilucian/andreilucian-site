# Quick Fix for Yanina Video on Mobile

## The Problem
The video file `VID_20251117_144649.mp4` is encoded in a format that mobile browsers don't support.

## Easiest Solution (No Software Needed)

### Use CloudConvert (Online - 2 minutes)

1. **Go to**: https://cloudconvert.com/mp4-to-mp4
2. **Upload** your video: `assets/images/video testimonial/VID_20251117_144649.mp4`
3. **Click "Show advanced options"**
4. **Set these settings**:
   - **Video Codec**: H.264
   - **Video Quality**: Medium (or High)
   - **Audio Codec**: AAC
   - **Audio Bitrate**: 128k
5. **Click "Convert"**
6. **Download** the converted file
7. **Replace** the original file in `assets/images/video testimonial/`

**That's it!** The video will now work on mobile.

---

## Alternative: Use HandBrake (Desktop App)

1. **Download HandBrake**: https://handbrake.fr/ (Free)
2. **Open HandBrake**
3. **Click "Open Source"** → Select `VID_20251117_144649.mp4`
4. **Choose Preset**: "Fast 1080p30" or "Fast 720p30"
5. **Click "Start Encode"**
6. **Replace** the original file

---

## If You Have FFmpeg Installed

Run the `convert-video.bat` script in the website root folder, or use this command:

```bash
cd "assets\images\video testimonial"
ffmpeg -i "VID_20251117_144649.mp4" -c:v libx264 -profile:v baseline -level 3.0 -pix_fmt yuv420p -c:a aac -b:a 128k -movflags +faststart "VID_20251117_144649.mp4"
```

---

## After Converting

1. Test the video on your mobile device
2. It should now play correctly
3. The fallback message will disappear automatically

