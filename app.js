const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');

const sequelize = require('./util/db');
const User = require('./models/user');
const Post = require('./models/post');
const Comment = require('./models/comment');
const Collection = require('./models/collection');
const CollectionItem = require('./models/collection-item');
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');

const app = express();

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet())
const limiter = rateLimit({
	max: 1000,
	windowMs: 60 * 60 * 1000, // 1 hour
	message: 'Too many requests in one hour.'
})
app.use(limiter);
app.use(express.json({ limit: '1000kb' })); // body limit is 1000
app.use(xss());

// routes
app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);

// DB table relation
User.hasMany(Post);
Post.belongsTo(User, { constraints: true, onDelete: 'CASCADE' }) // user 被刪，相關 post 也會被刪
Post.hasMany(Comment);
Comment.belongsTo(Post);
User.hasMany(Comment);
Comment.belongsTo(User);
User.hasOne(Collection);
Collection.belongsTo(User);
Post.belongsToMany(Collection, { through: CollectionItem });
Collection.belongsToMany(Post, { through: CollectionItem })

sequelize.sync()
	.then(() => {
		return User.findByPk(1);
	})
	.then((user) => {
		if (!user) {
			return User.create({ name: 'Kyle', email: 'oldmo860617@gmail.com', password: 'oo0981833393' })
		}
		return user;
	})
	.then(user => {
		return user.createCollection();
	})
	.then(() => {
		app.listen(process.env.PORT || 5000, () => {
			console.log('server listening on 5000');
		})
	})
	.catch(err => {
		console.log(err);
	})
