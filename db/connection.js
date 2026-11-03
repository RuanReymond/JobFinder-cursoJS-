const Sequelizer = require('sequelize');

const sequelize = new Sequelizer({
    dialect: 'sqlite',
    storage: './db/app.db'
});

module.exports = sequelize;