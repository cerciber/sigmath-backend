/**
 * Módulo que se encarga de recibir peticiones para verificar que las rutas de python funcionan correctamente.
 *
 * @module aplication-route-python
 * @author Cerciber <contact@cerciber.com>
 */

// Modulos instalados
const express = require('express');

// Modulos creados
const compilerRoute = require('./pythonRoutes/compilerRoute'); // Ruta hija

// Ruta
const path = '/python';

// Ejecutar ruta
const root = express.Router();

// Asignar rutas hijas
root.use(path, compilerRoute);

/**
 * Petición para verificar que las rutas de python funcionan correctamente.
 *
 * @name python
 * @event
 * @path {get} /python
 * @response {string} Respuesta - Mensaje que indica que se ha ingresado a la ruta correctamente.
 * @code {200} Si funciona correctamente.
 */
root.get(path, (req, res) => {
  log.info(__filename, 'GET', 'Pretición a la ruta "' + req.originalUrl + '"');
  res.status(200).send('Ruta python');
});

// Exportar ruta
module.exports = root;
