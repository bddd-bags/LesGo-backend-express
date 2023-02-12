const { Payment, Company } = require("../models");
const {
	response_internal_server_error,
	response_success,
	response_not_found,
} = require("../utils/response");

class PaymentController {
	static checkPayment = async (req, res) => {
		const { paymentId } = req.params;

		const payment = await Payment.findOne({
			where: { id: paymentId },
		});

		if (!payment) return response_not_found(res, "payment not found!");

		return payment;
	};

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

	static update = async (req, res) => {
		try {
			const { provider_service, account_number, name } = req.body;

			const payment = await this.checkPayment(req, res);

			await payment.update({ provider_service, account_number, name });

			response_success(res, payment);
		} catch (e) {
			response_internal_server_error(res, e.message);
		}
	};

	static delete = async (req, res) => {
		try {
			const payment = await this.checkPayment(req, res);

			await payment.destroy();

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
