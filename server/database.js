
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('todoapp', 'postgres', null, {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
