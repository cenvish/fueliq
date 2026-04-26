# ⛽ FuelIQ — Petrol Efficiency Tracker

A personal petrol fill-up tracker hosted on GitHub Pages, with data saved to your own Google Sheet.

---

## How it works

```
Your Browser (GitHub Pages)
        ↕  fetch / POST
Google Apps Script (your backend)
        ↕  read / write
Google Sheet (your data)
```

- **GitHub Pages** hosts the tracker — free, permanent URL
- **Google Apps Script** is a tiny backend that lives inside your Google Sheet
- **Google Sheets** stores all your fill-up data — you can view it directly anytime

---

## Setup — One Time Only (~10 minutes)

Follow these steps in order.

---

### Step 1 — Fork this repo to your GitHub account

1. Go to your GitHub repo page (you're reading this there)
2. Click **Fork** (top right) — or if this is already your repo, skip this step
3. Your repo will be at `https://github.com/YOUR_USERNAME/fueliq`

---

### Step 2 — Enable GitHub Pages

1. In your repo, click **Settings**
2. In the left sidebar click **Pages**
3. Under **Source**, select **Deploy from a branch**
4. Set branch to `main`, folder to `/ (root)`
5. Click **Save**
6. After ~60 seconds, your site is live at:
   `https://YOUR_USERNAME.github.io/fueliq`

---

### Step 3 — Create your Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com)
2. Create a new blank spreadsheet
3. Name it **FuelIQ** (or anything you like)
4. Leave it open — you need it for the next step

---

### Step 4 — Add the Apps Script backend

1. In your Google Sheet, click **Extensions → Apps Script**
2. A new tab opens with the script editor
3. **Delete all the existing code** in the editor
4. Open the file `Code.gs` from this repo — copy its entire contents
5. Paste it into the Apps Script editor
6. Click **Save** (💾 icon or Ctrl+S)
7. Name the project **FuelIQ** when prompted

---

### Step 5 — Deploy the Apps Script as a Web App

1. In the Apps Script editor, click **Deploy → New deployment**
2. Click the gear icon ⚙ next to "Select type" → choose **Web app**
3. Fill in the settings:
   - **Description**: FuelIQ Backend
   - **Execute as**: Me
   - **Who has access**: **Anyone** ← important, this is what lets the tracker call it
4. Click **Deploy**
5. Click **Authorize access** → choose your Google account → click **Allow**
6. Copy the **Web app URL** — it looks like:
   `https://script.google.com/macros/s/AKfycb.../exec`
7. Keep this URL safe — you'll paste it into the tracker

---

### Step 6 — Connect the tracker to your sheet

1. Open your live site: `https://YOUR_USERNAME.github.io/fueliq`
2. Click **⚙ Settings** in the top right
3. Paste your Apps Script URL into the field
4. Click **Save & Connect**
5. The tracker loads and is ready — fill-ups now save directly to your Google Sheet

---

## Daily use

| Field | Where to get it |
|---|---|
| Date | Today |
| Grade | Pump label (93, 95, E10…) |
| Station | Garage name |
| Price / Litre | Pump display or receipt |
| Litres Pumped | Pump display or receipt |
| Range after fill ↑ | Dashboard reading right after filling |
| Range before fill ↓ | Dashboard reading just before filling |
| km Driven | Odometer now − odometer at last fill |

**First fill-up:** only enter Range After Fill. Leave Range Before and km as 0.
Efficiency data appears from your 2nd fill onwards.

---

## Viewing your raw data

Open your Google Sheet anytime — all fill-ups are stored in the **FuelIQ Data** tab with columns:

`id · date · grade · brand · price · litres · rangeAfter · rangeBefore · km`

---

## Updating the tracker

If you want to update the app (e.g. after receiving a new `index.html`):

1. Go to your GitHub repo
2. Click on `index.html`
3. Click the pencil icon ✏ to edit
4. Replace the contents with the new file
5. Click **Commit changes**
6. GitHub Pages auto-deploys within ~60 seconds

---

## Privacy

- Your data lives in **your own Google Sheet** — Anthropic and GitHub have no access to it
- The Apps Script URL acts like a private key — don't share it publicly
- The tracker runs entirely in your browser — no third-party servers involved

---

## Troubleshooting

| Problem | Fix |
|---|---|
| "Connection error" on load | Check your Apps Script URL in Settings — it may have expired after a redeployment |
| Data not saving | Make sure "Who has access" is set to **Anyone** in the Apps Script deployment |
| Blank page on GitHub Pages | Wait 2 minutes after enabling Pages, then hard-refresh |
| Apps Script asks to authorize again | Click Allow — this happens the first time and after updates |

---

*Built with HTML, Google Apps Script, and Google Sheets. No frameworks, no subscriptions.*
