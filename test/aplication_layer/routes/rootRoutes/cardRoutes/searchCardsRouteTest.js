/**
 * @author Cerciber <contact@cerciber.com>
 */

// Modulos creados
const server = require('../../../../../src/aplication_layer/server/server'); // Rutas sin uso
const cardRepository = require('../../../../../src/persistence_layer/repositories/cardRepository');

// Ruta relativa completa
const path = '/card/search';

describe('Peticiones en la ruta "' + path + '": ', () => {
  var card = {
    title: 'Sumatoria',
    description: 'Sumatoria ',
    params: { a: '10', b: '15', fx: '10x+x^2' },
    latexCode: '10x+x^2',
    pythonCode: 'print(a+b)',
  };
  var response = undefined;

  // Acciones antes de los test
  before((done) => {
    // Acciones
    cardRepository.insert(card, {}, (status, result) => {
      response = result.dataValues;
      done();
    });
  });

  // Acciones despues de los test
  after((done) => {
    // Acciones
    cardRepository.destroy({ where: { ID_CARD: response.ID_CARD } }, () => {
      // Acciones
      done();
    });
  });

  it('Peticiones exitosas en la ruta "' + path + '"', (done) => {
    // Configurar servidor
    server.configServer((app) => {
      // Obtener información y testear
      supertest(app)
        .get(path + '?text=umatori')
        .expect(200)
        .expect([card])
        .end(function (err, res) {
          response = res.body;
          var id = response[0].ID_CARD;
          delete response[0].ID_CARD;
          chai.expect(response).to.deep.equal([card]);
          response[0].ID_CARD = id;
          done();
        });
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
