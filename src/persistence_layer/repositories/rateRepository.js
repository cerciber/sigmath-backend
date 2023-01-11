/**
 * Abstracciones de las opraciones en la tabla "rate" de la base de datos.
 *
 * @module persistence-repository-
 * @author Cerciber <contact@cerciber.com>
 */

// Modulos instalados
//

// Modulos creados
const rateModel = require('../models/rateModel');

/**
 * Acciones al seleccionar los datos.
 *
 * @callback module:rateRepository.selectCallback
 * @param {int} code - Codigo de respuesta del servidor.
 * @param {Json[]|string} result - Resultado de la consulta. Lista de registros si obtuvo resultados. Texto en cualquier otro caso.
 */

/**
 * Seleccionar datos.
 *
 * @param {Json} options - Opciones para realizar la consulta a la base de datos.
 * @param {Json} options.where - Condiciones y filtos que se aplican en la consula.
 * @param {List} options.attributes - Lista de los nombre de los campos a seleccionar.
 * @param {module:rateRepository.selectCallback} callback - Acciones al seleccionar los datos.
 */
function select(options, callback) {
  rateModel
    // Buscar registros
    .findAll(options)
    // Obtener resultado
    .then((result) => {
      if (result.length > 0) {
        // Si se encontraron elementos
        log.info(
          __filename,
          'select',
          'Se han seleccionado los datos correctamente.'
        );
        callback(200, result);
      } else {
        // Si no se encontraron elementos
        log.info(__filename, 'select', 'No se encontraron elementos.');
        callback(
          404,
          'No encontramos calificaciones de las fichas con la información especificada.'
        );
      }
    })
    // Capturar errores
    .catch((error) => {
      log.error(__filename, 'select', 'Error al seleccionar los datos', error);
      callback(
        500,
        'Lo sentimos, hubo un error en el servidor al buscar calificaciones de las fichas.'
      );
    });
}

/**
 * Acciones al insertar los datos.
 *
 * @callback module:rateRepository.insertCallback
 * @param {int} code - Codigo de respuesta del servidor.
 * @param {Json|string} result - Resultado de la consulta. Json del registo ingresado si se ingresó correctamente. Texto en cualquier otro caso.
 */

/**
 * Insertar datos.
 *
 * @param {Json} values - Campos a ingresar con sus respectivos valores.
 * @param {module:rateRepository.insertCallback} callback - Acciones al insertar los datos.
 */
function insert(values, callback) {
  rateModel
    // ingresar registro
    .create(values)
    // Obtener resultado
    .then((result) => {
      log.info(
        __filename,
        'insert',
        'Se han insertado los datos correctamente'
      );
      callback(201, result);
    })
    // Capturar errores
    .catch((error) => {
      switch (error.name) {
        default:
          log.error(__filename, 'insert', 'Error al insertar los datos', error);
          callback(
            500,
            'Lo sentimos, hubo un error en el servidor al guardar calificaiones de las fichas matemáticas.'
          );
          break;
      }
    });
}

/**
 * Acciones al actualizar los datos.
 *
 * @callback module:rateRepository.updateCallback
 * @param {int} code - Codigo de respuesta del servidor.
 * @param {Json|string} result - Resultado de la consulta. Json con el numero de actualizaciones si se actualizó correctamente. Texto en cualquier otro caso.
 * @param {number} result.length - Numero de registros actualizados.
 */

/**
 * Actualizar datos.
 *
 * @param {Json} values - Campos a actualizar con sus respectivos valores.
 * @param {Json} options - Opciones para realizar la actualización en la base de datos.
 * @param {Json} options.where - Condiciones y filtos que se aplican en la actualización.
 * @param {module:rateRepository.updateCallback} callback - Acciones al actualizar los datos.
 */
function update(values, options, callback) {
  rateModel
    // ingresar registro
    .update(values, options)
    // Obtener resultado
    .then((result) => {
      if (result[0] > 0) {
        // Si se encontraron elementos
        log.info(
          __filename,
          'update',
          'Se han actualizado los datos correctamente.'
        );
        callback(200, { length: result[0] });
      } else {
        // Si no se encontraron elementos
        log.info(__filename, 'update', 'No se encontraron elementos.');
        callback(
          404,
          'No encontramos calificaciones de las fichas matemáticas con la información especificada.'
        );
      }
    })
    // Capturar errores
    .catch((error) => {
      switch (error.name) {
        default:
          log.error(
            __filename,
            'update',
            'Error al actualizar los datos',
            error
          );
          callback(
            500,
            'Lo sentimos, hubo un error en el servidor al actualizar calificaciones de las fichas matemáticas.'
          );
          break;
      }
    });
}

/**
 * Acciones al eliminar los datos.
 *
 * @callback module:rateRepository.destroyCallback
 * @param {int} code - Codigo de respuesta del servidor.
 * @param {Json|string} result - Resultado de la consulta. Json con el numero de eliminaciones si se eliminó correctamente. Texto en cualquier otro caso.
 * @param {number} result.length - Numero de registros eliminados.
 */

/**
 * Eliminar datos.
 *
 * @param {Json} options - Opciones para realizar la eliminación en la base de datos.
 * @param {Json} options.where - Condiciones y filtos que se aplican en la eliminación.
 * @param {module:rateRepository.destroyCallback} callback - Acciones al eliminar los datos.
 */
function destroy(options, callback) {
  rateModel
    // ingresar registro
    .destroy(options)
    // Obtener resultado
    .then((result) => {
      if (result > 0) {
        // Si se encontraron elementos
        log.info(
          __filename,
          'destroy',
          'Se han borrado los datos correctamente.'
        );
        callback(200, { length: result });
      } else {
        // Si no se encontraron elementos
        log.info(__filename, 'destroy', 'No se encontraron elementos.');
        callback(
          404,
          'No encontramos calificaciones de las fichas matemáticas con la información especificada.'
        );
      }
    })
    // Capturar errores
    .catch((error) => {
      log.error(__filename, 'destroy', 'Error al borrar los datos', error);
      callback(
        500,
        'Lo sentimos, hubo un error en el servidor al eliminar calificaciones de las fichas matemáticas.'
      );
    });
}

module.exports = { select, insert, update, destroy };
