const nodemailer = require('nodemailer')
const Mailgen = require('mailgen')
module.exports = sendEmail = (options) => {
   const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
         user: process.env.EMAIL_USERNAME,
         pass: process.env.EMAIL_PASSWORD
      }
   })

   const MailGen = new Mailgen({
      theme: 'default',
      product: {
         name: 'CTsites',
         link: 'https://ctsites.com'
      }
   })

   const email = MailGen.generate(
      {
         body: {
            name: options.username,
            intro: 'Welcome to CTsites!',
            action: {
               instructions: options.instructions,
               button: {
                  color: '#22BC66', // Optional action button color
                  text: 'Click here',
                  link: options.link,
               }
            },
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
         }
      }
   )


   const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: options.to,
      subject: options.subject,
      html: email,
   }

   transporter.sendMail(mailOptions, function (err, info) {
      if (err) console.log(err);
      // else console.log(info)
   })
}

