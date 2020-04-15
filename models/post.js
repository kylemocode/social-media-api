const Sequelize = require('sequelize');
const sequelize = require('../util/db');

const Post = sequelize.define('post', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	description: Sequelize.STRING,
})

module.exports = Post;