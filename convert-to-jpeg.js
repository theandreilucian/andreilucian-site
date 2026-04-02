const puppeteer = require('puppeteer');
const path = require('path');

async function convertToJpeg() {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Set viewport to LinkedIn banner dimensions
    await page.setViewport({
        width: 1584,
        height: 396,
        deviceScaleFactor: 2 // Higher quality
    });
    
    // Load the HTML file
    const htmlPath = path.join(__dirname, 'ghostwriter-growth-visual.html');
    await page.goto(`file://${htmlPath}`, {
        waitUntil: 'networkidle0'
    });
    
    // Wait a bit for any animations or rendering to complete
    await page.waitForTimeout(1000);
    
    // Take screenshot of the banner container
    const bannerElement = await page.$('.banner');
    if (bannerElement) {
        await bannerElement.screenshot({
            path: 'ghostwriter-growth-visual.jpg',
            type: 'jpeg',
            quality: 95
        });
    } else {
        // Fallback to full page screenshot
        await page.screenshot({
            path: 'ghostwriter-growth-visual.jpg',
            type: 'jpeg',
            quality: 95,
            fullPage: false
        });
    }
    
    await browser.close();
    console.log('✅ Banner saved as ghostwriter-growth-visual.jpg');
}

convertToJpeg().catch(console.error);