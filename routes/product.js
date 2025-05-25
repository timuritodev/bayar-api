const express = require('express');
const productsModel = require('../models/product');

const router = express.Router();

// GET /api/products — все товары
router.get('/api/products', async (req, res) => {
	try {
		const products = await productsModel.getAllProducts();
		res.json(products);
	} catch (error) {
		console.error('Error fetching all products:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

// GET /api/products/type/:type — товары по типу
router.get('/api/products/type/:type', async (req, res) => {
	try {
		const { type } = req.params;
		const products = await productsModel.getProductsByType(type);
		res.json(products);
	} catch (error) {
		console.error('Error fetching products by type:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

// GET /api/products/:id — товар по ID
router.get('/api/products/:id', async (req, res) => {
	const id = req.params.id;

	try {
		const product = await productsModel.getProductById(id);

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
