/**
 * Módulo que se encarga de personalizar y simplificar los llamados a los loggers.
 *
 * @module utils-logger-caller
 * @author Cerciber <contact@cerciber.com>
 */

// Modulos creados
const logger = require('./logger');

/**
 * Crear un log de información.
 *
 * @param {string} path - Ruta de origen del llamado.
 * @param {string} reference - Nombre de referencia de la accion.
 * @param {string} message - Mensaje que describe la acción.
 */
function info(path, reference, message) {
  logger.info(message, {
    path: path,
    reference: reference,
  });
}

/**
 * Crear un log de advertencia.
 *
 * @param {string} path - Ruta de origen del llamado.
 * @param {string} reference - Nombre de referencia de la accion.
 * @param {string} message - Mensaje que describe la acción.
 */
function warn(path, reference, message) {
  logger.warn(message, {
    path: path,
    reference: reference,
  });
}

/**
 * Crear un log de error.
 *
 * @param {string} path - Ruta de origen del llamado.
 * @param {string} reference - Nombre de referencia de la accion.
 * @param {string} message - Mensaje que describe la acción.
 * @param {Error} error - Objeto del error encontrado.
 */
function error(path, reference, message, error) {
  logger.error(message, {
    path: path,
    reference: reference,
    error: error,
  });
}

// Exportar funciones
module.exports = { info: info, warn: warn, error: error };
