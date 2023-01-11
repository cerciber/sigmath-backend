/**
 * Módulo que se encarga de hacer la logica de negocios para insertar una ficha por defecto.
 *
 * @module business-driver-default-card-insert
 * @author Cerciber <contact@cerciber.com>
 */

// Modulos creados
const cardByDefaultRepository = require('../../../persistence_layer/repositories/cardByDefaultRepository');

/**
 * Respuesta al aplicar la logica de negocios para insertar una ficha por defecto.
 *
 * @callback module:business-driver-default-card-insert.insertCardByDefaultDriverCallback
 * @param {integer} status - Codigo HTTP de respuesta.
 * @param {json} defaultCard - Ficha por defecto insertada.
 * @param {integer} defaultCard.ID_CARD_BY_DEFAULT - Id de la ficha por defecto.
 * @param {integer} defaultCard.ID_CARD - Id de la ficha asociada.
 * @param {integer} defaultCard.ID_CATEGORY - Id de la categoría asociada.
 */

/**
 * Logica de negocios para insertar una ficha por defecto.
 *
 * @param {integer} ID_CARD - Id de la ficha asociada.
 * @param {integer} ID_CATEGORY - Id de la categoría asociada.
 * @param {module:business-driver-default-card-insert.insertCardByDefaultDriverCallback} callback - Respuesta al aplicar la logica de negocios para insertar una ficha por defecto.
 */
function insertCardByDefaultDriver(ID_CARD, ID_CATEGORY, callback) {
  // Insertar ficha por defecto a través del repositorio
  cardByDefaultRepository.insert(
    {
      ID_CARD: ID_CARD,
      ID_CATEGORY: ID_CATEGORY,
    },
    (status, result) => {
      callback(status, result);
    }
  );
}

// Exportar driver
module.exports = insertCardByDefaultDriver;
