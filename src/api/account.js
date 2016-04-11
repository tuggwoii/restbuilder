'use strict';
var BaseApi = require('./base');
var Account = require('../models/account');
var authorize = require('../authorize/auth');
var log = require('../helpers/log');

class AccountApi extends BaseApi {

    login (context, request, response) {
        var data = request.body;
        Account.isValidLogin(data).then(function (user) {
            authorize.authorizeUser(user).then(function (token) {
                user.token = token;
                context.success(response, user);
            }).catch(function (err) {
                log.file(err.message);
                context.error(response, 'Internal server error', 500);
            });
        }).catch(function (err) {
            context.error(response, err, 400);
        });
    }

    register (context, request, response) {
        var data = request.body;
        Account.isValidRegister(data).then(function (model) {
            Account.save(model).then(function (user) {
                if (user && user.attributes) {
                    Account.getWithRole(user.attributes.email).then(function (userWithRole) {
                        authorize.authorizeUser(userWithRole).then(function (token) {
                            userWithRole.token = token;
                            context.success(response, userWithRole);
                        }).catch(function (err) {
                            log.file(err.message);
                            context.error(response, 'Internal server error', 500);
                        });
                    }).catch(function (err) {
                        log.file(err.message);
                        context.error(response, 'Internal server error', 500);
                    });
                }
                else {
                    log.file('create user fail for data -- ' + JSON.stringify(data));
                    context.error(response, 'Internal server error', 500);
                }
            }).catch(function (err) {
                log.file(err.message + ', data' + JSON.stringify(data));
                context.error(response, 'Internal server error', 500);
            });
        }).catch(function (err) {
            log.file(err.message + ', data' + JSON.stringify(data));
            context.error(response, err, 400);
        });
    }

    logout (context, request, response) {
        var user = request.user;
        if (user && user.email) {
            authorize.removeUser(user).then(function () {
                response.status(200).json({});
            }).catch(function (err) {
                log.file(err.message);
                context.error(response, 'Internal server error', 500);
            });
        }
        else {
            context.error(response, 'session not found', 400);
        }
    }

    me (context, request, response) {
        context.success(response, request.user);
    }

    endpoints () {
        return [
			{ url: '/accounts/login', method: 'post', roles: [], response: this.login },
            { url: '/accounts/register', method: 'post', roles: [], response: this.register },
            { url: '/accounts/me', method: 'get', roles: ['admin', 'user'], response: this.me },
            { url: '/accounts/logout', method: 'post', roles: ['admin', 'user'], response: this.logout }
        ];
    }
}

module.exports = new AccountApi(Account.serialize);
