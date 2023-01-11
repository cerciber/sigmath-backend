/**
 * Módulo que se encarga de hacer la logica de negocios para crear una ficha rápida.
 *
 * @module business-driver-card-fast
 * @author Cerciber <contact@cerciber.com>
 */

// Modulos creados
const solveCardDriver = require('./solveCardDriver');

/**
 * Respuesta al aplicar la logica de negocios para crear una ficha rápida.
 *
 * @callback module:business-driver-card-fast.fastCardDriverCallback
 * @param {integer} status - Codigo HTTP de respuesta.
 * @param {json} card - Ficha matemática obtenida de la expresión.
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
 * Logica de negocios para crear una ficha rápida.
 *
 * @param {string} text - Expresión matemática a convertir a ficha.
 * @param {module:business-driver-card-fast.fastCardDriverCallback} callback - Respuesta al aplicar la logica de negocios para crear una ficha rápida.
 */
function fastCardDriver(text, callback) {
  // Construir ficha para la expresión matemática
  var card = {
    title: '',
    description: '',
    params: [],
    latexCode: '',
    pythonCode: `def main():\n  exp = sympify("${text}")\n  return exp`,
  };

  // Usar Driver de resolver ficha
  solveCardDriver(card, (status, result) => {
    callback(status, result);
  });
}

// Exportar Driver
module.exports = fastCardDriver;
