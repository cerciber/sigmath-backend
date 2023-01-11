/**
 * Módulo que ingresa en la base de datos los datos por defecto.
 *
 * @module data-default
 * @author Cerciber <contact@cerciber.com>
 */

// Modulos creados
const defaultCards = require('../../statics/defaultCards.json');
const cardRepository = require('../../../persistence_layer/repositories/cardRepository');
const userRepository = require('../../../persistence_layer/repositories/userRepository');
const userCardRepository = require('../../../persistence_layer/repositories/userCardRepository');
const cardInfoRepository = require('../../../persistence_layer/repositories/cardInfoRepository');
const encryptionDriver = require('../../../business_layer/drivers/UserDrivers/encryptionDriver');

/**
 * Actualizar o Insertar datos por defecto a la base de datos.
 *
 * @param {module:data-default.insertAllCallback} callback - Respuesta al terminar de actualizar o insertar los datos por defecto a la base de datos.
 */
function updateAll() {
  // Ingresar usuario por defecto si no existe
  insertSigmathUser((status, userResult) => {
    if (status === 200 || status === 201) {
      log.info(__filename, 'updateAll', 'User "sigmath" correct');
      // Actualizar o Insertar datos por defecto
      for (const category of defaultCards) {
        for (const card of category.content) {
          // Verificar si la ficha ya existe
          cardRepository.select(
            { where: { ID_CARD: card.ID_CARD } },
            (status, result) => {
              // Acciones
              if (status === 200) {
                cardRepository.update(
                  {
                    title: card.title,
                    description: card.description,
                    params: card.params,
                    latexCode: card.latexCode,
                    pythonCode: card.pythonCode,
                  },
                  { where: { ID_CARD: card.ID_CARD } },
                  (status, result) => {
                    if (status === 200) {
                      log.info(
                        __filename,
                        'updateAll',
                        'Update default card "' + card.title + '" success'
                      );
                    } else {
                      log.error(
                        __filename,
                        'updateAll',
                        'Update default card "' + card.title + '" failed',
                        result
                      );
                    }
                  }
                );
              } else if (status === 404) {
                cardRepository.insert(
                  {
                    ID_CARD: card.ID_CARD,
                    title: card.title,
                    description: card.description,
                    params: card.params,
                    latexCode: card.latexCode,
                    pythonCode: card.pythonCode,
                  },
                  {},
                  (status, result) => {
                    // Si la ficha se ingresó correctamente
                    if (status === 201) {
                      // Insertar ficha del usuario a través del repositorio
                      userCardRepository.insert(
                        {
                          ID_USER: userResult.ID_USER,
                          ID_CARD: card.ID_CARD,
                        },
                        (status, userCardResult) => {
                          // Si la ficha del usuario se ingresó correctamente
                          if (status === 201) {
                            // Insertar información de la ficha a través del repositorio
                            var datetime = new Date();
                            cardInfoRepository.insert(
                              {
                                ID_CARD: userCardResult.ID_CARD,
                                creationDate: datetime,
                                modificationDate: datetime,
                                scope: 'public',
                              },
                              (status, result) => {
                                if (status !== 201) {
                                  log.error(
                                    __filename,
                                    'updateAll',
                                    'Insert sigmath card info of "' +
                                      card.title +
                                      '" failed',
                                    result
                                  );
                                }
                              }
                            );
                          } else {
                            log.error(
                              __filename,
                              'updateAll',
                              'Insert sigmath card "' +
                                card.title +
                                '" relation failed',
                              result
                            );
                          }
                        }
                      );
                    } else {
                      log.error(
                        __filename,
                        'updateAll',
                        'Insert default card "' + card.title + '" failed',
                        result
                      );
                    }
                  }
                );
              } else {
                log.error(
                  __filename,
                  'updateAll',
                  'Select default card "' + card.title + '" failed',
                  result
                );
              }
            }
          );
        }
      }
    } else {
      log.error(
        __filename,
        'updateAll',
        'Insert or update user "sigmath" failed',
        userResult
      );
    }
  });
}

/**
 * Actualizar o Insertar usuario por defecto en la base de datos.
 *
 * @param {module:data-default.insertAllCallback} callback - Respuesta al terminar de actualizar o insertar los datos por defecto a la base de datos.
 */
function insertSigmathUser(callback) {
  // Seleccionar usuario
  userRepository.select(
    { where: { email: 'labeleon.sigmath@gmail.com' } },
    (status, result) => {
      if (status === 200) {
        callback(status, result[0]);
      } else if (status === 404) {
        encryptionDriver.encryptPassword('sigmath123', (hash) => {
          userRepository.insert(
            {
              nickname: 'sigmath',
              email: 'labeleon.sigmath@gmail.com',
              password: hash,
            },
            (status, result) => {
              callback(status, result);
            }
          );
        });
      } else {
        log.error(
          __filename,
          'insertSigmathUser',
          'Select user "sigmath" failed',
          result
        );
        callback(status, result);
      }
    }
  );
}

// Exportar funciones
module.exports = { updateAll };
