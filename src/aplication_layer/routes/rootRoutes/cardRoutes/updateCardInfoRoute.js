/**
 * Módulo que se encarga de recibir peticiones para actualizar la informacion (metadatos) de una ficha en la base de datos.
 *
 * @module aplication-route-card-inf-update
 * @author Cerciber <contact@cerciber.com>
 */

// Modulos instalados
const express = require('express');

// Modulos creados
const updateCardInfoDriver = require('../../../../business_layer/drivers/CardDrivers/updateCardInfoDriver');
const admin = require('../../../../aplication_layer/server/firebase-admin');

// Ruta
const path = '/update/info';

// Ejecutar ruta
const updateCardInfoRoute = express.Router();

/**
 * Petición para actualizar la informacion de una ficha en la base de datos.
 *
 * @event
 * @name card-update
 * @path {put} /card/update
 *
 * @body {string} ID_USER - Id del usuario en la base de datos.
 * @body {string} info - Metadata de la ficha matemática.
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
updateCardInfoRoute.put(path, (req, res) => {
  log.info(
    __filename,
    'PUT',
    'Petición a la ruta "' + req.originalUrl + '" iniciada'
  );

  // Validaciones
  if (!req.body.ID_TOKEN || !req.body.info) {
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
  log.info(__filename, 'PUT', JSON.stringify(req.body));
  // Autenticación
  admin
    .auth()
    .verifyIdToken(req.body.ID_TOKEN)
    .then(() => {
      // Llamada al Driver
      updateCardInfoDriver(req.body.info, (status, result) => {
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
module.exports = updateCardInfoRoute;
