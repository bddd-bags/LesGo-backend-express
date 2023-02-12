"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class UserCourse extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			UserCourse.belongsTo(models.Company, { foreignKey: "company_id" });
			UserCourse.belongsTo(models.User, { foreignKey: "user_id" });
			UserCourse.belongsTo(models.Course, {
				foreignKey: "course_id",
				as: "course",
			});
			UserCourse.belongsTo(models.Payment, {
				foreignKey: "payment_id",
				as: "payment",
			});
		}
	}
	UserCourse.init(
		{
			user_id: {
				type: DataTypes.INTEGER,
				notEmpty: {
					msg: "user_id cannot be empty",
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
			course_id: {
				type: DataTypes.INTEGER,
				notEmpty: {
					msg: "course_id cannot be empty",
				},
			},
			payment_id: {
				type: DataTypes.INTEGER,
				notEmpty: {
					msg: "payment_id cannot be empty",
				},
			},
			is_approved: { type: DataTypes.BOOLEAN },
		},
		{
			hooks: {
				beforeCreate: (userCourse, options) => {
					userCourse.is_approved = false;
				},
			},
			sequelize,
			modelName: "UserCourse",
			defaultScope: {
			  attributes: {

				include: ['id'],
				exclude: ['createdAt', 'updatedAt']
			  },
			  order: [['createdAt', 'ASC']]
			},
		},
	);
	return UserCourse;
};
