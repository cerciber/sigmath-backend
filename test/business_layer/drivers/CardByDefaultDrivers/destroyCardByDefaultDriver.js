/**
 * @author Cerciber <contact@cerciber.com>
 */

// Modulos creados
const cardByDefaultRepository = require('../../../../src/persistence_layer/repositories/cardByDefaultRepository');
const categoryRepository = require('../../../../src/persistence_layer/repositories/categoryRepository');
const cardRepository = require('../../../../src/persistence_layer/repositories/cardRepository');
const destroyCardByDefaultDriver = require('../../../../src/business_layer/drivers/CardByDefaultDrivers/destroyCardByDefaultDriver');

describe('Manejador de la eliminación de fichas por defecto: ', () => {
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

  it('Eliminación exitosa de fichas por defecto: ', (done) => {
    // Configurar servidor
    destroyCardByDefaultDriver(
      responseCardDefault.ID_CARD_BY_DEFAULT,
      (status, result) => {
        assert.equal(status, 200);
        chai.expect(result).to.deep.equal({
          length: 1,
        });
        done();
      }
    );
  });
});
