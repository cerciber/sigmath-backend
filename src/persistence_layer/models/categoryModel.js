/**
 * Representación de la tabla de categorías como objeto (DAO).
 *
 * @module persistence-model-category
 * @author Cerciber <contact@cerciber.com>
 */

// Modulos instalados
const Sequelize = require('sequelize'); // Sequelize

// Modulos creados
const data_base = require('../../data_layer/data_base/data_base');
const cardByDefaultModel = require('../models/cardByDefaultModel');

// Definir tabla
const CategoryModel = data_base.define('Category', {
  // Definir atributos
  ID_CATEGORY: {
    type: Sequelize.INTEGER, // Tipo
    primaryKey: true, // Llave primaria
    autoIncrement: true, // Auto-incrementabilidad
  },
  categoryName: {
    type: Sequelize.STRING, // Tipo
    allowNull: false, // Nulidad
    unique: true, // Unicidad
  },
  description: {
    type: Sequelize.TEXT, // Tipo
    allowNull: true, // Nulidad
    unique: false, // Unicidad
  },
});

// Una categoria puede tener muchas fichas por defecto
CategoryModel.hasMany(cardByDefaultModel, {
  foreignKey: 'ID_CATEGORY',
  sourceKey: 'ID_CATEGORY',
  onDelete: 'cascade',
});
cardByDefaultModel.belongsTo(CategoryModel, {
  foreignKey: 'ID_CATEGORY',
  sourceKey: 'ID_CATEGORY',
});

// Exportar categoria
module.exports = CategoryModel;
