# LinkedIn Banner Setup Instructions

## ✅ Banner Created with Black, White, and Turquoise Background

The LinkedIn banner has been updated with:
- ✅ Gradient background using **black**, **white**, and **turquoise** colors
- ✅ Profile picture placeholder (needs your actual photo)
- ✅ All text and icons maintained
- ✅ Turquoise arrows matching the color scheme

## 📸 Add Your Profile Picture

To complete the banner, you need to add your profile picture:

1. **Save your profile picture** as: `assets/images/profile-picture.jpg`
   - Recommended size: 480x480px (square)
   - Formats: JPG, PNG, or SVG
   - Make sure it's a clear headshot

2. **Alternative:** If your profile picture has a different name:
   - Open `assets/images/banner-linkedin-header.svg`
   - Find this line (around line 30):
     ```xml
     href="assets/images/profile-picture.jpg"
     ```
   - Replace `profile-picture.jpg` with your actual filename

3. **If you don't have the image yet:**
   - The banner will still work, but will show a turquoise circle placeholder
   - You can add your photo later

## 🎨 Color Scheme

The banner now uses:
- **Black** (#000000) - Base background
- **White** (#FFFFFF) - Text and icons
- **Turquoise** (#40e0d0, #00d9ff) - Accent colors for arrows and gradients

## 📐 Banner Specifications

- **Dimensions:** 1584x396px (LinkedIn's 4:1 ratio)
- **Profile Picture Position:** Right side (where LinkedIn profile pictures overlap)
- **Profile Picture Size:** 240x240px (circular, clipped)

## 🚀 Next Steps

1. Add your profile picture to `assets/images/profile-picture.jpg`
2. Open `banner-preview.html` in your browser to preview
3. Convert SVG to PNG (1584x396px) for LinkedIn upload
4. Upload to LinkedIn: Profile → Edit → Background photo

## 💡 Tips

- The profile picture is positioned on the right to align with LinkedIn's profile picture overlap
- The gradient creates depth while maintaining readability
- Turquoise accents match your brand colors
- All text remains white for maximum contrast and readability









