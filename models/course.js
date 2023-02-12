"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Course extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Course.belongsTo(models.Company, {
				foreignKey: "company_id",
				as: "company",
			});
			Course.hasMany(models.UserCourse, {
				foreignKey: "course_id",
				as: "user_courses",
			});
		}
	}
	Course.init(
		{
			company_id: DataTypes.INTEGER,
			name: {
				type: DataTypes.STRING,
				validate: {
					len: {
						args: [3],
						msg: "the minimum length of the address is 3 characters",
					},
				},
			},
			description: {
				type: DataTypes.TEXT,
				validate: {
					len: {
						args: [6],
						msg: "the minimum length of the description is 6 characters",
					},
				},
			},
			quota: {
				type: DataTypes.INTEGER,
				validate: {
					notEmpty: {
						msg: "quota cannot be empty!",
					},
				},
			},
			participant: {
				type: DataTypes.INTEGER,
				validate: {
					notEmpty: {
						msg: "participant cannot be empty!",
					},
				},
			},
			start_date: {
				type: DataTypes.STRING,
				validate: {
					notEmpty: {
						msg: "start_date cannot be empty!",
					},
				},
			},
			end_date: {
				type: DataTypes.STRING,
				validate: {
					notEmpty: {
						msg: "end_date cannot be empty!",
					},
				},
			},
			price: {
				type: DataTypes.BIGINT,
				validate: {
					len: {
						args: [1],
						msg: "the minimum length of the price is 1 characters",
					},
				},
			},
			img: {
				type: DataTypes.STRING,
				validate: {
					notEmpty: {
						msg: "img cannot be empty!",
					},
				},
			},
			is_active: { type: DataTypes.BOOLEAN },
		},
		{
			hooks: {
				beforeCreate: (course, option) => {
					course.is_active = true;
					course.participant = 0;
				},
			},
			sequelize,
			modelName: "Course",
			defaultScope: {
				attributes: {
					exclude: ["createdAt", "updatedAt"],
				},
				order: [["createdAt", "ASC"]],
			},
		},
	);
	return Course;
};
