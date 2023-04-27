exports.verifyAccount = (url) => (
  `
        <div>
               <h4>Email verification required</h4>
               <p>
                    Click this link within 24 hours to complete your Blog account setup:
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
