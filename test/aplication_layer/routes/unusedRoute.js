/**
 * @author Cerciber <contact@cerciber.com>
 */

// Modulos creados
const server = require('../../../src/aplication_layer/server/server'); // Servidor

describe('Pruebas para peticiones sin uso: ', () => {
  it('Respuesta esperada para peticiones sin uso', (done) => {
    server.configServer((app) => {
      supertest(app)
        .get('/f3f34f')
        .expect(404)
        .expect('Pretición a la ruta "/f3f34f" erronea')
        .end(done);
    });
  });
});
