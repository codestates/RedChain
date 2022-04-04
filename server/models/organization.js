'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class organization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  organization.init({
    id:{
      type: DataTypes.INTEGER,
      primaryKey:true,
    },
    account: DataTypes.STRING,  //지갑주소
    title: DataTypes.STRING,     //닉네임
    endAt: DataTypes.STRING,    //자기소개
    amount: {                  //기부 금액
      type:DataTypes.INTEGER,
      defaultValue: 0,
    },
  }, {
    sequelize,
    modelName: 'organization',
    timestamps: false,
  });
  organization.associate = models => {
    organization.hasMany(models.campaign, {foreignKey: "organization", sourceKey:"account"});
  }
  return organization;
};