const { UserCourse, Course, Company } = require("../models");
const {
	response_internal_server_error,
	response_success,
	response_not_found,
	response_bad_request,
} = require("../utils/response");
const { Op } = require("sequelize");

class UserCourseController {
	static index = async (req, res) => {
		try {
			const userCourse = await UserCourse.findAll({
				where: {
					user_id: req.locals.id,
				},
				include: [{
					model: Course,
					as: 'course',
					attributes: ['name', 'start_date', 'end_date'],
				}, {
					model: Company,
					as: 'Company',
					attributes: ['name']

				}]
			});

			response_success(res, userCourse);
		} catch (e) {
			response_internal_server_error(res, e.message);
		}
	};

	static store = async (req, res) => {
		try {
			const { id } = req.locals;
			console.log(id);
			const { company_id, course_id, payment_id } = req.body;
			const findUserCourse = await UserCourse.findOne({
				where: { [Op.and]: [{ company_id }, { course_id }, { user_id: id }] },
			});

			if (Boolean(findUserCourse))
				return response_bad_request(res, "your request is prohibited");

			const course = await Course.findOne({ where: { id: course_id } });

			if (course.quota <= 0) return response_bad_request(res, "quota full");

			const userCourse = await UserCourse.create({
				company_id,
				course_id,
				payment_id,
				user_id: id,
			});

			response_success(res, userCourse);
		} catch (e) {
			response_internal_server_error(res, e.message);
		}
	};

	static update = async (req, res) => {
		try {
			const userCourse = await UserCourse.findOne({
				where: { id: req.params.userCourseId },
			});
			const { is_approved } = req.body;

			if (!userCourse) return response_not_found(res, "user-course not found!");

			const course = await Course.findOne({
				where: { id: userCourse.course_id },
			});

			console.log(course.quota < course.participant);
			if (course.quota <= course.participant)
				return response_bad_request(res, "quota full");
			if (is_approved == 2) {
				course.update({
					participant: course.participant + 1,
				});
			}
			userCourse.update({ is_approved });

			response_success(res, { message: "success to update user-course" });
		} catch (e) {
			response_internal_server_error(res, e.message);
		}
	};

	static delete = async (req, res) => {
		try {
			const userCourse = await UserCourse.destroy({
				where: { id: req.params.userCourseId },
			});

			if (!userCourse) return response_not_found(res, "user-course not found!");

			response_success(res, { message: "deleted!" });
		} catch (e) {
			response_internal_server_error(res, e.message);
		}
	};

	static findOne = async (req, res) => {
		try {
			const userCourse = await UserCourse.findOne({
				where: { id: req.params.userCourseId, user_id: req.locals.id },
			});

			if (!userCourse) return response_not_found(res, "user-course not found!");

			response_success(res, userCourse);
		} catch (e) {
			response_internal_server_error(res, e.message);
		}
	};
}

module.exports = UserCourseController;
