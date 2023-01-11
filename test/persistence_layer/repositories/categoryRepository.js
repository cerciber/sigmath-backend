/**
 * @author Cerciber <contact@cerciber.com>
 */

// Modulos creados
const categoryRepository = require('../../../src/persistence_layer/repositories/categoryRepository');

var category = {
  categoryName: 'Categoria 1',
  description: 'Description of category',
};
var responseCategory = undefined;

var category2 = {
  categoryName: 'Categoria 2',
  description: 'Description of category',
};
var responseCategory2 = undefined;

describe('Inserción a la base de datos del repositorio category": ', () => {
  // Acciones despues de los test
  afterEach((done) => {
    // Acciones
    categoryRepository.destroy(
      { where: { ID_CATEGORY: responseCategory.ID_CATEGORY } },
      () => {
        done();
      }
    );
  });

  it('Inserción exitosa', (done) => {
    categoryRepository.insert(category, (status, result) => {
      responseCategory = result.dataValues;
      assert.equal(status, 201);
      done();
    });
  });

  it('Inserción repetida', (done) => {
    categoryRepository.insert(category, (status, result) => {
      responseCategory = result.dataValues;
      categoryRepository.insert(responseCategory, (status) => {
        assert.equal(status, 409);
        done();
      });
    });
  });

  it('Inserción fallida', (done) => {
    categoryRepository.insert({}, (status) => {
      assert.equal(status, 500);
      done();
    });
  });
});

describe('Selección a la base de datos del repositorio category": ', () => {
  // Acciones antes de los test
  beforeEach((done) => {
    // Acciones
    categoryRepository.insert(category, (status, result) => {
      responseCategory = result.dataValues;
      done();
    });
  });

  // Acciones despues de los test
  afterEach((done) => {
    // Acciones
    categoryRepository.destroy(
      { where: { ID_CATEGORY: responseCategory.ID_CATEGORY } },
      () => {
        done();
      }
    );
  });

  it('Selección exitosa', (done) => {
    categoryRepository.select(
      {
        where: { ID_CATEGORY: responseCategory.ID_CATEGORY },
      },
      (status) => {
        assert.equal(status, 200);
        done();
      }
    );
  });

  it('Selección exitosa sin resultados', (done) => {
    categoryRepository.select(
      {
        where: {
          ID_CATEGORY: responseCategory.ID_CATEGORY + 1,
        },
      },
      (status) => {
        assert.equal(status, 404);
        done();
      }
    );
  }).timeout(50000);

  it('Selección fallida', (done) => {
    categoryRepository.select({}, (status) => {
      assert.equal(status, 500);
      done();
    });
  });
});

describe('Actualización a la base de datos del repositorio category": ', () => {
  // Acciones antes de los test
  beforeEach((done) => {
    // Acciones
    categoryRepository.insert(category, (status, result) => {
      responseCategory = result.dataValues;
      categoryRepository.insert(category2, (status, result) => {
        responseCategory2 = result.dataValues;
        done();
      });
    });
  });

  // Acciones despues de los test
  afterEach((done) => {
    // Acciones
    categoryRepository.destroy(
      { where: { ID_CATEGORY: responseCategory.ID_CATEGORY } },
      () => {
        categoryRepository.destroy(
          { where: { ID_CATEGORY: responseCategory2.ID_CATEGORY } },
          () => {
            done();
          }
        );
      }
    );
  });

  it('Actualización exitosa', (done) => {
    categoryRepository.update(
      { ID_CATEGORY: responseCategory.ID_CATEGORY },
      {
        where: {
          ID_CATEGORY: responseCategory.ID_CATEGORY,
        },
      },
      (status) => {
        assert.equal(status, 200);
        done();
      }
    );
  });

  it('Actualización sin elementos', (done) => {
    categoryRepository.update(
      { ID_CATEGORY: responseCategory2.ID_CATEGORY },
      {
        where: {
          ID_CATEGORY: responseCategory2.ID_CATEGORY + 1,
        },
      },
      (status) => {
        assert.equal(status, 404);
        done();
      }
    );
  });

  it('Actualización con campos repetidos', (done) => {
    categoryRepository.update(
      { categoryName: responseCategory2.categoryName },
      {
        where: {
          ID_CATEGORY: responseCategory.ID_CATEGORY,
        },
      },
      (status) => {
        assert.equal(status, 409);
        done();
      }
    );
  });

  it('Actualización fallida', (done) => {
    categoryRepository.update({}, {}, (status) => {
      assert.equal(status, 500);
      done();
    });
  });
});

describe('Eliminación a la base de datos del repositorio category": ', () => {
  // Acciones antes de los test
  beforeEach((done) => {
    // Acciones
    categoryRepository.insert(category, (status, result) => {
      responseCategory = result.dataValues;
      done();
    });
  });

  // Acciones despues de los test
  afterEach((done) => {
    // Acciones
    categoryRepository.destroy(
      { where: { ID_CATEGORY: responseCategory.ID_CATEGORY } },
      () => {
        done();
      }
    );
  });

  it('Eliminación exitosa', (done) => {
    categoryRepository.destroy(
      { where: { ID_CATEGORY: responseCategory.ID_CATEGORY } },
      (status) => {
        assert.equal(status, 200);
        done();
      }
    );
  });

  it('Eliminación fallida', (done) => {
    categoryRepository.destroy({}, (status) => {
      assert.equal(status, 500);
      done();
    });
  });
});
