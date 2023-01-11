/**
 * @author Cerciber <contact@cerciber.com>
 */

// Modulos creados
const userRepository = require('../../../src/persistence_layer/repositories/userRepository');

var user = {
  nickname: 'user1',
  email: 'user1@unal.edu.co',
  password: '123456789',
};
var responseUser = undefined;

var user2 = {
  nickname: 'user2',
  email: 'user2@unal.edu.co',
  password: '123456789',
};
var responseUser2 = undefined;

describe('Inserción a la base de datos del repositorio user": ', () => {
  // Acciones despues de los test
  afterEach((done) => {
    // Acciones
    userRepository.destroy({ where: { ID_USER: responseUser.ID_USER } }, () => {
      done();
    });
  });

  it('Inserción exitosa', (done) => {
    userRepository.insert(user, (status, result) => {
      responseUser = result.dataValues;
      assert.equal(status, 201);
      done();
    });
  });

  it('Inserción repetida', (done) => {
    userRepository.insert(user, (status, result) => {
      responseUser = result.dataValues;
      userRepository.insert(user, (status) => {
        assert.equal(status, 409);
        done();
      });
    });
  });

  it('Inserción fallida', (done) => {
    userRepository.insert({}, (status) => {
      assert.equal(status, 500);
      done();
    });
  });
});

describe('Selección a la base de datos del repositorio user": ', () => {
  // Acciones antes de los test
  beforeEach((done) => {
    // Acciones
    userRepository.insert(user, (status, result) => {
      responseUser = result.dataValues;
      done();
    });
  });

  // Acciones despues de los test
  afterEach((done) => {
    // Acciones
    userRepository.destroy({ where: { ID_USER: responseUser.ID_USER } }, () => {
      done();
    });
  });

  it('Selección exitosa', (done) => {
    userRepository.select(
      {
        where: { ID_USER: responseUser.ID_USER },
      },
      (status) => {
        assert.equal(status, 200);
        done();
      }
    );
  });

  it('Selección exitosa sin resultados', (done) => {
    userRepository.select(
      {
        where: {
          ID_USER: responseUser.ID_USER + 1,
        },
      },
      (status) => {
        assert.equal(status, 404);
        done();
      }
    );
  }).timeout(50000);

  it('Selección fallida', (done) => {
    userRepository.select({}, (status) => {
      assert.equal(status, 500);
      done();
    });
  });
});

describe('Actualización a la base de datos del repositorio user": ', () => {
  // Acciones antes de los test
  beforeEach((done) => {
    // Acciones
    userRepository.insert(user, (status, result) => {
      responseUser = result.dataValues;
      userRepository.insert(user2, (status, result) => {
        responseUser2 = result.dataValues;
        done();
      });
    });
  });

  // Acciones despues de los test
  afterEach((done) => {
    // Acciones
    userRepository.destroy({ where: { ID_USER: responseUser.ID_USER } }, () => {
      userRepository.destroy(
        { where: { ID_USER: responseUser2.ID_USER } },
        () => {
          done();
        }
      );
    });
  });

  it('Actualización exitosa', (done) => {
    userRepository.update(
      { ID_USER: responseUser.ID_USER },
      {
        where: {
          ID_USER: responseUser.ID_USER,
        },
      },
      (status) => {
        assert.equal(status, 200);
        done();
      }
    );
  });

  it('Actualización sin elementos', (done) => {
    userRepository.update(
      { ID_USER: responseUser2.ID_USER },
      {
        where: {
          ID_USER: responseUser2.ID_USER + 1,
        },
      },
      (status) => {
        assert.equal(status, 404);
        done();
      }
    );
  });

  it('Actualización con campos repetidos', (done) => {
    userRepository.update(
      { nickname: responseUser2.nickname },
      {
        where: {
          ID_USER: responseUser.ID_USER,
        },
      },
      (status) => {
        assert.equal(status, 409);
        done();
      }
    );
  });

  it('Actualización fallida', (done) => {
    userRepository.update({}, {}, (status) => {
      assert.equal(status, 500);
      done();
    });
  });
});

describe('Eliminación a la base de datos del repositorio user": ', () => {
  // Acciones antes de los test
  beforeEach((done) => {
    // Acciones
    userRepository.insert(user, (status, result) => {
      responseUser = result.dataValues;
      done();
    });
  });

  // Acciones despues de los test
  afterEach((done) => {
    // Acciones
    userRepository.destroy({ where: { ID_USER: responseUser.ID_USER } }, () => {
      done();
    });
  });

  it('Eliminación exitosa', (done) => {
    userRepository.destroy(
      { where: { ID_USER: responseUser.ID_USER } },
      (status) => {
        assert.equal(status, 200);
        done();
      }
    );
  });

  it('Eliminación fallida', (done) => {
    userRepository.destroy({}, (status) => {
      assert.equal(status, 500);
      done();
    });
  });
});
