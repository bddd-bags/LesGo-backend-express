const {
	response_internal_server_error,
	response_success,
	response_created,
	response_not_found,
} = require("../utils/response");
const { Company, User, Role, Payment, Course } = require("../models");
const fs = require("fs");
const path = require("path");
class CompanyController {
	static index = async (req, res) => {
		try {
			const companies = await Company.findAll();

			response_success(res, companies);
		} catch (e) {
			response_internal_server_error(res, e.message);
		}
	};

	static indexByUserId = async (req, res) => {
		try {
			console.log(req.locals.id);
			const companies = await Company.findOne({
				where: { user_id: req.locals.id },
				include: [
					{ model: Payment, as: "payments" },
					{ model: Course, as: "courses" },
				],
			});
			response_success(res, companies);
		} catch (error) {
			response_internal_server_error(res, error.message);
		}
	};

	static store = async (req, res) => {
		try {
			const { name, description, address, phone } = req.body;

			if (!req.file) throw new Error("Please input a image!");

			const { filename, mimetype } = req.file;
			if (mimetype.split("/")[0] !== "image")
				throw new Error("Your input is not an image!");

			const company = await Company.create({
				name,
				description,
				address,
				phone,
				img: filename,
				user_id: req.locals.id,
			});

			response_created(res, company);
		} catch (e) {
			response_internal_server_error(res, e.message);
		}
	};

	static update = async (req, res) => {
		try {
			const { companyId } = req.params;
			const { id } = req.locals;
			const { name, description, address, is_approved, phone } = req.body;
			const company = await Company.findOne({ where: { id: companyId } });
			const user = await User.findOne({
				where: { id },
				include: [{ model: Role, as: "role" }],
			});

			if (!company) return response_not_found(res, "company not found!");

			if (user.role.name === "ADMIN") {
				await User.update({ role_id: 2 }, { where: { id: company.user_id } });
				company.update({ is_approved });
			}

			if (!!req.file) {
				const { filename, mimetype } = req.file;

				if (mimetype.split("/")[0] !== "image")
					throw new Error("Your input is not an image!");

				fs.unlinkSync(
					path.join(__dirname, `../public/images/company/${company.img}`),
				);

				company.update({ img: filename });
			}

			company.update({ name, description, address, phone });

			response_success(res, company);
		} catch (e) {
			response_internal_server_error(res, e.message);
		}
	};

	static delete = async (req, res) => {
		try {
			const { companyId } = req.params;

			const company = await Company.findByPk(companyId);

			if (!company) return response_not_found(res, "company not found!");

			company.destroy();

			response_success(res, { message: "deleted!" });
		} catch (e) {
			response_internal_server_error(res, e.message);
		}
	};

	static findOne = async (req, res) => {
		try {
			console.log(req.params.companyId);
			const company = await Company.findOne({
				where: { id: req.params.companyId },
				include: [
					{
						model: Payment,
						as: "payments",
					},
					{
						model: Course,
						as: "courses",
					},
				],
			});

			response_success(res, company);
		} catch (e) {
			response_internal_server_error(res, e.message);
		}
	};
}

module.exports = CompanyController;
