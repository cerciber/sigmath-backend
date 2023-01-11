/**
 * Módulo que se encarga de recibir peticiones para eliminar una ficha de la base de datos.
 *
 * @module aplication-route-card-delete
 * @author Cerciber <contact@cerciber.com>
 */

// Modulos instalados
const express = require('express');

// Modulos creados
const destroyCardDriver = require('../../../../business_layer/drivers/CardDrivers/destroyCardDriver');
const admin = require('../../../../aplication_layer/server/firebase-admin');

// Ruta
const path = '/destroy';

//  Ejecutar ruta
const destroyCardRoute = express.Router();

/**
 * Petición para eliminar una ficha de la base de datos.
 *
 * @event
 * @name card-delete
 * @path {delete} /card/destroy
 *
 * @query {string} ID_TOKEN - Token de la sesión.
 * @query {string} email - Correo del usuario.
 * @query {integer} ID_CARD - Id de la ficha.
 *
 * @response {json} response - Información de la eliminación.
 * @response {integer} response.length - Número de registros eliminados.
 *
 * @code {200} Si se borraron los datos correctamente.
 * @code {400} Si no se recibieron los datos requeridos para la eliminación.
 * @code {404} Si no se encontraron resultados para eliminar.
 * @code {500} Si hubo un error en el servidor.
 */
destroyCardRoute.delete(path, (req, res) => {
  log.info(
    __filename,
    'DELETE',
    'Petición a la ruta "' + req.originalUrl + '" iniciada'
  );

  // Validaciones
  if (!req.query.ID_TOKEN || !req.query.email || !req.query.ID_CARD) {
    log.info(
      __filename,
      'DELETE',
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
      //  Llamada al Driver
      destroyCardDriver(
        req.query.email,
        req.query.ID_CARD,
        (status, result) => {
          log.info(
            __filename,
            'DELETE',
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
      res.status(401).send('No estás autorizado para eliminar la ficha.');
      return;
    });
});

// Exportar ruta
module.exports = destroyCardRoute;
