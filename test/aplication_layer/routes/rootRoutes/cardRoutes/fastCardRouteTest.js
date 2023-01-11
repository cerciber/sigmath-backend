/**
 * @author Cerciber <contact@cerciber.com>
 */

// Modulos instalados
//

// Modulos creados
const server = require('../../../../../src/aplication_layer/server/server'); // Rutas sin uso

// Ruta relativa completa
const path = '/card/fast';

describe('Peticiones en la ruta "' + path + '": ', () => {
  it('Peticiones exitosas en la ruta "' + path + '"', (done) => {
    // Configurar servidor
    server.configServer((app) => {
      // Obtener información y testear
      supertest(app)
        .get(path + '?text=sin%28x%29')
        .expect(200)
        .expect({
          title: '',
          description: '',
          params: [
            {
              symbol: 'x',
              description: '',
              content: null,
            },
          ],
          latexCode: '\\sin{\\left(#1 \\right)}',
          pythonCode:
            'def main(x):\n  exp = sympify("sin(x)")\n  exp = exp.subs({\'x\': x, })\n  return exp',
        })
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
