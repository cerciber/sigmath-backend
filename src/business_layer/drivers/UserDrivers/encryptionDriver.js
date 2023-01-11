/**
 * Controlador que se encarga realizar las opraciones de encriptamiento del sistema.
 * <pre>
 * - Encripta las contraseñas de los usuarios.
 * - Compara contrseñas encriptadas.
 * </pre>
 * @module controllers-encryption
 * @author Cerciber <contact@cerciber.com>
 */

// Modulos instalados
const bcrypt = require('bcryptjs');

/**
 * Respuesta al hashear la contraseña.
 *
 * @callback module:controllers-encryption.encryptPasswordCallback
 * @param {string} hash - Codigo hash de la contraseña.
 */

/**
 * Encriptar la contraseña con hash.
 *
 * @param {string} password - Contraseña a encriptar.
 * @param {module:controllers-encryption.encryptPasswordCallback} callback - Respuesta al hashear la contraseña.
 */
function encryptPassword(password, callback) {
  bcrypt.genSalt(5, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      callback(hash);
    });
  });
}

/**
 * Respuesta al comparar las contraseñas.
 *
 * @callback module:controllers-encryption.comparePasswordsCallback
 * @param {boolean} result - Valida si las contraseñas son iguales o no.
 */

/**
 * Comparar dos contraseñas encriptadas.
 *
 * @param {string} plainTextPassword - Texto plano de la contraseña a comparar.
 * @param {string} hashPassword - Contraseña encriptada con hash.
 * @param {module:controllers-encryption.comparePasswordsCallback} callback - Respuesta al comparar las contraseñas.
 */
function comparePasswords(plainTextPassword, hashPassword, callback) {
  bcrypt.compare(plainTextPassword, hashPassword, function (err, result) {
    callback(result);
  });
}

// Exportar funciones
module.exports = {
  encryptPassword,
  comparePasswords,
};
