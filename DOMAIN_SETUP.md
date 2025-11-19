# 🔗 Domain Setup Guide - andreilucian.com

## ✅ Your Site is Live on Vercel!

Your website is now deployed at: `andreilucian-site.vercel.app` (or similar URL)

---

## 🌐 Step 1: Add Domain in Vercel

1. **On this screen:** Click on **"Add Domain"** (next to the globe icon) in the "Next Steps" section
   - OR click **"Continue to Dashboard"** first, then go to **Settings** → **Domains**

2. **Add your domains:**
   - Click the **"Add"** button
   - Type: `andreilucian.com` → Click **"Add"**
   - Click **"Add"** again
   - Type: `www.andreilucian.com` → Click **"Add"**

3. **Set primary domain:**
   - Set `andreilucian.com` as the **Primary** domain

4. **Note the DNS instructions:**
   - Vercel will show you DNS records needed
   - You'll need to update these in Namecheap

---

## 🔧 Step 2: Update DNS in Namecheap

### Go to Namecheap:

1. **Login:** https://www.namecheap.com
2. **Go to Domain List:** Click "Domain List" in the left menu
3. **Manage Domain:** Click **"Manage"** next to `andreilucian.com`
4. **Advanced DNS:** Click the **"Advanced DNS"** tab

### Update DNS Records:

1. **DELETE** any existing A record for `@` that points to an old IP

2. **ADD these records:**

   **A Record:**
   - Host: `@`
   - Value: `76.76.21.21`
   - TTL: `Automatic`

   **CNAME Record:**
   - Host: `www`
   - Value: `cname.vercel-dns.com`
   - TTL: `Automatic`

3. **Save:** Click **"Save All Changes"** (green button at top)

---

## ✅ Step 3: Verify Domain in Vercel

1. **Go back to Vercel:**
   - Project Dashboard → **Settings** → **Domains**

2. **Verify:**
   - Click **"Verify"** next to both domains
   - Wait for green checkmarks ✅ (may take 1-5 minutes)

3. **Enable HTTPS:**
   - Enable **"Enforce HTTPS"** (if not already enabled)

4. **Wait for DNS propagation:**
   - DNS changes can take 10-30 minutes to propagate
   - Your site will be live at: **https://andreilucian.com**

---

## 🧪 Test Your Site

After DNS propagates:
- Visit: **https://andreilucian.com**
- Visit: **https://www.andreilucian.com** (should redirect to non-www)

---

## 🆘 Troubleshooting

**Domain not verifying?**
- Wait 5-10 minutes and try again
- Double-check DNS records in Namecheap match exactly
- Make sure TTL is set to "Automatic" or lowest value

**Site not loading?**
- DNS propagation can take up to 48 hours (usually 10-30 min)
- Clear browser cache
- Try incognito/private browsing mode

**Need help?**
- Vercel docs: https://vercel.com/docs/concepts/projects/domains
- Namecheap support: https://www.namecheap.com/support/

---

## ✅ Checklist

- [ ] Added domains in Vercel (andreilucian.com + www)
- [ ] Updated DNS in Namecheap
- [ ] Verified domains in Vercel (green checkmarks)
- [ ] Enabled HTTPS in Vercel
- [ ] Tested site at https://andreilucian.com
- [ ] Verified www redirect works

---

**Next:** After domain is working, we'll setup Substack newsletter subdomain!









