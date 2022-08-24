'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SalesSheets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      station: {
        type: Sequelize.STRING
      },
      town: {
        type: Sequelize.STRING
      },
      clientName: {
        type: Sequelize.STRING
      },
      clientAddress: {
        type: Sequelize.STRING
      },
      cityStateZip: {
        type: Sequelize.STRING
      },
      phoneNumber: {
        type: Sequelize.INTEGER
      },
      authorizedBy: {
        type: Sequelize.STRING
      },
      campaign: {
        type: Sequelize.STRING
      },
      salesRep: {
        type: Sequelize.STRING
      },
      dateSold: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('SalesSheets');
  }
};