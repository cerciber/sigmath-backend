/**
 * Módulo que se encarga de recibir peticiones para verificar que las rutas de las fichas funcionan correctamente.
 *
 * @module aplication-route-card
 * @author Cerciber <contact@cerciber.com>
 */

// Modulos instalados
const express = require('express');

// Modulos creados
const destroyCardRoute = require('./cardRoutes/destroyCardRoute');
const insertCardRoute = require('./cardRoutes/insertCardRoute');
const searchCardsRoute = require('./cardRoutes/searchCardsRoute');
const selectCardsRoute = require('./cardRoutes/selectCardsRoute');
const solveCardRoute = require('./cardRoutes/solveCardRoute');
const updateCardRoute = require('./cardRoutes/updateCardRoute');
const fastCardRoute = require('./cardRoutes/fastCardRoute');
const rateCardRoute = require('./cardRoutes/rateCardRoute');
const updateCardInfoRoute = require('./cardRoutes/updateCardInfoRoute');

// Ruta
const path = '/card';

// Ejecutar ruta
const root = express.Router();

// Asignar rutas hijas
root.use(path, destroyCardRoute);
root.use(path, insertCardRoute);
root.use(path, searchCardsRoute);
root.use(path, selectCardsRoute);
root.use(path, solveCardRoute);
root.use(path, updateCardRoute);
root.use(path, fastCardRoute);
root.use(path, rateCardRoute);
root.use(path, updateCardInfoRoute);

/**
 * Petición para verificar que las rutas de las fichas funcionan correctamente.
 *
 * @name card
 * @event
 * @path {get} /card
 * @response {string} Respuesta - Mensaje que indica que se ha ingresado a la ruta correctamente.
 * @code {200} Si funciona correctamente.
 */
root.get(path, (req, res) => {
  log.info(__filename, 'GET', 'Pretición a la ruta "' + req.originalUrl + '"');
  res.status(200).send('Ruta card');
});

// Exportar ruta
module.exports = root;
