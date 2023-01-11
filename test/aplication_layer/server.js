/**
 * @author Cerciber <contact@cerciber.com>
 */

// Modulos creados
const server = require('../../src/aplication_layer/server/server'); // Servidor

describe('Pruebas de servidor: ', () => {
  it('El servidor trabaja en el puerto ' + enviroment.server.port, () => {
    server.startServer(enviroment.server.port, (status, app, server) => {
      server.close();
      assert.equal(status, true);
    });
  });

  it('El servidor no trabaja en el puerto -1', () => {
    server.startServer(-1, (status, app, server) => {
      server != undefined && server.close();
      assert.equal(status, false);
    });
  });
});
