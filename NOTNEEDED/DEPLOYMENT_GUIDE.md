# QR Ticket Verification - Deployment Guide

## Overview
This system connects a QR code scanner interface with Google Sheets to verify and check-in tickets.

## Files Created
- `Code.gs` - Google Apps Script backend with ticket verification logic
- `qr.html` - Frontend interface for QR scanning
- `ticket-verify.js` - Original verification logic (now integrated into Code.gs)

## Setup Steps

### 1. Create Google Apps Script Project
1. Go to [script.google.com](https://script.google.com)
2. Click "New Project"
3. Rename the project to "QR Ticket Verification"

### 2. Add the Code
1. In the `Code.gs` file, paste the contents from our `Code.gs` file
2. Create a new HTML file named `qr.html` and paste the contents from our `qr.html` file

### 3. Configure Google Sheets Access
1. Make sure your Google Sheet with ID `1BuCusnnhwXYJD93bstQmtqc0MxdjzOdOoXPXnBzFOqE` is accessible
2. The sheet should have a tab named "QR Tickets"
3. Column G (index 6) should contain QR code text
4. Column I (index 8) should contain usage status
5. Column J (index 9) should be the "Used" column for marking tickets

### 4. Deploy as Web App
1. Click "Deploy" → "New deployment"
2. Choose "Web app" as the type
3. Set "Execute as" to your account
4. Set "Who has access" to "Anyone" (or "Anyone with Google Account" for security)
5. Click "Deploy"
6. Copy the web app URL

### 5. Test the System
1. Open the web app URL in a browser
2. Allow camera access when prompted
3. Scan a QR code from your sheet
4. Verify the ticket validation works

## How It Works
1. **Frontend (qr.html)**: Uses HTML5 QR scanner to capture QR codes
2. **Backend (Code.gs)**: Connects to Google Sheets to verify tickets
3. **Workflow**: Scan → Capture → Verify → Check-in (all in one button)
4. **Data**: Reads from and writes to your Google Sheet

## Troubleshooting
- **Camera not working**: Ensure HTTPS and camera permissions
- **Sheet access denied**: Check sharing settings on your Google Sheet
- **QR not found**: Verify the QR text format matches what's in your sheet

## Security Notes
- The web app URL is public - consider adding authentication if needed
- Only authorized users should have edit access to the Google Sheet
- Monitor usage logs in Google Apps Script for any suspicious activity
