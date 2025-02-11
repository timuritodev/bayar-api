const calculate_cost = (data) => {
	const {
		building_length, // Длина здания, м
		building_width, // Ширина здания, м
		ceiling_height, // Высота до потолка, м
		door_area, // Площадь проёмов (ворота, двери), кв.м.
		window_area, // Площадь оконных проёмов, кв.м.
		wall_panel_thickness, // Толщина панели для стен (80; 100; 120; 150; 200)
		roof_panel_thickness, // Толщина панели для кровли (100; 150; 200)
		wall_panel_width, // Ширина стеновой панели, м (1 или 1.19)
		metal_thickness, // Толщина металла, допустимые значения: 0.45; 0.5; 0.6; 0.7
		insulation_type, // Тип наполнителя (на данный момент – только минеральная вата)
		region, // Район строительства (не влияет на цену, используется для справки)
		color, // Код цвета металла (стандартные – например, [9003, 7004, 8016])
	} = data;

	// Расчёт площади стен: периметр * высота минус проёмы
	const wall_area =
		2 * ceiling_height * (building_length + building_width) -
		door_area -
		window_area;

	// Расчёт площади кровли (упрощённо, без учёта скатов)
	const roof_area = building_length * building_width;

	// Базовые цены (руб/кв.м) для панелей:
	const basePrices = {
		wall: 2400, // базовая цена стеновых панелей
		roof: 3050, // базовая цена кровельных панелей
	};

	// Множитель для толщины металла.
	// Допустимые значения: 0.45, 0.5, 0.6, 0.7. Принимаем базовый множитель для 0.45 равным 1,
	// остальные – с приростом. (Здесь подобраны примерные значения, их можно менять.)
	const metalThicknessFactors = {
		0.45: 1,
		0.5: 1.1,
		0.6: 1.2,
		0.7: 1.3,
	};
	const metalFactor = metalThicknessFactors[metal_thickness] || 1;

	// Множитель для ширины стеновой панели.
	// Согласно руководителю, панели бывают двух видов: 1 м (1000 мм) и 1.19 м (1190 мм).
	// Если ширина 1.19 м – цена увеличивается (примерно на 10%).
	const wallPanelWidthFactor =
		Math.abs(wall_panel_width - 1.19) < 0.01 ? 1.1 : 1;

	// Множитель для толщины панели (стена).
	// Доступные варианты: 80; 100; 120; 150; 200.
	// При увеличении толщины цена возрастает.
	const wallPanelThicknessFactors = {
		80: 1,
		100: 1.1,
		120: 1.2,
		150: 1.3,
		200: 1.5,
	};
	const wallThicknessFactor =
		wallPanelThicknessFactors[wall_panel_thickness] || 1;

	// Множитель для толщины панели (кровля).
	// Допустимые варианты: 100; 150; 200.
	const roofPanelThicknessFactors = {
		100: 1,
		150: 1.15,
		200: 1.3,
	};
	const roofThicknessFactor =
		roofPanelThicknessFactors[roof_panel_thickness] || 1;

	// Множитель для цвета металла.
	// Если цвет стандартный (например, коды 9003, 7004, 8016) – множитель 1, иначе (нестандартный) +25%
	const colorMultiplier = color
		? [9003, 7004, 8016].includes(color)
			? 1
			: 1.25
		: 1;

	// Цена за кв.м для стеновых панелей с учётом всех факторов:
	// базовая цена * множитель для толщины металла * множитель для ширины * множитель для толщины панели * цветовой множитель
	const wallPanelPricePerSqM =
		basePrices.wall *
		metalFactor *
		wallPanelWidthFactor *
		wallThicknessFactor *
		colorMultiplier;

	const wall_panel_cost = wall_area * wallPanelPricePerSqM;

	// Для кровельных панелей: ширина фиксирована (1 м), поэтому учитываем:
	// базовая цена для кровли * множитель для толщины металла * множитель для толщины панели * цветовой множитель
	const roofPanelPricePerSqM =
		basePrices.roof * metalFactor * roofThicknessFactor * colorMultiplier;

	const roof_panel_cost = roof_area * roofPanelPricePerSqM;

	// Утеплитель.
	// Работает только с каменной ватой. Если понадобится учитывать плотность, можно добавить дополнительный параметр.
	// Здесь примем цену 500 руб/кв.м.
	const insulationPrice = 500;
	const insulation_cost = wall_area * insulationPrice;

	// Итоговая стоимость с НДС 20%
	const subtotal = wall_panel_cost + roof_panel_cost + insulation_cost;
	const total_cost = subtotal * 1.2;

	console.log(total_cost, '1123');
	return {
		total_cost: Math.round(total_cost),
		details: {
			wall_panel_cost: Math.round(wall_panel_cost),
			roof_panel_cost: Math.round(roof_panel_cost),
			insulation_cost: Math.round(insulation_cost),
			basePrices,
			multipliers: {
				metalFactor,
				wallPanelWidthFactor,
				wallThicknessFactor,
				roofThicknessFactor,
				colorMultiplier,
			},
			vat_included: true,
		},
	};
};

module.exports = {
	calculate_cost,
};

// const calculate_cost = (data) => {
// 	const {
// 		building_length,
// 		building_width,
// 		ceiling_height,
// 		door_area,
// 		window_area,
// 		wall_panel_thickness, // Толщина стеновой панели (80, 100, 120, 150, 200)
// 		roof_panel_thickness, // Толщина кровельной панели (100, 150, 200)
// 		wall_panel_width, // Ширина стеновой панели (1 или 1.19)
// 		metal_thickness_wall, // Толщина металла стен (0.45, 0.5, 0.6, 0.7)
// 		metal_thickness_roof, // Толщина металла кровли (0.45, 0.5, 0.6, 0.7)
// 		insulation_density, // Плотность утеплителя (95-120 с шагом 5)
// 		color,
// 	} = data;

// 	// Расчет площадей
// 	const wall_area =
// 		2 * ceiling_height * (building_length + building_width) -
// 		door_area -
// 		window_area;
// 	const roof_area = building_length * building_width;

// 	// Базовые цены (минимальные значения)
// 	const BASE_WALL_PRICE = 2400; // Для толщины металла 0.45, ширины 1м, толщины панели 80мм
// 	const BASE_ROOF_PRICE = 3050; // Для толщины металла 0.45, толщины панели 100мм

// 	// Коэффициенты для стеновых панелей
// 	const METAL_THICKNESS_MULTIPLIER = {
// 		0.45: 1.0,
// 		0.5: 1.15,
// 		0.6: 1.3,
// 		0.7: 1.45,
// 	};

// 	const WALL_WIDTH_MULTIPLIER = {
// 		1: 1.0,
// 		1.19: 1.08,
// 	};

// 	const WALL_PANEL_THICKNESS_MULTIPLIER = {
// 		80: 1.0,
// 		100: 1.15,
// 		120: 1.3,
// 		150: 1.5,
// 		200: 1.8,
// 	};

// 	// Коэффициенты для кровельных панелей
// 	const ROOF_PANEL_THICKNESS_MULTIPLIER = {
// 		100: 1.0,
// 		150: 1.2,
// 		200: 1.4,
// 	};

// 	// Расчет стоимости стеновых панелей за м²
// 	const wall_price =
// 		BASE_WALL_PRICE *
// 		METAL_THICKNESS_MULTIPLIER[metal_thickness_wall] *
// 		WALL_WIDTH_MULTIPLIER[wall_panel_width] *
// 		WALL_PANEL_THICKNESS_MULTIPLIER[wall_panel_thickness];

// 	// Расчет стоимости кровельных панелей за м²
// 	const roof_price =
// 		BASE_ROOF_PRICE *
// 		METAL_THICKNESS_MULTIPLIER[metal_thickness_roof] *
// 		ROOF_PANEL_THICKNESS_MULTIPLIER[roof_panel_thickness];

// 	// Коэффициент цвета
// 	const colorMultiplier = [9003, 7004, 8016].includes(color) ? 1 : 1.25;

// 	// Стоимость стен и крыши
// 	const wall_panel_cost = wall_area * wall_price * colorMultiplier;
// 	const roof_panel_cost = roof_area * roof_price * colorMultiplier;

// 	// Стоимость утеплителя (500 + 10 за каждую единицу плотности сверх 95)
// 	const insulation_price = 500 + (insulation_density - 95) * 10;
// 	const insulation_cost = wall_area * insulation_price;

// 	// Итоговая стоимость с НДС
// 	const total_cost =
// 		(wall_panel_cost + roof_panel_cost + insulation_cost) * 1.2;

// 	return {
// 		total_cost: Math.round(total_cost),
// 		details: {
// 			wall_panel_cost: Math.round(wall_panel_cost),
// 			roof_panel_cost: Math.round(roof_panel_cost),
// 			insulation_cost: Math.round(insulation_cost),
// 			color_multiplier: colorMultiplier,
// 			vat_included: true,
// 		},
// 	};
// };

// module.exports = {
// 	calculate_cost,
// };
