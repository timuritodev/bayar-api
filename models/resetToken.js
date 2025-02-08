const { pool } = require('../utils/utils');
const crypto = require('crypto');

const generateToken = () => {
	return crypto.randomBytes(20).toString('hex');
};

const saveResetToken = async (userId, token, expirationTime) => {
	try {
		const [rows, fields] = await pool.execute(
			`
          INSERT INTO reset_token (user_id, token, expiration_time)
          VALUES (?, ?, ?)
        `,
			[userId, token, new Date(expirationTime).toISOString()]
		);
	} catch (error) {
		console.error('Error in saveResetToken:', error);
		throw error;
	}
};

const getResetTokenInfo = async (token) => {
	try {
		const [rows, fields] = await pool.execute(
			`
        SELECT user_id, expiration_time
        FROM reset_token
        WHERE token = ?
        `,
			[token]
		);

		if (rows.length === 0) {
			return null;
		}

		const { user_id: userId, expiration_time: expirationTime } = rows[0];

		return { userId, expirationTime: new Date(expirationTime).toISOString() };
	} catch (error) {
		console.error('Error in getResetTokenInfo:', error);
		throw error;
	}
};

const removeResetToken = async (userId) => {
	try {
		const [rows, fields] = await pool.execute(
			`
        DELETE FROM reset_token
        WHERE user_id = ?
        `,
			[userId]
		);

		console.log('Reset token removed:', rows);
	} catch (error) {
		console.error('Error in removeResetToken:', error);
		throw error;
	}
};

module.exports = {
	generateToken,
	saveResetToken,
	getResetTokenInfo,
	removeResetToken,
};

// CREATE TABLE reset_token (
//     id INT NOT NULL AUTO_INCREMENT,
//     user_id INT NOT NULL,
//     token VARCHAR(100) NOT NULL,
//     expiration_time VARCHAR(100) NOT NULL,
//     PRIMARY KEY (id)
// );
