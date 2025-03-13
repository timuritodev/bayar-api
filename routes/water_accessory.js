const express = require('express');
const water_accessoryModel = require('../models/water_accessory');

const router = express.Router();

router.get('/api/water_accessory', async (req, res) => {
	try {
		const products = await water_accessoryModel.getAllWater_accessories();
		res.json(products);
	} catch (error) {
		console.error('Error fetching products:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

router.get('/api/water_accessory/:id', async (req, res) => {
	const id = req.params.id;

	try {
		const product = await water_accessoryModel.getWater_accessoriesById(id);

		if (!product) {
			res.status(404).json({ error: 'Product not found' });
			return;
		}

		res.json(product);
	} catch (error) {
		console.error('Error fetching product by ID:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

module.exports = router;
