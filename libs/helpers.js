require('dotenv').config();
const sgMail = require('@sendgrid/mail');
const { SENDGRID_FROM } = process.env;

/**
 * ##############
 * ## sendMail ##
 * ##############
 */
async function sendMail({ to, subject, body }) {
  // Preparamos el mensaje.
  const msg = {
    to,
    from: SENDGRID_FROM,
    subject,
    text: body,
    html: `
            <div>
                <h1>${subject}</h1>
                <p>${body}</p>
            </div>
        `,
  };

  // Enviamos el mensaje.
  await sgMail.send(msg);
}

module.exports = {
  sendMail,
};
