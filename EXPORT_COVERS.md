# 📸 How to Export Cover Images

## Quick Export Instructions

### Method 1: Browser Screenshot (Easiest)

1. **Open the cover HTML files:**
   - Open `cover-personal-branding.html` in your browser
   - Open `cover-x-growth-system.html` in your browser

2. **Capture screenshot:**
   - **Chrome/Edge:** 
     - Press `F12` to open DevTools
     - Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
     - Type "Capture node screenshot"
     - Select the cover element
   - **Or use browser extension:**
     - Install "GoFullPage" or "Awesome Screenshot"
     - Capture the page and crop to the cover

3. **Save as:**
   - `personal-branding-cover.png` (400x600px)
   - `x-growth-system-cover.png` (400x600px)

---

### Method 2: Online HTML to Image Tool

1. Go to: https://htmlcsstoimage.com
2. Copy the entire HTML content from each cover file
3. Paste into the tool
4. Set dimensions: **400px × 600px**
5. Download as PNG or JPG

---

### Method 3: Print to PDF (Then Convert)

1. Open each cover HTML file in browser
2. Press `Ctrl+P` (or `Cmd+P` on Mac)
3. Select "Save as PDF"
4. Use online PDF to image converter
5. Export each page as PNG (400x600px)

---

### Method 4: Command Line (Advanced)

If you have Node.js installed:

```bash
npm install -g html-to-image-cli
html-to-image cover-personal-branding.html personal-branding-cover.png --width=400 --height=600
html-to-image cover-x-growth-system.html x-growth-system-cover.png --width=400 --height=600
```

---

## Recommended File Names

After exporting, save as:
- `assets/images/personal-branding-cover.png` (or .jpg)
- `assets/images/x-growth-system-cover.png` (or .jpg)

---

## Recommended Image Specs

- **Size:** 400px × 600px (2:3 ratio)
- **Format:** PNG (for transparency) or JPG (for smaller file size)
- **Quality:** High (at least 90% for JPG)
- **File Size:** Under 500KB each

---

## After Exporting

1. Save images to: `assets/images/`
2. Update image paths in:
   - `index.html`
   - `writing-swipe-file.html` (Personal Branding)
   - `x-growth-system.html` (X Growth System)

Need help updating the paths after you export? Just let me know! 🚀

