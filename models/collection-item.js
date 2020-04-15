const Sequelize = require('sequelize');

const sequelize = require('../util/db');

const CollectionItem = sequelize.define('collectionItem', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
})

module.exports = CollectionItem;