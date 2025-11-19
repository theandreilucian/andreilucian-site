# ConvertKit Integration Setup Guide

This guide will help you integrate ConvertKit with your website to replace Substack.

## Step 1: Get Your ConvertKit Form ID

1. Log in to your ConvertKit account: https://app.convertkit.com
2. Go to **Forms** in the left sidebar
3. Click on the form you want to use (or create a new one)
4. Click on **Settings** (gear icon)
5. Look for the **Form ID** - it's usually a number like `1234567`
6. Copy this Form ID

## Step 2: Get Your ConvertKit API Key

1. In ConvertKit, go to **Account Settings** (click your profile icon)
2. Navigate to **Advanced Settings**
3. Find **API Secret** or **API Key**
4. Copy your API Key (it looks like: `abc123def456ghi789`)

## Step 3: Configure Your Website

1. Open `index.html` in your code editor
2. Find the section that says:
   ```javascript
   window.CONVERTKIT_FORM_ID = 'YOUR_FORM_ID';
   window.CONVERTKIT_API_KEY = 'YOUR_API_KEY';
   window.CONVERTKIT_REDIRECT_URL = null;
   ```
3. Replace `YOUR_FORM_ID` with your actual Form ID (e.g., `1234567`)
4. Replace `YOUR_API_KEY` with your actual API Key (e.g., `abc123def456ghi789`)
5. **Optional**: Set `CONVERTKIT_REDIRECT_URL` to your Gumroad product link if you want to redirect subscribers after they sign up

Example:
```javascript
window.CONVERTKIT_FORM_ID = '1234567';
window.CONVERTKIT_API_KEY = 'abc123def456ghi789';
window.CONVERTKIT_REDIRECT_URL = 'https://yourname.gumroad.com/l/yourproduct'; // Redirect to Gumroad after subscription
```

**Or if you don't want to redirect:**
```javascript
window.CONVERTKIT_FORM_ID = '1234567';
window.CONVERTKIT_API_KEY = 'abc123def456ghi789';
window.CONVERTKIT_REDIRECT_URL = null; // No redirect - just show success message
```

## Step 4: Update All HTML Files

You need to add the same configuration to all HTML files that have newsletter forms:

- `index.html` ✅ (already updated)
- `blog-post.html` ✅ (already updated)
- `ghostwriting.html` ✅ (already updated)
- Any other article pages with newsletter forms

## Step 5: Configure Redirect (Optional)

If you want to redirect subscribers to Gumroad or a thank you page after they subscribe:

1. Get your Gumroad product link (e.g., `https://yourname.gumroad.com/l/yourproduct`)
2. In your HTML file, set `CONVERTKIT_REDIRECT_URL` to that link:
   ```javascript
   window.CONVERTKIT_REDIRECT_URL = 'https://yourname.gumroad.com/l/yourproduct';
   ```
3. After successful subscription, users will be automatically redirected to your Gumroad product page

**Note**: If you set `CONVERTKIT_REDIRECT_URL` to `null`, users will just see a success message and stay on the page.

## Step 6: Test the Integration

1. Open your website in a browser
2. Enter an email address in the newsletter signup form
3. Click "Read For Free" or submit the form
4. If you configured a redirect URL, you should be redirected to Gumroad after 1.5 seconds
5. Check your ConvertKit account to see if the subscriber was added
6. Check your email for the confirmation message from ConvertKit

## Troubleshooting

### Form not submitting?
- Check browser console (F12) for any error messages
- Verify your Form ID and API Key are correct
- Make sure there are no extra spaces in the configuration

### Getting "ConvertKit is not configured" error?
- Make sure you've replaced `YOUR_FORM_ID` and `YOUR_API_KEY` with actual values
- Check that the script tag is placed before `script.js` in your HTML

### Subscribers not appearing in ConvertKit?
- Check your ConvertKit form settings - make sure it's set to "Public"
- Verify your API Key has the correct permissions
- Check the browser console for API errors

## Security Note

⚠️ **Important**: The API Key is visible in your HTML source code. This is okay for ConvertKit's public API, but if you're concerned about security, you can:

1. Use ConvertKit's hosted form (embed code) instead
2. Set up a backend proxy to hide your API key
3. Use ConvertKit's form embed option

## Alternative: Using ConvertKit Hosted Forms

If you prefer not to use the API, you can use ConvertKit's hosted form embed:

1. In ConvertKit, go to your form
2. Click **Embed** tab
3. Copy the embed code
4. Replace the form HTML in your website with the ConvertKit embed code

## Need Help?

- ConvertKit Documentation: https://developers.convertkit.com/
- ConvertKit Support: https://help.convertkit.com/

