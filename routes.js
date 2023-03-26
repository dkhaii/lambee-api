const express = require('express');
const { createUserController, getAllUsersController } = require('./controller/userController');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('ini halaman homepage');
});

router.post('/users', createUserController);
router.get('/users', getAllUsersController);

module.exports = router;
