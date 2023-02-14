const { Course, UserCourse, Company, User, Payment } = require("../models");
const {
	response_internal_server_error,
	response_success,
	response_created,
	response_not_found,
} = require("../utils/response");
const fs = require("fs");
const path = require("path");
const { Op } = require("sequelize");

class CourseController {
	static indexPartner = async (req, res) => {
		try {
			const company = await Company.findOne({
				where: {
					user_id: req.locals.id,
				},
			});
			const courses = await Course.findAll({
				where: { company_id: company.id },
				include: [
					{
						model: UserCourse,
						as: "user_courses",
					},
				],
			});

			response_success(res, courses);
		} catch (e) {
			response_internal_server_error(res, e.message);
		}
	};

	static courseActive = async (req, res) => {
		try {
			const courses = await Course.findAll({
				where: { is_active: true },
				include: [
					{
						model: Company,
						as: "company",
						where: { is_approved: true },
					},
				],
			});

			response_success(res, courses);
		} catch (e) {
			response_internal_server_error(res, e.message);
		}
	};

	static indexUser = async (req, res) => {
		try {
			const courses = await Course.findAll();

			response_success(res, courses);
		} catch (e) {
			response_internal_server_error(res, e.message);
		}
	};

	static getUserCourses = async (req, res) => {
		try {
			// const user_courses = await UserCourse.findAll({
			// 	include: [
			// 		{ model: User.scope('withoutPassword'), as: "User" },
			// 	],
			// 	where: {
			// 		course_id: req.params.courseId
			// 	}
			// });

			const courses = await Course.findByPk(req.params.courseId, {
				include: [
					{
						model: UserCourse,
						as: "user_courses",
						include: [
							{ model: User.scope("withoutPassword"), as: "User" },
							{ model: Payment, as: "payment" },
						],
					},
					{ model: Company, as: "company" },
				],
			});

			response_success(res, courses);
		} catch (e) {
			response_internal_server_error(res, e.message);
		}
	};

	static store = async (req, res) => {
		try {
			const {
				company_id,
				name,
				description,
				quota,
				start_date,
				end_date,
				price,
			} = req.body;

			if (!req.file) throw new Error("Please input a image!");

			const { filename, mimetype } = req.file;
			// if (mimetype.split("/")[0] !== "image")
			// 	throw new Error("Your input is not an image!");

			const course = await Course.create({
				company_id,
				name,
				description,
				quota,
				start_date,
				end_date,
				price,
				img: filename,
			});

			response_created(res, course);
		} catch (e) {
			response_internal_server_error(res, e);
		}
	};

	static update = async (req, res) => {
		try {
			const { courseId } = req.params;
			const {
				name,
				description,
				quota,
				start_date,
				end_date,
				price,
				is_active,
			} = req.body;
			const course = await Course.findByPk(courseId);

			if (!course) return response_not_found(res, "course not found!");

			if (!!req.file) {
				const { filename: img, mimetype } = req.file;

				if (mimetype.split("/")[0] !== "image")
					throw new Error("Your input is not an image!");

				fs.unlinkSync(
					path.join(__dirname, `../public/images/course/${course.img}`),
				);

				course.update({
					img,
				});
			}

			course.update({
				is_active,
				name,
				description,
				quota,
				start_date,
				end_date,
				price,
			});

			response_success(res, { message: "course has been updated" });
		} catch (e) {
			response_internal_server_error(res, e.message);
		}
	};

	static delete = async (req, res) => {
		try {
			const { courseId } = req.params;

			const course = await Course.findByPk(courseId);

			if (!course) return response_not_found(res, "course not found!");

			course.destroy();

			response_success(res, { message: "course has been deleted" });
		} catch (e) {
			response_internal_server_error(res, e.message);
		}
	};

	static findOne = async (req, res) => {
		try {
			const { courseId } = req.params;

			const course = await Course.findByPk(courseId, {
				include: [
					{
						model: Company,
						as: "company",
						include: [{ model: Payment, as: "payments" }],
					},
				],
			});

			if (!course) return response_not_found(res, "course not found!");

			response_success(res, course);
		} catch (e) {
			response_internal_server_error(res, e.message);
		}
	};
}

module.exports = CourseController;
