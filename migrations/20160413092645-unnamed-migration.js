'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      queryInterface.createTable(
             'apps',
             {
                 id: {
                     type: Sequelize.INTEGER,
                     primaryKey: true,
                     autoIncrement: true
                 },
                 createdAt: {
                     type: Sequelize.DATE,
                     allowNull: false
                 },
                 updatedAt: {
                     type: Sequelize.DATE
                 },
                 public_key: {
                     type: Sequelize.STRING,
                     unique: true,
                     allowNull: false
                 },
                 private_key: {
                     type: Sequelize.STRING,
                     allowNull: false
                 },
                 allow_ips: {
                     type: Sequelize.STRING(4000),
                 },
                 allow_domains: {
                     type: Sequelize.STRING(4000),
                 }
             }).then(function () {
                 console.log('success');
             }).catch(function (err) {
                 console.log(err);
             });
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
