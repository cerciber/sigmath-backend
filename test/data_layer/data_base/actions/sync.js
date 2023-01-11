/**
 * @author Cerciber <contact@cerciber.com>
 */

// Modulos creados
const sync = require('../../../../src/data_layer/data_base/actions/sync'); // Servidor

describe('Pruebas de error de la sincronización de la base de datos por usuario: ', () => {
  // Guardar nombre de usuario real
  let user_aux = undefined;

  beforeEach(() => {
    user_aux = enviroment.data_base.user;
    enviroment.data_base.user = '';
  });

  afterEach(() => {
    enviroment.data_base.user = user_aux;
  });

  it('Error al crear la base de datos', (done) => {
    sync.createNonExistentDataBataBase((result) => {
      assert.equal(result, false);
      done();
    });
  });

  it('Error al borrar la base de datos', (done) => {
    sync.dropExistentDataBataBase((result) => {
      assert.equal(result, false);
      done();
    });
  });
});

describe('Pruebas de error de la sincronización de la base de datos por base de datos: ', () => {
  // Guardar nombre de usuario real
  let db_aux = undefined;

  beforeEach(() => {
    db_aux = enviroment.data_base.name;
    enviroment.data_base.name = '';
  });

  afterEach(() => {
    enviroment.data_base.name = db_aux;
  });

  it('Error al crear la base de datos', (done) => {
    sync.createNonExistentDataBataBase((result) => {
      assert.equal(result, false);
      done();
    });
  });

  it('Error al borrar la base de datos', (done) => {
    sync.dropExistentDataBataBase((result) => {
      assert.equal(result, false);
      done();
    });
  });
});
