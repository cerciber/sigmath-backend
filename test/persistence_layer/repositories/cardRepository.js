/**
 * @author Cerciber <contact@cerciber.com>
 */

// Modulos creados
const cardRepository = require('../../../src/persistence_layer/repositories/cardRepository');

// Acciones antes de cada test
var card = {
  title: 'Sumatoria',
  description: 'Sumatoria ',
  params: { a: '10', b: '15', fx: '10x+x^2' },
  latexCode: '10x+x^2',
  pythonCode: 'print(a+b)',
};
var responseCard = undefined;

describe('Inserción a la base de datos del repositorio card": ', () => {
  afterEach((done) => {
    // Acciones
    cardRepository.destroy({ where: { ID_CARD: responseCard.ID_CARD } }, () => {
      done();
    });
  });

  it('Inserción exitosa', (done) => {
    cardRepository.insert(card, {}, (status, result) => {
      responseCard = result.dataValues;
      assert.equal(status, 201);
      done();
    });
  });

  it('Inserción fallida', (done) => {
    cardRepository.insert({}, {}, (status) => {
      assert.equal(status, 500);
      done();
    });
  });

  it('Inserción repetida', (done) => {
    cardRepository.insert(card, {}, (status, result) => {
      responseCard = result.dataValues;
      cardRepository.insert(responseCard, {}, (status) => {
        assert.equal(status, 409);
        done();
      });
    });
  });
});

describe('Selección a la base de datos del repositorio card": ', () => {
  // Acciones antes de los test
  beforeEach((done) => {
    // Acciones
    cardRepository.insert(card, {}, (status, result) => {
      responseCard = result.dataValues;
      done();
    });
  });

  // Acciones despues de los test
  afterEach((done) => {
    // Acciones
    cardRepository.destroy({ where: { ID_CARD: responseCard.ID_CARD } }, () => {
      done();
    });
  });

  it('Selección exitosa', (done) => {
    cardRepository.select(
      {
        where: { ID_CARD: responseCard.ID_CARD },
      },
      (status) => {
        assert.equal(status, 200);
        done();
      }
    );
  });

  it('Selección exitosa sin resultados', (done) => {
    cardRepository.select(
      {
        where: { ID_CARD: responseCard.ID_CARD + 1 },
      },
      (status) => {
        assert.equal(status, 404);
        done();
      }
    );
  }).timeout(50000);

  it('Selección fallida', (done) => {
    cardRepository.select({}, (status) => {
      assert.equal(status, 500);
      done();
    });
  });
});

describe('Actualización a la base de datos del repositorio card": ', () => {
  // Acciones antes de los test
  beforeEach((done) => {
    // Acciones
    cardRepository.insert(card, {}, (status, result) => {
      responseCard = result.dataValues;
      done();
    });
  });

  // Acciones despues de los test
  afterEach((done) => {
    // Acciones
    cardRepository.destroy({ where: { ID_CARD: responseCard.ID_CARD } }, () => {
      done();
    });
  });

  it('Actualización exitosa', (done) => {
    cardRepository.update(
      { ID_CARD: responseCard.ID_CARD },
      {
        where: {
          ID_CARD: responseCard.ID_CARD,
        },
      },
      (status) => {
        assert.equal(status, 200);
        done();
      }
    );
  });

  it('Actualización repetida', (done) => {
    cardRepository.update(
      { ID_CARD: responseCard.ID_CARD },
      {
        where: {
          ID_CARD: responseCard.ID_CARD,
        },
      },
      (status) => {
        assert.equal(status, 200);
        done();
      }
    );
  });

  it('Actualización sin elementos', (done) => {
    cardRepository.update(
      { ID_CARD: responseCard.ID_CARD },
      {
        where: {
          ID_CARD: responseCard.ID_CARD + 1,
        },
      },
      (status) => {
        assert.equal(status, 404);
        done();
      }
    );
  });

  it('Actualización fallida', (done) => {
    cardRepository.update({}, {}, (status) => {
      assert.equal(status, 500);
      done();
    });
  });
});

describe('Eliminación a la base de datos del repositorio card": ', () => {
  // Acciones antes de los test
  beforeEach((done) => {
    // Acciones
    cardRepository.insert(card, {}, (status, result) => {
      responseCard = result.dataValues;
      done();
    });
  });

  // Acciones despues de los test
  afterEach((done) => {
    // Acciones
    cardRepository.destroy({ where: { ID_CARD: responseCard.ID_CARD } }, () => {
      done();
    });
  });

  it('Eliminación exitosa', (done) => {
    cardRepository.destroy({ where: { ID_CARD: responseCard.ID_CARD } }, () => {
      done();
    });
  });

  it('Eliminación fallida', (done) => {
    cardRepository.destroy({}, (status) => {
      assert.equal(status, 500);
      done();
    });
  });
});
