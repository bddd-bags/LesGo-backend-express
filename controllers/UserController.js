const { User, Role, Profile } = require("../models");
const jwt = require("jsonwebtoken");
const { compareBcrypt } = require("../utils/bcrypt");
const {
	response_created,
	response_internal_server_error,
	response_success,
	response_not_found,
	response_forbidden,
} = require("../utils/response");
const fs = require("fs");
const path = require("path");
const { use } = require("../routes");

class UserController {
	static index = async (req, res) => {
		try {
			const users = await User.findAll({
				include: [
					{
						model: Role,
						as: "role",
					},
					{
						model: Profile,
						as: "profile",
					},
				],
			});
			res.json(users);
		} catch (e) {
			response_internal_server_error(res, e.message);
		}
	};

	static register = async (req, res) => {
		try {
			const { username, email, password } = req.body;
			const user = await User.create({
				username,
				email,
				password,
			});

			const profile = await Profile.create({
				user_id: user.id,
			});

			const response = { ...user.dataValues, profile };

			delete response.password;

			response_created(res, response);
		} catch (e) {
			response_internal_server_error(res, e.message);
		}
	};

	static login = async (req, res) => {
		try {
			const { email, password } = req.body;
			const SECRET_CODE =
				process.env.SECRET_CODE ||
				"$2a$12$2IhwO7z00h24Kv0yzpoHqeMCJfXuS3akwf5w.YzGRQk8g0bsq4UpC";

			const user = await User.findOne({ where: { email } });
			if (!user)
				return response_not_found(res, { message: "email not found!" });

			if (!compareBcrypt(password, user.password))
				return response_forbidden(res, { message: "wrong password!" });

			const payload = {
				id: user.id,
				username: user.username,
				email: user.email,
				role_id: user.role_id,
			};

			const access_token = jwt.sign(payload, SECRET_CODE);

			response_success(res, { access_token, user:user.username, role_id: user.role_id });
		} catch (e) {
			response_internal_server_error(res, e.message);
		}
	};

	static update = async (req, res) => {
		try {
			const { id } = req.locals;
			const { username, password, age, address, gender } = req.body;
			const user = await User.findByPk(id);
			const profile = await Profile.findOne({ where: { user_id: id } });

			user.update({
				username,
				password,
			});

			if (!!req.file) {
				const { filename: img, mimetype } = req.file;
				if (mimetype.split("/")[0] !== "image")
					throw new Error("Your input is not an image!");

				if (!!profile.img) {
					fs.unlinkSync(
						path.join(__dirname, `../public/images/profile/${profile.img}`),
					);
				}

				profile.update({
					img,
				});
			}

			profile.update({
				age,
				address,
				gender,
			});

			response_success(res, { ...user.dataValues, profile });
		} catch (e) {
			response_internal_server_error(res, e.message);
		}
	};

	static delete = async (req, res) => {
		try {
		} catch (e) {
			response_internal_server_error(res, e.message);
		}
	};

	static findOne = async (req, res) => {
		try {
			const { id } = req.params;
			const user = await User.findOne({
				where: { id },
				include: [
					{
						model: Profile,
						as: "profile",
					},
				],
			});

			response_success(res, user);
		} catch (e) {
			response_internal_server_error(res, e.message);
		}
	};

	static getUser = async (req, res) => {
		try {
			const user = await User.findOne({
				where: { id: req.locals.id },
				include: [
					{
						model: Profile,
						as: "profile",
					},
					{
						model: Company,
						as: "companies",
					},
				],
			});

			response_success(res, user);
		} catch (e) {
			response_internal_server_error(res, e.message);
		}
	};
}

module.exports = UserController;
