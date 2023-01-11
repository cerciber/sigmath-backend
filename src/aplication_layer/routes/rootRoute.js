/**
 * Módulo que se encarga de recibir peticiones para verificar que la ruta raíz funciona correctamente.
 *
 * @module aplication-route-root
 * @author Cerciber <contact@cerciber.com>
 */

// Modulos instalados
const express = require('express');

// Modulos creados

// Ficha
// const cardByDefaultRoute = require('./rootRoutes/cardByDefaultRoute');
const cardRoute = require('./rootRoutes/cardRoute');
// const pythonRoute = require('./rootRoutes/pythonRoute');
const userRoute = require('./rootRoutes/userRoute');

// Ruta
const path = '/';

// Ejecutar ruta
const root = express.Router();

// Asignar rutas hijas
// root.use(path, cardByDefaultRoute);
root.use(path, cardRoute);
// root.use(path, pythonRoute);
root.use(path, userRoute);

/**
 * Petición para verificar que la ruta raíz funciona correctamente.
 *
 * @name root
 * @event
 * @path {get} /
 * @response {string} Mensaje - Mensaje que indica que se ha ingresado a la ruta correctamente.
 * @code {200} Si funciona correctamente.
 */
root.get(path, (req, res) => {
  log.info(__filename, 'get', 'Pretición a la ruta "' + req.originalUrl + '"');
  res.status(200).send('Ruta raiz');
});

// Exportar ruta
module.exports = root;
