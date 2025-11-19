# 📧 Substack Newsletter Setup Guide

## ✅ Your Website is Live!

Your website is now live at:
- **https://www.andreilucian.com** (primary)
- **https://andreilucian.com** (redirects to www)

---

## 📧 Final Step: Setup Substack Newsletter Subdomain

### Step 1: Get Your Substack Publication Name

1. **Go to your Substack dashboard:** https://substack.com/dashboard
2. **Find your publication name:**
   - Look at the URL: `https://YOURPUBLICATION.substack.com`
   - Your publication name is the part before `.substack.com`
   - Example: If URL is `https://andreilucian.substack.com`, then publication name is `andreilucian`

---

### Step 2: Add Newsletter Subdomain in Namecheap

1. **Go to Namecheap:**
   - https://www.namecheap.com
   - Login → Domain List → Manage `andreilucian.com`

2. **Advanced DNS tab:**
   - Click "Advanced DNS" tab

3. **Add CNAME Record:**
   - Click "ADD NEW RECORD" button
   - Select "CNAME Record" from dropdown
   - Fill in:
     - **Host:** `newsletter`
     - **Value:** `YOURPUBLICATION.substack.com` (replace with your actual publication name)
     - **TTL:** `Automatic`
   - Click the checkmark/save icon

4. **Save Changes:**
   - Scroll to top/bottom
   - Click "Save All Changes" button

---

### Step 3: Configure in Substack

1. **Go to Substack:**
   - https://substack.com/dashboard
   - Go to your publication settings

2. **Add Custom Domain:**
   - Navigate to: **Settings** → **Domain** (or **Publication Settings** → **Domain**)
   - Look for "Custom Domain" section
   - Enter: `newsletter.andreilucian.com`
   - Click "Add Domain" or "Save"

3. **Verify Domain:**
   - Substack will verify the CNAME record
   - Wait for verification (may take a few minutes)
   - Substack will generate an SSL certificate automatically

4. **Wait for SSL:**
   - SSL certificate generation: 5-30 minutes
   - Status should show "Verified" or "Active"

---

### Step 4: Test Newsletter Link

1. **Visit your newsletter:**
   - Go to: **https://newsletter.andreilucian.com**
   - Should load your Substack publication

2. **Test on your website:**
   - Visit: **https://www.andreilucian.com**
   - Click any "Newsletter" button
   - Should redirect to `newsletter.andreilucian.com`

---

## ✅ Checklist

- [ ] Got Substack publication name
- [ ] Added CNAME record in Namecheap (`newsletter` → `YOURPUBLICATION.substack.com`)
- [ ] Saved changes in Namecheap
- [ ] Added custom domain in Substack (`newsletter.andreilucian.com`)
- [ ] Verified domain in Substack
- [ ] Tested: https://newsletter.andreilucian.com
- [ ] Tested newsletter link on website

---

## 🆘 Troubleshooting

**Domain not verifying in Substack?**
- Wait 10-30 minutes for DNS propagation
- Double-check CNAME record value in Namecheap matches exactly
- Make sure no trailing dots in Namecheap (except if required)

**SSL certificate not generating?**
- Wait 5-30 minutes (Substack generates automatically)
- Check domain is verified first

**Newsletter subdomain not loading?**
- Check DNS propagation: https://dnschecker.org
- Verify CNAME record is correct in Namecheap
- Make sure Substack shows domain as verified

---

## 🎉 You're Done!

After Substack setup:
- ✅ Website: https://www.andreilucian.com
- ✅ Newsletter: https://newsletter.andreilucian.com
- ✅ GitHub: Code automatically deploys on push
- ✅ Vercel: Auto-deploys from GitHub

**Daily workflow:**
- Edit in Cursor → `git add .` → `git commit -m "message"` → `git push`
- Vercel auto-deploys in 1-2 minutes! 🚀









