/**
 * Representación de la tabla de usuarios como objeto (DAO).
 *
 * @module persistence-model-user
 * @author Cerciber <contact@cerciber.com>
 */

// Modulos instalados
const Sequelize = require('sequelize'); // Sequelize

// Modulos creados
const data_base = require('../../data_layer/data_base/data_base');
const userCardModel = require('../models/userCardModel');
const rateModel = require('./rateModel');

// Definir tabla
const UserModel = data_base.define('User', {
  // Definir atributos
  ID_USER: {
    type: Sequelize.INTEGER, // Tipo
    primaryKey: true, // Llave primaria
    autoIncrement: true, // Auto-incrementabilidad
  },
  nickname: {
    type: Sequelize.TEXT, // Tipo
    allowNull: false, // Nulidad
    unique: false, // Unicidad
  },
  email: {
    type: Sequelize.TEXT, // Tipo
    allowNull: false, // Nulidad
    unique: true, // Unicidad
  },
  password: {
    type: Sequelize.TEXT, // Tipo
    allowNull: false, // Nulidad
    unique: false, // Unicidad
  },
});

// Un usuario puede tener muchas fichas de usuario
UserModel.hasMany(userCardModel, {
  foreignKey: 'ID_USER',
  sourceKey: 'ID_USER',
  onDelete: 'cascade',
});
userCardModel.belongsTo(UserModel, {
  foreignKey: 'ID_USER',
  sourceKey: 'ID_USER',
});

// Un usuario puede tener muchas calificaciones
UserModel.hasMany(rateModel, {
  foreignKey: 'ID_USER',
  sourceKey: 'ID_USER',
  onDelete: 'cascade',
});
rateModel.belongsTo(UserModel, {
  foreignKey: 'ID_USER',
  sourceKey: 'ID_USER',
});

// Exportar módulo
module.exports = UserModel;
