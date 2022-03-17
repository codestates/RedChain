'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class offer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  offer.init({
    from: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    endtime: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'offer',
  });
  return offer;
};