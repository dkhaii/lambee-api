const express = require('express');
const {
  getAllUsersController,
  getUserByIdController,
  updateUserByIdController,
  deleteUserByIdController,
} = require('./controller/adminController');
const { createUserController } = require('./controller/userController');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('ini halaman homepage');
});

// user routes
router.post('/users', createUserController);

// admin routes
router.get('/admins', getAllUsersController);
router.get('/admins/:userID', getUserByIdController);
router.put('/admins/:userID', updateUserByIdController);
router.delete('/admins/:userID', deleteUserByIdController);

module.exports = router;
