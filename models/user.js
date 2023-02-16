"use strict";
const { hashBcrypt } = require("../utils/bcrypt");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			User.belongsTo(models.Role, { foreignKey: "role_id", as: "role" });
			User.hasOne(models.Profile, { foreignKey: "user_id", as: "profile" });
			User.hasMany(models.Company, { foreignKey: "user_id", as: "companies" });
			User.belongsToMany(models.Company, {
				through: models.UserCourse,
				foreignKey: "user_id",
			});
		}
		toJSON() {
			return { ...this.get(), password: undefined }
		}
	}
	User.init(
		{
			username: {
				type: DataTypes.STRING,
				validate: {
					notEmpty: {
						msg: "username cannot be empty",
					},
				},
			},
			email: {
				type: DataTypes.STRING,
				unique: {
					msg: "email already exist!",
				},
				validate: {
					isEmail: {
						msg: "incorrect email format!",
					},
					notEmpty: {
						msg: "email cannot be empty!",
					},
				},
			},
			password: {
				type: DataTypes.STRING,
				validate: {
					notEmpty: {
						msg: "password cannot be empty",
					},
					len: {
						args: [6, 200],
						msg: "passwords are at least 6 to 200 characters long",
					},
				},
			},
			role_id: DataTypes.INTEGER,
		},
		{
			hooks: {
				beforeCreate: (user, option) => {
					if (!user.password) throw new Error(`field password /"undefined"/`);
					user.password = hashBcrypt(user.password);
					user.role_id = 3;
				},
				// beforeUpdate: (user, option) => {
				// 	user.password = hashBcrypt(user.password);
				// },
			},
			sequelize,
			modelName: "User",
			defaultScope: {
				attributes: {
					exclude: ["createdAt", "updatedAt"],
				},
				order: [["createdAt", "ASC"]],
			},
			scopes: {
				withoutPassword: {
					attributes: {
						exclude: ["password", "createdAt", "updatedAt", "role_id"],
					},
				},
			},
		},
	);
	return User;
};
