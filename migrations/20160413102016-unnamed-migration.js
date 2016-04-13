'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      queryInterface.createTable(
                   'users_apps',
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
                       userId: {
                           type: Sequelize.INTEGER,
                           allowNull: false,
                           references: { model: "users", key: "id" }
                       },
                       appId: {
                           type: Sequelize.INTEGER,
                           allowNull: false,
                           references: { model: "apps", key: "id" }
                       },
                       roleId: {
                           type: Sequelize.INTEGER,
                           allowNull: false,
                           references: { model: "app_roles", key: "id" }
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
