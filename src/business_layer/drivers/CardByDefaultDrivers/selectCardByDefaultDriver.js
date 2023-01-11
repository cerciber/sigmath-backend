/**
 * Módulo que se encarga de hacer la logica de negocios para seleccionar una ficha por defecto.
 *
 * @module business-driver-default-card-select
 * @author Cerciber <contact@cerciber.com>
 */

// Modulos creados
const cardByDefaultRepository = require('../../../persistence_layer/repositories/cardByDefaultRepository');

/**
 * Respuesta al aplicar la logica de negocios para seleccionar una ficha por defecto.
 *
 * @callback module:business-driver-default-card-select.updateCardByDefaultDriverCallback
 * @param {tipo} status - Codigo HTTP de respuesta.
 * @param {json[]} defaultCards - Lista de fichas por defecto.
 * @param {integer} defaultCards.ID_CARD_BY_DEFAULT - Id de la ficha por defecto.
 * @param {integer} defaultCards.ID_CARD - Id de la ficha asociada.
 * @param {integer} defaultCards.ID_CATEGORY - Id de la categoría asociada.
 */

/**
 * Logica de negocios para seleccionar una ficha por defecto.
 *
 * @param {integer} ID_CARD_BY_DEFAULT - Id de la ficha por defecto a borrar.
 * @param {module:business-driver-default-card-select.updateCardByDefaultDriverCallback} callback - Respuesta al aplicar la logica de negocios para seleccionar una ficha por defecto.
 */
function selectCardByDefaultDriver(ID_CARD_BY_DEFAULT, callback) {
  // Seleccionar ficha por defecto a través del repositorio
  cardByDefaultRepository.select(
    {
      where: { ID_CARD_BY_DEFAULT: ID_CARD_BY_DEFAULT },
      attributes: ['ID_CARD_BY_DEFAULT', 'ID_CARD', 'ID_CATEGORY'],
    },
    (status, result) => {
      callback(status, result);
    }
  );
}

// Exportar driver
module.exports = selectCardByDefaultDriver;
