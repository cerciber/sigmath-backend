/**
 * @author Cerciber <contact@cerciber.com>
 */

// Modulos creados
const server = require('../../../../../src/aplication_layer/server/server'); // Rutas sin uso
const cardRepository = require('../../../../../src/persistence_layer/repositories/cardRepository');

// Ruta relativa completa
const path = '/card/insert';

describe('Peticiones en la ruta "' + path + '": ', () => {
  var data = {
    title: 'Integral',
    description: 'Sumatoria infinita',
    params: { a: '10', b: '15', fx: '10x+x^2' },
    latexCode: '10x+x^2',
    pythonCode: 'print(a+b)',
  };
  var response = undefined;

  // Acciones despues de los test
  afterEach((done) => {
    // Acciones
    cardRepository.destroy({ where: { ID_CARD: response.ID_CARD } }, () => {
      done();
    });
  });

  it('Peticiones exitosas en la ruta "' + path + '"', (done) => {
    // Configurar servidor
    server.configServer((app) => {
      // Obtener información y testear
      supertest(app)
        .post(path)
        .send(data)
        .end(function (err, res) {
          response = res.body;
          var id = response.ID_CARD;
          delete response.ID_CARD;
          assert.equal(res.status, 201);
          chai.expect(response).to.deep.equal(data);
          response.ID_CARD = id;
          done();
        });
    });
  });

  it('Peticiones erroneas en la ruta "' + path + '"', (done) => {
    // Configurar servidor
    server.configServer((app) => {
      // Obtener información y testear
      supertest(app)
        .post(path)
        .send(undefined)
        .expect(400)
        .expect('Petición a la ruta "' + path + '" erronea')
        .end(done);
    });
  });
});
