/**
 * Módulo que se encarga de recibir peticiones para guardar una ficha en la base de datos.
 *
 * @module aplication-route-card-insert
 * @author Cerciber <contact@cerciber.com>
 */

// Modulos instalados
const express = require('express');

// Modulos creados
const insertCardDriver = require('../../../../business_layer/drivers/CardDrivers/insertCardDriver');
const admin = require('../../../../aplication_layer/server/firebase-admin');

// Ruta
const path = '/insert';

// Ejecutar ruta
const insertCardRoute = express.Router();

/**
 * Petición para guardar una ficha en la base de datos.
 *
 * @event
 * @name card-insert
 * @path {post} /card/insert
 *
 * @body {string} ID_USER - ID del usuario.
 * @body {string} card - Ficha matemática.
 * @body {string} card.title - Título de la ficha.
 * @body {string} card.description - Descripción de la ficha.
 * @body {json[]} card.params - Parámetros de la ficha.
 * @body {string} card.params.symbol - Symbolo LaTeX del parámetro.
 * @body {string} card.params.description - Descripción del parámetro.
 * @body {json} card.params.content - Ficha matemática del parámetro o valor nulo.
 * @body {string} card.latexCode - Codigo LaTeX de la ficha.
 * @body {string} card.pythonCode - Codigo Python de la ficha.
 *
 * @response {json} card - Ficha matemática ingresada.
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
 * @code {201} Si se ingresaron los datos correctamente.
 * @code {400} Si no se recibieron los datos requeridos para la insersión.
 * @code {409} Si los datos nuevos ya existen.
 * @code {500} Si hubo un error en el servidor.
 */
insertCardRoute.post(path, (req, res) => {
  log.info(
    __filename,
    'POST',
    'Petición a la ruta "' + req.originalUrl + '" iniciada'
  );

  // Validaciones
  if (!req.body.ID_TOKEN || !req.body.email || !req.body.card) {
    log.info(
      __filename,
      'POST',
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
      insertCardDriver(req.body.email, req.body.card, (status, result) => {
        log.info(
          __filename,
          'POST',
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
      res.status(401).send('No estás autorizado para ingresar la ficha.');
      return;
    });
});

// Exportar ruta
module.exports = insertCardRoute;
