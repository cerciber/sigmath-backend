/**
 * @author Cerciber <contact@cerciber.com>
 */

// Modulos creados
const cardByDefaultRepository = require('../../../src/persistence_layer/repositories/cardByDefaultRepository');
const categoryRepository = require('../../../src/persistence_layer/repositories/categoryRepository');
const cardRepository = require('../../../src/persistence_layer/repositories/cardRepository');

// Acciones antes de cada test
var card = {
  title: 'Sumatoria',
  description: 'Sumatoria ',
  params: { a: '10', b: '15', fx: '10x+x^2' },
  latexCode: '10x+x^2',
  pythonCode: 'print(a+b)',
};
var defaultCard = {
  ID_CARD: undefined,
  ID_CATEGORY: undefined,
};
var category = {
  categoryName: 'Categoria 1',
  description: 'Description of category',
};
var responseCard = undefined;
var responseCategory = undefined;
var responseCardDefault = undefined;

describe('Inserción a la base de datos del repositorio cardByDefault": ', () => {
  // Acciones despues de los test
  afterEach((done) => {
    // Acciones
    cardByDefaultRepository.destroy(
      { where: { ID_CARD_BY_DEFAULT: responseCardDefault.ID_CARD_BY_DEFAULT } },
      () => {
        cardRepository.destroy(
          { where: { ID_CARD: responseCard.ID_CARD } },
          () => {
            categoryRepository.destroy(
              { where: { ID_CATEGORY: responseCategory.ID_CATEGORY } },
              () => {
                done();
              }
            );
          }
        );
      }
    );
  });

  it('Inserción exitosa', (done) => {
    categoryRepository.insert(category, (status, result) => {
      responseCategory = result.dataValues;
      cardRepository.insert(card, {}, (status, result) => {
        responseCard = result.dataValues;
        defaultCard.ID_CARD = responseCard.ID_CARD;
        defaultCard.ID_CATEGORY = responseCategory.ID_CATEGORY;
        cardByDefaultRepository.insert(defaultCard, (status, result) => {
          responseCardDefault = result.dataValues;
          assert.equal(status, 201);
          done();
        });
      });
    });
  });

  it('Inserción repetida', (done) => {
    categoryRepository.insert(category, (status, result) => {
      responseCategory = result.dataValues;
      cardRepository.insert(card, {}, (status, result) => {
        responseCard = result.dataValues;
        defaultCard.ID_CARD = responseCard.ID_CARD;
        defaultCard.ID_CATEGORY = responseCategory.ID_CATEGORY;
        cardByDefaultRepository.insert(defaultCard, (status, result) => {
          responseCardDefault = result.dataValues;
          cardByDefaultRepository.insert(responseCardDefault, (status) => {
            assert.equal(status, 409);
            done();
          });
        });
      });
    });
  });

  it('Inserción fallida', (done) => {
    cardByDefaultRepository.insert({}, (status) => {
      assert.equal(status, 500);
      done();
    });
  });
});

describe('Selección a la base de datos del repositorio cardByDefault": ', () => {
  // Acciones antes de los test
  beforeEach((done) => {
    // Acciones
    categoryRepository.insert(category, (status, result) => {
      responseCategory = result.dataValues;
      cardRepository.insert(card, {}, (status, result) => {
        responseCard = result.dataValues;
        defaultCard.ID_CARD = responseCard.ID_CARD;
        defaultCard.ID_CATEGORY = responseCategory.ID_CATEGORY;
        cardByDefaultRepository.insert(defaultCard, (status, result) => {
          responseCardDefault = result.dataValues;
          done();
        });
      });
    });
  });

  // Acciones despues de los test
  afterEach((done) => {
    // Acciones
    cardByDefaultRepository.destroy(
      { where: { ID_CARD_BY_DEFAULT: responseCardDefault.ID_CARD_BY_DEFAULT } },
      () => {
        cardRepository.destroy(
          { where: { ID_CARD: responseCard.ID_CARD } },
          () => {
            categoryRepository.destroy(
              { where: { ID_CATEGORY: responseCategory.ID_CATEGORY } },
              () => {
                done();
              }
            );
          }
        );
      }
    );
  });

  it('Selección exitosa', (done) => {
    cardByDefaultRepository.select(
      {
        where: { ID_CARD_BY_DEFAULT: responseCardDefault.ID_CARD_BY_DEFAULT },
      },
      (status) => {
        assert.equal(status, 200);
        done();
      }
    );
  });

  it('Selección exitosa sin resultados', (done) => {
    cardByDefaultRepository.select(
      {
        where: {
          ID_CARD_BY_DEFAULT: responseCardDefault.ID_CARD_BY_DEFAULT + 1,
        },
      },
      (status) => {
        assert.equal(status, 404);
        done();
      }
    );
  }).timeout(50000);

  it('Selección fallida', (done) => {
    cardByDefaultRepository.select({}, (status) => {
      assert.equal(status, 500);
      done();
    });
  });
});

describe('Actualización a la base de datos del repositorio cardByDefault": ', () => {
  // Acciones antes de los test
  beforeEach((done) => {
    // Acciones
    categoryRepository.insert(category, (status, result) => {
      responseCategory = result.dataValues;
      cardRepository.insert(card, {}, (status, result) => {
        responseCard = result.dataValues;
        defaultCard.ID_CARD = responseCard.ID_CARD;
        defaultCard.ID_CATEGORY = responseCategory.ID_CATEGORY;
        cardByDefaultRepository.insert(defaultCard, (status, result) => {
          responseCardDefault = result.dataValues;
          done();
        });
      });
    });
  });

  // Acciones despues de los test
  afterEach((done) => {
    // Acciones
    cardByDefaultRepository.destroy(
      { where: { ID_CARD_BY_DEFAULT: responseCardDefault.ID_CARD_BY_DEFAULT } },
      () => {
        cardRepository.destroy(
          { where: { ID_CARD: responseCard.ID_CARD } },
          () => {
            categoryRepository.destroy(
              { where: { ID_CATEGORY: responseCategory.ID_CATEGORY } },
              () => {
                done();
              }
            );
          }
        );
      }
    );
  });

  it('Actualización exitosa', (done) => {
    cardByDefaultRepository.update(
      { ID_CARD: defaultCard.ID_CARD },
      {
        where: {
          ID_CARD_BY_DEFAULT: responseCardDefault.ID_CARD_BY_DEFAULT,
        },
      },
      (status) => {
        assert.equal(status, 200);
        done();
      }
    );
  });

  it('Actualización sin elementos', (done) => {
    cardByDefaultRepository.update(
      { ID_CARD: defaultCard.ID_CARD },
      {
        where: {
          ID_CARD_BY_DEFAULT: responseCardDefault.ID_CARD_BY_DEFAULT + 1,
        },
      },
      (status) => {
        assert.equal(status, 404);
        done();
      }
    );
  });

  it('Actualización fallida', (done) => {
    cardByDefaultRepository.update({}, {}, (status) => {
      assert.equal(status, 500);
      done();
    });
  });
});

describe('Eliminación a la base de datos del repositorio cardByDefault": ', () => {
  // Acciones antes de los test
  beforeEach((done) => {
    // Acciones
    categoryRepository.insert(category, (status, result) => {
      responseCategory = result.dataValues;
      cardRepository.insert(card, {}, (status, result) => {
        responseCard = result.dataValues;
        defaultCard.ID_CARD = responseCard.ID_CARD;
        defaultCard.ID_CATEGORY = responseCategory.ID_CATEGORY;
        cardByDefaultRepository.insert(defaultCard, (status, result) => {
          responseCardDefault = result.dataValues;
          done();
        });
      });
    });
  });

  // Acciones despues de los test
  afterEach((done) => {
    // Acciones
    cardByDefaultRepository.destroy(
      { where: { ID_CARD_BY_DEFAULT: responseCardDefault.ID_CARD_BY_DEFAULT } },
      () => {
        cardRepository.destroy(
          { where: { ID_CARD: responseCard.ID_CARD } },
          () => {
            categoryRepository.destroy(
              { where: { ID_CATEGORY: responseCategory.ID_CATEGORY } },
              () => {
                done();
              }
            );
          }
        );
      }
    );
  });

  it('Eliminación exitosa', (done) => {
    cardByDefaultRepository.destroy(
      { where: { ID_CARD_BY_DEFAULT: responseCardDefault.ID_CARD_BY_DEFAULT } },
      (status) => {
        cardRepository.destroy(
          { where: { ID_CARD: responseCard.ID_CARD } },
          () => {
            categoryRepository.destroy(
              { where: { ID_CATEGORY: responseCategory.ID_CATEGORY } },
              () => {
                assert.equal(status, 200);
                done();
              }
            );
          }
        );
      }
    );
  });

  it('Eliminación fallida', (done) => {
    cardByDefaultRepository.destroy({}, (status) => {
      assert.equal(status, 500);
      done();
    });
  });
});
