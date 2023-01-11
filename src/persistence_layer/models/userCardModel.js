/**
 * Representación de la tabla "UserCard" como objeto (DAO).
 *
 * @module persistence-model-user-card
 * @author Cerciber <contact@cerciber.com>
 */

// Modulos instalados
const Sequelize = require('sequelize'); // Sequelize

// Modulos creados
const data_base = require('../../data_layer/data_base/data_base');

// Definir tabla
const UserCardModel = data_base.define('UserCard', {
  // Definir atributos
  ID_USER_CARD: {
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
});

// Exportar modelo
module.exports = UserCardModel;
