/**
 * Representación de la tabla "rate" como objeto (DAO).
 *
 * @module persistence-model-
 * @author Cerciber <contact@cerciber.com>
 */

// Modulos instalados
const Sequelize = require('sequelize'); // Sequelize

// Modulos creados
const data_base = require('../../data_layer/data_base/data_base'); // Base de datos

// Definir tabla
const rateModel = data_base.define('rate', {
  // Definir atributos
  ID_RATE: {
    type: Sequelize.INTEGER, // Tipo
    primaryKey: true, // Llave primaria
    autoIncrement: true, // Auto-incrementabilidad
  },
  ID_USER: {
    type: Sequelize.INTEGER, // Tipo
    allowNull: false, // Nulidad
    unique: false, // Unicidad
  },
  ID_CARD: {
    type: Sequelize.INTEGER, // Tipo
    allowNull: false, // Nulidad
    unique: false, // Unicidad
  },
  rate: {
    type: Sequelize.DOUBLE, // Tipo
    allowNull: false, // Nulidad
    unique: false, // Unicidad
  },
});

// Exportar modelo
module.exports = rateModel;
