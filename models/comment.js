const Sequelize = require('sequelize');
const sequelize = require('../util/db');

const Comment = sequelize.define('comment', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	info: Sequelize.STRING,
})

module.exports = Comment;