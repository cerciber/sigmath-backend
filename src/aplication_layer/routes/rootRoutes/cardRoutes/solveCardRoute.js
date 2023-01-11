/**
 * Módulo que se encarga de recibir peticiones para solucionar una ficha.
 *
 * @module aplication-route-card-solve
 * @author Cerciber <contact@cerciber.com>
 */

// Modulos instalados
const express = require('express');

// Modulos creados
const solveCardDriver = require('../../../../business_layer/drivers/CardDrivers/solveCardDriver');

// Ruta
const path = '/solve';

// Ejecutar ruta
const solveCardRoute = express.Router();

/**
 * Petición para crear una ficha rápida.
 *
 * @event
 * @name card-solve
 * @path {post} /card/solve
 *
 * @body {string} card - Ficha matemática a resolver.
 * @body {string} card.title - Título de la ficha.
 * @body {string} card.description - Descripción de la ficha.
 * @body {json[]} card.params - Parámetros de la ficha.
 * @body {string} card.params.symbol - Symbolo LaTeX del parámetro.
 * @body {string} card.params.description - Descripción del parámetro.
 * @body {json} card.params.content - Ficha matemática del parámetro o valor nulo.
 * @body {string} card.latexCode - Codigo LaTeX de la ficha.
 * @body {string} card.pythonCode - Codigo Python de la ficha.
 *
 * @response {json} card - Ficha matemática obtenida de la expresión.
 * @response {string} card.title - Título de la ficha.
 * @response {string} card.description - Descripción de la ficha.
 * @response {json[]} card.params - Parámetros de la ficha.
 * @response {string} card.params.symbol - Symbolo LaTeX del parámetro.
 * @response {string} card.params.description - Descripción del parámetro.
 * @response {json} card.params.content - Ficha matemática del parámetro o valor nulo.
 * @response {string} card.latexCode - Codigo LaTeX de la ficha.
 * @response {string} card.pythonCode - Codigo Python de la ficha.
 *
 * @code {200} Si se resolvió la ficha correctamente.
 * @code {400} Si hay incompatibilidades matemáticas o si no se recibieron los datos requeridos para resolver.
 * @code {500} Si hubo un error en el servidor.
 */
solveCardRoute.post(path, (req, res) => {
  log.info(
    __filename,
    'GET',
    'Petición a la ruta "' + req.originalUrl + '" iniciada'
  );

  // Validaciones
  if (!req.body.card) {
    log.info(
      __filename,
      'GET',
      'Petición a la ruta "' + req.originalUrl + '" erronea'
    );
    res
      .status(400)
      .send('Petición a la ruta "' + req.originalUrl + '" erronea');
    return;
  }

  // Llamada al Driver
  solveCardDriver(req.body.card, (status, result) => {
    log.info(
      __filename,
      'GET',
      'Petición a la ruta "' + req.originalUrl + '" terminada'
    );
    res.status(status).send(result);
  });
});

// Exportar ruta
module.exports = solveCardRoute;
