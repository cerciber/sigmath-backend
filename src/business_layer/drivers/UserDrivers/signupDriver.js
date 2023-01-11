/**
 * Módulo que se encarga de hacer la logica de negocios para registrar un usuario en el sistema.
 *
 * @module business-driver-user-signup
 * @author Cerciber <contact@cerciber.com>
 */

// Modulos creados
const userRepository = require('../../../persistence_layer/repositories/userRepository');

/**
 * Respuesta al aplicar la logica de negocios para registrar un usuario en el sistema.
 *
 * @callback module:business-driver-user-signup.sigupDriverCallback
 * @param {integer} status - Codigo HTTP de respuesta.
 * @param {json} user - Datos del usuario registrado.
 * @param {integer} user.ID_USER - Id del usuario registrado.
 * @param {string} user.nickname - Nombre de usuario.
 * @param {string} user.email - Correo electrónico del usuario.
 * @param {string} user.password - Contraseña del usuario.
 */

/**
 * Logica de negocios para registrar un usuario en el sistema.
 *
 * @param {string} nickname - Correo electrónico del usuario.
 * @param {string} email - Correo electrónico del usuario.
 * @param {string} password - Contraseña del usuario.
 * @param {module:business-driver-user-signup.sigupDriverCallback} callback - Respuesta al aplicar la logica de negocios para registrar un usuario en el sistema.
 */
function sigupDriver(nickname, email, password, callback) {
  // Registrar usuario a través del repositorio
  userRepository.insert(
    { nickname: nickname, email: email, password: password },
    (status, result) => {
      if (result === 201) {
        callback(status, result);
      } else if (result === 409) {
        callback(
          status,
          'El correo electrónico que ingresaste ya está en uso.'
        );
      } else {
        callback(
          status,
          'Lo sentimos, hubo un error en el servidor al registrar el usuario.'
        );
      }
    }
  );
}

// Exportar driver
module.exports = sigupDriver;
