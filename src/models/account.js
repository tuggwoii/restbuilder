'use strict';
var bcrypt = require('bcrypt-nodejs');
var Base = require('./base');
var User = require('../database/models').User;
var Role = require('../database/models').Role;
var log = require('../helpers/log');

class Account extends Base {

    hashPassword (password) {
        return bcrypt.hashSync(password);
    }

    comparePassword (password, hash) {
        return bcrypt.compareSync(password, hash);
    }

    find (email) {
        var promise = new Promise(function (resolve, reject) {
            new User({ 'email': email }).fetch()
              .then(function (model) {
                  resolve(model);
              }).catch(reject);
        });
        return promise;
    }

    getWithRole (email) {
        var promise = new Promise(function (resolve, reject) {
            new User({ 'email': email })
                .fetch({ withRelated: ['role'] })
              .then(function (model) {
                  if (model) {
                      var user = model.attributes;
                      if (model.relations.role && model.relations.role.attributes) {
                          user.role = model.relations.role.attributes;
                      }
                      resolve(user);
                  }
                  else {
                      resolve(null);
                  }
              }).catch(reject);
        });
        return promise;
    }

    save (data) {
        var promise = new Promise(function (resolve, reject) {
            new User(data).save().then(function (user) {
                resolve(user);
            }).catch(reject);
        });
        return promise;
    }

    serialize (data) {
        return {
            id: data.id,
            email: data.email,
            first_name: data.first_name,
            last_name: data.last_name,
            role: data.role,
            token: data.token
        };
    }

    serializeAuthen (data) {
        return {
            id: data.id,
            email: data.email,
            first_name: data.first_name,
            last_name: data.last_name,
            role: data.role
        };
    }

    serializeRegister (data) {
        return {
            email: data.email,
            first_name: data.first_name,
            last_name: data.last_name,
            role_id: data.role_id,
            password: data.password
        };
    }

    isValidLogin (data) {
        var me = this;
        var promise = new Promise(function (resolve, reject) {
            if (!data.email) {
                reject('email required');
            }
            else if (!data.password) {
                reject('password required');
            }
            else {
                me.getWithRole(data.email).then(function (user) {
                    if (user) {
                        if (me.comparePassword(data.password, user.password)) {
                            resolve(user);
                        }
                        else {
                            reject('invalid email or password');
                        }
                    }
                    else {
                        reject('invalid email or password');
                    }
                }).catch(function (err) {
                    log.file(err.message);
                    reject(err.message);
                });
            }
        });
        return promise;
    }

    isValidRegister (data) {
        var me = this;
        var promise = new Promise(function (resolve, reject) {
            if (!data.email) {
                reject('email required');
            }
            else if (!data.password) {
                reject('password required');
            }
            else if (!data.first_name) {
                reject('first name required');
            }
            else if (!data.last_name) {
                reject('last name required');
            }
            else {
                me.find(data.email).then(function (user) {
                    if (user) {
                        reject('email exist');
                    }
                    else {
                        new Role({ 'name': 'user' }).fetch().then(function (role) {
                            if (role && role.attributes) {
                                data.password = me.hashPassword(data.password);
                                data.role_id = role.attributes.id;
                                user = me.serializeRegister(data);
                                resolve(user);
                            }
                            else {
                                log.file('user role not found');
                                reject('role not found');
                            }
                        }).catch(reject);
                    }
                }).catch(function (err) {
                    log.file(err.message);
                    reject(err);
                });
            }
        });
        return promise;
    }
}

module.exports = new Account();
