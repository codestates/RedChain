'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class seal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  seal.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    tokenAddress: {                    //토큰주소
      type: DataTypes.STRING
    },
    tokenId: {                    //토큰id
      type: DataTypes.INTEGER
    },
    tokenURI: {
      type: DataTypes.STRING          //토큰 URI
    },
    amount: {                         //토큰 잔액
      type: DataTypes.INTEGER
    },
    price: {
      type: DataTypes.INTEGER        // 토큰 가격
    }
  }, {
    sequelize,
    modelName: 'seal',
    timestamp: false,
  });
  return seal;
};