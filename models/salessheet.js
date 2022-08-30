'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class SalesSheet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SalesSheet.init(
    {
      station: DataTypes.STRING,
      town: DataTypes.STRING,
      clientName: DataTypes.STRING,
      clientAddress: DataTypes.STRING,
      cityStateZip: DataTypes.STRING,
      phoneNumber: DataTypes.INTEGER,
      authorizedBy: DataTypes.STRING,
      campaign: DataTypes.STRING,
      salesRep: DataTypes.STRING,
      dateSold: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'SalesSheet',
      tableName: 'salessheets'
    }
  )
  return SalesSheet
}
