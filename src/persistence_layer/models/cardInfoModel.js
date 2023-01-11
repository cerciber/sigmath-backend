/**
 * Representación de la tabla "CardInfo" como objeto (DAO).
 *
 * @module persistence-model-card-info
 * @author Cerciber <contact@cerciber.com>
 */

// Modulos instalados
const Sequelize = require('sequelize'); // Sequelize

// Modulos creados
const data_base = require('../../data_layer/data_base/data_base'); // Base de datos

// Definir tabla
const CardInfoModel = data_base.define('CardInfo', {
  // Definir atributos
  ID_CARD_INFO: {
    type: Sequelize.INTEGER, // Tipo
    primaryKey: true, // Llave primaria
    autoIncrement: true, // Auto-incrementabilidad
  },
  ID_CARD: {
    type: Sequelize.INTEGER, // Tipo
    allowNull: false, // Nulidad
    unique: false, // Unicidad
  },
  creationDate: {
    type: Sequelize.DATE, // Tipo
    allowNull: false, // Nulidad
    unique: false, // Unicidad
  },
  modificationDate: {
    type: Sequelize.DATE, // Tipo
    allowNull: true, // Nulidad
    unique: false, // Unicidad
  },
  rateAvg: {
    type: Sequelize.FLOAT, // Tipo
    allowNull: true, // Nulidad
    unique: false, // Unicidad
  },
  scope: {
    type: Sequelize.STRING, // Tipo
    allowNull: true, // Nulidad
    unique: false, // Unicidad
  },
});

// Exportar modelo
module.exports = CardInfoModel;
