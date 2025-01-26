const calculate_cost = (data) => {
	const {
		building_length,
		building_width,
		ceiling_height,
		door_area,
		window_area,
		wall_panel_thickness,
		roof_panel_thickness,
		insulation_type,
		region,
	} = data;

	// Площадь стен: две длинные + две короткие минус проемы
	const wall_area =
		2 * ceiling_height * (building_length + building_width) -
		door_area -
		window_area;

	// Площадь крыши: предположим плоская крыша
	const roof_area = building_length * building_width;

	// Цены за единицу площади (например, рубли за кв.м.)
	const prices = {
		wall_panel: 1000, // базовая цена за кв.м. панелей
		roof_panel: 800, // базовая цена за кв.м. панелей
		insulation: {
			mineral_wool: 500, // цена за кв.м. утеплителя
			polystyrene: 700, // цена за кв.м. утеплителя
		},
		region_coefficient: {
			Moscow: 1.2,
			Default: 1.0,
		},
	};

	// Стоимость стеновых панелей
	const wall_panel_cost =
		wall_area * wall_panel_thickness * prices.wall_panel * 0.001; // 0.001 для перевода мм в м

	// Стоимость кровельных панелей
	const roof_panel_cost =
		roof_area * roof_panel_thickness * prices.roof_panel * 0.001;

	// Стоимость утеплителя
	const insulation_cost =
		wall_area * prices.insulation[insulation_type || 'mineral_wool'];

	// Учитываем коэффициент региона
	const region_coefficient =
		prices.region_coefficient[region] || prices.region_coefficient.Default;

	// Итоговая стоимость
	const total_cost =
		(wall_panel_cost + roof_panel_cost + insulation_cost) * region_coefficient;

	return {
		total_cost: Math.round(total_cost),
		details: {
			wall_panel_cost: Math.round(wall_panel_cost),
			roof_panel_cost: Math.round(roof_panel_cost),
			insulation_cost: Math.round(insulation_cost),
			region_coefficient,
		},
	};
};

module.exports = {
	calculate_cost,
};
