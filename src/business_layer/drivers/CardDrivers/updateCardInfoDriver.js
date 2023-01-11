/**
 * Módulo que se encarga de hacer la logica de negocios para actualizar la informacion de una ficha.
 *
 * @module business-driver-card-info-update
 * @author Cerciber <contact@cerciber.com>
 */

// Modulos creados
const cardInfoRepository = require('../../../persistence_layer/repositories/cardInfoRepository');

/**
 * Respuesta al aplicar la logica de negocios para actualizar la informacion de una ficha.
 *
 * @callback module:business-driver-card-update.updateCardDriverCallback
 * @param {integer} status - Codigo HTTP de respuesta.
 * @param {json} response - Información de la eliminación.
 * @param {integer} response.length - response.length - Número de registros actualizados.
 */

/**
 * Logica de negocios para actualizar una ficha.
 *
 * @param {string} ID_USER - Id del usuario en la base de datos.
 * @param {string} info - Informacion de una ficha matemática.
 * @param {string} info.ID_CARD - Id de la ficha en la base de datos.
 * @param {string} info.scope - Alcance de la ficha
 * @param {module:business-driver-card-update.updateCardDriverCallback} callback - Respuesta al aplicar la logica de negocios para actualizar una ficha.
 */
function updateCardInfoDriver(info, callback) {
  cardInfoRepository.update(
    {
      scope: info.scope,
    },
    { where: { ID_CARD: info.ID_CARD } },
    (status, result) => {
      callback(status, result);
    }
  );
}

// Exportar Driver
module.exports = updateCardInfoDriver;
