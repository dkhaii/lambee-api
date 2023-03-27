const db = require('../config/db');
const { responseHelper } = require('../helper');

const getAllUsersController = (req, res) => {
  const { username } = req.query;

  const sql = 'SELECT * FROM users';

  db.query(sql, (error, result) => {
    if (error) {
      throw error;
    }

    if (result.length <= 0) {
      const response = res.status(200).json(
        responseHelper('success', 'belum ada data user', []),
      );

      return response;
    }

    let filteredResult = result;

    if (typeof username !== 'undefined') {
      filteredResult = result.filter(
        (r) => r.username.toLowerCase().includes(username.toLowerCase()),
      );
    }

    const mappedResult = filteredResult.map((r) => ({
      userID: r.userID,
      username: r.username,
    }));

    const response = res.status(200).json(
      responseHelper('success', 'menampilkan semua data user', mappedResult),
    );

    return response;
  });

  return 0;
};

const getUserByIdController = (req, res) => {
  const { userID } = req.params;
  const sql = `SELECT * FROM users WHERE userID = '${userID}'`;

  db.query(sql, (error, result) => {
    if (error) {
      throw error;
    }

    const response = res.status(200).json(
      responseHelper('success', 'menampilkan data user', result),
    );

    return response;
  });

  return 0;
};

const updateUserByIdController = (req, res) => {
  const { userID } = req.params;
  const {
    username,
    password,
    email,
    roleID,
  } = req.body;
  const updatedAt = new Date().toISOString().slice(0, 19).replace('T', ' ');

  let response;

  if (!username) {
    response = res.status(400).json(
      responseHelper('fail', 'mohon isi nama depan', []),
    );

    return response;
  }

  if (!password) {
    response = res.status(400).json(
      responseHelper('fail', 'mohon isi nama belakang', []),
    );

    return response;
  }

  if (!email) {
    response = res.status(400).json(
      responseHelper('fail', 'mohon isi email', []),
    );

    return response;
  }

  const sql = `UPDATE users 
    SET
    username = '${username}',
    password = '${password}',
    email = '${email}',
    roleID = '${roleID}',
    updatedAt = '${updatedAt}'
    WHERE
    userID = '${userID}'`;

  db.query(sql, (error, result) => {
    if (error) {
      throw error;
    }

    response = res.status(200).json(
      responseHelper('success', 'berhasil melakukan update', result),
    );

    return response;
  });

  return 0;
};

const deleteUserByIdController = (req, res) => {
  const { userID } = req.params;

  const sql = `DELETE FROM users WHERE userID = '${userID}'`;

  db.query(sql, (error, result) => {
    if (error) {
      throw error;
    }

    const response = res.status(200).json(
      responseHelper('success', 'berhasil menghapus user', result),
    );

    return response;
  });

  return 0;
};

module.exports = {
  getAllUsersController,
  getUserByIdController,
  updateUserByIdController,
  deleteUserByIdController,
};
