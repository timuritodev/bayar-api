const bcrypt = require('bcryptjs');
const { pool } = require('../utils/utils');

const createUser = async (userData) => {
	const {
		name,
		surname,
		phone,
		email,
		address,
		password,
		city,
		user_type,
		organization_name,
	} = userData;
	const hashedPassword = await bcrypt.hash(password, 10);

	try {
		const [rows, fields] = await pool.execute(
			`
      INSERT INTO user (name, surname, phone, email, address, city, user_type, organization_name, registered_at, password)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
			[
				name,
				surname,
				phone,
				email,
				address,
				city,
				user_type,
				organization_name || null,
				new Date(),
				hashedPassword,
			]
		);

		console.log('Rows inserted:', rows);

		return rows.insertId;
	} catch (error) {
		console.error('Error in createUser:', error);
		throw error;
	}
};

const findUserByEmail = async (email) => {
	const [rows, fields] = await pool.execute(
		`
    SELECT * FROM user
    WHERE email = ? 
  `,
		[email]
	);

	return rows.length > 0 ? rows[0] : null;
};

const findUserByCredentials = async (email, password) => {
	const [rows, fields] = await pool.execute(
		`
    SELECT * FROM user
    WHERE email = ? 
  `,
		[email]
	);

	if (!rows || rows.length === 0) {
		return null;
	}

	const user = rows[0];
	const isPasswordMatch = await bcrypt.compare(password, user.password);

	if (!isPasswordMatch) {
		return null;
	}

	// Увеличение счетчика заходов
	await pool.execute(
		`
    UPDATE user
    SET login_count = login_count + 1
    WHERE email = ?
  `,
		[email]
	);

	delete user.password;
	return user;
};

const updateUser = async (userId, updatedUserData) => {
	const fieldsToUpdate = Object.entries(updatedUserData)
		.filter(([key, value]) => value !== undefined)
		.map(([key]) => `${key} = ?`)
		.join(', ');

	const valuesToUpdate = Object.values(updatedUserData).filter(
		(value) => value !== undefined
	);

	try {
		const [rows, fields] = await pool.execute(
			`
      UPDATE user
      SET ${fieldsToUpdate}
      WHERE id = ?
      `,
			[...valuesToUpdate, userId]
		);
	} catch (error) {
		console.error('Error in updateUser:', error);
		throw error;
	}
};

const getAllUsers = async () => {
	const [rows, fields] = await pool.execute('SELECT * FROM user');
	return rows;
};

const findUserById = async (userId) => {
	const [rows, fields] = await pool.execute(
		`
    SELECT * FROM user
    WHERE id = ? 
  `,
		[userId]
	);

	if (!rows || rows.length === 0) {
		return null;
	}

	const user = rows[0];
	delete user.password;
	return user;
};

const findUserByIdNotSecure = async (userId) => {
	const [rows, fields] = await pool.execute(
		`
    SELECT * FROM user
    WHERE id = ? 
  `,
		[userId]
	);

	if (!rows || rows.length === 0) {
		return null;
	}

	const user = rows[0];
	return user;
};

const changePassword = async (userId, oldPassword, newPassword) => {
	if (oldPassword) {
		const user = await findUserByIdNotSecure(userId);
		const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);

		if (!isPasswordMatch) {
			throw new Error('Old password is incorrect');
		}
	}

	const hashedNewPassword = await bcrypt.hash(newPassword, 10);
	await updateUser(userId, { password: hashedNewPassword });
};

module.exports = {
	createUser,
	findUserByEmail,
	findUserByCredentials,
	updateUser,
	getAllUsers,
	findUserById,
	changePassword,
};

// CREATE TABLE user (
//   id INT AUTO_INCREMENT PRIMARY KEY,
//   name VARCHAR(100) NOT NULL,
//   surname VARCHAR(100) NOT NULL,
//   phone VARCHAR(30) NOT NULL,
//   email VARCHAR(150) NOT NULL UNIQUE,
//   address VARCHAR(255) NOT NULL,
//   city VARCHAR(100) NOT NULL,
//   user_type VARCHAR(100) NOT NULL,
//   organization_name VARCHAR(255),
//   registered_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
//   login_count INT NOT NULL DEFAULT 0,
//   password VARCHAR(255) NOT NULL
// );
