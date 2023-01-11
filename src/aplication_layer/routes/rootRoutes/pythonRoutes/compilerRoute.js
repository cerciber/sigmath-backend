/**
 * Módulo que se encarga de recibir peticiones para compilar codigo Python.
 *
 * @module aplication-route-python-compiler
 * @author Cerciber <contact@cerciber.com>
 */

// Modulos instalados
const express = require('express');

// Modulos creados
const compilerDriver = require('../../../../business_layer/drivers/PythonDrivers/compilerDriver');

// Ruta
const path = '/exec';

// Ejecutar ruta
const execRoute = express.Router();

/**
 * Petición para compilar codigo Python.
 *
 * @event
 * @name python-compiler
 * @path {post} /python/exec
 *
 * @body {string} pythonCode - Codigo Python que se desea compilar.
 *
 * @response {string} result - Resultado en consola de la ejecución.
 *
 * @code {200} Si la compilación se realizó correctamente.
 * @code {400} Si hay un error de sintaxis o si no se recibieron los datos requeridos para la compilación.
 * @code {500} Si hubo un error en el servidor.
 */
execRoute.post(path, (req, res) => {
  log.info(
    __filename,
    'POST',
    'Petición a la ruta "' + req.originalUrl + '" iniciada'
  );

  // Validaciones
  if (!req.body.pythonCode) {
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
  compilerDriver(req.body.pythonCode, (status, result) => {
    log.info(
      __filename,
      'POST',
      'Petición a la ruta "' + req.originalUrl + '" terminada'
    );
    res.status(status).send(result);
  });
});

// Exportar ruta
module.exports = execRoute;
