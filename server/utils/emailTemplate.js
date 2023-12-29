exports.verifyAccount = (url) => (
    `
        <div>
               <h4>Email verification required</h4>
               <p>
                    Click this link within 24 hours to complete your account setup:
                </p>
               <a href=${url}>verify my email</a>
               <p>
                    Thanks,
                    Jayesh Sojitra
                </p>
    </div>`
);

exports.accountActivated = () => (
    '<h1>Account activated Successfully</h1>'
);

exports.forgotPassword = (url) => (
    `
        <div>
               <h4>Email verification required</h4>
               <p>
                    Click this link within 24 hours to complete your account setup:
                </p>
               <a href=${url}>Forgot your password</a>
               <p>
                    Thanks,
                    Jayesh Sojitra
                </p>
    </div>`
);

exports.passwordUpdated = (message) => (
    `<h1>${message}</h1>`
);

exports.orderDetails=(orders,email,name)=>(
    `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Order Confirmation</title>
    </head>
    <body>
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2>Order Confirmation</h2>
        
        <p>Dear ${name},</p>
        
        <p>Thank you for your order! We are excited to confirm that your order has been successfully placed.</p>
        
        <h3>Order Details:</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <th style="border: 1px solid #dddddd; padding: 8px;">Product</th>
            <th style="border: 1px solid #dddddd; padding: 8px;">Quantity</th>
            <th style="border: 1px solid #dddddd; padding: 8px;">Price</th>
          </tr>
          <!-- Replace the below rows with actual order details dynamically -->
          <tr>
              <td style="border: 1px solid #dddddd; padding: 8px;">Product Name 1</td>
              <td style="border: 1px solid #dddddd; padding: 8px;">{2}</td>
              <td style="border: 1px solid #dddddd; padding: 8px;">$25.00</td>
            </tr>
          
         
          <!-- End of order details -->
          <tr>
            <td colspan="2" style="border: 1px solid #dddddd; padding: 8px; text-align: right;"><strong>Total:</strong></td>
            <td style="border: 1px solid #dddddd; padding: 8px;"><strong>$100.00</strong></td>
          </tr>
        </table>
        
        <p>Your order will be shipped to the following address:</p>
               
        <p>If you have any questions regarding your order, feel free to contact us at <a href="mailto:support@example.com">support@example.com</a>.</p>
        
        <p>Thank you for choosing us. We look forward to serving you again!</p>
        
        <p>Sincerely,<br> [Your Company Name]</p>
      </div>
    </body>
    </html>
    `
);