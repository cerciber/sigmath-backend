/**
 * Módulo que se encarga de realizar la lógica de negocio del caso de uso rateDriver.
 *
 * @module business-driver-card-rate
 * @author Cerciber <contact@cerciber.com>
 */

// Modulos creados
const rateRepository = require('../../../persistence_layer/repositories/rateRepository');
const cardInfoRepository = require('../../../persistence_layer/repositories/cardInfoRepository');
const userRepository = require('../../../persistence_layer/repositories/userRepository');

/**
 *  Respuesta al aplicar la logica de negocios para eliminar una ficha.
 *
 * @callback module:business-driver-card-rate.destroyCardDriverCallback
 * @param {integer} status - Codigo HTTP de respuesta.
 * @param {text} response - Información de la calificación.
 */

/**
 * Logica de negocios para eliminar una ficha.
 *
 * @param {string} ID_USER - Id del usuario en la base de datos.
 * @param {integer} ID_CARD - Id de la ficha.
 * @param {number} rate - Calificación de la ficha.
 * @param {module:business-driver-card-rate.destroyCardDriverCallback} callback - Respuesta al aplicar la logica de negocios para eliminar una ficha.
 */
function rateDriver(email, ID_CARD, rate, callback) {
  // Seleccionar usuario
  userRepository.select({ where: { email: email } }, (status, userResult) => {
    // Actualizar ficha
    rateRepository.update(
      { rate: rate },
      { where: { ID_USER: userResult[0].ID_USER, ID_CARD: ID_CARD } },
      (status) => {
        // Si se pudo actualizar la calificación
        if (status === 200) {
          // Asignar promedio de las calificaciones a la ficha
          cardInfoRepository.setAverageRate(ID_CARD, (status, result) => {
            callback(status, result);
          });
        }

        // Si no hay una calificación anterior
        else if (status === 404) {
          // Ingresar nueva calificación
          rateRepository.insert(
            { ID_USER: userResult[0].ID_USER, ID_CARD: ID_CARD, rate: rate },
            (status) => {
              // Si se pudo ingresar la calificación
              if (status === 201) {
                // Asignar promedio de las calificaciones a la ficha
                cardInfoRepository.setAverageRate(ID_CARD, (status, result) => {
                  callback(status, result);
                });
              } else {
                callback(
                  status,
                  'Lo sentimos, hubo un error en el servidor al calificar la ficha.'
                );
              }
            }
          );
        } else {
          callback(
            status,
            'Lo sentimos, hubo un error en el servidor al calificar la ficha.'
          );
        }
      }
    );
  });
}

module.exports = rateDriver;
