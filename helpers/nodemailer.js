const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

const keys = require("../config/keys");

const transporter = nodemailer.createTransport(
  smtpTransport({
    service: "gmail",
    auth: {
      user: keys.emailAddress,
      pass: keys.password
    }
  })
);

module.exports = function(userEmail) {
  const mailOptions = {
    from: '"findByIndex" <admin@findbyindex.com>',
    to: userEmail,
    subject: "New Message Received",
    text: "TEST",
    html: `
    <div style="width: 100%; background-color: #f2f2f2; padding: 2%;">
    <div style="width: 60%; background-color: white; margin: auto;">
      <div style="height:40px; background-color: #2e353d ; width:100%">
        <center><h2 style="padding-top: 7px; color: #f2f2f2;">findByIndex</h2>
        </center>
      </div>
      <div style="padding: 4%">
        <div class="row">
          <p>Welcome to findByIndex</p>
        </div>
      </div>
    </div>
  </div>`
  };

  transporter.sendMail(mailOptions, (err, res) => {
    console.log("Error", err);
    console.log("Result", res);
  });
};
