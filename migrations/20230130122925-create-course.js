"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Courses", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			company_id: {
				type: Sequelize.INTEGER,
			},
			name: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			description: {
				type: Sequelize.TEXT,
			},
			quota: {
				type: Sequelize.INTEGER,
			},
			participant: {
				type: Sequelize.INTEGER,
			},
			start_date: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			end_date: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			price: {
				allowNull: false,
				type: Sequelize.BIGINT,
			},
			img: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			is_active: {
				allowNull: false,
				type: Sequelize.BOOLEAN,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Courses");
	},
};
