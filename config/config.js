require("dotenv").config();
const {
	DATABASE_USERNAME = "postgres",
	DATABASE_PORT = "5432",
	DATABASE_PASSWORD = "admin",
	DATABASE_NAME = "lesgo_final_project",
	DATABASE_HOST = "127.0.0.1",
} = process.env;

module.exports = {
	development: {
		username: DATABASE_USERNAME,
		password: DATABASE_PASSWORD,
		database: DATABASE_NAME + "_development",
		host: DATABASE_HOST,
		port: DATABASE_PORT,
		dialect: "postgres",
	},
	test: {
		username: DATABASE_USERNAME,
		password: DATABASE_PASSWORD,
		database: DATABASE_NAME + "_test",
		host: DATABASE_HOST,
		port: DATABASE_PORT,
		dialect: "postgres",
	},
	production: {
		username: DATABASE_USERNAME,
		password: DATABASE_PASSWORD,
		database: DATABASE_NAME + "_production",
		host: DATABASE_HOST,
		port: DATABASE_PORT,
		dialect: "postgres",
	},
};
