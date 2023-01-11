/**
 *  Módulo que se encarga de recibir peticiones erroneas y notificar que no existe.
 *
 * @module aplication-route-unused
 * @author Cerciber <contact@cerciber.com>
 */

// Modulos instalados
const express = require('express');

// Ejecutar ruta
const unused = express.Router();

// Ruta
const path = '*';

/**
 * Petición para recibir peticiones erroneas y notificar que no existe.
 *
 * @name unused
 * @event
 * @path {all} *
 * @response {string} Mensaje - Mensaje que indica que la ruta es erronea.
 * @code {404} Si no se encuentra la ruta (Respuesta esperada).
 */
unused.all(path, (req, res) => {
  log.warn(
    __filename,
    'all',
    'Pretición a la ruta erronea "' + req.originalUrl + '"'
  );
  res.status(404).send('Pretición a la ruta "' + req.originalUrl + '" erronea');
});

// Exportar ruta
module.exports = unused;
