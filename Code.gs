// ─────────────────────────────────────────────────────────────────────────────
// FuelIQ — Google Apps Script Backend
// Paste this entire file into your Google Apps Script editor
// ─────────────────────────────────────────────────────────────────────────────

const SHEET_NAME = 'FuelIQ Data';

// Column order in the sheet
const COLS = ['id','date','grade','brand','price','litres','rangeAfter','rangeBefore','km'];

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    // Write header row
    sheet.getRange(1, 1, 1, COLS.length).setValues([COLS]);
    sheet.getRange(1, 1, 1, COLS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

// ── GET: return all entries ───────────────────────────────────────────────────
function doGet(e) {
  try {
    const action = e.parameter.action || 'get';
    if (action !== 'get') return jsonResponse({ error: 'Unknown action' });

    const sheet = getSheet();
    const data  = sheet.getDataRange().getValues();
    if (data.length <= 1) return jsonResponse({ entries: [] });

    const headers = data[0];
    const entries = data.slice(1).map(row => {
      const obj = {};
      headers.forEach((h, i) => {
        const val = row[i];
        // Parse numbers back from sheet
        obj[h] = (typeof val === 'number') ? val
               : (val === '' || val === null) ? (h === 'km' || h === 'rangeBefore' ? 0 : '')
               : val.toString();
      });
      return obj;
    });

    return jsonResponse({ entries });
  } catch(err) {
    return jsonResponse({ error: err.message });
  }
}

// ── POST: add or delete ───────────────────────────────────────────────────────
function doPost(e) {
  try {
    const body   = JSON.parse(e.postData.contents);
    const action = body.action;

    if (action === 'add') {
      const entry = body.entry;
      const sheet = getSheet();
      const row   = COLS.map(col => entry[col] !== undefined ? entry[col] : '');
      sheet.appendRow(row);
      return jsonResponse({ success: true, entry });
    }

    if (action === 'delete') {
      const id    = body.id;
      const sheet = getSheet();
      const data  = sheet.getDataRange().getValues();
      const idCol = COLS.indexOf('id'); // column index of 'id'
      for (let i = 1; i < data.length; i++) {
        if (data[i][idCol].toString() === id.toString()) {
          sheet.deleteRow(i + 1); // +1 because sheet rows are 1-indexed
          return jsonResponse({ success: true });
        }
      }
      return jsonResponse({ error: 'Entry not found' });
    }

    return jsonResponse({ error: 'Unknown action' });
  } catch(err) {
    return jsonResponse({ error: err.message });
  }
}

// ── Helper ────────────────────────────────────────────────────────────────────
function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
