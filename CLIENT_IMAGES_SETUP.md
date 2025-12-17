# Client Images Setup Guide

## How to Add Your Client Profile Pictures

I've added **10 client slots** to your banner. Here's how to add your client images:

### Current Setup

The banner now has **10 overlapping circular profile pictures** with different colored borders:
- **Client 1-5**: Already configured with existing images
- **Client 6-10**: Ready for your new client images (placeholder paths)

### Steps to Add Your Client Images

1. **Save your client images** to: `assets/images/testimonials/`

2. **Name your files** (examples):
   - `client-6.jpg` (or `.png`)
   - `client-7.jpg`
   - `client-8.jpg`
   - `client-9.jpg`
   - `client-10.jpg`

3. **Update the file paths** in `banner-linkedin-header-new.svg`:
   
   Find lines like this:
   ```xml
   <image x="247" y="-3" width="56" height="56" href="assets/images/testimonials/client-6.jpg" .../>
   ```
   
   Replace `client-6.jpg` with your actual filename.

### Current Client Slots

| Client | Border Color | File Path (to update) |
|--------|-------------|----------------------|
| Client 6 | Coral Red (#FF6B6B) | `assets/images/testimonials/client-6.jpg` |
| Client 7 | Turquoise (#4ECDC4) | `assets/images/testimonials/client-7.jpg` |
| Client 8 | Mint Green (#95E1D3) | `assets/images/testimonials/client-8.jpg` |
| Client 9 | Lavender (#AA96DA) | `assets/images/testimonials/client-9.jpg` |
| Client 10 | Light Pink (#FCBAD3) | `assets/images/testimonials/client-10.jpg` |

### Adding More Clients

If you need more than 10 clients:

1. **Add a new clipPath** in the `<defs>` section:
   ```xml
   <clipPath id="clientCircle11"><circle cx="450" cy="25" r="28"/></clipPath>
   ```

2. **Add the client circle and image** in the social proof section:
   ```xml
   <!-- Client 11 - Your Color border -->
   <circle cx="450" cy="25" r="30" fill="none" stroke="#YOUR_COLOR" stroke-width="2.5" opacity="0.8"/>
   <image x="422" y="-3" width="56" height="56" href="assets/images/testimonials/client-11.jpg" clip-path="url(#clientCircle11)" preserveAspectRatio="xMidYMid slice"/>
   ```

3. **Update the "and more" text position** if needed (move it further right)

### Color Suggestions for Borders

- `#FF6B6B` - Coral Red
- `#4ECDC4` - Turquoise  
- `#95E1D3` - Mint Green
- `#F38181` - Light Pink
- `#AA96DA` - Lavender
- `#FCBAD3` - Pink
- `#FFFFD2` - Light Yellow
- `#A8E6CF` - Mint
- `#FFD93D` - Yellow
- `#6BCB77` - Green

### Image Requirements

- **Format**: JPG or PNG
- **Size**: Square images work best (e.g., 200x200px or larger)
- **Quality**: High resolution for best results
- **Content**: Headshots/portraits work best

### Quick Checklist

- [ ] Save client images to `assets/images/testimonials/`
- [ ] Update file paths in the SVG (lines 160, 164, 168, 172, 176)
- [ ] Test the banner in a browser
- [ ] Adjust colors if needed
- [ ] Add more clients if needed

---

**File to edit**: `assets/images/banner-linkedin-header-new.svg`
