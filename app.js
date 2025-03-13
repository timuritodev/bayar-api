const bodyParser = require('body-parser');
const express = require('express');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');
const NotFoundError = require('./errors/NotFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const rateLimiter = require('./middlewares/rateLimit');
const userRoutes = require('./routes/users');
const mailerRoutes = require('./routes/mailers');
const calculatorRoutes = require('./routes/calculator');
const water_accessoryRoutes = require('./routes/water_accessory');
// const MySQLStore = require("express-mysql-session")(session);
// const { pool } = require("./utils/utils");

const { PORT = 3001 } = process.env;

const app = express();

app.use(bodyParser.json());

// const sessionStore = new MySQLStore(
//   {
//     createDatabaseTable: true,
//     schema: {
//       tableName: "sessions",
//     },
//   },
//   pool
// );

// app.use(
//   session({
//     secret: "mister_fox",
//     resave: false,
//     saveUninitialized: true,
//     store: sessionStore,
//     cookie: {
//       secure: false,
//       httpOnly: true,
//       maxAge: 24 * 60 * 60 * 1000,
//     },
//   })
// );

app.use(
	cors({
		// origin: "https://tatbayar.ru",
		origin: 'http://localhost:3002',
		credentials: true,
		allowedHeaders: [
			'Origin',
			'X-Requested-With',
			'Content-Type',
			'Accept',
			'Authorization',
		],
	})
);

const config = {
	JWT_SALT: process.env.JWT_SALT,
};

app.set('config', config);
app.use(requestLogger);
app.use(helmet());
app.use(rateLimiter);

app.get('/crash-test', () => {
	setTimeout(() => {
		throw new Error('Сервер сейчас упадёт');
	}, 0);
});

app.use(userRoutes);

app.use(mailerRoutes);

app.use(calculatorRoutes);

app.use(water_accessoryRoutes);

app.use((req, res, next) => next(new NotFoundError('Страница не найдена')));
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}`);
});
