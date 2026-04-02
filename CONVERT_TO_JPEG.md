# Convert HTML Banner to JPEG

## Method 1: Using Node.js (Recommended)

1. Install Node.js if you haven't already: https://nodejs.org/

2. Install dependencies:
```bash
npm install
```

3. Run the conversion script:
```bash
npm run convert
```

Or directly:
```bash
node convert-to-jpeg.js
```

This will create `ghostwriter-linkedin-banner.jpg` in the same directory.

## Method 2: Using PowerShell (Quick)

1. Open PowerShell in this directory

2. Run:
```powershell
.\convert-to-jpeg.ps1
```

Note: This requires Chrome or Edge browser to be installed.

## Method 3: Manual Screenshot

1. Open `ghostwriter-linkedin-banner.html` in your browser
2. Press F12 to open Developer Tools
3. Press Ctrl+Shift+P and type "screenshot"
4. Select "Capture screenshot" or use browser extensions
5. Crop to the banner dimensions (1584 x 396px)

## Output

The JPEG file will be saved as `ghostwriter-linkedin-banner.jpg` with dimensions 1584 x 396 pixels (LinkedIn banner standard).