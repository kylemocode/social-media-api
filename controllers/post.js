const Post = require('../models/post');

exports.getPosts = async (req, res) => {
	try {
		const posts = await req.user.getPosts();
		if (posts) {
			return res.send(posts);
		}
		throw new Error('can not get posts');
	} catch (error) {
		res.send({ err_msg: error.message });
	}
}

exports.getPost = async (req, res) => {
	try {
		const postId = req.params.id; s
		const post = await Post.findByPk(postId);
		if (post) {
			console.log('test')
			return res.send(post);
		}
		throw new Error('post not found')
	} catch (error) {
		res.send({ err_msg: error.message });
	}
}

exports.addPost = async (req, res) => {
	try {
		const description = req.body.description;
		// 法一
		// Post.create({
		// 	description,
		// 	userId: req.user.id
		// })

		// 法二: Sequelize 提供的函式
		const post = await req.user.createPost({
			description,
			userId: req.user.id
		});

		res.send({ msg: 'create post success', post })
	} catch (error) {
		res.send({ error })
	}
}

exports.editPost = async (req, res) => {
	try {
		const postId = req.body.postId;
		const updatedDescription = req.body.description;
		const post = await Post.findByPk(postId);
		post.description = updatedDescription;
		await post.save();
		res.send({ message: 'edit post successfully' })
	} catch (error) {
		res.send({ err_msg: 'edit post fail' });
	}
}

exports.deletePost = async (req, res) => {
	try {
		const postId = req.body.postId;
		const post = await Post.findByPk(postId);
		if (post) {
			await post.destroy();
			return res.send('destroy post successfully');
		}

		throw new Error('post not found')
	} catch (error) {
		res.send({ err_msg: error.message });
	}
}