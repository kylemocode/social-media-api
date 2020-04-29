const Sequelize = require('sequelize');

if (process.env.NODE_ENV == "docker_development") {
	const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_ROOT_PASSWORD, { dialect: 'mysql', host: 'mysql' })
	module.exports = sequelize;
} else {
	const sequelize = new Sequelize('social_media', 'root', 'oo0981833393', { dialect: 'mysql', host: 'localhost' });
	module.exports = sequelize;
}
