/**
 * Abstracciones de las opraciones en la tabla de usuarios.
 *
 * @module persistence-repository-user
 * @author Cerciber <contact@cerciber.com>
 */

// Modulos creados
const userModel = require('../models/userModel');

/**
 * Acciones al seleccionar los datos.
 *
 * @callback module:persistence-repository-user.selectCallback
 * @param {int} code - Codigo de respuesta del servidor.
 * @param {Json[]|string} result - Resultado de la consulta. Lista de registros si obtuvo resultados. Texto en cualquier otro caso.
 */

/**
 * Seleccionar datos.
 *
 * @param {Json} options - Opciones para realizar la consulta a la base de datos.
 * @param {Json} options.where - Condiciones y filtos que se aplican en la consula.
 * @param {List} options.attributes - Lista de los nombre de los campos a seleccionar.
 * @param {module:persistence-repository-user.selectCallback} callback - Acciones al seleccionar los datos.
 */
function select(options, callback) {
  userModel
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
          'No encontramos usuarios con la información especificada.'
        );
      }
    })
    // Capturar errores
    .catch((error) => {
      log.error(__filename, 'select', 'Error al seleccionar los datos', error);
      callback(
        500,
        'Lo sentimos, hubo un error en el servidor al buscar usuarios.'
      );
    });
}

/**
 * Acciones al insertar los datos.
 *
 * @callback module:persistence-repository-user.insertCallback
 * @param {int} code - Codigo de respuesta del servidor.
 * @param {Json|string} result - Resultado de la consulta. Json del registo ingresado si se ingresó correctamente. Texto en cualquier otro caso.
 */

/**
 * Insertar datos.
 *
 * @param {Json} values - Campos a ingresar con sus respectivos valores.
 * @param {module:persistence-repository-user.insertCallback} callback - Acciones al insertar los datos.
 */
function insert(values, callback) {
  userModel
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
        case 'SequelizeUniqueConstraintError':
          var column = error.parent.detail.match(/\((.*)\)=/)[1];
          log.info(
            __filename,
            'insert',
            'El valor de la columna "' + column + '" ya existe'
          );
          callback(409, 'El e-mail que ingresaste ya está en uso.');
          break;
        default:
          log.error(__filename, 'insert', 'Error al insertar los datos', error);
          callback(
            500,
            'Lo sentimos, hubo un error en el servidor al registrar usuarios.'
          );
          break;
      }
    });
}

/**
 * Acciones al actualizar los datos.
 *
 * @callback module:persistence-repository-user.updateCallback
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
 * @param {module:persistence-repository-user.updateCallback} callback - Acciones al actualizar los datos.
 */
function update(values, options, callback) {
  userModel
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
          'No encontramos usuarios con la información especificada.'
        );
      }
    })
    // Capturar errores
    .catch((error) => {
      switch (error.name) {
        // Si hay un valor unico ya existente
        case 'SequelizeUniqueConstraintError':
          var column = error.parent.detail.match(/\((.*)\)=/)[1];
          log.info(
            __filename,
            'update',
            'El valor de la columna "' + column + '" ya existe'
          );
          callback(409, 'El e-mail que ingresaste ya está en uso.');
          break;
        default:
          log.error(
            __filename,
            'update',
            'Error al actualizar los datos',
            error
          );
          callback(
            500,
            'Lo sentimos, hubo un error en el servidor al actualizar usuarios.'
          );
          break;
      }
    });
}

/**
 * Acciones al eliminar los datos.
 *
 * @callback module:persistence-repository-user.destroyCallback
 * @param {int} code - Codigo de respuesta del servidor.
 * @param {Json|string} result - Resultado de la consulta. Json con el numero de eliminaciones si se eliminó correctamente. Texto en cualquier otro caso.
 * @param {number} result.length - Numero de registros eliminados.
 */

/**
 * Eliminar datos.
 *
 * @param {Json} options - Opciones para realizar la eliminación en la base de datos.
 * @param {Json} options.where - Condiciones y filtos que se aplican en la eliminación.
 * @param {module:persistence-repository-user.destroyCallback} callback - Acciones al eliminar los datos.
 */
function destroy(options, callback) {
  userModel
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
          'No encontramos usuarios con la información especificada.'
        );
      }
    })
    // Capturar errores
    .catch((error) => {
      log.error(__filename, 'destroy', 'Error al borrar los datos', error);
      callback(
        500,
        'Lo sentimos, hubo un error en el servidor al eliminar usuarios.'
      );
    });
}

// Exportar funciones
module.exports = { select, insert, update, destroy };
