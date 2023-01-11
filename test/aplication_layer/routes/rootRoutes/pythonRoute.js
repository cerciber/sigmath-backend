/**
 * @author Cerciber <contact@cerciber.com>
 */

// Modulos creados
const server = require('../../../../src/aplication_layer/server/server'); // Servidor

describe('Pruebas para las peticiones en la ruta "/python": ', () => {
  it('Respuesta esperada para las peticiones en la ruta "/python"', (done) => {
    server.configServer((app) => {
      supertest(app).get('/python').expect(200).expect('Ruta python').end(done);
    });
  });
});
