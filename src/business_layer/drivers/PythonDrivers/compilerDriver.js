/**
 *  Módulo que se encarga de hacer la logica de negocios para compilar codigo python.
 *
 * @module business-driver-python-compiler
 * @author Cerciber <contact@cerciber.com>
 */

// Modulos instalados
const fs = require('fs');
const { exec } = require('child_process');

/**
 * Respuesta al aplicar la logica de negocios para compilar codigo python.
 *
 * @callback module:business-driver-python-compiler.compilerDriverCallback
 * @param {integer} status - Codigo HTTP de respuesta.
 * @param {string} result - Resultado en consola de la ejecución.
 */

/**
 * Logica de negocios para compilar codigo python.
 *
 * @param {string} pythonCode - Codigo Python a compilar.
 * @param {module:business-driver-python-compiler.compilerDriverCallback} callback - Respuesta al aplicar la logica de negocios para compilar codigo python.
 */
function compilerDriver(pythonCode, callback) {
  // Numero aleatorio enctre 1 y 1000000 para evitar coliciones entre los archivos
  var num = Math.round(Math.random() * (1000000 - 1) + 1);

  // Nombre del archivo donde se guardará el codigo Python
  var path = `./src/business_layer/entities/scriptsPython/Created/program${num}.py`;

  // variable para guardar el comando de ejecución dependiendo del entorno
  var command = undefined;

  // Escribir codigo python en el archivo
  fs.writeFile(path, pythonCode, (error) => {
    // Si no se pudo escribir el archivo
    if (error) {
      // Notificar error
      callback(
        500,
        'Lo sentimos, hubo un error en el servidor al resolver la ficha matemática.'
      );
      log.error(
        __filename,
        'compilerDriver',
        'Error al escribir el archivo de Python',
        error
      );
    }

    // Si el sistema está en producción
    else if (process.env.NODE_ENV == 'production') {
      // Ejecutar comando en linux
      command = `python3 ${path}`;
      exec(command, (error, stdout) => {
        // Borrar el archivo de python ejecutado
        fs.unlink(path, () => {});

        // Si la ejecución falló
        if (error) {
          callback(
            500,
            'Lo sentimos, hubo un error en el servidor al resolver la ficha matemática.'
          );
          log.error(
            __filename,
            'compilerDriver',
            'Error al ejecutar el archivo de Python',
            error
          );
        }

        // Si la ejecución fue exitosa
        else {
          callback(200, stdout);
        }
      });
    }

    // Si el sistema está en desarollo o en pruebas
    else {
      // Si el sistema está en linux
      if (process.platform === 'linux') {
        command = `python3 ${path}`;
      }

      // Si el sistema está en windows
      else {
        path = `./src/business_layer/entities/scriptsPython/Created/program${num}.py`;
        command = `python ${path}`;
      }

      // Ejecutar comando en el sistema
      exec(command, (error, stdout) => {
        // Borrar el archivo de python ejecutado
        fs.unlink(path, () => {});

        // Si la ejecución falló
        if (error) {
          callback(
            500,
            'Lo sentimos, hubo un error en el servidor al resolver la ficha matemática.'
          );
          log.error(
            __filename,
            'compilerDriver',
            'Error al ejecutar el archivo de Python',
            error
          );
        }

        // Si la ejecución fue exitosa
        else {
          callback(200, stdout);
        }
      });
    }
  });
}

// Exportar driver
module.exports = compilerDriver;
