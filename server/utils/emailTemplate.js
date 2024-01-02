exports.verifyAccount = (url) => (
`
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Account Activation</title>
</head>

<body>
    <table align="center" cellpadding="0" cellspacing="0" width="600">
        <tr>
            <td align="center" bgcolor="#f7f7f7" style="padding: 40px 0 30px 0;">
                <h1>Welcome to Ecom App!</h1>
            </td>
        </tr>
        <tr>
            <td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px;">
                <p>Dear [User's Name],</p>
                <p>We're thrilled to have you join us! To activate your account and start exploring our services, please follow the simple steps below:</p>
                <ol>
                    <li>Click on the following link to activate your account: <a href=${url}>Activate Account</a></li>
                    <li>If the link doesn't work, copy and paste the URL into your browser's address bar.</li>
                </ol>
            </td>
        </tr>
    </table>
</body>

</html>
`

);

exports.accountActivated = (username) => (
   `<!DOCTYPE html>
    <html lang="en">
       <head>
          <meta charset="UTF-8">
          <title>Account Activated</title>
       </head>
       <body style="font-family: Arial, sans-serif; margin: 0; padding: 0;">
          <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
             <tr>
                <td style="padding: 20px 0; text-align: center; background-color: #f5f5f5;">
                   <h1 style="color: #333;">Account Activated Successfully</h1>
                </td>
             </tr>
             <tr>
                <td style="padding: 20px;">
                   <p style="font-size: 16px; line-height: 1.6; color: #555;">Dear ${username},</p>
                   <p style="font-size: 16px; line-height: 1.6; color: #555;">Your account has been successfully activated. You can now access all the features and services.</p>
                   <p style="font-size: 16px; line-height: 1.6; color: #555;">If you have any questions or need further assistance, feel free to contact us.</p>
                   <p style="font-size: 16px; line-height: 1.6; color: #555;">Thank you!</p>
                </td>
             </tr>
          </table>
       </body>
    </html>`
);

exports.forgotPassword = (url) => (
   `<!DOCTYPE html>
      <html lang="en">
         <head>
            <meta charset="UTF-8">
            <title>Account Activated</title>
         </head>
         <body style="font-family: Arial, sans-serif; margin: 0; padding: 0;">
            <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
               <tr>
                  <td style="padding: 20px 0; text-align: center; background-color: #f5f5f5;">
                     <h1 style="color: #333;">Forgot Your Password?</h1>
                     <p>Click the button below to reset your password:</p>
                     <p>No worries! It happens to the best of us. Let's get you back on track.</p>
                  </td>
                  </td>
               </tr>
               <tr>
                  <td align="center">
                     <table>
                        <tr>
                           <td align="center">
                              <br/><br/><br/>
                              <a href=${url} style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 5px;">Reset Password</a>
                              <br/><br/><br/>
                           </td>
                        </tr>
                        <tr>
                           <td>
                              <p>If you didn't request this, please ignore this email. Your password will remain unchanged.</p>
                           </td>
                        </tr>
                     </table>
                  </td>
               </tr>
            </table>
         </body>
      </html>`
);

exports.passwordUpdated = () => (
    `<!DOCTYPE html>
    <html lang="en">
       <head>
          <meta charset="UTF-8">
          <title>Account Activated</title>
       </head>
       <body style="font-family: Arial, sans-serif; margin: 0; padding: 0;">
          <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
             <tr>
                <td style="padding: 20px 0; text-align: center; background-color: #f5f5f5;">
                   <h1>Your Password has been Updated</h1>
                   <p>Your password has been successfully changed.</p>
                </td>
                </td>
             </tr>
             <tr>
                <td align="center">
                   <table>
                      <tr>
                         <td align="center">
                            <p>If you made this change, you can safely disregard this email. If you didn't change your password, please contact us immediately.</p>
                         </td>
                      </tr>
                      <tr>
                         <td align="center">
                            <p>Thank you,</p>
                            <p>The Ecom AppTeam</p>
                         </td>
                      </tr>
                   </table>
                </td>
             </tr>
          </table>
       </body>
    </html>`
);

