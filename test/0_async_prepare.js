/**
 * Módulo que se encarga de definir las pruebas iniciales.
 *
 * @module test-init
 * @author Cerciber <contact@cerciber.com>
 */

// Modulos creados
const sync = require('../src/data_layer/data_base/actions/sync');

// Redefinir base de datos
if (enviroment.data_base.redefine) {
  describe('Pruebas para la redefinición de la base de datos": ', () => {
    it('Redefinir base de datos', (done) => {
      sync.redefineDataBase(() => {
        done();
      });
    }).timeout(100000);
  });
}
