const SHEET_ID_1 = "1BuCusnnhwXYJD93bstQmtqc0MxdjzOdOoXPXnBzFOqE";
const QR_SHEET_NAME_1 = "QR Tickets";

// Column indices (1-based for getRange)
const COL_QR_TEXT = 7;  // "QR Code Text" column (G)
const COL_USED    = 10; // "Used" column (J)

function processTicket(qrText) {
  Logger.log(`processTicket called with qrText: ${qrText}`);
  
  const sheet = SpreadsheetApp.openById(SHEET_ID_1).getSheetByName(QR_SHEET_NAME_1);
  const data = sheet.getDataRange().getValues();
  const needle = (qrText || "").toString().trim();

  for (let i = 1; i < data.length; i++) { // skip header
    const rowNum = i + 1;
    const sheetQrText = data[i][COL_QR_TEXT - 1] ? data[i][COL_QR_TEXT - 1].toString().trim() : "";
    Logger.log(`Row ${rowNum} QR Code Text: "${sheetQrText}"`);

    if (sheetQrText === needle) {
      const used = data[i][COL_USED - 1] ? data[i][COL_USED - 1].toString().toUpperCase().trim() : "";
      Logger.log(`Found matching QR. Used status: "${used}"`);

      if (used === "USED") {
        return { ok: false, code: "ALREADY_USED", message: "❌ Ticket Already Used" };
      }

      // If not used yet, mark as used now
      sheet.getRange(rowNum, COL_USED).setValue("USED");
      return { ok: true, code: "CHECKED_IN", message: "✅ Ticket Checked In and Marked Used" };
    }
  }

  Logger.log("Ticket NOT Found");
  return { ok: false, code: "NOT_FOUND", message: "❌ Ticket NOT Found" };
}

/**
 * Web API endpoint
 * GET /exec?qrText=... [&callback=yourFunction]  // callback => JSONP
 */
function doGet(e) {
  const qrText = (e && e.parameter && e.parameter.qrText) ? e.parameter.qrText : "";
  const result = processTicket(qrText);
  const payload = JSON.stringify(result);

  // If a ?callback=name is provided, serve JSONP to avoid CORS in the browser.
  if (e && e.parameter && e.parameter.callback) {
    const cb = e.parameter.callback.replace(/[^a-zA-Z0-9_$]/g, "");
    return ContentService
      .createTextOutput(`${cb}(${payload});`)
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }

  // Default: plain JSON
  return ContentService
    .createTextOutput(payload)
    .setMimeType(ContentService.MimeType.JSON);
}
