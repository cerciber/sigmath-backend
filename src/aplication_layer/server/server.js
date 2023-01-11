/**
 * Se encarga de configurar e iniciar el servidor con Express.
 *
 * @module aplication-server
 * @author Cerciber <contact@cerciber.com>
 */

// Modulos instalados
const express = require('express');
var bcrypt = require('bcryptjs');
var cors = require('cors');

// Modulos creados
const rootRoute = require('../routes/rootRoute');
const unusedRoute = require('../routes/unusedRoute');

/**
 * Acciones al terminar de configrar el servidor
 *
 * @callback module:aplication-server.configServerCallback
 * @param {object} app - Instancia de Express.
 */

/**
 * Configurar servidor.
 *
 * @param {module:aplication-server.configServerCallback} callback - Acciones al terminar de configrar el servidor.
 */
function configServer(callback) {
  // Ejecutar express
  const app = express();

  // Middlewares
  app.use(express.json()); // Permitir preticiones con contenido Json
  app.use(cors()); // Permitir peticiones desde cualquier ruta (!!CAMABIAR POSTERIORMENTE POR SEGURIDAD!!)

  // Asignar rutas
  app.use(rootRoute); // Raiz
  app.use(unusedRoute); // Sin uso

  // Retorno
  callback(app);
}

/**
 * Acciones al terminar de iniciar el servidor.
 *
 * @callback module:aplication-server.startServerCallback
 * @param {boolean} state - Valida si el servidor inició correctamente.
 * @param {object} app - Instancia de Express.
 * @param {object} server - Servidor iniciado.
 */

/**
 * Iniciar servidor.
 *
 * @param {number} port - Puerto en el que se correrá el servidor.
 * @param {module:aplication-server.startServerCallback} callback - Acciones al terminar de iniciar el servidor.
 */
function startServer(port, callback) {
  // Configuar servidor
  configServer((app) => {
    // Si el sistema está en producción
    if (process.env.NODE_ENV == 'production') {
      // Iniciar servidor en un puerto especifico
      try {
        const server = app.listen(port, () => {
          callback(true, app, server);
        });
      } catch (error) {
        log.info(
          __filename,
          'server:startServer',
          'El servidor no ha podido correr en el puerto ' + port
        );
        callback(false, app, undefined);
      }
    }

    // Si el sistema está en desarrollo
    else {
      try {
        const server = app.listen(port, () => {
          callback(true, app, server);
        });
      } catch (error) {
        log.info(
          __filename,
          'server:startServer',
          'El servidor no ha podido correr en el puerto ' + port
        );
        callback(false, app, undefined);
      }
    }
  });
}

// Exportar funciones
module.exports = { configServer, startServer };
