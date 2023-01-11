/**
 * Abstracciones de las opraciones en la tabla "userCard" de la base de datos.
 *
 * @module persistence-repository-
 * @author Cerciber <contact@cerciber.com>
 */

// Modulos instalados
//

// Modulos creados
const userCardModel = require('../models/userCardModel');

/**
 * Acciones al seleccionar los datos.
 *
 * @callback module:userCardRepository.selectCallback
 * @param {int} code - Codigo de respuesta del servidor.
 * @param {Json[]|string} result - Resultado de la consulta. Lista de registros si obtuvo resultados. Texto en cualquier otro caso.
 */

/**
 * Seleccionar datos.
 *
 * @param {Json} options - Opciones para realizar la consulta a la base de datos.
 * @param {Json} options.where - Condiciones y filtos que se aplican en la consula.
 * @param {List} options.attributes - Lista de los nombre de los campos a seleccionar.
 * @param {module:userCardRepository.selectCallback} callback - Acciones al seleccionar los datos.
 */
function select(options, callback) {
  userCardModel
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
          'No encontramos coincidencias entre usuarios y fichas con la información especificada.'
        );
      }
    })
    // Capturar errores
    .catch((error) => {
      log.error(__filename, 'select', 'Error al seleccionar los datos', error);
      callback(
        500,
        'Lo sentimos, hubo un error en el servidor al buscar coincidencias entre usuarios y fichas.'
      );
    });
}

/**
 * Acciones al insertar los datos.
 *
 * @callback module:userCardRepository.insertCallback
 * @param {int} code - Codigo de respuesta del servidor.
 * @param {Json|string} result - Resultado de la consulta. Json del registo ingresado si se ingresó correctamente. Texto en cualquier otro caso.
 */

/**
 * Insertar datos.
 *
 * @param {Json} values - Campos a ingresar con sus respectivos valores.
 * @param {module:userCardRepository.insertCallback} callback - Acciones al insertar los datos.
 */
function insert(values, callback) {
  userCardModel
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
        // Si hay un valor unico ya existente
        default:
          log.error(__filename, 'insert', 'Error al insertar los datos', error);
          callback(
            500,
            'Lo sentimos, hubo un error en el servidor al guardar coincidencias entre usuarios y fichas.'
          );
          break;
      }
    });
}

/**
 * Acciones al actualizar los datos.
 *
 * @callback module:userCardRepository.updateCallback
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
 * @param {module:userCardRepository.updateCallback} callback - Acciones al actualizar los datos.
 */
function update(values, options, callback) {
  userCardModel
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
          'No encontramos coincidencias entre usuarios y fichas con la información especificada.'
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
            'Lo sentimos, hubo un error en el servidor al actualizar coincidencias entre usuarios y fichas.'
          );
          break;
      }
    });
}

/**
 * Acciones al eliminar los datos.
 *
 * @callback module:userCardRepository.destroyCallback
 * @param {int} code - Codigo de respuesta del servidor.
 * @param {Json|string} result - Resultado de la consulta. Json con el numero de eliminaciones si se eliminó correctamente. Texto en cualquier otro caso.
 * @param {number} result.length - Numero de registros eliminados.
 */

/**
 * Eliminar datos.
 *
 * @param {Json} options - Opciones para realizar la eliminación en la base de datos.
 * @param {Json} options.where - Condiciones y filtos que se aplican en la eliminación.
 * @param {module:userCardRepository.destroyCallback} callback - Acciones al eliminar los datos.
 */
function destroy(options, callback) {
  userCardModel
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
          'No encontramos coincidencias entre usuarios y fichas con la información especificada.'
        );
      }
    })
    // Capturar errores
    .catch((error) => {
      log.error(__filename, 'destroy', 'Error al borrar los datos', error);
      callback(
        500,
        'Lo sentimos, hubo un error en el servidor al eliminar coincidencias entre usuarios y fichas.'
      );
    });
}

module.exports = { select, insert, update, destroy };
