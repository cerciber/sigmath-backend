/**
 * Módulo que se encarga de recibir peticiones para crear una ficha rápida.
 *
 * @module aplication-route-card-fast
 * @author Cerciber <contact@cerciber.com>
 */

// Modulos instalados
const express = require('express');

// Modulos creados
const fastCardDriver = require('../../../../business_layer/drivers/CardDrivers/fastCardDriver');

// Ruta
const path = '/fast';

// Ejecutar ruta
const fastCardRoute = express.Router();

/**
 * Petición para crear una ficha rápida.
 *
 * @event
 * @name card-fast
 * @path {get} /card/fast
 *
 * @query {string} text - Expresión matemática a convertir a ficha.
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
 * @code {200} Si se convirtió la expresión a ficha correctamente.
 * @code {400} Si hay incompatibilidades matemáticas o si no se recibieron los datos requeridos para la conversión.
 * @code {500} Si hubo un error en el servidor.
 */
fastCardRoute.get(path, (req, res) => {
  log.info(
    __filename,
    'GET',
    'Petición a la ruta "' + req.originalUrl + '" iniciada'
  );

  // Validaciones
  if (
    !req.query.text ||
    typeof req.query.text !== 'string' ||
    req.query.text.trim() === ''
  ) {
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
  fastCardDriver(req.query.text, (status, result) => {
    log.info(
      __filename,
      'GET',
      'Petición a la ruta "' + req.originalUrl + '" terminada'
    );
    res.status(status).send(result);
  });
});

// Exportar ruta
module.exports = fastCardRoute;
