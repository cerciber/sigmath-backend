/**
 * Módulo que se encarga de hacer la logica de negocios para eliminar una ficha.
 *
 * @module business-driver-card-delete
 * @author Cerciber <contact@cerciber.com>
 */

// Modulos creados
const cardRepository = require('../../../persistence_layer/repositories/cardRepository');
const userCardRepository = require('../../../persistence_layer/repositories/userCardRepository');
const userModel = require('../../../persistence_layer/models/userModel');

/**
 *  Respuesta al aplicar la logica de negocios para eliminar una ficha.
 *
 * @callback module:business-driver-card-delete.destroyCardDriverCallback
 * @param {integer} status - Codigo HTTP de respuesta.
 * @param {json} response - Información de la eliminación.
 * @param {integer} response.length - response.length - Número de registros eliminados.
 */

/**
 * Logica de negocios para eliminar una ficha.
 *
 * @param {string} ID_USER - Id del usuario en la base de datos.
 * @param {integer} ID_CARD - Id de la ficha.
 * @param {module:business-driver-card-delete.destroyCardDriverCallback} callback - Respuesta al aplicar la logica de negocios para eliminar una ficha.
 */
function destroyCardDriver(email, ID_CARD, callback) {
  // Buscar la ficha del usuario
  userCardRepository.select(
    {
      where: { ID_CARD: ID_CARD },
      include: [
        {
          model: userModel,
          where: { email: email },
        },
      ],
      raw: false,
    },
    (status) => {
      // Si la ficha es del usuario
      if (status === 200) {
        // Eliminar ficha a través del repositorio
        cardRepository.destroy(
          { where: { ID_CARD: ID_CARD } },
          (status, result) => {
            callback(status, result);
          }
        );
      }

      // Si no se encontró la ficha del usuario
      else if (status === 404) {
        callback(status, 'No encontramos la ficha matemática a eliminar.');
      }

      // Si es otro caso
      else {
        // Notificar error
        callback(
          status,
          'Lo sentimos, hubo un error en el servidor a intentar eliminar la ficha matemática.'
        );
      }
    }
  );
}

// Exportar Driver
module.exports = destroyCardDriver;
