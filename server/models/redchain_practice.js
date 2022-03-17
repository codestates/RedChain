'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class redchain_practice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  redchain_practice.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'redchain_practice',
  });
  return redchain_practice;
};