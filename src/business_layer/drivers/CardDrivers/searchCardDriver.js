/**
 * Módulo que se encarga de hacer la logica de negocios para buscar fichas.
 *
 * @module business-driver-card-search
 * @author Cerciber <contact@cerciber.com>
 */

// Modulos instalados
const Sequelize = require('sequelize');

// Modulos creados
const cardRepository = require('../../../persistence_layer/repositories/cardRepository');
const userCardModel = require('../../../persistence_layer/models/userCardModel');
const userModel = require('../../../persistence_layer/models/userModel');
const cardInfoModel = require('../../../persistence_layer/models/cardInfoModel');

/**
 *  Respuesta al aplicar la logica de negocios para buscar fichas.
 *
 * @callback module:business-driver-card-search.searchCardDriverCallback
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
 * Logica de negocios para buscar fichas.
 *
 * @param {string} text - Texto para relizar el filtro.
 * @param {module:business-driver-card-search.searchCardDriverCallback} callback - Respuesta al aplicar la logica de negocios para buscar fichas.
 */
function searchCardDriver(text, callback) {
  // Buscar ficha a través del repositorio
  cardRepository.select(
    {
      where: {
        [Sequelize.Op.or]: [
          {
            title: {
              // Encontrar coincidencias en el título
              [Sequelize.Op.iLike]: '%' + text + '%',
            },
          },
          {
            description: {
              // Encontrar coincidencias en la descripción
              [Sequelize.Op.iLike]: '%' + text + '%',
            },
          },
        ],
      },
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
          // Buscar todas las fichas de alcance publico
          where: { scope: { [Sequelize.Op.like]: 'public' } },
        },
      ],
      attributes: null,
      limit: 30,
      raw: false,
    },
    (status, result) => {
      if (status === 200) {
        callback(status, result);
      } else if (status === 404) {
        callback(
          status,
          'No encontramos fichas con la información especificada.'
        );
      } else {
        callback(
          status,
          'Lo sentimos, hubo un error en el servidor al buscar fichas.'
        );
      }
    }
  );
}

// Exportar driver
module.exports = searchCardDriver;
