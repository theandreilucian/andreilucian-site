# ConvertKit Quick Setup Guide

## 🚀 Quick Start (3 Steps)

### Step 1: Get Your ConvertKit Form ID
1. Go to https://app.convertkit.com
2. Click **Forms** in the left sidebar
3. Click on your form (or create a new one)
4. Click the **Settings** gear icon
5. Copy the **Form ID** (it's a number like `1234567`)

### Step 2: Get Your ConvertKit API Key
1. In ConvertKit, click your **profile icon** (top right)
2. Go to **Account Settings** → **Advanced Settings**
3. Find **API Secret** 
4. Copy it (looks like: `abc123def456ghi789`)

### Step 3: Add to Your Website
Open `index.html` and find this section (around line 346):

```javascript
window.CONVERTKIT_FORM_ID = 'YOUR_FORM_ID';
window.CONVERTKIT_API_KEY = 'YOUR_API_KEY';
```

Replace with your actual values:

```javascript
window.CONVERTKIT_FORM_ID = '1234567';  // Your Form ID here
window.CONVERTKIT_API_KEY = 'abc123def456ghi789';  // Your API Key here
window.CONVERTKIT_REDIRECT_URL = null;  // Set to Gumroad URL if you want redirect
```

## ✅ Optional: Redirect to Gumroad

If you want to send subscribers to your Gumroad product after they sign up:

```javascript
window.CONVERTKIT_REDIRECT_URL = 'https://yourname.gumroad.com/l/yourproduct';
```

Or leave it as `null` to just show a success message.

## 🧪 Test It

1. Open your website
2. Enter an email in the newsletter form
3. Click "Read For Free"
4. Check your ConvertKit account - you should see the new subscriber!

## 📝 Files That Need This Configuration

Make sure to add the same configuration to:
- ✅ `index.html` (main page)
- ✅ `blog-post.html` (if it has a form)
- ✅ `ghostwriting.html` (if it has a form)
- ✅ Any other pages with newsletter forms

## ❓ Troubleshooting

**"ConvertKit is not configured" error?**
- Make sure you replaced `YOUR_FORM_ID` and `YOUR_API_KEY` with real values
- Check for typos or extra spaces

**Subscribers not appearing?**
- Check your ConvertKit form is set to "Public"
- Verify your API Key is correct
- Check browser console (F12) for errors

## 🔒 Security Note

Your API Key will be visible in the HTML source code. This is normal for ConvertKit's public API. If you're concerned, you can use ConvertKit's hosted form embed instead.

