/**
 * @author Cerciber <contact@cerciber.com>
 */

// Modulos creados
const server = require('../../../../../src/aplication_layer/server/server'); // Rutas sin uso
const break_connection = require('../../../../helpers/brake_connection'); // Mala conexión para pruebas
const userRepository = require('../../../../../src/persistence_layer/repositories/userRepository');

// Ruta relativa completa
const path = '/user/signup';

describe('Peticiones en la ruta "' + path + '": ', () => {
  var user = {
    nickname: 'usuario1',
    email: 'usuario1@unal.edu.co',
    password: '123456789',
  };
  var response = undefined;

  // Acciones despues de cada test
  afterEach((done) => {
    userRepository.destroy({ where: { ID_USER: response.ID_USER } }, () => {
      done();
    });
  });

  it('Peticiones exitosas en la ruta "' + path + '"', (done) => {
    // Configurar servidor
    server.configServer((app) => {
      // Obtener información y testear
      supertest(app)
        .post(path)
        .send(user)
        .end(function (err, res) {
          response = res.body;
          var id = response.ID_USER;
          delete response.ID_USER;
          assert.equal(res.status, 201);
          chai.expect(response).to.deep.equal(user);
          response.ID_USER = id;
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
        .send({ bad_key: 'bad_valor' })
        .expect(400)
        .expect('Petición a la ruta "' + path + '" erronea')
        .end(done);
    });
  });

  it(
    'Peticiones sin conexión a la base de datos en la ruta "' + path + '" ',
    (done) => {
      // Romper conexión a la base de datos
      break_connection.changeConnection(() => {
        // Configurar servidor
        server.configServer((app) => {
          // Obtener información
          supertest(app)
            .post(path)
            .send(user)
            .end(function (err, res) {
              // Recuperar conexión a la base de datos
              break_connection.unchangeConnection(() => {
                // Testear
                assert.equal(res.status, 500);
                assert.equal(res.text, 'Error al insertar los datos');
                done();
              });
            });
        });
      });
    }
  );
});
