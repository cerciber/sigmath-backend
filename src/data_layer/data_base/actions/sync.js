/**
 * Módulo que define operaciones de sincronización de la base de datos con los modelos.
 *
 * @module data-sync
 * @author Cerciber <contact@cerciber.com>
 */

// Modulos instalados
const { Client } = require('pg');

// Modulos creados
const models_config = require('../../../persistence_layer/models/config.json');

/**
 * Respuesta al terminar de crear la base de datos si no existe.
 *
 * @callback module:data-sync.createNonExistentDataBataBaseCallback
 * @param {boolean} state - Resultado de la operacion. true si terminó correctamente o false y hubo un error.
 */

/**
 * Crear base de datos si no existe.
 *
 * @param {module:data-sync.createNonExistentDataBataBaseCallback} callback - Respuesta al terminar de crear la base de datos si no existe.
 */
function createNonExistentDataBataBase(callback) {
  // Instanciar cliente de postgres
  const client = new Client({
    host: enviroment.data_base.host,
    user: enviroment.data_base.username,
    password: enviroment.data_base.password,
  });

  // Conectar cliente de postgres
  client
    .connect()
    .then(() => {
      // Crear base de datos
      client.query(
        'CREATE DATABASE ' + enviroment.data_base.name + ';',
        (err) => {
          if (err) {
            log.error(
              __filename,
              'createNonExistentDataBataBase',
              'Error al crear la base de datos',
              err
            );
            client.end();
            callback(false);
          } else {
            log.info(
              __filename,
              'createNonExistentDataBataBase',
              'Se creó la base de datos si no existia'
            );
            client.end();
            callback(true);
          }
        }
      );
    })
    .catch((err) => {
      log.error(
        __filename,
        'createNonExistentDataBataBase',
        'Error al auntenticar el usuario',
        err
      );
      callback(false);
    });
}

/**
 * Respuesta al terminar de borrar la base de datos si existe.
 *
 * @callback module:data-sync.dropExistentDataBataBaseCallback
 * @param {boolean} state - Resultado de la operacion. true si terminó correctamente o false y hubo un error.
 */

/**
 * Borrar base de datos si existe.
 *
 * @param {module:data-sync.dropExistentDataBataBaseCallback} callback - Respuesta al terminar de borrar la base de datos si existe.
 */
function dropExistentDataBataBase(callback) {
  // Instanciar cliente de postgres
  const client = new Client({
    host: enviroment.data_base.host,
    user: enviroment.data_base.username,
    password: enviroment.data_base.password,
  });

  // Conectar cliente de postgres
  client
    .connect()
    .then(() => {
      // Cerrar conexiones a la base de datos
      client.query(
        'select pg_terminate_backend(pid) ' +
          "from pg_stat_activity where datname='" +
          enviroment.data_base.name +
          "';",
        () => {
          // Borrar base de datos
          client.query(
            'DROP DATABASE IF EXISTS ' + enviroment.data_base.name + ';',
            (err) => {
              if (err) {
                log.error(
                  __filename,
                  'dropExistentDataBataBase',
                  'Error al borrar la base de datos',
                  err
                );
                client.end();
                callback(false);
              } else {
                log.warn(
                  __filename,
                  'dropExistentDataBataBase',
                  'Se borró la base de datos si existia'
                );
                client.end();
                callback(true);
              }
            }
          );
        }
      );
    })
    .catch((err) => {
      log.error(
        __filename,
        'dropExistentDataBataBase',
        'Error al auntenticar el usuario',
        err
      );
      callback(false);
    });
}

/**
 * Respuesta al terminar de crear tablas de los modelos que no existen en la base de datos.
 *
 * @callback module:data-sync.createNonExistentTablesCallback
 */

/**
 * Crear tablas de los modelos que no existen en la base de datos.
 *
 * @param {module:data-sync.createNonExistentTablesCallback} callback - Respuesta al terminar
 */
function createNonExistentTables(callback) {
  // Obtener orede de dependencias de las tablas
  const models = models_config.dependence_order;
  createNonExistentTable(models, 0, () => {
    log.info(
      __filename,
      'createNonExistentTables',
      'Se crearon los modelos que no existian en la base de datos'
    );
    callback();
  });
}

/**
 * Respuesta al crear la tabla del modelo especificado por el indice.
 *
 * @callback module:data-sync.createNonExistentTableCallback
 */

/**
 * Crear la tabla del modelo especificado por el indice (Si no existe).
 *
 * @param {List} list - Lista de nombres de los modelos en orden de independencia.
 * @param {number} index -Indice del modelo a sincronizar.
 * @param {module:data-sync.createNonExistentTableCallback} callback - Respuesta al crear la tabla del modelo especificado por el indice.
 */
function createNonExistentTable(list, index, callback) {
  // Si ya se crearon todas las tablas de la lista
  if (list.length == index) {
    callback();
    return;
  }

  // crear la tabla si no existe
  require('../../../persistence_layer/models/' + list[index] + 'Model')
    .sync()
    .then(() => {
      createNonExistentTable(list, index + 1, callback);
    });
}

/**
 * Respuesta al terminar de redefinir la base de datos.
 *
 * @callback module:data-sync.redefineDataBaseCallback
 */

/**
 * Redefinir base de datos.
 * - Borra la base de datos si existe.
 * - Crea la base de datos si no existe.
 * - Crea las tablas que no existen.
 * - Inserta los datos por defecto.
 *
 * @param {module:data-sync.redefineDataBaseCallback} callback - Respuesta al terminar de redefinir la base de datos.
 */
function redefineDataBase(callback) {
  // Borrar base de datos si existe
  dropExistentDataBataBase(() => {
    // Crear base de datos si no existe
    createNonExistentDataBataBase(() => {
      // Crear tablas que no existen
      createNonExistentTables(() => {
        // Insertar datos por defecto
        callback();
      });
    });
  });
}

// Exportar funciones
module.exports = {
  createNonExistentDataBataBase,
  dropExistentDataBataBase,
  createNonExistentTables,
  redefineDataBase,
};
