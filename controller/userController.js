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
  const { firstName, lastName } = req.query;

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

    if (typeof firstName !== 'undefined') {
      filteredResult = result.filter(
        (r) => r.firstName.toLowerCase().includes(firstName.toLowerCase()),
      );
    }

    if (typeof lastName !== 'undefined') {
      filteredResult = result.filter(
        (r) => r.lastName.toLowerCase().includes(lastName.toLowerCase()),
      );
    }

    const mappedResult = filteredResult.map((r) => ({
      id: r.id,
      firstName: r.firstName,
      lastName: r.lastName,
    }));

    const response = res.status(200).json(
      responseHelper('success', 'menampilkan semua data user', mappedResult),
    );

    return response;
  });

  return 0;
};

const getUserByIdController = (req, res) => {
  const { userId } = req.params;
  const sql = `SELECT * FROM users WHERE id = '${userId}'`;

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
  const { userId } = req.params;
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
  } = req.body;
  const updatedAt = new Date().toISOString().slice(0, 19).replace('T', ' ');

  let response;

  if (!firstName) {
    response = res.status(400).json(
      responseHelper('fail', 'mohon isi nama depan', []),
    );

    return response;
  }

  if (!lastName) {
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
  firstName = '${firstName}',
  lastName = '${lastName}',
  email = '${email}',
  phoneNumber = '${phoneNumber}',
  updatedAt = '${updatedAt}'
  WHERE
  id = '${userId}'`;

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
  const { userId } = req.params;

  const sql = `DELETE FROM users WHERE id = '${userId}'`;

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
  createUserController,
  getAllUsersController,
  getUserByIdController,
  updateUserByIdController,
  deleteUserByIdController,
};
