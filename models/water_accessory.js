const { pool } = require('../utils/utils');

const getAllWater_accessories = async () => {
	const [rows, fields] = await pool.execute('SELECT * FROM water_accessory');
	return rows;
};

const getWater_accessoriesById = async (id) => {
	const query = `
		SELECT wa.*, wac.name AS characteristic_name, wac.value AS characteristic_value
		FROM water_accessory wa
		LEFT JOIN water_accessory_characteristics wac ON wa.id = wac.product_id
		WHERE wa.id = ?;
	`;

	const [rows] = await pool.execute(query, [id]);

	if (rows.length === 0) return null;

	const characteristics = rows
		.map((row) => ({
			name: row.characteristic_name,
			value: row.characteristic_value,
		}))
		.filter((char) => char.name);

	const product = {
		id: rows[0].id,
		title: rows[0].title,
		description: rows[0].description,
		picture: rows[0].h_picture,
		characteristics,
	};

	return product;
};

module.exports = {
	getAllWater_accessories,
	getWater_accessoriesById,
};

// CREATE TABLE water_accessory (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     title VARCHAR(255) NOT NULL,
//     description TEXT,
//     h_picture VARCHAR(255)
// );

// CREATE TABLE water_accessory_characteristics (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     product_id INT NOT NULL,
//     name VARCHAR(255) NOT NULL,
//     value VARCHAR(255) NOT NULL,
//     FOREIGN KEY (product_id) REFERENCES water_accessory(id) ON DELETE CASCADE
// );
