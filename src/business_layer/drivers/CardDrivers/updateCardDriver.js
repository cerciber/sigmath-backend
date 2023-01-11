/**
 * Módulo que se encarga de hacer la logica de negocios para actualizar una ficha.
 *
 * @module business-driver-card-update
 * @author Cerciber <contact@cerciber.com>
 */

// Modulos creados
const cardRepository = require('../../../persistence_layer/repositories/cardRepository');
const userCardRepository = require('../../../persistence_layer/repositories/userCardRepository');
const cardInfoRepository = require('../../../persistence_layer/repositories/cardInfoRepository');
const userRepository = require('../../../persistence_layer/repositories/userRepository');

/**
 * Respuesta al aplicar la logica de negocios para actualizar una ficha.
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
 * @param {string} card - Ficha matemática.
 * @param {string} card.ID_CARD - Id de la ficha en la base de datos.
 * @param {string} card.title - Título de la ficha.
 * @param {string} card.description - Descripción de la ficha.
 * @param {json[]} card.params - Parámetros de la ficha.
 * @param {string} card.params.symbol - Symbolo LaTeX del parámetro.
 * @param {string} card.params.description - Descripción del parámetro.
 * @param {json} card.params.content - Ficha matemática del parámetro o valor nulo.
 * @param {string} card.latexCode - Codigo LaTeX de la ficha.
 * @param {string} card.pythonCode - Codigo Python de la ficha.
 * @param {module:business-driver-card-update.updateCardDriverCallback} callback - Respuesta al aplicar la logica de negocios para actualizar una ficha.
 */
function updateCardDriver(email, card, callback) {
  // Seleccionar usuario
  userRepository.select({ where: { email: email } }, (status, userResult) => {
    // Buscar la ficha del usuario
    userCardRepository.select(
      { where: { ID_USER: userResult[0].ID_USER, ID_CARD: card.ID_CARD } },
      (status) => {
        // Si la ficha es del usuario
        if (status === 200) {
          // Actualizar ficha a través del repositorio
          cardRepository.update(
            {
              title: card.title,
              description: card.description,
              params: card.params,
              latexCode: card.latexCode,
              pythonCode: card.pythonCode,
            },
            { where: { ID_CARD: card.ID_CARD } },
            (status, cardResult) => {
              // Si la ficha se actualizó correctamente
              if (status === 200) {
                // Actualizar información de la ficha a través del repositorio
                cardInfoRepository.update(
                  {
                    modificationDate: new Date(),
                  },
                  { where: { ID_CARD: card.ID_CARD } },
                  (status, result) => {
                    callback(status, result);
                  }
                );
              }

              // Si es otro caso
              else {
                // Notificar error
                callback(status, cardResult);
              }
            }
          );
        }

        // Si no se encontró la ficha del usuario
        else if (status === 404) {
          // Retornar datos del usuario logeado
          callback(status, 'No encontramos la ficha matemática a actualizar.');
        }

        // Si es otro caso
        else {
          // Notificar error
          callback(
            status,
            'Lo sentimos, hubo un error en el servidor a intentar actualizar la ficha matemática.'
          );
        }
      }
    );
  });
}

// Exportar Driver
module.exports = updateCardDriver;
