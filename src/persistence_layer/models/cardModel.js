/**
 * Representación de la tabla de fichas como objeto (DAO).
 *
 * @module persistence-model-card
 * @author Cerciber <contact@cerciber.com>
 */

// Modulos instalados
const Sequelize = require('sequelize'); // Sequelize

// Modulos creados
const data_base = require('../../data_layer/data_base/data_base');
const cardByDefaultModel = require('../models/cardByDefaultModel');
const userCardModel = require('../models/userCardModel');
const cardInfoModel = require('../models/cardInfoModel');
const rateModel = require('./rateModel');

// Definir tabla
const CardModel = data_base.define('Card', {
  // Definir atributos
  ID_CARD: {
    type: Sequelize.INTEGER, // Tipo
    primaryKey: true, // Llave primaria
    autoIncrement: true, // Auto-incrementabilidad
  },
  title: {
    type: Sequelize.TEXT, // Tipo
    allowNull: false, // Nulidad
    unique: false, // Unicidad
  },
  description: {
    type: Sequelize.TEXT, // Tipo
    allowNull: true, // Nulidad
    unique: false, // Unicidad
  },
  params: {
    type: Sequelize.JSONB, // Tipo
    allowNull: true, // Nulidad
    unique: false, // Unicidad
  },
  latexCode: {
    type: Sequelize.TEXT, // Tipo
    allowNull: false, // Nulidad
    unique: false, // Unicidad
  },
  pythonCode: {
    type: Sequelize.TEXT, // Tipo
    allowNull: false, // Nulidad
    unique: false, // Unicidad
  },
});

// Una ficha puede tener muchas fichas por defecto
CardModel.hasMany(cardByDefaultModel, {
  foreignKey: 'ID_CARD',
  sourceKey: 'ID_CARD',
  onDelete: 'cascade',
});
cardByDefaultModel.belongsTo(CardModel, {
  foreignKey: 'ID_CARD',
  sourceKey: 'ID_CARD',
});

// Una ficha puede tener una ficha de usuario
CardModel.hasOne(userCardModel, {
  foreignKey: 'ID_CARD',
  sourceKey: 'ID_CARD',
  onDelete: 'cascade',
});
userCardModel.belongsTo(CardModel, {
  foreignKey: 'ID_CARD',
  sourceKey: 'ID_CARD',
});

// Una ficha puede tener una información de ficha
CardModel.hasOne(cardInfoModel, {
  foreignKey: 'ID_CARD',
  sourceKey: 'ID_CARD',
  onDelete: 'cascade',
});
cardInfoModel.belongsTo(CardModel, {
  foreignKey: 'ID_CARD',
  sourceKey: 'ID_CARD',
});

// Una ficha puede tener muchas calificiones
CardModel.hasMany(rateModel, {
  foreignKey: 'ID_CARD',
  sourceKey: 'ID_CARD',
  onDelete: 'cascade',
});
rateModel.belongsTo(CardModel, {
  foreignKey: 'ID_CARD',
  sourceKey: 'ID_CARD',
});

// Exportar modelo
module.exports = CardModel;
