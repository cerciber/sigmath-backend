/**
 * Módulo que se encarga de realizar la lógica de negocio del caso de uso sendEmailDriver.
 *
 * @module business-driver-
 * @author Cerciber <contact@cerciber.com>
 */

// Modulos instalados
//

// Modulos creados
const nodemailer = require('nodemailer');
const handlebars = require('nodemailer-express-handlebars');

/**
 * Ingrese la descripción del callback del driver.
 *
 * @callback module:sendEmailDriver.sendEmailDriverCallback
 * @param {string} transporter - Objeto de configuración sobre el remitente del correo.
 * @param {string} mailOptions - Objeto de configuración sobre el correo.
 * @param {string} info.response - Respuesta de envio del correo.
 */

/**
 * Ingrese la descripción del driver.
 *
 * @param {string} email - Correo electronico del usuario destinatario.
 * @param {module:sendEmailDriver.sendEmailDriverCallback} callback - Respuesta al envio del correo.
 * @returns {tipo} - Ingrese la descripción del retorno.
 */
function sendEmail(email, code, callback) {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'labeleon.sigmath@gmail.com',
      pass: 'rlqrpupehsgbtawk',
    },
  });

  var mailOptions = {
    from: 'labeleon.sigmath@gmail.com',
    to: email,
    subject: 'SIGMATH - Cambio de cuenta',
    text: '',
    html:
      '<!DOCTYPE html>' +
      '<html lang="en">' +
      '<head>' +
      '<meta charset="UTF-8">' +
      '<meta name="viewport" content="width=device-width, initial-scale=1.0">' +
      '<style>' +
      '.mail-container {' +
      'background-color: white;' +
      'width: 600px;' +
      'height: 450px' +
      '}' +
      '.mail-top {' +
      'background-color: #02174C;' +
      'border-radius: 5px;' +
      'width: 600px;' +
      'height: 50px' +
      '}' +
      '.mail-middle {' +
      'width: 588px;' +
      'height: 295px;' +
      'border-bottom: 1px solid rgba(0,0,0,0.3);' +
      'margin:0 6px;' +
      '}' +
      '.code {' +
      'background-color: #F07513;' +
      'border-radius: 5px;' +
      'width: 250px;' +
      'height: 62px;' +
      'margin: 12px auto 0;' +
      '}' +
      '#mail-text1 {' +
      'margin-top: 32px;' +
      'font-family: "Signika";' +
      'font-style: normal;' +
      'font-weight: bold;' +
      'font-size: 36px;' +
      'line-height: 44px;' +
      'color: #012070;' +
      '}' +
      '#mail-text2 {' +
      'margin-top: 14px;' +
      'font-family: "Titillium Web";' +
      'font-style: normal;' +
      'font-weight: 600;' +
      'font-size: 24px;' +
      'line-height: 37px;' +
      'color: #000000;' +
      '}' +
      '#mail-text3 {' +
      'margin-top: 35px;' +
      'font-family: "Titillium Web";' +
      'font-style: normal;' +
      'font-weight: 600;' +
      'font-size: 16px;' +
      'line-height: 24px;' +
      'color: #02174C;' +
      '}' +
      '#mail-text4 {' +
      'padding: 10px;' +
      'font-family: "Signika";' +
      'font-style: normal;' +
      'font-weight: bold;' +
      'font-size: 36px;' +
      'line-height: 44px;' +
      'color: #FFFFFF;' +
      '}' +
      '#mail-text1,' +
      '#mail-text2,' +
      '#mail-text3,' +
      '#mail-text4{' +
      'text-align: center;' +
      '}' +
      '</style>' +
      '</head>' +
      '<body>' +
      '<div class="mail-container">' +
      '<div class="mail-top">' +
      '</div>' +
      '<div class="mail-middle">' +
      '<div id="mail-text1">' +
      'Restaura tu contraseña' +
      '</div>' +
      '<div id="mail-text2">' +
      'Código de Verificación' +
      '</div>' +
      '<div class="code">' +
      '<p id="mail-text4">' +
      code +
      '</p>' +
      '</div>' +
      '<div id="mail-text3">' +
      'Copia y pega este código' +
      '</div>' +
      '</div>' +
      '</div>' +
      '<script>' +
      'document.getElementById("mail-text3").innerHTML = "TEST";' +
      '</script>' +
      '</body>' +
      '</html>',
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      callback(500, error);
    } else {
      callback(200, 'El correo fue enviado con exito' + info.response);
    }
  });
}

module.exports = {
  sendEmail,
};
