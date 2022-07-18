const nodemailer = require("nodemailer");


let  num1 =[];
let num2;
function randNUm(){  
let num = (Math.floor(Math.random() * 1000000)) + 9000000;
//  console.log(num2);
num2 = num;
 num1.push( num2 );
}
// async..await is not allowed in global scope, must use a wrapper
async function main(data,otp) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'ghogharinikunj97@gmail.com', // generated ethereal user
        pass: 'tjgjgbpgzsujdnsi', // generated ethereal password
    },
  });
  
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'ghogharinikunj97@gmail.com', // sender address
    to: `${data}`, // list of receivers
    subject: "Hello ✔", // Subject line
    text: `your New password is ${num1[0]}.. use this password for login and change your passsword.`, // plain text body
    html: `your OTP for Changing Password is : ${otp}`, // html body
  });
  
  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
module.exports = {main,num1,num2,randNUm};
