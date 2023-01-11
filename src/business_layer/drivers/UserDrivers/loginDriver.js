/**
 * Módulo que se encarga de hacer la logica de negocios para autenticar un usuario en el sistema.
 *
 * @module business-driver-user-login
 * @author Cerciber <contact@cerciber.com>
 */

// Modulos creados
const userRepository = require('../../../persistence_layer/repositories/userRepository');

/**
 * Respuesta al aplicar la logica de negocios para obtener los datos un usuario en el sistema para autenticar.
 *
 * @callback module:business-driver-user-login.loginDriverCallback
 * @param {integer} status - Codigo HTTP de respuesta.
 * @param {json} user - Datos del usuario registrado.
 * @param {integer} user.ID_USER - Id del usuario registrado.
 * @param {string} user.nickname - Nombre de usuario.
 * @param {string} user.email - Correo electrónico del usuario.
 * @param {string} user.password - Contraseña del usuario.
 */

/**
 * Logica de negocios para obtener los datos un usuario en el sistema para autenticar.
 *
 * @param {string} email - Correo electrónico del usuario.
 * @param {module:business-driver-user-login.loginDriverCallback} callback - Respuesta al aplicar la logica de negocios para obtener los datos un usuario en el sistema para autenticar.
 */
function loginDriver(email, callback) {
  // Autenticar usuario a través del repositorio
  userRepository.select({ where: { email: email } }, (status, result) => {
    // Si se encontraron resultados
    if (status === 200) {
      // Retornar datos del usuario logeado
      callback(status, result[0]);
    }

    // Si no se encontraron resultados
    else if (status === 404) {
      // Retornar datos del usuario logeado
      callback(status, 'El e-mail o la contraseña no son válidos.');
    }

    // Si es otro caso
    else {
      // Notificar auntenticación inválida
      callback(status, 'Lo sentimos, hubo un error al autenticar el usuario.');
    }
  });
}

// Exportar driver
module.exports = loginDriver;
