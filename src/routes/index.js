const express = require('express');
const router = express.Router();

const UsersController = require('../controllers/UsersController');

router.get('/user/:userId', (new UsersController()).action('item'));
router.get('/user/:userId/avatar', (new UsersController()).action('avatar'));
router.delete('/user/:userId/avatar', (new UsersController()).action('deleteAvatar'));

module.exports = router;
