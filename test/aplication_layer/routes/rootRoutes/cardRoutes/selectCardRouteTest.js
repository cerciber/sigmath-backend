/**
 * @author Cerciber <contact@cerciber.com>
 */

// Modulos creados
const server = require('../../../../../src/aplication_layer/server/server'); // Rutas sin uso
const cardRepository = require('../../../../../src/persistence_layer/repositories/cardRepository');

// Ruta relativa completa
const path = '/card/select';

describe('Peticiones en la ruta "' + path + '": ', () => {
  var data = {
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
    cardRepository.insert(data, {}, (status, result) => {
      response = result.dataValues;
      done();
    });
  });

  it('Peticiones exitosas en la ruta "' + path + '"', (done) => {
    // Configurar servidor
    server.configServer((app) => {
      // Obtener información y testear
      supertest(app)
        .get(path + '?ID_CARD=' + response.ID_CARD)
        .expect(200)
        .expect((res) => {
          assert.equal(res.body[0].title, data.title);
          assert.equal(res.body[0].description, data.description);
          assert.deepEqual(res.body[0].params, data.params);
          assert.equal(res.body[0].latexCode, data.latexCode);
          assert.equal(res.body[0].pythonCode, data.pythonCode);
        })
        .end(done);
    });
  });
  it('Peticiones sin resultados en la ruta "' + path + '"', (done) => {
    server.configServer((app) => {
      supertest(app)
        .get(path + '?ID_CARD=10000000')
        .expect(404)
        .expect('No se encontraron elementos.')
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
