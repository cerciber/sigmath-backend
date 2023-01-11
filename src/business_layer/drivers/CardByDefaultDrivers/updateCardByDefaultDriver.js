/**
 * Módulo que se encarga de hacer la logica de negocios para actualizar una ficha por defecto.
 *
 * @module business-driver-default-card-update
 * @author Cerciber <contact@cerciber.com>
 */

// Modulos creados
const cardByDefaultRepository = require('../../../persistence_layer/repositories/cardByDefaultRepository');

/**
 * Respuesta al aplicar la logica de negocios para actualizar una ficha por defecto.
 *
 * @callback module:business-driver-default-card-update.updateCardByDefaultDriverCallback
 * @param {integer} status - Codigo HTTP de respuesta.
 * @param {json} response - Información de la actualización.
 * @param {integer} response.length - response.length - Número de registros actualizados.
 */

/**
 * Logica de negocios para actualizar una ficha por defecto.
 *
 * @param {integer} ID_CARD_BY_DEFAULT - Id de la ficha por defecto a actualizar.
 * @param {integer} ID_CARD - Id de la ficha asociada.
 * @param {integer} ID_CATEGORY - Id de la categoría asociada.
 * @param {module:business-driver-default-card-update.updateCardByDefaultDriverCallback} callback - Respuesta al aplicar la logica de negocios para actualizar una ficha por defecto.
 */
function updateCardByDefaultDriver(
  ID_CARD_BY_DEFAULT,
  ID_CARD,
  ID_CATEGORY,
  callback
) {
  // Insertar ficha por defecto a través del repositorio
  cardByDefaultRepository.update(
    {
      ID_CARD: ID_CARD,
      ID_CATEGORY: ID_CATEGORY,
    },
    { where: { ID_CARD_BY_DEFAULT: ID_CARD_BY_DEFAULT } },
    (status, result) => {
      callback(status, result);
    }
  );
}

// Exportar Driver
module.exports = updateCardByDefaultDriver;
