/**
 * Módulo que se encarga de recibir peticiones en la ruta password.
 *
 * @module aplication-route-
 * @author Cerciber <contact@cerciber.com>
 */

// Modulos instalados
const express = require('express');

// Modulos creados

const updatePasswordDriver = require('../../../../business_layer/drivers/UserDrivers/updatePasswordDriver');
const encryptionDriver = require('../../../../business_layer/drivers/UserDrivers/encryptionDriver');
const sendEmailDriver = require('../../../../business_layer/drivers/UserDrivers/sendEmailDriver');
const { response } = require('express');

// Ruta
const path = '/password';

// Ejecutar ruta
const passwordRoute = express.Router();

/**
 * Peticiones a la ruta password.
 *
 * @event
 * @name password-get
 * @path {get} [Ruta_Relativa]/password
 *
 * @body {tipo} Nombre - Ingrese la descripción (Un body por cada elemento).
 * @query {tipo} Nombre - Ingrese la descripción (Un query por cada consulta).
 * @params {tipo} Nombre - Ingrese la descripción (Un params por cada parametro).
 *
 * @response {tipo} Respuesta - Ingrese la descripción (Uno por cada respuesta).
 * @code {200} Ingrese la condición (Un code por cada condición).
 */

passwordRoute.post(path + '/send_email', (req, res) => {
  log.info(
    __filename,
    'POST',
    'Petición a la ruta "' + req.originalUrl + '" iniciada'
  );
  if (!req.body.email || !req.body.code) {
    log.info(
      __filename,
      'POST',
      'Petición a la ruta "' + req.originalUrl + '" erronea'
    );
    res
      .status(400)
      .send('Petición a la ruta "' + req.originalUrl + '" erronea');
    return;
  } else {
    sendEmailDriver.sendEmail(
      req.body.email,
      req.body.code,
      (status, result) => {
        log.info(
          __filename,
          'POST',
          'Petición a la ruta "' + req.originalUrl + '" terminada'
        );
        res.status(status).send(result);
      }
    );
  }
});

passwordRoute.post(path, (req, res) => {
  log.info(
    __filename,
    'POST',
    'Petición a la ruta "' + req.originalUrl + '" iniciada'
  );

  // Validaciones
  if (!req.body.email || !req.body.newPassword) {
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

  // Llamada al Driver
  encryptionDriver.encryptPassword(req.body.newPassword, (hash) => {
    updatePasswordDriver(
      req.body.email,
      hash,
      req.body.newPassword,
      (status, result) => {
        log.info(
          __filename,
          'POST',
          'Petición a la ruta "' + req.originalUrl + '" terminada'
        );
        res.status(status).send(result);
      }
    );
  });
});

module.exports = passwordRoute;
