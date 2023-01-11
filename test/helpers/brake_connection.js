/**
 * Funciones para manipular la conexión de la base de datos para hacer pruebas
 *
 * @module test-helpers
 * @author Cerciber <contact@cerciber.com>
 */

// Modulos instalados
const { Client } = require('pg');

// Modulos creados
const data_base = require('../../src/data_layer/data_base/data_base'); // Base de datos

/**
 *  Respuesta al romper el acceso a la base de datos.
 *
 * @callback module:test-helpers.changeConnectionCallback
 */

/**
 * Romper el acceso a la base de datos.
 *
 * @param {module:test-helpers.changeConnectionCallback} callback - Respuesta al romper el acceso a la base de datos.
 */
function changeConnection(callback) {
  // Instanciar y conectar cliente de postgres
  const client = new Client({
    host: enviroment.data_base.host,
    user: enviroment.data_base.user,
    password: enviroment.data_base.password,
  });
  client.connect();

  // Cambiar a la contraseña incorrecta
  client.query(
    'select pg_terminate_backend(pid) ' +
      "from pg_stat_activity where datname='" +
      enviroment.data_base.name +
      "';" +
      'ALTER DATABASE ' +
      enviroment.data_base.name +
      ' RENAME TO false_db;',
    (err) => {
      if (err) {
        log.error(
          __filename,
          'changeConnection',
          'No se puedo establecer un nombre de base de datos falso'
        );
        callback();
        return;
      }
      log.warn(
        __filename,
        'changeConnection',
        'Se estableció un nombre de base de datos falso'
      );
      client.end(() => {
        data_base
          .authenticate()
          .then(function () {
            log.error(
              __filename,
              'changeConnection:authenticate',
              'Autenticación en la base de datos realizada'
            );
            callback();
          })
          .catch(function (err) {
            log.warn(
              __filename,
              'changeConnection:authenticate',
              'Autenticación en la base de datos rechazada',
              err
            );
            callback();
          });
      });
    }
  );
}

/**
 *  Respuesta al restablecer acceso a la base de datos.
 *
 * @callback module:test-helpers.unchangeConnectionCallback
 */

/**
 * Restablecer acceso a la base de datos.
 *
 * @param {module:test-helpers.unchangeConnectionCallback} callback - Respuesta al restablecer acceso a la base de datos.
 */
function unchangeConnection(callback) {
  // Instanciar y conectar cliente de postgres
  const client = new Client({
    host: enviroment.data_base.host,
    user: enviroment.data_base.user,
    password: enviroment.data_base.password,
  });
  client.connect();
  // Cambiar a la contraseña correcta
  client.query(
    'select pg_terminate_backend(pid) ' +
      "from pg_stat_activity where datname='" +
      enviroment.data_base.name +
      "';" +
      'ALTER DATABASE false_db RENAME TO ' +
      enviroment.data_base.name +
      ';',
    (err) => {
      if (err) {
        log.error(
          __filename,
          'unchangeConnection',
          'No se puedo establecer el nombre de base de datos real'
        );
        callback();
        return;
      }
      log.info(
        __filename,
        'unchangeConnection',
        'Se restableció el nombre de la base de datos real'
      );
      client.end(() => {
        data_base
          .authenticate()
          .then(function () {
            log.info(
              __filename,
              'unchangeConnection:authenticate',
              'Autenticación en la base de datos realizada'
            );
            callback();
          })
          .catch(function (err) {
            log.error(
              __filename,
              'unchangeConnection:authenticate',
              'Autenticación en la base de datos rechazada',
              err
            );
            callback();
          });
      });
    }
  );
}

// Exportar funciones
module.exports = { changeConnection, unchangeConnection };
