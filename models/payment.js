"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Payment extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Payment.belongsTo(models.Company, {
				foreignKey: "company_id",
				as: "company",
			});

			Payment.hasMany(models.UserCourse, {
				foreignKey: "payment_id",
				as: "user_courses",
			});
		}
		toJSON() {
			return { ...this.get(), createdAt: undefined, updatedAt: undefined };
		  }
	}
	Payment.init(
		{
			provider_service: {
				type: DataTypes.STRING,
				validate: {
					notEmpty: {
						msg: "provider_service cannot be empty",
					},
				},
			},
			account_number: {
				type: DataTypes.BIGINT,
				validate: {
					notEmpty: {
						msg: "account_number cannot be empty",
					},
					len: {
						args: [10, 16],
						msg: "account_number are at least 10 to 16 characters long",
					},
				},
			},
			name: {
				type: DataTypes.STRING,
				validate: {
					notEmpty: {
						msg: "name cannot be empty",
					},
				},
			},
			company_id: {
				type: DataTypes.INTEGER,
				validate: {
					notEmpty: {
						msg: "company_id cannot be empty",
					},
				},
			},
		},
		{
			sequelize,
			modelName: "Payment",
			defaultScope: {
			  attributes: {
				exclude: ['createdAt', 'updatedAt']
			  },
			  order: [['createdAt', 'ASC']]
			},
		},
	);
	return Payment;
};
