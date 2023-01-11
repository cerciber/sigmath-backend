/**
 * @author Cerciber <contact@cerciber.com>
 */

// Modulos creados
const server = require('../../../src/aplication_layer/server/server'); // Servidor

describe('Pruebas para las peticiones en la ruta "/": ', () => {
  it('Respuesta esperada para las peticiones en la ruta "/"', (done) => {
    server.configServer((app) => {
      supertest(app).get('/').expect(200).expect('Ruta raiz').end(done);
    });
  });
});
