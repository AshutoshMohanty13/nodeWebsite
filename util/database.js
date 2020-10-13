const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'ashutosh@13', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
