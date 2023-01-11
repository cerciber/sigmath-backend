/**
 * Módulo que se encarga de recibir peticiones para seleccionar una ficha.
 *
 * @module aplication-route-card-select
 * @author Cerciber <contact@cerciber.com>
 */

// Modulos instalados
const express = require('express');

// Modulos creados
const selectCardsDriver = require('../../../../business_layer/drivers/CardDrivers/selectCardsDriver');
const admin = require('../../../../aplication_layer/server/firebase-admin');

// Ruta
const path = '/select';

// Ejecutar ruta
const selectCardRoute = express.Router();

/**
 * Petición para buscar fichas.
 *
 * @event
 * @name card-select
 * @path {get} /card/select
 *
 * @query {string} ID_USER - Id del usuario en la base de datos.
 *
 * @response {json} card - Ficha matemáticas seleccionada.
 * @response {json} card.ID_CARD - Id de la ficha en la base de datos.
 * @response {string} card.title - Título de la ficha.
 * @response {string} card.description - Descripción de la ficha.
 * @response {json[]} card.params - Parámetros de la ficha.
 * @response {string} card.params.symbol - Symbolo LaTeX del parámetro.
 * @response {string} card.params.description - Descripción del parámetro.
 * @response {json} card.params.content - Ficha matemática del parámetro o valor nulo.
 * @response {string} card.latexCode - Codigo LaTeX de la ficha.
 * @response {string} card.pythonCode - Codigo Python de la ficha.
 *
 * @code {200} Si se seleccionaron los datos correctamente.
 * @code {400} Si no se recibieron los datos requeridos para la selección.
 * @code {404} Si no se encontraron resultados.
 * @code {500} Si hubo un error en el servidor.
 */
selectCardRoute.get(path, (req, res) => {
  log.info(
    __filename,
    'GET',
    'Petición a la ruta "' + req.originalUrl + '" iniciada'
  );

  // Validaciones
  if (!req.query.ID_TOKEN || !req.query.email) {
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

  // Autenticación
  admin
    .auth()
    .verifyIdToken(req.query.ID_TOKEN)
    .then(() => {
      // Llamada al Driver
      selectCardsDriver(req.query.email, (status, result) => {
        log.info(
          __filename,
          'GET',
          'Petición a la ruta "' + req.originalUrl + '" terminada'
        );
        res.status(status).send(result);
      });
    })
    .catch(function (error) {
      log.error(
        __filename,
        'DELETE',
        'El usuario no está autorizado para realizar la acción',
        error
      );
      res.status(401).send('No estás autorizado para seleccionar las fichas.');
      return;
    });
});

// Exportar ruta
module.exports = selectCardRoute;
