/**
 * Módulo que se encarga de recibir peticiones para buscar fichas.
 *
 * @module aplication-route-card-search
 * @author Cerciber <contact@cerciber.com>
 */

// Modulos instalados
const express = require('express');

// Modulos creados
const searchCardDriver = require('../../../../business_layer/drivers/CardDrivers/searchCardDriver');

// Ruta
const path = '/search';

// Ejecutar ruta
const searchCardRoute = express.Router();

/**
 * Petición para buscar fichas.
 *
 * @event
 * @name card-search
 * @path {get} /card/search
 *
 * @query {string} text - Texto de búsqueda de fichas.
 *
 * @response {json[]} cards - Fichas matemáticas obtenidas en la búsqueda.
 * @response {json} cards.ID_CARD - Id de la ficha en la base de datos.
 * @response {string} cards.title - Título de la ficha.
 * @response {string} cards.description - Descripción de la ficha.
 * @response {json[]} cards.params - Parámetros de la ficha.
 * @response {string} cards.params.symbol - Symbolo LaTeX del parámetro.
 * @response {string} cards.params.description - Descripción del parámetro.
 * @response {json} cards.params.content - Ficha matemática del parámetro o valor nulo.
 * @response {string} cards.latexCode - Codigo LaTeX de la ficha.
 * @response {string} cards.pythonCode - Codigo Python de la ficha.
 *
 * @code {200} Si se seleccionaron los datos correctamente.
 * @code {400} Si no se recibieron los datos requeridos para la selección.
 * @code {404} Si no se encontraron resultados.
 * @code {500} Si hubo un error en el servidor.
 */
searchCardRoute.get(path, (req, res) => {
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
  searchCardDriver(req.query.text, (status, result) => {
    log.info(
      __filename,
      'GET',
      'Petición a la ruta "' + req.originalUrl + '" terminada'
    );
    res.status(status).send(result);
  });
});

// Exportar ruta
module.exports = searchCardRoute;
