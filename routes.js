const express = require('express');
const { createUserController, getAllUsersController, getUserByIdController } = require('./controller/userController');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('ini halaman homepage');
});

router.post('/users', createUserController);
router.get('/users', getAllUsersController);
router.get('/users/:userId', getUserByIdController);

module.exports = router;
