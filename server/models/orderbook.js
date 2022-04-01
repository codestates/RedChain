'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class orderbook extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  orderbook.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey:true,
    },
    auctionId: DataTypes.INTEGER,
    bidder: DataTypes.STRING,
    bid: DataTypes.FLOAT,
    createdAt: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'orderbook',
    timestamps: false,
  });
  // orderbook.associate = models => {
    // orderbook.belongsTo(models.users, {foreignKey: "account", sourceKey:"bidder"});
  // }
  return orderbook;
};