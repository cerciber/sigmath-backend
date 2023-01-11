/**
 * Módulo que se encarga de hacer la logica de negocios para eliminar una ficha por defecto.
 *
 * @module business-driver-default-card-delete
 * @author Cerciber <contact@cerciber.com>
 */

// Modulos creados
const cardByDefaultRepository = require('../../../persistence_layer/repositories/cardByDefaultRepository');

/**
 * Respuesta al aplicar la logica de negocios para eliminar una ficha por defecto.
 *
 * @callback module:business-driver-default-card-delete.searchCardDriverCallback
 * @param {integer} status - Codigo HTTP de respuesta.
 * @param {json} response - Información de la eliminación.
 * @param {integer} response.length - response.length - Número de registros eliminados.
 */

/**
 * Logica de negocios para eliminar una ficha por defecto.
 *
 * @param {integer} ID_CARD_BY_DEFAULT - Id de la ficha por defecto a borrar.
 * @param {module:business-driver-default-card-delete.destroyCardByDefaultDriverCallback} callback - Respuesta al aplicar la logica de negocios para eliminar una ficha por defecto.
 */
function destroyCardByDefaultDriver(ID_CARD_BY_DEFAULT, callback) {
  // Borrar ficha por defecto a través del repositorio
  cardByDefaultRepository.destroy(
    { where: { ID_CARD_BY_DEFAULT: ID_CARD_BY_DEFAULT } },
    (status, result) => {
      callback(status, result);
    }
  );
}

// Exportar driver
module.exports = destroyCardByDefaultDriver;
