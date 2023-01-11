/**
 * Módulo que se encarga de recibir peticiones para actualizar una ficha en la base de datos.
 *
 * @module aplication-route-card-update
 * @author Cerciber <contact@cerciber.com>
 */

// Modulos instalados
const express = require('express');

// Modulos creados
const updateCardDriver = require('../../../../business_layer/drivers/CardDrivers/updateCardDriver');
const admin = require('../../../../aplication_layer/server/firebase-admin');

// Ruta
const path = '/update';

// Ejecutar ruta
const updateCardRoute = express.Router();

/**
 * Petición para actualizar una ficha en la base de datos.
 *
 * @event
 * @name card-update
 * @path {put} /card/update
 *
 * @body {string} ID_USER - Id del usuario en la base de datos.
 * @body {string} card - Ficha matemática.
 * @body {string} card.ID_CARD - Id de la ficha en la base de datos.
 * @body {string} card.title - Título de la ficha.
 * @body {string} card.description - Descripción de la ficha.
 * @body {json[]} card.params - Parámetros de la ficha.
 * @body {string} card.params.symbol - Symbolo LaTeX del parámetro.
 * @body {string} card.params.description - Descripción del parámetro.
 * @body {json} card.params.content - Ficha matemática del parámetro o valor nulo.
 * @body {string} card.latexCode - Codigo LaTeX de la ficha.
 * @body {string} card.pythonCode - Codigo Python de la ficha.
 *
 * @response {json} response - Información de la actualización.
 * @response {json} response.length - Número de registros actualizados.
 *
 * @code {201} Si se ingresaron los datos correctamente.
 * @code {400} Si no se recibieron los datos requeridos para la insersión.
 * @code {404} Si no se encontraron resultados para eliminar.
 * @code {409} Si los datos ya existen.
 * @code {500} Si hubo un error en el servidor.
 */
updateCardRoute.put(path, (req, res) => {
  log.info(
    __filename,
    'PUT',
    'Petición a la ruta "' + req.originalUrl + '" iniciada'
  );

  // Validaciones
  if (!req.body.ID_TOKEN || !req.body.email || !req.body.card) {
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
    .verifyIdToken(req.body.ID_TOKEN)
    .then(() => {
      // Llamada al Driver
      updateCardDriver(req.body.email, req.body.card, (status, result) => {
        log.info(
          __filename,
          'PUT',
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
      res.status(401).send('No estás autorizado para actualizar la ficha.');
      return;
    });
});

// exportar ruta
module.exports = updateCardRoute;
