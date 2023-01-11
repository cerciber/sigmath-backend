const enviroment = require('../../../../utils/constants/enviroment.json');

module.exports = {
  development: enviroment.development.data_base,
  test: enviroment.test.data_base,
  production: enviroment.production.data_base,
};
