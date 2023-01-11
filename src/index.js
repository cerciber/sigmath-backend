/**
 * Modulo principal del servidor.
 * - Configura las variables globales
 * - Inicia el servidor
 * - Configura la base de datos
 *
 * @module index
 * @author Cerciber <contact@cerciber.com>
 */

// Definir varibales globales
require('../utils/globals/globals').setGlobals();

// Modulos creados
const server = require('./aplication_layer/server/server'); // Servidor
const sync = require('./data_layer/data_base/actions/sync'); // Sincronización
const default_data = require('./data_layer/data_base/actions/default_data'); // Datos por defecto

// Iniciar servidor
const PORT = process.env.PORT || enviroment.server.port;
server.startServer(PORT, () => {
  log.info(
    __filename,
    'startServer',
    'El servidor está corriendo en el puerto ' + PORT
  );
  // Redefinir base de datos
  if (enviroment.data_base.redefine) {
    sync.redefineDataBase(() => {
      // Actualizar fichas por defecto
      default_data.updateAll();
    });
  } else {
    // Actualizar fichas por defecto
    default_data.updateAll();
  }
});
