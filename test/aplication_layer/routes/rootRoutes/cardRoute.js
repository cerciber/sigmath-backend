/**
 * @author Cerciber <contact@cerciber.com>
 */

// Modulos creados
const server = require('../../../../src/aplication_layer/server/server'); // Servidor

describe('Pruebas para las peticiones en la ruta "/card": ', () => {
  it('Respuesta esperada para las peticiones en la ruta "/card"', (done) => {
    server.configServer((app) => {
      supertest(app).get('/card').expect(200).expect('Ruta card').end(done);
    });
  });
});
