/**
 * Módulo que se encarga de realizar la lógica de negocio del caso de uso updatePasswordDriver.
 *
 * @module business-driver-
 * @author Cerciber <contact@cerciber.com>
 */

// Modulos instalados
//

// Modulos creados
const userRepository = require('../../../persistence_layer/repositories/userRepository');
const admin = require('../../../aplication_layer/server/firebase-admin');

/**
 * Ingrese la descripción del callback del driver.
 *
 * @callback module:updatePasswordDriver.updatePasswordDriverCallback
 * @param {integer} status - Codigo HTTP de respuesta.
 */

/**
 * Ingrese la descripción del driver.
 *
 * @param {string} email - Correo electronico del usario.
 * @param {string} password - Nueva contraseña del usario cifrada.
 * @param {string} passwordF - Nueva contraseña del usario.
 * @param {module:updatePasswordDriver.updatePasswordDriverCallback} callback - Respuesta a la actualización del sistema.
 */
function updatePasswordDriver(email, password, passwordF, callback) {
  // Logica del caso de uso
  userRepository.update(
    { password: password },
    { where: { email: email } },
    (status, result) => {
      if (status === 200) {
        admin
          .auth()
          .getUserByEmail(email)
          .then(function (userRecord) {
            console.log('Successfully fetched user data:', userRecord.uid);
            admin.auth().updateUser(userRecord.uid, {
              password: passwordF,
            });
          })
          .catch(function (error) {
            console.log('Error fetching user data:', error);
          });
        callback(status, result);
      } else {
        callback(
          status,
          'Lo sentimos, hubo un error en el servidor al registrar el usuario.'
        );
      }
    }
  );
}

module.exports = updatePasswordDriver;
