/**
 * Módulo que se encarga de recibir peticiones para registrar un usuario en el sistema.
 *
 * @module aplication-route-user-signup
 * @author Cerciber <contact@cerciber.com>
 */

// Modulos instalados
const express = require('express');

// Modulos creados
const signupDriver = require('../../../../business_layer/drivers/UserDrivers/signupDriver');

// Ruta
const path = '/signup';

// Ejecutar ruta
const signupRoute = express.Router();

/**
 * Petición para registrar un usuario en el sistema.
 *
 * @event
 * @name user-signup
 * @path {post} user/signup
 *
 * @body {string} nickname - Correo electrónico del usuario.
 * @body {string} email - Correo electrónico del usuario.
 * @body {string} password - Contraseña del usuario.
 *
 * @response {integer} ID_USER - Id del usuario registrado.
 * @response {string} nickname - Nombre de usuario.
 * @response {string} email - Correo electrónico del usuario.
 * @response {string} password - Contraseña del usuario.
 *
 * @code {201} Si se registró el usuario correctamente.
 * @code {400} Si no se recibieron los datos requeridos para el registro.
 * @code {409} Si el usuario o el correo ya existen.
 * @code {500} Si hubo un error en el servidor.
 */
signupRoute.post(path, (req, res) => {
  log.info(
    __filename,
    'POST',
    'Petición a la ruta "' + req.originalUrl + '" iniciada'
  );

  // Validaciones
  if (!req.body.nickname || !req.body.email || !req.body.password) {
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
  signupDriver(
    req.body.nickname,
    req.body.email,
    req.body.password,
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

// Exportar ruta
module.exports = signupRoute;
