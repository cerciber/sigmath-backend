/**
 * Módulo que se encarga de definir las variables globales.
 *
 * @module utils-globals
 * @author Cerciber <contact@cerciber.com>
 */

// Modulos creados
const logger_caller = require('../logger/logger_caller');
const enviroment = require('../constants/enviroment.json');

/**
 * Asignar variables globales de acuerdo al entorno en el que se encuente. Los entornos son los siguientes:
 * - Desarrollo
 * - Pruebas
 * - Producción
 */
function setGlobals() {
  // Definir llamado al log como global
  global.log = logger_caller;

  // Definir constantes de la aplicacion como globales según entorno
  if (process.env.NODE_ENV == 'production') {
    global.enviroment = enviroment.production;
  } else {
    global.enviroment = enviroment.development;
  }

  log.info(__filename, 'setGlobals', 'Se asignaron las variables globales');
}

// Exportar funciones
module.exports = { setGlobals };
