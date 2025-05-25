const { pool } = require('../utils/utils');

const getAllProducts = async () => {
	const [rows] = await pool.execute('SELECT * FROM products');
	return rows;
};

const getProductsByType = async (type) => {
	const [rows] = await pool.execute(
		'SELECT * FROM products WHERE product_type = ?',
		[type]
	);
	return rows;
};

const getProductById = async (id) => {
	const [rows] = await pool.execute('SELECT * FROM products WHERE id = ?', [
		id,
	]);
	return rows.length > 0 ? rows[0] : null;
};

module.exports = {
	getAllProducts,
	getProductsByType,
	getProductById,
};

// CREATE TABLE products (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     title VARCHAR(255) NOT NULL,
//     description TEXT,
//     picture VARCHAR(255),
//     product_type ENUM('thermal_insulation', 'fasteners', 'shaped_elements', 'profiled_sheeting', 'other') NOT NULL DEFAULT 'other'
// );

// ALTER TABLE categories MODIFY category_type ENUM('electronics', 'books', 'clothing', 'other', 'new_type');

// INSERT INTO products (title, description, picture, product_type)
// VALUES (
//   'IZOL ECO 110',
//   'Теплоизоляционный слой в фасадных теплоизоляционных композиционных системах с наружными штукатурными слоями в зданиях до 16 м, а также на участках стен, находящихся внутри застекленных лоджий или балконов, утепление с внутренней стороны стен лестничных площадок и маршей, околопроемных участков.',
//   'https://test', -- заменишь на нужную ссылку
//   'thermal_insulation' -- или любой другой актуальный тип
// );

// INSERT INTO products (title, description, picture, product_type)
// VALUES (
//   'IZOL ECO 120',
//   'Теплоизоляционный слой в фасадных теплоизоляционных композиционных системах с наружными штукатурными слоями на зданиях высотой до 50 м.',
//   'https://test', -- заменишь на нужную ссылку
//   'thermal_insulation' -- или любой другой актуальный тип
// );

// INSERT INTO products (title, description, picture, product_type)
// VALUES (
//   'IZOL ECO 140',
//   'Теплоизоляционный слой в фасадных теплоизоляционных композиционных системах с наружными штукатурными слоями.',
//   'https://test', -- заменишь на нужную ссылку
//   'thermal_insulation' -- или любой другой актуальный тип
// );

// INSERT INTO products (title, description, picture, product_type)
// VALUES (
//   'IZOL ECO 160',
//   'Нижний слой при двухслойном или средний слой при трехслойном выполнении теплоизоляции кровель, в т.ч. с ковром без выравнивающих цементно-песчаных стяжек. При прочности на сжатие при 10% деформации не менее-40 кПа Верхний теплоизоляционный слой при двухслойном или трехслойном выполнении теплоизоляции кровель. При прочности на сжатие при 10% деформации не менее-60 кПа.',
//   'https://test', -- заменишь на нужную ссылку
//   'thermal_insulation' -- или любой другой актуальный тип
// );

// INSERT INTO products (title, description, picture, product_type)
// VALUES (
//   'IZOL ECO 30',
//   'Тепло-звукоизоляция ненагружаемых конструкций в промышленном и гражданском строительстве. Ненагружаемая тепло-звукоизоляция каркасных стен и перегородок, межэтажных перекрытий.',
//   'https://test', -- заменишь на нужную ссылку
//   'thermal_insulation' -- или любой другой актуальный тип
// );

// INSERT INTO products (title, description, picture, product_type)
// VALUES (
//   'IZOL ECO 40',
//   'Ненагружаемая тепло-звукоизоляция каркасных стен и перегородок, межэтажных перекрытий. Внутренний слой при двухслойном выполнении изоляции в навесных фасадных системах с воздушным зазором',
//   'https://test', -- заменишь на нужную ссылку
//   'thermal_insulation' -- или любой другой актуальный тип
// );

// INSERT INTO products (title, description, picture, product_type)
// VALUES (
//   'IZOL ECO 60',
//   'Средний слой наружных стен теплоизоляции с различными видами отделки, в т.ч сайдингом с применением ветрозащитных материалов. Внутренний слой при выполнении теплоизоляции в навесных фасадных системах с воздушным зазором',
//   'https://test', -- заменишь на нужную ссылку
//   'thermal_insulation' -- или любой другой актуальный тип
// );

// INSERT INTO products (title, description, picture, product_type)
// VALUES (
//   'IZOL ECO 90',
//   'Однослойная теплоизоляция в навесных вентилируемых фасадных системах с воздушным зазором. Наружный слой при двухслойном выполнении изоляции',
//   'https://test', -- заменишь на нужную ссылку
//   'thermal_insulation' -- или любой другой актуальный тип
// );

// INSERT INTO products (title, description, picture, product_type)
// VALUES (
//   'IZOL LIGHT',
//   'Плиты предназначены для применения в качестве тепловой, звуковой и противопожарной изоляции строительных конструкций, промышленного оборудования, а также для изоляции ненагружаемых конструкций: чердаков, мансард, стен и т.п, утепления фасадов, наклонной кровли',
//   'https://test', -- заменишь на нужную ссылку
//   'thermal_insulation' -- или любой другой актуальный тип
// );

// INSERT INTO products (title, description, picture, product_type)
// VALUES (
//   'Изол Н 30',
//   'Применяется для тепловой, звуковой и противопожарной изоляции строительных конструкций, промышленного оборудования. Для изоляции ненагружаемых конструкций: чердаков, мансард, стен, потолков, сушильных устройств и систем кондиционирования воздуха в качестве заполнителя в трехслойной облегченной кладке, для утепления скатной или наклонной кровли.',
//   'https://test', -- заменишь на нужную ссылку
//   'thermal_insulation' -- или любой другой актуальный тип
// );

// INSERT INTO products (title, description, picture, product_type)
// VALUES (
//   'Изол НК 40',
//   '',
//   'https://test', -- заменишь на нужную ссылку
//   'thermal_insulation' -- или любой другой актуальный тип
// );

// INSERT INTO products (title, description, picture, product_type)
// VALUES (
//   'Изол ФВ 80',
//   'Теплоизоляционный слой в фасадных системах с воздушным зазором при изоляции в один слой или наружный слой в системах утепления фасадов в два слоя (рекомендуется применять в комбинации с НК 50).',
//   'https://test', -- заменишь на нужную ссылку
//   'thermal_insulation' -- или любой другой актуальный тип
// );

// INSERT INTO products (title, description, picture, product_type)
// VALUES (
//   'Изол ФШ 150',
//   'Теплоизоляция на внешней стороне фасадов, с последующим нанесением тонкослойной штукатурки по стеклосетке.',
//   'https://test', -- заменишь на нужную ссылку
//   'thermal_insulation' -- или любой другой актуальный тип
// );

// INSERT INTO products (title, description, picture, product_type)
// VALUES (
//   'Огнезащита',
//   '',
//   'https://test', -- заменишь на нужную ссылку
//   'thermal_insulation' -- или любой другой актуальный тип
// );

// INSERT INTO products (title, description, picture, product_type)
// VALUES (
//   'ППЖ СЛ',
//   'Теплоизоляция в гражданском и промышленном строительстве ограждающих строительных конструкций: перекрытий, а также для утепления покрытий, выполненных из профилированного металлического настила или железобетона без устройства стяжки и выравнивающего слоя, в условиях, исключающих контакт изделий с воздухом внутри помещений.',
//   'https://test', -- заменишь на нужную ссылку
//   'thermal_insulation' -- или любой другой актуальный тип
// );

// INSERT INTO products (title, description, picture, product_type)
// VALUES (
//   'Саморезы',
//   'Для крепления сэндвич-панелей и листов профилированного металла к металлоконструкциям (цвета по RAL).',
//   'https://test', -- заменишь на нужную ссылку
//   'fasteners' -- или любой другой актуальный тип
// );

// INSERT INTO products (title, description, picture, product_type)
// VALUES (
//   'Заклепка цветная комбинированная',
//   'Для крепления фасонных изделий к стеновым сэндвич-панелям с внутренней стороны (цвета по RAL).',
//   'https://test', -- заменишь на нужную ссылку
//   'fasteners' -- или любой другой актуальный тип
// );

// INSERT INTO products (title, description, picture, product_type)
// VALUES (
//   'Пружинные анкеры',
//   'Для крепления сэндвич-панелей к бетонным колоннам.',
//   'https://test', -- заменишь на нужную ссылку
//   'fasteners' -- или любой другой актуальный тип
// );

// INSERT INTO products (title, description, picture, product_type)
// VALUES (
//   'Профнастил МП-20',
//   '',
//   'https://test', -- заменишь на нужную ссылку
//   'shaped_elements' -- или любой другой актуальный тип
// );

// INSERT INTO products (title, description, picture, product_type)
// VALUES (
//   'Профнастил Н114',
//   '',
//   'https://test', -- заменишь на нужную ссылку
//   'shaped_elements' -- или любой другой актуальный тип
// );

// INSERT INTO products (title, description, picture, product_type)
// VALUES (
//   'Профнастил Н75',
//   '',
//   'https://test', -- заменишь на нужную ссылку
//   'shaped_elements' -- или любой другой актуальный тип
// );

// INSERT INTO products (title, description, picture, product_type)
// VALUES (
//   'Профнастил НС60',
//   '',
//   'https://test', -- заменишь на нужную ссылку
//   'shaped_elements' -- или любой другой актуальный тип
// );

// INSERT INTO products (title, description, picture, product_type)
// VALUES (
//   'Профнастил РП9',
//   '',
//   'https://test', -- заменишь на нужную ссылку
//   'shaped_elements' -- или любой другой актуальный тип
// );

// INSERT INTO products (title, description, picture, product_type)
// VALUES (
//   'Профнастил С21',
//   '',
//   'https://test', -- заменишь на нужную ссылку
//   'shaped_elements' -- или любой другой актуальный тип
// );

// INSERT INTO products (title, description, picture, product_type)
// VALUES (
//   'Профнастил С44',
//   '',
//   'https://test', -- заменишь на нужную ссылку
//   'shaped_elements' -- или любой другой актуальный тип
// );

// INSERT INTO products (title, description, picture, product_type)
// VALUES (
//   'Профнастил С8',
//   '',
//   'https://test', -- заменишь на нужную ссылку
//   'shaped_elements' -- или любой другой актуальный тип
// );

// INSERT INTO products (title, description, picture, product_type)
// VALUES (
//   'Профнастил С9',
//   '',
//   'https://test', -- заменишь на нужную ссылку
//   'shaped_elements' -- или любой другой актуальный тип
// );

// INSERT INTO products (title, description, picture, product_type)
// VALUES (
//   'Профнастил СС10',
//   '',
//   'https://test', -- заменишь на нужную ссылку
//   'shaped_elements' -- или любой другой актуальный тип
// );

// INSERT INTO products (title, description, picture, product_type)
// VALUES (
//   'Фасонные элементы',
//   '',
//   'https://test', -- заменишь на нужную ссылку
//   'profiled_sheeting' -- или любой другой актуальный тип
// );
