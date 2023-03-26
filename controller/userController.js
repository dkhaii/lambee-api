const { nanoid } = require('nanoid');
const db = require('../config/db');
const { responseHelper } = require('../helper');

const createUserController = (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
  } = req.body;
  const id = nanoid(16);
  const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const updatedAt = createdAt;

  let response;

  if (!firstName) {
    response = res.status(400).json(
      responseHelper('fail', 'nama depan mohon di isi', []),
    );

    return response;
  }

  if (!lastName) {
    response = res.status(400).json(
      responseHelper('fail', 'nama belakang mohon di isi', []),
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
    id,
    firstName,
    lastName,
    email,
    phoneNumber,
    createdAt,
    updatedAt
  ) VALUES (
    '${id}', 
    '${firstName}', 
    '${lastName}', 
    '${email}', 
    '${phoneNumber}',
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

const getAllUsersController = (req, res) => {
  const sql = 'SELECT * FROM users';

  db.query(sql, (error, result) => {
    if (error) {
      throw error;
    }

    const response = res.status(200).json(
      responseHelper('success', 'menampilkan semua data user', result),
    );

    return response;
  });

  return 0;
};

module.exports = { createUserController, getAllUsersController };
