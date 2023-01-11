/**
 * @author Cerciber <contact@cerciber.com>
 */

// Modulos creados
const server = require('../../../../../src/aplication_layer/server/server'); // Rutas sin uso

// Ruta relativa completa
const path = '/card/solve';

describe('Peticiones en la ruta "' + path + '": ', () => {
  var cardJson1 = {
    id: 1,
    title: 'Seno',
    description: 'Seno trigonométrico',
    params: [
      {
        symbol: 'x',
        description: 'Variable del seno',
        content: null,
      },
    ],
    latexCode: '\\sin{\\left({#1}\\right)}',
    pythonCode: 'def main(x):\n  return sin(x)',
  };

  var cardJson2 = {
    id: 2,
    title: 'Integral indefinida',
    description: 'Integral indefinida de una expresión matemática',
    params: [
      {
        symbol: 'f(x)',
        description: 'Expresión matemática',
        content: cardJson1,
      },
      {
        symbol: 'x',
        description: 'Símbolo sobre el cual se realiza la integración',
        content: null,
      },
    ],
    latexCode: '\\int {#1}\\ d{#2}',
    pythonCode: 'def main(f_x, x):\n  return integrate(f_x, Symbol(x))',
    bounds: {
      x: 60,
      y: 60,
    },
  };

  var cardJson3 = {
    id: 2,
    title: 'Tres',
    description: 'Un 3',
    params: [],
    latexCode: '3',
    pythonCode: 'def main():\n  return 3',
    bounds: {
      x: 60,
      y: 60,
    },
  };

  it(
    'Peticiones exitosas de fichas con parametros vacios "' + path + '"',
    (done) => {
      // Configurar servidor
      server.configServer((app) => {
        // Obtener información y testear
        supertest(app)
          .post(path)
          .send({ card: cardJson2 })
          .expect(200)
          .expect({
            title: '',
            description: '',
            params: [{ symbol: 'x', description: '', content: null }],
            latexCode: '- \\cos{\\left(#1 \\right)}',
            pythonCode:
              'def main(param8565nf0):\n  exp = sympify("-cos(param8565nf0)")\n  exp = exp.subs({\'param8565nf0\': param8565nf0, })\n  return exp',
          })
          .end(done);
      });
    }
  );

  it('Peticiones exitosas de fichas sin parametros "' + path + '"', (done) => {
    // Configurar servidor
    server.configServer((app) => {
      // Obtener información y testear
      supertest(app)
        .post(path)
        .send({ card: cardJson3 })
        .expect(200)
        .expect({
          title: '',
          description: '',
          params: [],
          latexCode: '3',
          pythonCode: 'def main():\n  return "3"',
        })
        .end(done);
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

  it('Peticiones con error python en la ficha padre "' + path + '"', (done) => {
    // Configurar servidor
    server.configServer((app) => {
      // Obtener información y testear
      supertest(app)
        .post(path)
        .send({
          card: {
            id: 1,
            title: 'Seno',
            description: 'Seno trigonométrico',
            params: [
              {
                symbol: 'x',
                description: 'Variable del seno',
                content: null,
              },
            ],
            latexCode: '\\sin{\\left({#1}\\right)}',
            pythonCode: 'sin',
          },
        })
        .expect(400)
        .expect('Error en la ejecución')
        .end(done);
    });
  });

  it(
    'Peticiones con error en los parametros de la ficha padre "' + path + '"',
    (done) => {
      // Configurar servidor
      server.configServer((app) => {
        // Obtener información y testear
        supertest(app)
          .post(path)
          .send({
            card: {
              id: 1,
              title: 'Seno',
              description: 'Seno trigonométrico',
              params: [
                {
                  symbol: 'x',
                  description: 'Variable del seno',
                  content: {
                    id: 1,
                    title: 'Seno',
                    description: 'Seno trigonométrico',
                    params: [
                      {
                        symbol: 'x',
                        description: 'Variable del seno',
                        content: null,
                      },
                    ],
                    latexCode: '\\sin{\\left({#1}\\right)}',
                    pythonCode: ' sin',
                  },
                },
              ],
              latexCode: '\\sin{\\left({#1}\\right)}',
              pythonCode: 'def main(x):\n  return sin(x)',
            },
          })
          .expect(400)
          .expect('Error en la ejecución')
          .end(done);
      });
    }
  );

  it(
    'Peticiones con error en los parametros de la ficha hija "' + path + '"',
    (done) => {
      // Configurar servidor
      server.configServer((app) => {
        // Obtener información y testear
        supertest(app)
          .post(path)
          .send({
            card: {
              id: 1,
              title: 'Seno',
              description: 'Seno trigonométrico',
              params: [
                {
                  symbol: 'x',
                  description: 'Variable del seno',
                  content: {
                    id: 1,
                    title: 'Seno',
                    description: 'Seno trigonométrico',
                    params: [
                      {
                        symbol: 'x',
                        description: 'Variable del seno',
                        content: {
                          id: 1,
                          title: 'Seno',
                          description: 'Seno trigonométrico',
                          params: [
                            {
                              symbol: 'x',
                              description: 'Variable del seno',
                              content: null,
                            },
                          ],
                          latexCode: '\\sin{\\left({#1}\\right)}',
                          pythonCode: ' sin',
                        },
                      },
                    ],
                    latexCode: '\\sin{\\left({#1}\\right)}',
                    pythonCode: 'def main(x):\n  return sin(x)',
                  },
                },
              ],
              latexCode: '\\sin{\\left({#1}\\right)}',
              pythonCode: 'def main(x):\n  return sin(x)',
            },
          })
          .expect(400)
          .expect('Error en la ejecución')
          .end(done);
      });
    }
  );
});
