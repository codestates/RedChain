'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init({
    id:{
      type: DataTypes.INTEGER,
      primaryKey:true,
    },
    account: DataTypes.STRING,  //지갑주소
    name: DataTypes.STRING,     //닉네임
    about: DataTypes.STRING,    //자기소개
    donation: {                  //기부 금액
      type:DataTypes.INTEGER,
      defaultValue: 0,
    },
    profileimg: DataTypes.STRING//이미지파일
  }, {
    sequelize,
    modelName: 'user',
    timestamps: false,
  });
  return user;
};