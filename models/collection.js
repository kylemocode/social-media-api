const Sequelize = require('sequelize');
const sequelize = require('../util/db');

const Collection = sequelize.define('collection', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	}
})

module.exports = Collection;