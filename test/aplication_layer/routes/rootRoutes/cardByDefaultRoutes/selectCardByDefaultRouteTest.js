/**
 * @author Cerciber <contact@cerciber.com>
 */

// Modulos creados
const server = require('../../../../../src/aplication_layer/server/server'); // Rutas sin uso
const cardByDefaultRepository = require('../../../../../src/persistence_layer/repositories/cardByDefaultRepository');
const categoryRepository = require('../../../../../src/persistence_layer/repositories/categoryRepository');
const cardRepository = require('../../../../../src/persistence_layer/repositories/cardRepository');

// Ruta relativa completa
const path = '/cardByDefault/select';

describe('Peticiones en la ruta "' + path + '": ', () => {
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

  it('Peticiones exitosas en la ruta "' + path + '"', (done) => {
    // Configurar servidor
    server.configServer((app) => {
      // Obtener información y testear
      supertest(app)
        .get(
          path + '?ID_CARD_BY_DEFAULT=' + responseCardDefault.ID_CARD_BY_DEFAULT // + responseCardDefault.ID_CARD_BY_DEFAULT
        )
        .expect(200)
        .expect([responseCardDefault])
        .end(done);
    });
  });

  it('Peticiones erroneas en la ruta "' + path + '"', (done) => {
    // Configurar servidor
    server.configServer((app) => {
      // Obtener información y testear
      supertest(app)
        .get(path + '?bad_key=bad_valor')
        .expect(400)
        .expect('Petición a la ruta "' + path + '?bad_key=bad_valor" erronea')
        .end(done);
    });
  });
});
