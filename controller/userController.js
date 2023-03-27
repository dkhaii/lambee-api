const { nanoid } = require('nanoid');
const db = require('../config/db');
const { responseHelper } = require('../helper');

const createUserController = (req, res) => {
  const {
    username,
    password,
    email,
    roleID,
  } = req.body;
  const userID = nanoid(16);
  const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const updatedAt = createdAt;

  let response;

  if (!username) {
    response = res.status(400).json(
      responseHelper('fail', 'username mohon di isi', []),
    );

    return response;
  }

  if (!password) {
    response = res.status(400).json(
      responseHelper('fail', 'password mohon di isi', []),
    );

    return response;
  }

  if (!email) {
    response = res.status(400).json(
      responseHelper('fail', 'email mohon di isi', []),
    );

    return response;
  }

  const sql = `INSERT INTO users (
    userID,
    username,
    password,
    email,
    roleID,
    createdAt,
    updatedAt
  ) VALUES (
    '${userID}', 
    '${username}', 
    '${password}', 
    '${email}',
    '${roleID}', 
    '${createdAt}',
    '${updatedAt}'
  )`;

  db.query(sql, (error, result) => {
    if (error) {
      throw error;
    }

    response = res.status(201).json(
      responseHelper('success', 'berhasil membuat user', result),
    );

    return response;
  });

  return 0;
};

module.exports = {
  createUserController,
};
