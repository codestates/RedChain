'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sealHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  sealHistory.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    sealId: {                    //토큰주소
      type: DataTypes.STRING
    },
    buyer: {                    //토큰id
      type: DataTypes.INTEGER
    },

  }, {
    sequelize,
    modelName: 'sealHistory',
    timestamp: false,
  });
  return sealHistory;
};