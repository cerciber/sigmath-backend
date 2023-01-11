/**
 * @author Cerciber <contact@cerciber.com>
 */

// Modulos creados
const server = require('../../../../../src/aplication_layer/server/server'); // Rutas sin uso
const cardRepository = require('../../../../../src/persistence_layer/repositories/cardRepository');
const supertest = require('supertest');

// Ruta relativa completa
const path = '/card/update';

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
      response.title = 'Titulo cambiado';
      supertest(app)
        .put(path)
        .send(response)
        .expect(200)
        .expect({
          length: 1,
        })
        .end(done);
    });
  });

  it('Peticiones sin resultados en la ruta "' + path + '"', (done) => {
    // Configurar servidor
    server.configServer((app) => {
      // Obtener información y testear
      response.title = 'Titulo en otra peticion';
      var id = response.ID_CARD;
      response.ID_CARD = 100000;
      supertest(app)
        .put(path)
        .send(response)
        .expect(404)
        .expect('No se encontraron elementos.')
        .end(() => {
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
        .put(path)
        .send({})
        .expect(404)
        .expect('No se encontraron elementos.')
        .end(done);
    });
  });
});
