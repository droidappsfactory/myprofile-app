const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports.sendMail = (to, subject, message,html) => {
    msg = {to: to, subject: subject, message: message,html: html, from: 'SriMaharshi<noreply@sendgrid.com>'}
    sgMail.send(msg).then(data => {
        console.log('mail sent')
    }).catch( err => {
        console.log('error ', err)
    });
}