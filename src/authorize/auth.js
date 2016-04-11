'use strict';
var crypto = require('crypto');
var tokenSession = [];
var userSession = [];
var Account = require('../models/account');

function generateToken () {
    var promise = new Promise(function (resolve, reject) {
        crypto.randomBytes(16, function (err, buf) {
            if (err) reject(err);
            var token = buf.toString('hex');
            resolve(token);
        });
    });
    return promise;
}

exports.getUser = function (token) {
    if (tokenSession[token]) {
        return tokenSession[token];
    }
    else {
        return null;
    }
};

exports.authorizeUser = function (user) {
    var promise = new Promise(function (resolve, reject) {
        generateToken().then(function (token) {
            if (userSession[user.id]) {
                delete tokenSession[userSession[user.id]];
            }
            tokenSession[token] = Account.serializeAuthen(user);
            userSession[user.id] = token;
            resolve(token);
        }).catch(function (err) {
            reject(err);
        });
    });
    return promise;
};

exports.removeUser = function (user) {
    var promise = new Promise(function (resolve, reject) {
        if (userSession[user.id]) {
            var token = userSession[user.id];
            delete tokenSession[token];
            delete userSession[user.id];
            resolve();
        }
        else {
            reject('session not found');
        }
    });
    return promise;
};

exports.isAuthorize = function (request, roles) {
    var token = request.headers['authorization'];
    if (!token) {
        return false;
    }
    var user = tokenSession[token];
    request.user = user;
    if (!user) {
        return false;
    }
    return roles.indexOf(user.role.name) > -1;
};
