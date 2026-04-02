# How to Convert the Ebook to PDF with Images

## Option 1: Using Browser (Easiest)

1. **Prepare the images:**
   - Edit the tweet screenshots you have
   - Remove Stijn Noorman's name and avatar
   - Keep the engagement metrics
   - Save them in an `images/` folder with these exact names:
     - `comparison-template-1.png`
     - `comparison-template-2.png`
     - `comparison-template-3.png`
     - `powerful-oneliner-1.png`
     - `powerful-oneliner-2.png`
     - `list-template-1.png`
     - `list-template-2.png`
     - `hook-list-takeaway-1.png`
     - `hook-list-takeaway-2.png`
     - `rule-of-three-1.png`
     - `rule-of-three-2.png`
     - `rule-of-three-3.png`
     - `callout-1.png`
     - `callout-2.png`
     - `callout-3.png`

2. **Open the HTML file:**
   - Open `THE_PERSONAL_BRANDING_SYSTEM_EBOOK.html` in Chrome or Edge
   - Make sure the images folder is in the same directory

3. **Print to PDF:**
   - Press `Ctrl+P` (or `Cmd+P` on Mac)
   - Select "Save as PDF" as the destination
   - Click "More settings"
   - Check "Background graphics"
   - Click "Save"

## Option 2: Using Online Tools

1. **Use HTML to PDF converter:**
   - Go to https://www.ilovepdf.com/html-to-pdf
   - Upload `THE_PERSONAL_BRANDING_SYSTEM_EBOOK.html`
   - Make sure to include the `images/` folder
   - Convert to PDF

## Option 3: Using Pandoc (Advanced)

1. **Install Pandoc:**
   - Download from https://pandoc.org/installing.html

2. **Convert:**
   ```bash
   pandoc THE_PERSONAL_BRANDING_SYSTEM_EBOOK.html -o ebook.pdf --pdf-engine=wkhtmltopdf
   ```

## Option 4: Using Markdown to PDF (If you prefer markdown)

1. **Use Markdown PDF extension in VS Code:**
   - Install "Markdown PDF" extension
   - Open `THE_PERSONAL_BRANDING_SYSTEM_EBOOK.md`
   - Right-click → "Markdown PDF: Export (pdf)"

2. **Or use online converter:**
   - Go to https://www.markdowntopdf.com/
   - Upload the markdown file
   - Make sure images are accessible

## Folder Structure for PDF Conversion:

```
Your Folder/
├── THE_PERSONAL_BRANDING_SYSTEM_EBOOK.html
├── THE_PERSONAL_BRANDING_SYSTEM_EBOOK.md
└── images/
    ├── comparison-template-1.png
    ├── comparison-template-2.png
    ├── comparison-template-3.png
    ├── powerful-oneliner-1.png
    ├── powerful-oneliner-2.png
    ├── list-template-1.png
    ├── list-template-2.png
    ├── hook-list-takeaway-1.png
    ├── hook-list-takeaway-2.png
    ├── rule-of-three-1.png
    ├── rule-of-three-2.png
    ├── rule-of-three-3.png
    ├── callout-1.png
    ├── callout-2.png
    └── callout-3.png
```

## Important Notes:

- **Image paths:** The HTML file references images as `images/filename.png`
- **Image size:** Keep images under 2MB each for faster PDF generation
- **Image format:** PNG works best for screenshots
- **Image dimensions:** Recommended width: 600-800px for tweet screenshots

## Quick Test:

Before converting the full PDF, test one image:
1. Open the HTML file in a browser
2. Check if the first image displays correctly
3. If yes, proceed with PDF conversion
4. If no, check the image path and filename
