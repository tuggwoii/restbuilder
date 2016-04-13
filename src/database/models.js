'use strict';
var Sequelize = require('sequelize');
var sequelize = require('./connection');

var User = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        field: 'id'
    },
    email: {
        type: Sequelize.STRING,
        field: 'email'
    },
    password: {
        type: Sequelize.STRING,
        field: 'password'
    },
    first_name: {
        type: Sequelize.STRING,
        field: 'first_name'
    },
    last_name: {
        type: Sequelize.STRING,
        field: 'last_name'
    },
    user_role: {
        type: Sequelize.INTEGER,
        field: 'roleId'
    },
    createdAt: {
        type: Sequelize.DATE,
        field: 'createdAt'
    },
    updatedAt: {
        type: Sequelize.DATE,
        field: 'updatedAt'
    }
}, {
    freezeTableName: true
});

var Role = sequelize.define('roles', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        field: 'id'
    },
    name: {
        type: Sequelize.STRING,
        field: 'name'
    },
    createdAt: {
        type: Sequelize.DATE,
        field: 'createdAt'
    },
    updatedAt: {
        type: Sequelize.DATE,
        field: 'updatedAt'
    }
});

var UserApp = sequelize.define('users_apps', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        field: 'id'
    },
    user_id: {
        type: Sequelize.INTEGER,
        field: 'userId'
    },
    app_id: {
        type: Sequelize.INTEGER,
        field: 'appId'
    },
    role_id: {
        type: Sequelize.INTEGER,
        field: 'roleId'
    },
    createdAt: {
        type: Sequelize.DATE,
        field: 'createdAt'
    },
    updatedAt: {
        type: Sequelize.DATE,
        field: 'updatedAt'
    }
}, {
    freezeTableName: true
});


var App = sequelize.define('apps', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        field: 'id'
    },
    name: {
        type: Sequelize.STRING,
        field: 'name'
    },
    public_key: {
        type: Sequelize.STRING,
        field: 'public_key'
    },
    private_key: {
        type: Sequelize.STRING,
        field: 'private_key'
    },
    createdAt: {
        type: Sequelize.DATE,
        field: 'createdAt'
    },
    updatedAt: {
        type: Sequelize.DATE,
        field: 'updatedAt'
    }
}, {
    freezeTableName: true
});

var AppRoles = sequelize.define('app_roles', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        field: 'id'
    },
    app_id: {
        type: Sequelize.INTEGER,
        field: 'appId'
    },
    createdAt: {
        type: Sequelize.DATE,
        field: 'createdAt'
    },
    updatedAt: {
        type: Sequelize.DATE,
        field: 'updatedAt'
    },
    name: {
        type: Sequelize.STRING,
        field: 'name'
    }
}, {
    freezeTableName: true
});

User.belongsTo(Role, { foreignKey: 'user_role' });
AppRoles.belongsTo(App, { foreignKey: 'app_id' });
App.belongsToMany(User, { through: 'users_apps' });
User.belongsToMany(App, { through: 'users_apps' });

exports.User = User;
exports.Role = Role;
exports.App = App;
exports.AppRoles = AppRoles;
exports.UserApp = UserApp;