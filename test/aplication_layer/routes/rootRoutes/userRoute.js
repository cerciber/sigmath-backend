/**
 * @author Cerciber <contact@cerciber.com>
 */

// Modulos creados
const server = require('../../../../src/aplication_layer/server/server'); // Servidor

describe('Pruebas para las peticiones en la ruta "/user": ', () => {
  it('Respuesta esperada para las peticiones en la ruta "/D"', (done) => {
    server.configServer((app) => {
      supertest(app).get('/user').expect(200).expect('Ruta user').end(done);
    });
  });
});
