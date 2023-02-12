const bcrypt = require("bcrypt");
const { SALT = 10 } = process.env;

module.exports = {
	hashBcrypt: (password) => bcrypt.hashSync(String(password), +SALT),
	compareBcrypt: (password, hashPassword) =>
		bcrypt.compareSync(String(password), hashPassword),
};
