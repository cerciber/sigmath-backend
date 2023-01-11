/**
 * Representación de la tabla de fichas por defecto como objeto (DAO).
 *
 * @module persistence-model-default-card
 * @author Cerciber <contact@cerciber.com>
 */

// Modulos instalados
const Sequelize = require('sequelize'); // Sequelize

// Modulos creados
const data_base = require('../../data_layer/data_base/data_base'); // Base de datos

// Definir tabla
const CardByDefaultModel = data_base.define('CardByDefault', {
  // Definir atributos
  ID_CARD_BY_DEFAULT: {
    type: Sequelize.INTEGER, // Tipo
    primaryKey: true, // Llave primaria
    autoIncrement: true, // Auto-incrementabilidad
  },
  ID_CARD: {
    type: Sequelize.INTEGER, // Tipo
    allowNull: false, // Nulidad
    unique: false, // Unicidad
  },
  ID_CATEGORY: {
    type: Sequelize.INTEGER, // Tipo
    allowNull: false, // Nulidad
    unique: false, // Unicidad
  },
});

// Exportar modelo
module.exports = CardByDefaultModel;
