const jwt = require("jsonwebtoken");
const {
	response_unauthorized,
	response_forbidden,
} = require("../utils/response");
const { User, Role } = require("../models");

module.exports = {
	verifyTokenAndRole: (roles) => {
		return async (req, res, next) => {
			try {
				const authorization = req.headers["authorization"];
				const token = authorization && authorization.split(" ")[1];
				const SECRET_CODE =
					process.env.SECRET_CODE ||
					"$2a$12$2IhwO7z00h24Kv0yzpoHqeMCJfXuS3akwf5w.YzGRQk8g0bsq4UpC";

				if (!token) return response_unauthorized(res, "Unauthorized!");

				const decoded = jwt.verify(token, SECRET_CODE);

				const user = await User.findOne({
					where: { id: decoded.id },
					include: [
						{
							model: Role,
							as: "role",
						},
					],
				});

				// console.log(roles.includes(user.role.name));
				if (roles.includes(user.role.name)) {
					req.locals = decoded;
					next();
				} else {
					response_forbidden(res, "Forbidden!");
				}
			} catch (err) {
				response_forbidden(res, "Forbidden!");
			}
		};
	},
};
