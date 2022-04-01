'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class auctionlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  auctionlist.init({
    id:{
      type: DataTypes.INTEGER,
      primaryKey:true,
    },
    contributor: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    tokenAddress: { 
      type: DataTypes.STRING,
      allowNull:false,
    },
    tokenId : {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tokenURI: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    auctionAddress: {
      type: DataTypes.STRING,
    },
    startAt: DataTypes.STRING,
    endAt: DataTypes.STRING,
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    sequelize,
    modelName: 'auctionlist',
    timestamps: false,
  });
  auctionlist.associate = models => {
    auctionlist.hasMany(models.orderbook, {foreignKey: "auctionId", sourceKey:"id"});
  }
  return auctionlist;
};