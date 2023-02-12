'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
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
			"Profiles",
			[
				{
					user_id: 1,
					age: 21,
					address: "JAKARTA",
					gender: "LAKI-LAKI",
					img: null,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					user_id: 2,
					age: 22,
					address: "JAKARTA",
					gender: "LAKI-LAKI",
					img: null,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					user_id: 3,
					age: 22,
					address: "JAKARTA",
					gender: "LAKI-LAKI",
					img: null,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					user_id: 4,
					age: 22,
					address: "JAKARTA",
					gender: "LAKI-LAKI",
					img: null,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{},
		);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
   await queryInterface.bulkDelete("Profiles", null, {});

  }
};
