const express = require('express');
const { calculate_cost } = require('../models/calculator');

const router = express.Router();

router.post('/api/calculate', (req, res) => {
	try {
		const data = req.body;

		if (!data.building_length || !data.building_width || !data.ceiling_height) {
			return res.status(400).json({ error: 'Missing required parameters' });
		}

		const result = calculate_cost(data);
		res.json({ ...result.total_cost });
	} catch (error) {
		console.error('Error calculating cost:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

module.exports = router;
