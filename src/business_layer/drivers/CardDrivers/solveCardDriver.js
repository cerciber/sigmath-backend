/**
 * Módulo que se encarga de hacer la logica de negocios para resolver una ficha.
 *
 * @module business-driver-card-solve
 * @author Cerciber <contact@cerciber.com>
 */

// Modulos instalados
var base32 = require('base32');

// Modulos creados
const solverCardEntity = require('../../entities/solverCardEntity');

/**
 * Respuesta al aplicar la logica de negocios para seleccionar una ficha.
 *
 * @callback module:business-driver-card-solve.solveCardDriverCallback
 * @param {integer} status - Codigo HTTP de respuesta.
 * @param {json} newCardJson - Ficha matemática Json.
 * @param {string} newCardJson.title - Título de la ficha.
 * @param {string} newCardJson.description - Descripción de la ficha.
 * @param {json[]} newCardJson.params - Parámetros de la ficha.
 * @param {string} newCardJson.params.symbol - Symbolo LaTeX del parámetro.
 * @param {string} newCardJson.params.description - Descripción del parámetro.
 * @param {json} newCardJson.params.content - Ficha matemática del parámetro o valor nulo.
 * @param {string} newCardJson.latexCode - Codigo LaTeX de la ficha.
 * @param {string} newCardJson.pythonCode - Codigo Python de la ficha.
 */

/**
 * Logica de negocios para resolver una ficha con toda su estructura de datos y generando una nueva ficha resultado con toda su estructura.
 *
 * @param {json} cardJson - Ficha matemática Json.
 * @param {string} cardJson.title - Título de la ficha.
 * @param {string} cardJson.description - Descripción de la ficha.
 * @param {json[]} cardJson.params - Parámetros de la ficha.
 * @param {string} cardJson.params.symbol - Symbolo LaTeX del parámetro.
 * @param {string} cardJson.params.description - Descripción del parámetro.
 * @param {json} cardJson.params.content - Ficha matemática del parámetro o valor nulo.
 * @param {string} cardJson.latexCode - Codigo LaTeX de la ficha.
 * @param {string} cardJson.pythonCode - Codigo Python de la ficha.
 * @param {module:business-driver-card-solve.solveCardDriverCallback} callback - Respuesta al aplicar la logica de negocios para seleccionar una ficha.
 */
function solveCardDriver(cardJson, callback) {
  // Si la ficha llegó con un parámetro string
  if (typeof cardJson === 'string') {
    // Construir ficha para la expresión matemática
    cardJson = {
      title: '',
      description: '',
      params: [],
      latexCode: '',
      pythonCode: `def main():\n  exp = sympify("${cardJson}")\n  return exp`,
    };

    // Procesar ficha para tener el formato adecuado
    solveCardDriver(cardJson, (status, result) => {
      if (status === 200) {
        solveCardRecursively(result, (status, result) => {
          callback(status, result);
        });
      } else {
        callback(status, result);
      }
    });
  } else {
    // Resultados de cada parametro de la ficha
    var results = [];

    // Resolver parametros de la ficha
    solveCardDriverParams(cardJson, 0, results, (status, result) => {
      if (status === 200) {
        // Resolver ficha con análisis Sympy
        solverCardEntity.solveWithSympy(
          cardJson,
          results,
          (status, pythonJson) => {
            if (status === 200) {
              // Crear nueva ficha
              createNewCard(cardJson, pythonJson, (status, newCardJson) => {
                // Retornar ficha
                callback(status, newCardJson);
              });
            } else {
              // Retornar texto
              callback(status, pythonJson);
            }
          }
        );
      } else {
        callback(status, result);
      }
    });
  }
}

/**
 * Respuesta al aplicar la logica de negocios para resolver el código Python de una ficha con toda su jerarquia de parametros.
 *
 * @callback module:business-driver-card-solve.solveCardRecursivelyCallback
 * @param {integer} status - Codigo HTTP de respuesta.
 * @param {string} mainReturn - Resultado de la ejecución de la función main del codigo Python de la ficha
 */

/**
 * Logica de negocios para resolver el código Python de una ficha con toda su jerarquia de parametros.
 *
 * @param {json} cardJson - Ficha matemática Json.
 * @param {string} cardJson.title - Título de la ficha.
 * @param {string} cardJson.description - Descripción de la ficha.
 * @param {json[]} cardJson.params - Parámetros de la ficha.
 * @param {string} cardJson.params.symbol - Symbolo LaTeX del parámetro.
 * @param {string} cardJson.params.description - Descripción del parámetro.
 * @param {json} cardJson.params.content - Ficha matemática del parámetro o valor nulo.
 * @param {string} cardJson.latexCode - Codigo LaTeX de la ficha.
 * @param {string} cardJson.pythonCode - Codigo Python de la ficha.
 * @param {module:business-driver-card-solve.solveCardRecursivelyCallback} callback - Respuesta al aplicar la logica de negocios para resolver el código Python de una ficha con toda su jerarquia de parametros.
 */
function solveCardRecursively(cardJson, callback) {
  // Si la ficha llegó con un parámetro string
  if (typeof cardJson === 'string') {
    // Construir ficha para la expresión matemática
    cardJson = {
      title: '',
      description: '',
      params: [],
      latexCode: '',
      pythonCode: `def main():\n  exp = sympify("${cardJson}")\n  return exp`,
    };

    // Procesar ficha para tener el formato adecuado
    solveCardDriver(cardJson, (status, result) => {
      if (status === 200) {
        solveCardRecursively(result, (status, result) => {
          callback(status, result);
        });
      } else {
        callback(status, result);
      }
    });
  } else {
    // Resultados de cada parametro de la ficha
    var results = [];

    // Resolver parametros de la ficha
    solveCardDriverParams(cardJson, 0, results, (status, result) => {
      if (status === 200) {
        // Resolver ficha sin análisis Sympy
        solverCardEntity.solveWithoutSympy(
          cardJson,
          results,
          (status, result) => {
            // Retornar resultado
            callback(status, result.mainReturn);
          }
        );
      } else {
        callback(status, result);
      }
    });
  }
}

/**
 * Respuesta al aplicar la logica de negocios para resolver el código Python del parametro de una ficha en la posición especificada con toda su jerarquia.
 *
 * @callback module:business-driver-card-solve.solveCardDriverParamsCallback
 * @param {integer} status - Codigo HTTP de respuesta.
 * @param {string} message - Mensaje de respuesta (No es el resultado del codigo Python ya que este se guarda en la lista 'results').
 */

/**
 * Logica de negocios para resolver el código Python del parametro de una ficha en la posición especificada con toda su jerarquia.
 *
 * @param {json} cardJson - Ficha matemática Json.
 * @param {string} cardJson.title - Título de la ficha.
 * @param {string} cardJson.description - Descripción de la ficha.
 * @param {json[]} cardJson.params - Parámetros de la ficha.
 * @param {string} cardJson.params.symbol - Symbolo LaTeX del parámetro.
 * @param {string} cardJson.params.description - Descripción del parámetro.
 * @param {json} cardJson.params.content - Ficha matemática del parámetro o valor nulo.
 * @param {string} cardJson.latexCode - Codigo LaTeX de la ficha.
 * @param {string} cardJson.pythonCode - Codigo Python de la ficha.
 * @param {integer} pos - Posición del parametro de la ficha a resolver.
 * @param {string[]} results - Lista donde se van guardando los resultados obtenidos en cada parametro.
 * @param {module:business-driver-card-solve.solveCardDriverParamsCallback} callback - Respuesta al aplicar la logica de negocios para resolver el código Python del parametro de una ficha en la posición especificada con toda su jerarquia.
 */
function solveCardDriverParams(cardJson, pos, results, callback) {
  // Si ya se resolvieron todos los parametros
  if (pos >= cardJson.params.length) {
    callback(200, 'Se resolvieron todos los parametros');
  }
  // Si el parametro está asignado
  else if (
    cardJson.params[pos].content !== null &&
    !(
      typeof cardJson.params[pos].content === 'string' &&
      cardJson.params[pos].content.trim() == ''
    )
  ) {
    // Resolver parámetro
    solveCardRecursively(cardJson.params[pos].content, (status, result) => {
      if (status === 200) {
        // Agregar resultado a la lista
        results.push(result);
        // Pasar al siguiente paramaetro
        solveCardDriverParams(cardJson, pos + 1, results, (status, result) => {
          callback(status, result);
        });
      } else {
        callback(status, 'Error en la ejecución');
      }
    });
  }
  // Si el parametro no está asignado
  else {
    // Agregar simbolo codificado a [a-z0-9] como resultado (El simbolo dollar ($) es para que python pueda identificar cuando está en codigo LaTeX el valor)
    results.push(
      '$param8565n' + base32.encode(cardJson.params[pos].symbol.trim())
    );

    // Pasar al siguiente paramaetro
    solveCardDriverParams(cardJson, pos + 1, results, (status, result) => {
      callback(status, result);
    });
  }
}

/**
 * Logica de negocios para crear una nueva ficha matemática a paritr de los resultados de la ficha resuelta.
 *
 * @param {json} pythonJson - Resultados de la ejecución de Python.
 * @param {string[]} pythonJson.symbols - Simbolos de los nuevos parametros.
 * @param {string} pythonJson.latex - LaTeX del resultado.
 * @param {string} pythonJson.mainReturn - Resultado de la función main.
 * @param {boolean} pythonJson.isSympy - Validador de si el resultado se puede procesar con Sympy.
 * @param {module:business-driver-card-solve.createNewCardallback} callback - Respuesta al aplicar la logica de negocios para crear una nueva ficha matemática a paritr de los resultados.
 */
function createNewCard(cardJson, pythonJson, callback) {
  // crear estructura de la nueva ficha
  var newCard = {
    title: '',
    description: '',
    params: [],
    latexCode: undefined,
    pythonCode: undefined,
  };

  // Asignar parámetros
  for (const symbol of pythonJson.symbols) {
    // si el parametro proviene en un simbolo LaTeX
    if (symbol.startsWith('param8565n')) {
      // Decodificar parametro
      newCard.params.push({
        symbol: base32.decode(symbol.substring(10, symbol.length)),
        description: '',
        content: null,
      });
    }

    // Si el parametro proviene de un resultado sympy ordinario
    else {
      newCard.params.push({
        symbol: symbol,
        description: '',
        content: null,
      });
    }
  }

  // Asignar nuevo LaTeX
  newCard.latexCode = pythonJson.latex;
  for (const i in pythonJson.symbols) {
    newCard.latexCode = newCard.latexCode.replace(
      new RegExp(
        '(^|[^0-9a-hj-km-rt-z])' +
          pythonJson.symbols[i] +
          '($|[^0-9a-hj-km-rt-z])',
        'g'
      ),
      '$1#' + (parseInt(i) + 1) + '$2'
    );
  }

  // Remplazar parametros que ahora son constantes
  newCard.latexCode = newCard.latexCode.replace(
    new RegExp('param8565n([0-9a-hj-km-rt-z]+)', 'g'),
    (matched) => {
      return base32.decode(matched.substring(10, matched.length));
    }
  );

  // Asignar nuevo Python
  if (pythonJson.isSympy) {
    var subs = '';
    pythonJson.symbols.forEach(
      (element) => (subs += `'${element}': ${element}, `)
    );

    newCard.pythonCode = `def main(${pythonJson.symbols.join(
      ', '
    )}):\n  exp = sympify("${
      pythonJson.mainReturn
    }")\n  exp = exp.subs({${subs}})\n  return exp`;
  } else {
    newCard.pythonCode = `def main():\n  return "${pythonJson.mainReturn}"`;
  }

  // Retornar nueva ficha
  callback(200, newCard);
}

// Exportar driver
module.exports = solveCardDriver;
