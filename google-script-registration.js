function doPost(e) {
    Logger.log("doPost called");
  
    const ss = SpreadsheetApp.openById("1yhhvVIQ7nGdhK1GuAzXoZ_ThFeFkq5FjG-3X3lqnZkU");
    const sheet = ss.getSheetByName("registration");
  
    if (!sheet) {
      Logger.log("Sheet registration not found!");
      return ContentService.createTextOutput("Error: Sheet not found").setMimeType(ContentService.MimeType.TEXT);
    }
  
    Logger.log("Sheet found: " + sheet.getName());
  
    const data = JSON.parse(e.postData.contents);
    const order_no = 'ORD-' + Date.now();
    const totalPeople = Number(data.adult) + Number(data.student) + Number(data.child_above) + Number(data.child_below);
    
    // Log all received data for debugging
    Logger.log("Received data: " + JSON.stringify(data));
    Logger.log("Total people: " + totalPeople);
    Logger.log("Total amount: " + data.total_amount);
    Logger.log("Payment proof: " + data.payment_proof);
  
    const rowData = [
      new Date(),
      order_no,
      data.email,
      data.name,
      data.whatsapp,
      data.member_type,
      data.adult,
      data.student,
      data.child_above,
      data.child_below,
      totalPeople,
      data.total_amount,
      data.payment_proof,
      ""
    ];
    
    Logger.log("Writing row data: " + JSON.stringify(rowData));
    sheet.appendRow(rowData);
  
    Logger.log("Row appended successfully");
  
    // Send confirmation email
    const subject = "🎫 Registration Confirmation - Order " + order_no;
    const body = `
    Hello ${data.name},
  
    Thank you for your registration. Here are your details:
  
    - Email: ${data.email}  
    - WhatsApp: ${data.whatsapp}  
    - Member Type: ${data.member_type}  
    - Adult: ${data.adult}  
    - Student: ${data.student}  
    - Child (Above 5): ${data.child_above}  
    - Child (Below 5): ${data.child_below}  
    - Total Amount: ${data.total_amount} Euros  
    - Total People: ${totalPeople}  
  
    Your registration has been received. We will send another email with **bhog coupons** once the payment has been verified.
  
    Warm regards,  
    BCA Spain Team 🇮🇳❤️
  `;
  
    MailApp.sendEmail(data.email, subject, body);
    Logger.log("Email sent to: " + data.email);
  
    return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
  }