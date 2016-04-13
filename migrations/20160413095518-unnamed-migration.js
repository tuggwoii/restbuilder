'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      queryInterface.createTable(
              'app_roles',
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
                  appId: {
                      type: Sequelize.INTEGER,
                      allowNull: false,
                      references: { model: "apps", key: "id" }
                  },
                  name: {
                      type: Sequelize.STRING,
                      allowNull: false,
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
