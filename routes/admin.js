const express = require('express');

const postController = require('../controllers/post');

const router = express.Router();

// post relative
router.get('/posts', postController.getPosts);
router.get('/post/:id', postController.getPost);
router.post('/post', postController.addPost);
router.put('/post', postController.editPost);
router.delete('/post', postController.deletePost);

module.exports = router;