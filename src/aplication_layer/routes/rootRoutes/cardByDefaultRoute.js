/**
 * Módulo que se encarga de recibir peticiones para verificar que las rutas de las fichas por defecto funcionan correctamente.
 *
 * @module aplication-route-default-card
 * @author Cerciber <contact@cerciber.com>
 */

// Modulos instalados
const express = require('express');

// Modulos creados
const selectCardByDefaultRoute = require('./cardByDefaultRoutes/selectCardByDefaultRoute'); // Ruta hija

// Ruta
const path = '/cardByDefault';

// Ejecutar ruta
const root = express.Router();

// Asignar rutas hijas
root.use(path, selectCardByDefaultRoute);

/**
 * Petición para verificar que las rutas de las fichas por defecto funcionan correctamente.
 *
 * @name default-card
 * @event
 * @path {get} /cardByDefault
 * @response {string} Respuesta - Mensaje que indica que se ha ingresado a la ruta correctamente.
 * @code {200} Si funciona correctamente.
 */
root.get(path, (req, res) => {
  log.info(__filename, 'GET', 'Pretición a la ruta "' + req.originalUrl + '"');
  res.status(200).send('Ruta cardByDefault');
});

// Exportar ruta
module.exports = root;
