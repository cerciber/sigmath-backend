/**
 * Módulo que se encarga de construir el codigo Python final de una ficha, mandarlo a compilar y obtener de forma estructurada los resultados de la ejecución.
 *
 * @module business-entity-card-solve
 * @author Cerciber <contact@cerciber.com>
 */

// Modulos creados
const compilerDriver = require('../drivers/PythonDrivers/compilerDriver');
const fs = require('fs');

/**
 * Respuesta al obtener los resultados con analisis Sympy
 *
 * @callback module:business-entity-card-solve.solveWithSympyCallback
 * @param {integer} status - Codigo HTTP de respuesta.
 * @param {json} pythonJson - Resultados de la ejecución de Python.
 * @param {string[]} pythonJson.symbols - Simbolos de los nuevos parametros.
 * @param {string} pythonJson.latex - LaTeX del resultado.
 * @param {string} pythonJson.mainReturn - Resultado de la función main.
 * @param {boolean} pythonJson.isSympy - Validador de si el resultado se puede procesar con Sympy.
 */

/**
 * Construir el codigo Python final de una ficha, mandarlo a compilar y obtener de forma estructurada resultados de la ejecución a partir de un analisis con Sympy.
 *
 * @param {json} cardJson - Ficha matematica en JSON.
 * @param {json} cardJson.pythonCode - Codigo oython de la ficha.
 * @param {string[]} results - Resultados de los parametros.
 * @param {module:business-entity-card-solve.solveWithSympyCallback} callback - Respuesta al obtener los resultados con analisis Sympy.
 */
function solveWithSympy(cardJson, results, callback) {
  // Codigo python de importación de sympy (si el usuario tambíen lo importa genera conflictos)
  var importSympy = 'from sympy import *\n\n';

  // Codigo python de la ejecución de la función principal (El numero 8965 es para reducir la posibilidad de que las variables sean usadas por el usuario)
  var mainFunction = '\n\nresult_value_from_main8965 = main(';

  // Codigo python para obtener la información de la ejecución de la función principal
  var outputSympyTemplate;

  // Codigo python de los parametros de la función principal
  var params = '';

  // Leer codigo para obtener la información de la ejecución de la función principal
  fs.readFile(
    './src/business_layer/entities/scriptsPython/Templates/outputSympyTemplate.py',
    'utf-8',
    (error, data) => {
      // Si no se pudo leer el archivo
      if (error) {
        callback(
          500,
          'Lo sentimos, hubo un error en el servidor al resolver la ficha matemática.'
        );
        log.error(
          __filename,
          'solveWithSympy',
          'Error al leer el archivo de Python',
          error
        );
      }

      // Si se pudo leer el archivo
      else {
        // Asignar codigo leido
        outputSympyTemplate = data;

        // Concatenar los parametros en forma de lista
        results.forEach((element) => {
          // Si el parametro es LaTeX
          if (element.startsWith('$')) {
            params += "'" + element.substring(1, element.length) + "'" + ', ';
            // Si el paramtro es Sympy
          } else {
            params += "'" + element + "'" + ', ';
          }
        });

        // Concatenar los parametros al codigo de ejecución de la función principal
        mainFunction =
          mainFunction + params.substr(0, params.length - 2) + ')\n';

        // Concatenar todo el codigo final a compilar
        cardJson.pythonCode =
          importSympy +
          cardJson.pythonCode +
          mainFunction +
          outputSympyTemplate;

        // Compliar codigo final
        compilerDriver(cardJson.pythonCode, (status, response) => {
          // Si el codigo se compiló correctamente
          if (status == 200) {
            // Intentar extraer los resultados de la ejecución
            try {
              // Capturar json en el resultado por consola de la ejeución
              var reg = /<<<<---output-->>>>>.*(?=<<<<---output-->>>>>)/gim;
              response = response
                .match(reg)[0]
                .substring('<<<<---output-->>>>>'.length);

              // Corregir inconsistencias del json
              response = response.replace(/'/g, '"');
              response = response.replace(/\\/g, '\\\\');

              // Devolver la estructura de resultados
              callback(status, JSON.parse(response));

              // Si hubo un error al extraer los resultados
            } catch (error) {
              callback(
                500,
                'Lo sentimos, hubo un error en el servidor al resolver la ficha matemática.'
              );
              log.error(
                __filename,
                'solveWithSympy',
                'Error al extraer los resultados de la ejecución',
                error
              );
            }
          } else {
            callback(status, response);
          }
        });
      }
    }
  );
}

/**
 * Respuesta al obtener los resultados sin analisis Sympy
 *
 * @callback module:business-entity-card-solve.solveWithoutSympyCallback
 * @param {integer} status - Codigo HTTP de respuesta.
 * @param {json} pythonJson - Resultados de la ejecución de Python.
 * @param {string} pythonJson.mainReturn - Resultado de la función main.
 */

/**
 * Construir el codigo Python final de una ficha, mandarlo a compilar y obtener de forma estructurada resultados de la ejecución sin realizar un analisis con Sympy.
 *
 * @param {json} cardJson - Ficha matematica en JSON.
 * @param {json} cardJson.pythonCode - Codigo oython de la ficha.
 * @param {string[]} results - Resultados de los parametros.
 * @param {module:business-entity-card-solve.solveWithoutSympyCallback} callback - Respuesta al obtener los resultados sin analisis Sympy.
 */
function solveWithoutSympy(cardJson, results, callback) {
  // Codigo python de importación de sympy (si el usuario tambíen lo importa genera conflictos)
  var importSympy = 'from sympy import *\n\n';

  // Codigo python de la ejecución de la función principal (El numero 8965 es para reducir la posibilidad de que las variables sean usadas por el usuario)
  var mainFunction = '\n\nresult_value_from_main8965 = main(';

  // Codigo python para obtener la información de la ejecución de la función principal
  var outputWithoutSympyTemplate;

  // Codigo python de los parametros de la función principal
  var params = '';

  // Leer codigo para obtener la información de la ejecución de la función principal
  fs.readFile(
    './src/business_layer/entities/scriptsPython/Templates/outputWithoutSympyTemplate.py',
    'utf-8',
    (error, data) => {
      // Si no se pudo leer el archivo
      if (error) {
        callback(
          500,
          'Lo sentimos, hubo un error en el servidor al resolver la ficha matemática.'
        );
        log.error(
          __filename,
          'solveWithoutSympy',
          'Error al leer el archivo de Python',
          error
        );
      }

      // Si se pudo leer el archivo
      else {
        // Asignar codigo leido
        outputWithoutSympyTemplate = data;

        // Concatenar los parametros en forma de lista
        results.forEach((element) => {
          // Si el parametro es LaTeX
          if (element.startsWith('$')) {
            params += "'" + element.substring(1, element.length) + "'" + ', ';
            // Si el paramtro es Sympy
          } else {
            params += "'" + element + "'" + ', ';
          }
        });

        // Concatenar los parametros al codigo de ejecución de la función principal
        mainFunction =
          mainFunction + params.substr(0, params.length - 2) + ')\n';

        // Concatenar todo el codigo final a compilar
        cardJson.pythonCode =
          importSympy +
          cardJson.pythonCode +
          mainFunction +
          outputWithoutSympyTemplate;

        // Compliar codigo final
        compilerDriver(cardJson.pythonCode, (status, response) => {
          // Si el codigo se compiló correctamente
          if (status == 200) {
            // Intentar extraer los resultados de la ejecución
            try {
              // Capturar json en el resultado por consola de la ejeución
              var reg = /<<<<---output-->>>>>.*(?=<<<<---output-->>>>>)/gim;
              response = response
                .match(reg)[0]
                .substring('<<<<---output-->>>>>'.length);

              // Corregir inconsistencias del json
              response = response.replace(/'/g, '"');

              // Devolver la estructura de resultados
              callback(status, JSON.parse(response));

              // Si hubo un error al extraer los resultados
            } catch (error) {
              callback(
                500,
                'Lo sentimos, hubo un error en el servidor al resolver la ficha matemática.'
              );
              log.error(
                __filename,
                'solveWithoutSympy',
                'Error al extraer los resultados de la ejecución',
                error
              );
            }
          } else {
            callback(status, response);
          }
        });
      }
    }
  );
}

// Exportar funciones de la entidad
module.exports = { solveWithSympy, solveWithoutSympy };
