# ConvertKit Integration - Step by Step Guide

This guide will walk you through integrating ConvertKit with your website newsletter forms.

## Step 1: Create a ConvertKit Account (If You Don't Have One)

1. Go to https://convertkit.com
2. Click **"Start Free Trial"** or **"Sign Up"**
3. Create your account (you can use the free plan to start)
4. Verify your email address

## Step 2: Create a Form in ConvertKit

1. Log in to your ConvertKit account: https://app.convertkit.com
2. In the left sidebar, click **"Forms"**
3. Click the **"+ New Form"** button (usually in the top right)
4. Choose **"Inline Form"** or **"Form"** (we'll use the API, so any form type works)
5. Give your form a name (e.g., "Newsletter Signup" or "Main Newsletter")
6. Click **"Create Form"**
7. You can customize the form if you want, but we'll use the API, so the design doesn't matter much

## Step 3: Get Your Form ID

1. In ConvertKit, go to **"Forms"** in the left sidebar
2. Click on the form you just created (or the one you want to use)
3. Click the **Settings** icon (gear icon) in the top right
4. Look for **"Form ID"** - it's a number like `1234567`
5. **Copy this number** - you'll need it in Step 5

**Note:** The Form ID might also be visible in the form's URL: `https://app.convertkit.com/forms/1234567/edit` (the number is your Form ID)

## Step 4: Get Your ConvertKit API Key

1. In ConvertKit, click your **profile icon** (top right corner)
2. Click **"Account Settings"**
3. In the left menu, click **"Advanced Settings"**
4. Scroll down to find **"API Secret"** or **"API Key"**
5. Click **"Show"** or **"Reveal"** to see your API key
6. **Copy the API key** - it looks like: `abc123def456ghi789jkl012mno345pqr678`
7. **Important:** Keep this secret! Don't share it publicly.

## Step 5: Add Your Credentials to Your Website

1. Open your website files on your computer
2. Open the file `index.html` in a text editor (like Notepad, VS Code, or any code editor)
3. Scroll down to find this section (around line 346):

```javascript
<!-- ConvertKit Configuration -->
<script>
    window.CONVERTKIT_FORM_ID = 'YOUR_FORM_ID';
    window.CONVERTKIT_API_KEY = 'YOUR_API_KEY';
    window.CONVERTKIT_REDIRECT_URL = null;
</script>
```

4. Replace `YOUR_FORM_ID` with your actual Form ID from Step 3
   - Example: `window.CONVERTKIT_FORM_ID = '1234567';`

5. Replace `YOUR_API_KEY` with your actual API Key from Step 4
   - Example: `window.CONVERTKIT_API_KEY = 'abc123def456ghi789jkl012mno345pqr678';`

6. **Optional:** If you want to redirect subscribers to a Gumroad product after they sign up:
   - Change `null` to your Gumroad URL
   - Example: `window.CONVERTKIT_REDIRECT_URL = 'https://yourname.gumroad.com/l/yourproduct';`
   - Or leave it as `null` if you don't want to redirect

**Your final code should look like this:**

```javascript
<!-- ConvertKit Configuration -->
<script>
    window.CONVERTKIT_FORM_ID = '1234567';
    window.CONVERTKIT_API_KEY = 'abc123def456ghi789jkl012mno345pqr678';
    window.CONVERTKIT_REDIRECT_URL = null; // or your Gumroad URL
</script>
```

## Step 6: Update Other HTML Files (If They Have Forms)

If you have newsletter forms on other pages, add the same configuration to those files:

- `blog-post.html` (if it has a form)
- `ghostwriting.html` (if it has a form)
- Any other article pages with newsletter forms

**How to add it:**
1. Open each file
2. Find the `</body>` tag (near the end of the file)
3. Add the ConvertKit configuration script **before** the `</body>` tag
4. Use the same Form ID and API Key

## Step 7: Save and Upload Your Files

1. **Save** all the files you edited
2. If you're using a hosting service (like Vercel, Netlify, or GitHub Pages):
   - Upload the files to your hosting service
   - Or commit and push if using Git
3. Wait for your site to update (usually takes a few seconds to a minute)

## Step 8: Test the Integration

1. Open your website in a browser
2. Go to the page with the newsletter signup form
3. Enter a test email address (use your own email to test)
4. Click **"Read For Free"** or the submit button
5. You should see a success message like "Thank you for subscribing!"
6. **Check your ConvertKit account:**
   - Go to ConvertKit → **"Subscribers"**
   - You should see your test email address in the list
7. **Check your email:**
   - ConvertKit will send a confirmation email to the subscriber
   - Check your inbox (and spam folder) for the confirmation email

## Step 9: Verify It's Working

✅ **Success indicators:**
- Form shows "Thank you for subscribing!" message
- Email appears in ConvertKit subscribers list
- Confirmation email is sent (check spam folder)
- If you set a redirect URL, you're redirected after signup

❌ **If it's not working:**
- Check browser console (press F12, look for errors)
- Verify Form ID and API Key are correct (no extra spaces)
- Make sure the script is placed before `</body>` tag
- Check that your ConvertKit form is set to "Public" or "Active"

## Troubleshooting

### Error: "ConvertKit is not configured"
- **Solution:** Make sure you replaced `YOUR_FORM_ID` and `YOUR_API_KEY` with actual values
- Check for typos or extra spaces

### Subscribers not appearing in ConvertKit
- **Solution:** 
  - Verify your API Key is correct
  - Check that your form is active in ConvertKit
  - Check browser console (F12) for API errors
  - Make sure the form is set to "Public" in ConvertKit settings

### Form not submitting
- **Solution:**
  - Check browser console (F12) for error messages
  - Verify the script is loaded (check Network tab)
  - Make sure `script.js` is loaded after the ConvertKit configuration

### Getting redirected but not subscribed
- **Solution:**
  - Check ConvertKit subscribers list - they might be subscribed but confirmation email wasn't sent
  - Verify your API Key has correct permissions
  - Check ConvertKit form settings

## Security Note

⚠️ **Important:** Your API Key will be visible in your website's HTML source code. This is normal for ConvertKit's public API and is safe to use this way. However, if you're concerned:

1. ConvertKit's API is designed to work this way
2. The API Key only allows subscribing to your form (not accessing other data)
3. If you want extra security, you can set up a backend proxy (more advanced)

## Next Steps

Once your integration is working:

1. **Set up email sequences** in ConvertKit (welcome emails, etc.)
2. **Create tags** to organize subscribers
3. **Set up automation** based on subscriber actions
4. **Test with real subscribers** to make sure everything works

## Need Help?

- **ConvertKit Support:** https://help.convertkit.com/
- **ConvertKit API Docs:** https://developers.convertkit.com/
- **Check your browser console** (F12) for specific error messages

---

## Quick Reference

**Where to find things in ConvertKit:**
- **Form ID:** Forms → [Your Form] → Settings → Form ID
- **API Key:** Profile Icon → Account Settings → Advanced Settings → API Secret

**Files to edit:**
- `index.html` (main page)
- Any other HTML files with newsletter forms

**What to replace:**
- `YOUR_FORM_ID` → Your actual Form ID number
- `YOUR_API_KEY` → Your actual API Key string
- `null` → Your Gumroad URL (optional) or leave as `null`

