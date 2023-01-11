/**
 * Módulo que se encarga de hacer la logica de negocios para seleccionar una ficha.
 *
 * @module business-driver-card-select
 * @author Cerciber <contact@cerciber.com>
 */

// Modulos creados
const userRepository = require('../../../persistence_layer/repositories/userRepository');
const userCardModel = require('../../../persistence_layer/models/userCardModel');
const cardInfoModel = require('../../../persistence_layer/models/cardInfoModel');
const cardModel = require('../../../persistence_layer/models/cardModel');
const userModel = require('../../../persistence_layer/models/userModel');

/**
 * Respuesta al aplicar la logica de negocios para seleccionar una ficha.
 *
 * @param {integer} status - Codigo HTTP de respuesta.
 * @param {json[]} cards - Lista de fichas del filtro.
 * @param {json} cards.ID_CARD - Id de la ficha en la base de datos.
 * @param {string} cards.title - Título de la ficha.
 * @param {string} cards.description - Descripción de la ficha.
 * @param {json[]} cards.params - Parámetros de la ficha.
 * @param {string} cards.params.symbol - Symbolo LaTeX del parámetro.
 * @param {string} cards.params.description - Descripción del parámetro.
 * @param {json} cards.params.content - Ficha matemática del parámetro o valor nulo.
 * @param {string} cards.latexCode - Codigo LaTeX de la ficha.
 * @param {string} cards.pythonCode - Codigo Python de la ficha.
 */

/**
 * Logica de negocios para seleccionar una ficha.
 *
 * @param {string} ID_USER - Id del usuario en la base de datos.
 * @param {tipo} ID_CARD - Id de la ficha en la base de datos.
 * @param {module:business-driver-card-select.updateCardDriverCallback} callback - Respuesta al aplicar la logica de negocios para seleccionar una ficha.
 */
function selectCardDriver(email, callback) {
  // Seleccionar ficha a través del repositorio
  userRepository.select(
    {
      where: { email: email },
      include: [
        {
          model: userCardModel,
          include: [
            {
              model: cardModel,
              include: [
                {
                  model: userCardModel,
                  include: [
                    {
                      model: userModel,
                    },
                  ],
                },
                {
                  model: cardInfoModel,
                },
              ],
            },
          ],
        },
      ],
      raw: false,
    },
    (status, result) => {
      if (status === 200) {
        if (result[0].UserCards.length > 0) {
          callback(status, result[0].UserCards);
        } else {
          callback(404, 'Aún no tienes fichas en tu cuenta.');
        }
      } else {
        callback(
          status,
          'Lo sentimos, hubo un error en el servidor al buscar tus fichas.'
        );
      }
    }
  );
}

// Exportar driver
module.exports = selectCardDriver;
