/**
 * Módulo que se encarga de definir los loggers en archivos de texto y en la consola para el desarrollo con un formato personalizado.
 *
 * @module utils-logger
 * @author Cerciber <contact@cerciber.com>
 */

// Modulos instalados
const { createLogger, format, transports } = require('winston');
const path = require('path');

// Crear logger
const logger = createLogger({
  // Asignar tipos de almacenamiento
  transports: [
    // En archivos
    new transports.File({
      maxsize: 5120000, // Maximo numero de bits por archivo
      maxFiles: 5, // Maximo numero de archivos (Si se llenan se borra el primero)
      filename: `${path.resolve()}/logs/log.log`, // Ubicación de los logs
      // Asignar formato
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.metadata(),
        format.printf((info) => {
          let nameFile = info.metadata.path.split(/(\\|\/|\.)/);
          nameFile = nameFile[nameFile.length - 3];
          return `[${info.metadata.timestamp}] ${
            info.metadata.path
          } \n\t[${info.level.toUpperCase()}] [${nameFile}:${
            info.metadata.reference
          }] ${info.message} ${
            info.metadata.error ? '\n\t' + info.metadata.error.stack : ''
          }`;
        })
      ),
    }),

    // En consola
    new transports.Console({
      // Asignar formato
      format: format.combine(
        format.metadata(),
        format.printf((info) => {
          let label = info.level.toUpperCase();
          // Asignar colores
          switch (info.level.toUpperCase()) {
            case 'INFO':
              label = '\x1b[37m[' + label + ']';
              break;
            case 'WARN':
              label = '\x1b[33m[' + label + ']';
              break;
            case 'ERROR':
              label = '\x1b[31m[' + label + ']';
              break;
          }
          let nameFile = info.metadata.path.split(/(\\|\/|\.)/);
          nameFile = nameFile[nameFile.length - 3];
          return `${label}\x1b[36m [${nameFile}:${info.metadata.reference}]\x1b[37m ${info.message}`;
        })
      ),
    }),
  ],
});

// Exportar logger
module.exports = logger;
