/**
 * Módulo que se encarga de recibir peticiones para verificar que las rutas de usuario funcionan correctamente.
 *
 * @module aplication-route-user
 * @author Cerciber <contact@cerciber.com>
 */

// Modulos instalados
const express = require('express');

// Modulos creados
const signupRoute = require('./userRoutes/signupRoute');
const loginRoute = require('./userRoutes/loginRoute');
const newPasswordRoute = require('./userRoutes/newPasswordRoute');
// Ruta
const path = '/user';

// Ejecutar ruta
const root = express.Router();

// Asignar rutas hijas
root.use(path, signupRoute);
root.use(path, loginRoute);
root.use(path, newPasswordRoute);

/**
 * Petición para verificar que las rutas de usuario funcionan correctamente.
 *
 * @name user
 * @event
 * @path {get} /user
 * @response {string} Respuesta - Mensaje que indica que se ha ingresado a la ruta correctamente.
 * @code {200} Si funciona correctamente.
 */
root.get(path, (req, res) => {
  log.info(__filename, 'GET', 'Pretición a la ruta "' + req.originalUrl + '"');
  res.status(200).send('Ruta user');
});

// Exportar ruta
module.exports = root;
