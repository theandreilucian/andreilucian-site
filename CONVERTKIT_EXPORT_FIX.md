# 🔧 ConvertKit Export Fix - Only Shows 26 Subscribers Instead of 600

## The Problem
When you export subscribers from ConvertKit, you only see 26 subscribers in the downloaded file instead of all 600 subscribers.

---

## ✅ Solution 1: Check What You're Exporting

### Step 1: Verify Total Subscribers

1. **Go to ConvertKit Dashboard:**
   - Login at: https://convertkit.com
   - Go to **"Subscribers"** in the left sidebar

2. **Check Total Count:**
   - Look at the top of the page - should say "X Subscribers"
   - Verify you have 600 subscribers (not just 26)

3. **Check Filters:**
   - Make sure no filters are active
   - Should say "All Subscribers" not "Tagged" or "Untagged"
   - Clear any date range filters

---

### Step 2: Export All Subscribers (Not Selected)

1. **Clear Selections:**
   - Make sure NO subscribers are selected/checked
   - If any checkboxes are selected, click "Deselect All"
   - The export should say "Export All Subscribers" not "Export Selected"

2. **Use Main Export Button:**
   - Click **"Export"** button (usually top-right)
   - **DO NOT** use "Bulk Actions → Export" (that only exports selected)
   - Look for "Export All Subscribers" or "Export CSV" button

3. **Select Export Format:**
   - Choose **"CSV"** format
   - Select **"All Subscribers"** (not specific tags or segments)

4. **Export:**
   - Click "Export" or "Download CSV"
   - Wait for the file to download
   - Open the file - should have 601 rows (600 subscribers + 1 header)

---

## ✅ Solution 2: Export from Different Location

### Option A: Export from Subscribers Page

1. **Go to:** https://convertkit.com/subscribers
2. **Click "Export"** button (top-right)
3. **Choose:**
   - Format: CSV
   - Export: **All Subscribers**
4. **Download and check file**

### Option B: Export from Settings/Analytics

1. **Go to:** https://convertkit.com/account/settings
2. **Look for:** "Export Subscribers" or "Download CSV"
3. **This should export ALL subscribers without pagination**

---

## ✅ Solution 3: Check Export Options

When exporting, look for options like:

- **"Export All Subscribers"** vs **"Export Selected"**
- **"Export All"** vs **"Export Current Page"**
- **Date Range:** Make sure it's set to **"All Time"** not a date range
- **Tags/Segments:** Make sure it's **"All Subscribers"** not a specific tag

**Choose the option that exports ALL 600 subscribers.**

---

## ✅ Solution 4: Check CSV File for All Rows

1. **Open the downloaded CSV file**
2. **Scroll to the bottom**
3. **Check total row count:**
   - Should be **601 rows** (600 subscribers + 1 header row)
   - Row 1 = Header (Email, First Name, etc.)
   - Rows 2-601 = Your 600 subscribers

4. **If only 27 rows** (26 subscribers + header):
   - Export is definitely limited
   - Try solutions above
   - Or contact ConvertKit support

---

## ✅ Solution 5: Check for Pagination/Limits

ConvertKit might be showing subscribers in pages:

1. **Check if pagination exists:**
   - Look for page numbers at bottom (1, 2, 3...)
   - Or "Show 25 per page" dropdown

2. **If paginated:**
   - Try exporting from Settings (bypasses pagination)
   - Or use "Export All" option if available
   - Or contact ConvertKit support

---

## ⚠️ If Still Only 26 Subscribers

### Contact ConvertKit Support:

1. **Go to:** https://convertkit.com/support
   - Or email: support@convertkit.com

2. **Create Support Ticket:**

   **Subject:** Export only shows 26 subscribers instead of 600

   **Message:**
   ```
   I'm trying to export all my subscribers from ConvertKit, but the 
   export function only includes 26 subscribers instead of all 600.
   
   Steps I took:
   1. Went to Subscribers page
   2. Clicked "Export" button
   3. Selected "All Subscribers" and "CSV" format
   4. Downloaded the file
   5. Opened CSV - only has 26 subscribers (27 rows: 26 + header)
   
   Expected: 601 rows (600 subscribers + 1 header)
   Actual: 27 rows (26 subscribers + 1 header)
   
   I've verified I have 600 total subscribers in my dashboard.
   I've cleared all filters and selections before exporting.
   
   Please help me export all 600 subscribers.
   
   Thank you!
   ```

3. **Ask them to:**
   - Fix the export function
   - Provide alternative export method
   - Manually export all 600 subscribers for you

---

## 🔍 Common Causes

### Cause 1: Exporting Selected Subscribers
- **Problem:** Only selected/checked subscribers are exported
- **Fix:** Click "Deselect All" before exporting

### Cause 2: Filter Active
- **Problem:** Filter shows only 26 subscribers (e.g., specific tag)
- **Fix:** Clear filters, select "All Subscribers"

### Cause 3: Pagination
- **Problem:** Export only exports current page (first 25-50 subscribers)
- **Fix:** Export from Settings or use "Export All" option

### Cause 4: Date Range Filter
- **Problem:** Export limited to date range (e.g., last 30 days)
- **Fix:** Set date range to "All Time" or remove date filter

### Cause 5: Tag/Segment Filter
- **Problem:** Export limited to specific tag or segment
- **Fix:** Select "All Subscribers" not a specific tag

---

## 📋 Quick Checklist

Before exporting:
- [ ] Verified total subscribers = 600 (not 26)
- [ ] Cleared all filters (set to "All Subscribers")
- [ ] Deselected all subscribers (no checkboxes selected)
- [ ] Used main "Export" button (not bulk actions)
- [ ] Selected "CSV" format
- [ ] Selected "All Subscribers" (not specific tag/segment)
- [ ] Date range set to "All Time" (if option exists)
- [ ] Checked exported file - how many rows?
- [ ] Contacted ConvertKit support if still only 26

---

## 🎯 Expected Export Format

ConvertKit export should include:
- **Email addresses** (column 1)
- **First name** (column 2, if available)
- **Last name** (column 3, if available)
- **Tags** (column 4)
- **Subscribed date** (column 5)
- **Other fields** (location, custom fields, etc.)

**Total rows:** 601 (600 subscribers + 1 header row)

---

## 🚀 Next Steps

1. **Try exporting from Settings** (bypasses pagination)
2. **Check export options** (make sure "All Subscribers" is selected)
3. **Verify CSV file** (should have 601 rows)
4. **Contact ConvertKit support** if still only 26

**Good luck!** 🎯 ConvertKit support should be able to help export all 600 subscribers.









