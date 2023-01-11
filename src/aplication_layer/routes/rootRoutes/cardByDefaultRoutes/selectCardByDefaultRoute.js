/**
 * Módulo que se encarga de recibir peticiones para seleccionar una ficha por defecto.
 *
 * @module aplication-route-default-card-select
 * @author Cerciber <contact@cerciber.com>
 */

// Modulos instalados
const express = require('express');

// Modulos creados
const selectCardByDefaultDriver = require('../../../../business_layer/drivers/CardByDefaultDrivers/selectCardByDefaultDriver');

// Ruta
const path = '/select';

// Ejecutar ruta
const selectCardByDefaultRoute = express.Router();

/**
 * Petición para seleccionar una ficha por defecto.
 *
 * @event
 * @name default-card-select
 * @path {get} /cardByDefault/select
 *
 * @query {integer} ID_CARD_BY_DEFAULT - Id de la ficha por defecto a buscar.
 *
 * @response {json[]} defaultCards - Lista de fichas por defecto.
 * @response {integer} defaultCards.ID_CARD_BY_DEFAULT - Id de la ficha por defecto.
 * @response {integer} defaultCards.ID_CARD - Id de la ficha.
 * @response {integer} defaultCards.ID_CATEGORY - Id de la categoría.
 *
 * @code {200} Si se seleccionaron los datos correctamente.
 * @code {400} Si no se recibieron los datos requeridos para la selección.
 * @code {404} Si no se encontraron resultados.
 * @code {500} Si hubo un error en el servidor.
 */
selectCardByDefaultRoute.get(path, (req, res) => {
  log.info(
    __filename,
    'GET',
    'Petición a la ruta "' + req.originalUrl + '" iniciada'
  );

  // Validaciones
  if (!req.query.ID_CARD_BY_DEFAULT) {
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
  selectCardByDefaultDriver(req.query.ID_CARD_BY_DEFAULT, (status, result) => {
    log.info(
      __filename,
      'GET',
      'Petición a la ruta "' + req.originalUrl + '" terminada'
    );
    res.status(status).send(result);
  });
});

// Exportar ruta
module.exports = selectCardByDefaultRoute;
