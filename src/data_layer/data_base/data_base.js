/**
 * Módulo de conexión a la base de datos.
 * - Define la autenticación.
 * - Define la base de datos a la cual conectarse.
 * - Define el puerto de conexión.
 * - Define el lenguaje gestor de bases de datos por el cual conectarse.
 * - Define configuraciones relacionadas al numero de conexión en la base de datos.
 * - Define configuraciones generales de opración.
 *
 * @module data-database
 * @author Cerciber <contact@cerciber.com>
 */

// Modulos instalados
const Sequelize = require('sequelize'); // Sequelize

// Conectar
const data_base = new Sequelize(
  enviroment.data_base.name, // Base de datos
  enviroment.data_base.username, // Usuario
  enviroment.data_base.password, // Contraseña
  {
    host: enviroment.data_base.host, // Host
    dialect: enviroment.data_base.dialect, // Lenguaje
    pool: {
      max: enviroment.data_base.max, // Hilos de conexión maximos
      min: enviroment.data_base.min, // Hilos de conexión minimos
      acquire: enviroment.data_base.acquire, // Tiempo máximo de espera para obtener una conexión antes de dar error (milisegundos)
      idle: enviroment.data_base.idle, // Tiempo máximo de inactividad de una conexión antes de ser eliminada (milisegundos)
    },
    logging: enviroment.data_base.logging, // Desactivar mensajes por consola de Sequelize
    query: { raw: true }, // Devolver los resultados en Json limpio (De debe desactivar manualmente en el los include (join))
    define: {
      freezeTableName: true, // Desactivar modificación de nombres por defecto
      timestamps: false, // Desactivar marcas de tiempo en los atributos
    },
  }
);

// Exportar base de datos
module.exports = data_base;
