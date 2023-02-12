'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User, { foreignKey: "user_id", as: "profile" });
    }
  }
  Profile.init({
    age: DataTypes.INTEGER,
    address: DataTypes.STRING,
    gender: DataTypes.STRING,
    img: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Profile',
    defaultScope: {
      attributes: {
      exclude: ['createdAt', 'updatedAt']
      },
      order: [['createdAt', 'ASC']]
    },
  });
  return Profile;
};