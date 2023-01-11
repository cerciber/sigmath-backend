/**
 * @author Cerciber <contact@cerciber.com>
 */

// Modulos creados
const solverCard = require('../../../src/business_layer/entities/solverCardEntity');

describe('Prueba solverCardEntity con analisis sympy": ', () => {
  // Acciones para el test
  it('Codigo python que si es sympy', (done) => {
    var results = ['2**2', '3**3', '4**2'];
    var cardJson = {
      pythonCode: `def main(a, b, c):\n    a, b, c = symbols('a b c')\n    expr = a + 2 * b**2 + c\n    return expr`,
    };
    solverCard.solveWithSympy(cardJson, results, (status, pythonJson) => {
      var symbols = ['c', 'b', 'a'];
      assert.equal(pythonJson.isSympy, true);
      assert.equal(pythonJson.mainReturn, 'a + 2*b**2 + c');
      symbols.forEach((element) => {
        assert.equal(pythonJson.symbols.includes(element), true);
      });
      assert.equal(pythonJson.latex, 'a + 2 b^{2} + c');
      done();
    });
  });
  it('Codigo python que no es sympy', (done) => {
    // Acciones
    var results = [];
    var cardJson = {
      pythonCode: `def main():\n  return 'Hola mundo'`,
    };
    solverCard.solveWithSympy(cardJson, results, (status, pythonCode) => {
      assert.equal(
        JSON.stringify(pythonCode),
        JSON.stringify({
          isSympy: false,
          mainReturn: 'Hola mundo',
          symbols: [],
          latex: 'Hola mundo',
        })
      );
      done();
    });
  });
});

describe('Prueba solverCardEntity sin analisis sympy": ', () => {
  it('Codigo python que es sympy', (done) => {
    var results = ['2**2', '3**3', '4**2'];
    var cardJson = {
      pythonCode: `def main(a, b, c):\n    a, b, c = symbols('a b c')\n    expr = a + 2 * b**2 + c\n    return expr`,
    };
    solverCard.solveWithoutSympy(cardJson, results, (status, pythonJson) => {
      assert.equal(pythonJson.mainReturn, 'a + 2*b**2 + c');
      done();
    });
  });

  it('Codigo python que no es sympy', (done) => {
    var results = [];
    var cardJson = {
      pythonCode: `def main():\n  return 'Hola mundo'`,
    };
    solverCard.solveWithoutSympy(cardJson, results, (status, pythonCode) => {
      assert.equal(
        JSON.stringify(pythonCode),
        JSON.stringify({
          mainReturn: 'Hola mundo',
        })
      );
      done();
    });
  });
});
