const { celebrate, Joi } = require('celebrate')
const { use } = require('../routes/users')

module.exports.celebrateCreateUser = celebrate({
	body: Joi.object().keys({
		name: Joi.string().required(),
		surname: Joi.string().required(),
		phone: Joi.string().required(),
		email: Joi.string().email().required(),
		address: Joi.string().required(),
		city: Joi.string().required(),
		user_type: Joi.string().required(),
		organization_name: Joi.string().allow(''),
		password: Joi.string().required(),
	}),
})

module.exports.celebrateLoginUser = celebrate({
	body: Joi.object().keys({
		email: Joi.string().email().required(),
		password: Joi.string().required(),
	}),
})

module.exports.celebrateEditUser = celebrate({
	body: Joi.object().keys({
		name: Joi.string().required(),
		surname: Joi.string().required(),
		phone: Joi.string().required(),
		email: Joi.string().email().required(),
		address: Joi.string().required(),
		city: Joi.string().required(),
		user_type: Joi.string().required(),
		organization_name: Joi.string().allow(''),
	}),
})

module.exports.celebrateChangePassword = celebrate({
	body: Joi.object().keys({
		userId: Joi.number().required(),
		oldPassword: Joi.string().required(),
		newPassword: Joi.string().required(),
	}),
})
