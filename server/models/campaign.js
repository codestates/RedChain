'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class campaign extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  campaign.init({
    id:{
      type: DataTypes.INTEGER,
      primaryKey:true,
    },
    contract: DataTypes.STRING,
    organization: DataTypes.STRING,  //지갑주소
    title: DataTypes.STRING,     //캠페인이름
    goal: DataTypes.INTEGER,      //목표금액
    amount: {                  //현재 모금액
      type:DataTypes.INTEGER,
      defaultValue: 0,
    },
    endAt: DataTypes.STRING,    // 종료날짜
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    sequelize,
    modelName: 'campaign',
  });
 
  return campaign;
};