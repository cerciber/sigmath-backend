/**
 * @author Cerciber <contact@cerciber.com>
 */

// Modulos creados
const server = require('../../../../../src/aplication_layer/server/server'); // Rutas sin uso

// Ruta relativa completa
const path = '/python/exec';

describe('Peticiones en la ruta "' + path + '": ', () => {
  it('Peticiones exitosas en la ruta "' + path + '"', (done) => {
    // Configurar servidor
    server.configServer((app) => {
      // Obtener información y testear
      supertest(app)
        .post(path)
        .send({
          pythonCode: 'print(1 + 1)',
        })
        .expect(200)
        .expect('2\r\n')
        .end(done);
    });
  });

  it('Peticiones erroneas en la ruta "' + path + '"', (done) => {
    // Configurar servidor
    server.configServer((app) => {
      // Obtener información y testear
      supertest(app)
        .post(path)
        .send({ bad_key: 'bad_valor' })
        .expect(400)
        .expect('Petición a la ruta "' + path + '" erronea')
        .end(done);
    });
  });
});
