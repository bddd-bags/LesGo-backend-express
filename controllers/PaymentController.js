const { Payment, Company, Course, UserCourse } = require("../models");
const {
	response_internal_server_error,
	response_success,
	response_not_found,
} = require("../utils/response");

class PaymentController {
	static index = async (req, res) => {
		try {
			const payments = await Payment.findAll({
				where: { company_id: req.params.companyId },
			});

			response_success(res, payments);
		} catch (e) {
			response_internal_server_error(res, e.message);
		}
	};

	static getPaymentCompany = async (req, res) => {
		try {
			const company = await Company.findOne({
				where: {
					user_id: req.locals.id
				}
			})
			const payments = await Payment.findAll({
				where: { company_id: company.id },
			});

			response_success(res, payments);
		} catch (e) {
			response_internal_server_error(res, e.message);
		}
	};

	static store = async (req, res) => {
		try {
			const { id } = req.locals;
			const { provider_service, account_number, name, company_id } = req.body;

			const company = await Company.findOne({
				where: { id: company_id, user_id: id },
			});

			if (!company) return response_not_found(res, "company not found!");

			const payment = await Payment.create({
				provider_service,
				account_number,
				name,
				company_id: company.id,
			});

			response_success(res, payment);
		} catch (e) {
			response_internal_server_error(res, e.message);
		}
	};


	static paymentDetail = async (req, res) => {
		try {
			const userCourse = await UserCourse.findOne({
				where: { id: req.params.userCourseId, user_id: req.locals.id },
				include: [{
					model: Course,
					as: 'course',
					attributes: ['description', 'price', 'start_date', 'end_date'],
				}, {
					model: Company,
					as: 'Company',
					attributes: ['name']

				}, {
					model: Payment,
					as: 'payment',
					attributes: ['name', 'provider_service', 'account_number']

				},]
			});

			if (!userCourse) return response_not_found(res, "user-course not found!");

			response_success(res, userCourse);
		} catch (e) {
			response_internal_server_error(res, e.message);
		}
	};

	static pay = async (req, res) => {
		try {
			const userCourse = await UserCourse.findOne({
				where: { id: req.params.userCourseId },
			});

			if (!userCourse) return response_not_found(res, "user-course not found!");

			const course = await Course.findOne({
				where: { id: userCourse.course_id },
			});

			if (course.quota <= 0) return response_bad_request(res, "quota full");

			course.update({
				quota: course.quota - 1,
			});

			userCourse.update({ is_approved: 1 });

			response_success(res, { message: "success to update user-course" });
		} catch (e) {
			response_internal_server_error(res, e.message);
		}
	};

	static update = async (req, res) => {
		try {
			const { provider_service, account_number, name } = req.body;

			const { paymentId } = req.params;

			const payment = await Payment.findOne({
				where: { id: paymentId },
			});

			if (!payment) return response_not_found(res, "payment not found!");

			payment.update({ provider_service, account_number, name });

			response_success(res, payment);
		} catch (e) {
			response_internal_server_error(res, e.message);
		}
	};

	static delete = async (req, res) => {
		try {
			const { paymentId } = req.params;

			const payment = await Payment.findOne({
				where: { id: paymentId },
			});

			if (!payment) return response_not_found(res, "payment not found!");

			payment.destroy();

			response_success(res, { message: "deleted!" });
		} catch (e) {
			response_internal_server_error(res, e.message);
		}
	};

	static findOne = async (req, res) => {
		try {
			const payment = await Payment.findOne({
				where: { id: req.params.paymentId },
			});

			if (!payment) return response_not_found(res, "payment not found!");

			response_success(res, payment);
		} catch (e) {
			response_internal_server_error(res, e.message);
		}
	};
}

module.exports = PaymentController;
