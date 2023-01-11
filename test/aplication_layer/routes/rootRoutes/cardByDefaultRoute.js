/**
 * @author Cerciber <contact@cerciber.com>
 */

// Modulos creados
const server = require('../../../../src/aplication_layer/server/server'); // Servidor

describe('Pruebas para las peticiones en la ruta "/cardByDefault": ', () => {
  it('Respuesta esperada para las peticiones en la ruta "/cardByDefault"', (done) => {
    server.configServer((app) => {
      supertest(app)
        .get('/cardByDefault')
        .expect(200)
        .expect('Ruta cardByDefault')
        .end(done);
    });
  });
});
