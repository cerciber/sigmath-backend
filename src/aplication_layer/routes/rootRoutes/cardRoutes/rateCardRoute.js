/**
 * Módulo que se encarga de recibir peticiones en la ruta rate.
 *
 * @module aplication-route-
 * @author Cerciber <contact@cerciber.com>
 */

// Modulos instalados
const express = require('express');

// Modulos creados
const rateCardDriver = require('../../../../business_layer/drivers/CardDrivers/rateCard');
const admin = require('../../../../aplication_layer/server/firebase-admin');

// Ruta
const path = '/rate';

// Ejecutar ruta
const rateRoute = express.Router();

/**
 * Peticiones a la ruta rate.
 *
 * @event
 * @name rate-post
 * @path {post} card/rate
 *
 * @body {string} ID_USER - Id del usuario en la base de datos.
 * @body {integer} ID_CARD - Id de la ficha.
 * @body {number} rate - Calificación de la ficha.
 *
 * @response {json} response - Información de la eliminación.
 * @response {integer} response.length - Número de registros eliminados.
 *
 * @code {200} Si se actualizó la calificación correctamente.
 * @code {201} Si se ingresó una nueva calificación correctamente.
 * @code {400} Si no se recibieron los datos requeridos para la calificación.
 * @code {404} Si no se encontró una ficha para calificaar o el usuario.
 * @code {500} Si hubo un error en el servidor.
 */
rateRoute.post(path, (req, res) => {
  log.info(
    __filename,
    'POST',
    'Petición a la ruta "' + req.originalUrl + '" iniciada'
  );

  // Validaciones
  if (
    !req.body.ID_TOKEN ||
    !req.body.email ||
    !req.body.ID_CARD ||
    !req.body.rate
  ) {
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
      rateCardDriver(
        req.body.email,
        req.body.ID_CARD,
        req.body.rate,
        (status, result) => {
          log.info(
            __filename,
            'POST',
            'Petición a la ruta "' + req.originalUrl + '" terminada'
          );
          res.status(status).send(result);
        }
      );
    })
    .catch(function (error) {
      log.error(
        __filename,
        'DELETE',
        'El usuario no está autorizado para realizar la acción',
        error
      );
      res.status(401).send('No estás autorizado para calificar la ficha.');
      return;
    });
});

module.exports = rateRoute;
