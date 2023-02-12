"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Company extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Company.belongsTo(models.User, {
				foreignKey: "user_id",
				as: "user",
			});

			Company.hasMany(models.Payment, {
				foreignKey: "company_id",
				as: "payments",
			});

			Company.hasMany(models.Course, {
				foreignKey: "company_id",
				as: "courses",
			});

			Company.belongsToMany(models.User, {
				through: models.UserCourse,
				foreignKey: "company_id",
			});
		}
	}
	Company.init(
		{
			name: {
				type: DataTypes.STRING,
				validate: {
					notEmpty: {
						msg: "name company cannot be empty!",
					},
				},
			},
			description: {
				type: DataTypes.TEXT,
				validate: {
					notEmpty: {
						msg: "description company cannot be empty!",
					},
				},
			},
			address: {
				type: DataTypes.STRING,
				validate: {
					notEmpty: {
						msg: "address company cannot be empty!",
					},
					len: {
						args: [3],
						msg: "the minimum length of the address is 3 characters",
					},
				},
			},
			phone: {
				type: DataTypes.BIGINT,
				validate: {
					notEmpty: {
						msg: "phone company cannot be empty!",
					},
					len: {
						args: [10, 14],
						msg: "phone number are at least 10 to 14 characters long",
					},
				},
			},
			img: {
				type: DataTypes.STRING,
				validate: {
					notEmpty: {
						msg: "image company cannot be empty!",
					},
				},
			},
			user_id: DataTypes.INTEGER,
			is_approved: DataTypes.BOOLEAN,
		},
		{
			hooks: {
				beforeCreate: (company, options) => {
					company.is_approved = false;
				},
			},
			sequelize,
			modelName: "Company",
			defaultScope: {
				// attributes: {
				// exclude: ['createdAt', 'updatedAt']
				// },
				order: [["createdAt", "ASC"]],
			},
		},
	);
	return Company;
};
