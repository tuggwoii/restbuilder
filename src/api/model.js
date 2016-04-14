'use strict';
var BaseApi = require('./base');
var shortid = require('shortid');
var App = require('../database/models').App;
var User = require('../database/models').User;
var UserApp = require('../database/models').UserApp;
var AppRoles = require('../database/models').AppRoles;
shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');

class AppApi extends BaseApi {

    createModel(data) {
        return {
            name: data.name,
            app_id: data.app_id
        };
    }

    serializerModel(data) {
        if (!data.id) {
            if (data['null']) {
                data['id'] = data['null'];
            }
            else {
                data['id'] = 0;
            }
        }
        var json = JSON.stringify(data);
        var model = JSON.parse(json);
        return model;
    }

    isValid(data) {
        var promise = new Promise(function (resolve, reject) {
            if (!data.name) {
                reject({ message: 'NAME REQUIRED' });
            }
            else {
                resolve();
            }
        });
        return promise;
    }

    getAll(context, req, res) {
        User.findById(req.user.id, {
            include: { model: App }
        }).then(function (data) {
            context.success(req, res, data.apps);
        }).catch(function (err) {
            context.error(req, res, err, 500);
        });
    }

    getAllApps(context, req, res) {
        App.all().then(function (apps) {
            context.success(req, res, apps);
        }).catch(function (err) {
            context.error(req, res, err, 500);
        });
    }

    add (context, req, res) {
        context.isValid(req.body).then(function () {
            var model = context.createModel(req.body);
            App.create(model, { isNewRecord: true }).then(function (_model) {
                context.success(req, res, _model)
            }).catch(function (err) {
                context.error(req, res, err, 500);
            });

        }).catch(function (err) {
            context.error(req, res, err, 400);
        });
    }

    delete (context, req, res) {
        if (req.user.role.id === 1) {
            UserApp.destroy({ where: { app_id: req.params.id } }).then(function () {
                AppRoles.destroy({ where: { app_id: req.params.id } }).then(function () {
                    App.destroy({ where: { id: req.params.id } }).then(function () {
                        context.success(req, res, {});
                    }).catch(function (err) {
                        context.error(req, res, err, 500);
                    });
                }).catch(function (err) {
                    context.error(req, res, err, 500);
                });
            }).catch(function (err) {
                context.error(req, res, err, 500);
            });
        }
        else {
            UserApp.findOne({ where: { app_id: req.params.id, user_id: req.user.id } }).then(function (_appRole) {
                if (_appRole) {
                    var appRole = context.serializerModel(_appRole);
                    AppRoles.findOne({ where: { id: appRole.role_id } }).then(function (_role) {
                        if (_role) {
                            var role = context.serializerModel(_role);
                            if (role.name === 'admin') {
                                UserApp.destroy({ where: { app_id: req.params.id } }).then(function () {
                                    AppRoles.destroy({ where: { app_id: req.params.id } }).then(function () {
                                        App.destroy({ where: { id: req.params.id } }).then(function () {
                                            context.success(req, res, {});
                                        }).catch(function (err) {
                                            context.error(req, res, err, 500);
                                        });
                                    }).catch(function (err) {
                                        context.error(req, res, err, 500);
                                    });
                                }).catch(function (err) {
                                    context.error(req, res, err, 500);
                                });
                            }
                        }
                        else {
                            context.error(req, res, { message: 'USER HAS NO ROLE' }, 400);
                        }
                    }).catch(function (err) {
                        context.error(req, res, err, 500);
                    });
                }
                else {
                    context.error(req, res, { message: 'NOT FOUND' }, 404);
                }
            }).catch(function (err) {
                context.error(req, res, err, 500);
            });
        }
    }

    endpoints() {
        return [
            { url: '/models/all', method: 'get', roles: ['admin'], response: this.getAllApps },
            { url: '/apps', method: 'get', roles: ['admin', 'user'], response: this.getAll },
			{ url: '/apps', method: 'post', roles: ['admin', 'user'], response: this.add },
            { url: '/apps', method: 'delete', roles: ['admin', 'user'], response: this.delete, params: ['id'] }
        ];
    }
}

module.exports = new AppApi();