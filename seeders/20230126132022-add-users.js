"use strict";

const { hashBcrypt } = require("../utils/bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
		await queryInterface.bulkInsert(
			"Users",
			[
				{
					username: "Administrator",
					email: "admin@lesgo.com",
					password: hashBcrypt("admin123"),
					role_id: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					username: "Administrator 2",
					email: "admin1@lesgo.com",
					password: hashBcrypt("admin123"),
					role_id: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					username: "Bagas",
					email: "bagas@gmail.com",
					password: hashBcrypt("bagas123"),
					role_id: 3,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					username: "Arsya",
					email: "arsya@gmail.com",
					password: hashBcrypt("arsya123"),
					role_id: 3,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{},
		);
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		await queryInterface.bulkDelete("Users", null, {});
	},
};
