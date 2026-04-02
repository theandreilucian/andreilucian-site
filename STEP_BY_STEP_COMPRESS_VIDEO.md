# Step-by-Step: Compress Yanina Video for Mobile

## 🎯 Goal
Reduce the Yanina video from 101 MB to under 20 MB so it works on mobile devices.

---

## Method 1: Using HandBrake (EASIEST - Recommended) ✅

### Step 1: Download HandBrake
1. Go to: https://handbrake.fr/downloads.php
2. Click "Download" for Windows
3. Install the program (just click Next, Next, Install)

### Step 2: Open HandBrake
1. Launch HandBrake
2. Click "Open Source" button (top left)
3. Navigate to: `D:\Website\assets\images\video testimonial\`
4. Select: `Yanina - Ghostwriter.mp4`
5. Click "Open"

### Step 3: Choose Preset
1. On the right side, look for "Presets"
2. Click on "Fast 720p30" or "Fast 1080p30"
   - This will automatically set good compression settings

### Step 4: Adjust Settings (Optional)
1. Click the "Video" tab
2. Make sure:
   - Video Codec: H.264 (x264)
   - Framerate: Same as source (or 30)
   - Quality: RF 28 (you can lower to 30 for smaller file, or raise to 26 for better quality)

### Step 5: Set Output Location
1. At the bottom, click "Browse" next to "Save As"
2. Save it as: `Yanina - Ghostwriter-compressed.mp4`
3. Save it in the same folder: `D:\Website\assets\images\video testimonial\`

### Step 6: Start Encoding
1. Click the green "Start Encode" button (top toolbar)
2. Wait for it to finish (will show progress bar)
3. This might take 5-15 minutes depending on your computer

### Step 7: Replace the File
1. Once done, go to: `D:\Website\assets\images\video testimonial\`
2. **Backup the original** (optional but recommended):
   - Rename `Yanina - Ghostwriter.mp4` to `Yanina - Ghostwriter-original.mp4`
3. **Replace with compressed version**:
   - Rename `Yanina - Ghostwriter-compressed.mp4` to `Yanina - Ghostwriter.mp4`

### Step 8: Test
1. Open your website on mobile
2. The Yanina video should now work! ✅

---

## Method 2: Using Online Tool (NO INSTALLATION NEEDED) 🌐

### Step 1: Go to Online Compressor
- Visit: https://www.freeconvert.com/video-compressor
- OR: https://cloudconvert.com/mp4-compressor

### Step 2: Upload Video
1. Click "Choose Files" or "Upload"
2. Navigate to: `D:\Website\assets\images\video testimonial\Yanina - Ghostwriter.mp4`
3. Select and upload

### Step 3: Set Compression
1. Look for quality/size settings
2. Choose "Medium" or "High Compression"
3. Target size: Under 20 MB

### Step 4: Download
1. Click "Compress" or "Convert"
2. Wait for processing
3. Download the compressed file

### Step 5: Replace the File
1. Go to: `D:\Website\assets\images\video testimonial\`
2. **Backup original**: Rename `Yanina - Ghostwriter.mp4` to `Yanina - Ghostwriter-original.mp4`
3. **Replace**: Move the downloaded compressed file to this folder and rename it to `Yanina - Ghostwriter.mp4`

### Step 6: Test
1. Open your website on mobile
2. The Yanina video should now work! ✅

---

## Method 3: Using FFmpeg (ADVANCED) 💻

### Step 1: Install FFmpeg
1. Go to: https://ffmpeg.org/download.html
2. Click "Windows" → "Windows builds from gyan.dev"
3. Download "ffmpeg-release-essentials.zip"
4. Extract it to `C:\ffmpeg\`
5. Add to PATH:
   - Press Windows key, type "Environment Variables"
   - Click "Edit the system environment variables"
   - Click "Environment Variables"
   - Under "System variables", find "Path", click "Edit"
   - Click "New", add: `C:\ffmpeg\bin`
   - Click OK on all windows

### Step 2: Run the Script
1. Go to: `D:\Website\`
2. Double-click: `compress-yanina-video.bat`
3. Follow the prompts
4. Wait for compression to finish

### Step 3: Test
1. Open your website on mobile
2. The Yanina video should now work! ✅

---

## 📊 Expected Results

**Before:**
- File size: 101 MB ❌
- Mobile: Doesn't work ❌

**After:**
- File size: 15-20 MB ✅
- Mobile: Works perfectly ✅

---

## ⚠️ Troubleshooting

**If compression takes too long:**
- Use "Very Fast" preset in HandBrake
- Or use online tool (might be faster)

**If file is still too large:**
- Lower quality to RF 30 in HandBrake
- Or reduce resolution to 720p

**If video quality looks bad:**
- Use RF 26 instead of 28
- Or use "Fast 1080p30" preset

---

## ✅ Quick Checklist

- [ ] Downloaded HandBrake OR chosen online tool
- [ ] Opened/uploaded Yanina video
- [ ] Set compression settings
- [ ] Started compression
- [ ] Backed up original file
- [ ] Replaced with compressed version
- [ ] Tested on mobile - IT WORKS! 🎉

---

**Need help?** The easiest method is **HandBrake** - it's free, has a nice interface, and works great!

























