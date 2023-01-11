/**
 * Módulo que se encarga de hacer la logica de negocios para insertar una ficha.
 *
 * @module business-driver-card-insert
 * @author Cerciber <contact@cerciber.com>
 */

// Modulos creados
const cardRepository = require('../../../persistence_layer/repositories/cardRepository');
const userRepository = require('../../../persistence_layer/repositories/userRepository');
const userCardRepository = require('../../../persistence_layer/repositories/userCardRepository');
const cardInfoRepository = require('../../../persistence_layer/repositories/cardInfoRepository');

/**
 * Respuesta al aplicar la logica de negocios para insertar una ficha.
 *
 * @callback module:business-driver-card-insert.insertCardDriverCallback
 * @param {integer} status - Codigo HTTP de respuesta.
 * @param {json} card - Ficha matemática obtenida de la expresión.
 * @param {json} card.ID_CARD - Id de la ficha en la base de datos.
 * @param {string} card.title - Título de la ficha.
 * @param {string} card.description - Descripción de la ficha.
 * @param {json[]} card.params - Parámetros de la ficha.
 * @param {string} card.params.symbol - Symbolo LaTeX del parámetro.
 * @param {string} card.params.description - Descripción del parámetro.
 * @param {json} card.params.content - Ficha matemática del parámetro o valor nulo.
 * @param {string} card.latexCode - Codigo LaTeX de la ficha.
 * @param {string} card.pythonCode - Codigo Python de la ficha.
 */

/**
 * Logica de negocios para insertar una ficha.
 *
 * @param {string} ID_USER - Id del usuario.
 * @param {string} card - Ficha matemática.
 * @param {string} card.title - Título de la ficha.
 * @param {string} card.description - Descripción de la ficha.
 * @param {json[]} card.params - Parámetros de la ficha.
 * @param {string} card.params.symbol - Symbolo LaTeX del parámetro.
 * @param {string} card.params.description - Descripción del parámetro.
 * @param {json} card.params.content - Ficha matemática del parámetro o valor nulo.
 * @param {string} card.latexCode - Codigo LaTeX de la ficha.
 * @param {string} card.pythonCode - Codigo Python de la ficha.
 * @param {module:business-driver-card-insert.insertCardDriverCallback} callback - Respuesta al aplicar la logica de negocios para insertar una ficha.
 */
function insertCardDriver(email, card, callback) {
  // Obtener usuario a través del repositorio
  userRepository.select({ where: { email: email } }, (status, userResult) => {
    // Si el usuario está registrado
    if (status === 200) {
      // Insertar ficha a través del repositorio
      cardRepository.insert(
        {
          title: card.title,
          description: card.description,
          params: card.params,
          latexCode: card.latexCode,
          pythonCode: card.pythonCode,
        },
        {},
        (status, cardResult) => {
          // Si la ficha se ingresó correctamente
          if (status === 201) {
            // Insertar ficha del usuario a través del repositorio
            userCardRepository.insert(
              {
                ID_USER: userResult[0].ID_USER,
                ID_CARD: cardResult.ID_CARD,
              },
              (status, userCardResult) => {
                // Si la ficha del usuario se ingresó correctamente
                if (status === 201) {
                  // Insertar información de la ficha a través del repositorio
                  var datetime = new Date();
                  cardInfoRepository.insert(
                    {
                      ID_CARD: userCardResult.ID_CARD,
                      creationDate: datetime,
                      modificationDate: datetime,
                      scope: 'public',
                    },
                    (status, result) => {
                      if (status === 201) {
                        callback(status, result);
                      } else {
                        callback(
                          status,
                          'Lo sentimos, hubo un error en el servidor al guardar información adicional de la ficha.'
                        );
                      }
                    }
                  );
                } else {
                  // Notificar error
                  callback(
                    status,
                    'Lo sentimos, hubo un error en el servidor al relacionar la ficha con el usuario.'
                  );
                }
              }
            );
          } else {
            // Notificar error
            callback(
              status,
              'Lo sentimos, hubo un error en el servidor al guardar la ficha matemática.'
            );
          }
        }
      );
    }

    // Si el usuario no está registrado
    else if (status === 404) {
      // Retornar datos del usuario logeado
      callback(status, 'El usuario no se encuenta registrado');
    }

    // Si es otro caso
    else {
      // Notificar error
      callback(
        status,
        'Lo sentimos, hubo un error en el servidor al buscar el usuario.'
      );
    }
  });
}

// Exportar driver
module.exports = insertCardDriver;
