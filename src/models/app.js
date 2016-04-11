'use strict';
var Base = require('./base');
var User = require('../database/models').User;
var App = require('../database/models').App;

class Apps extends Base {

    isExist (appName) {

    }

    create (data) {
        var promise = new Promise(function (resolve, reject) {
            new App(data).save().then(function (response) {
                var app = response.attributes;
                var userApp = {
                    user_id: app.owner,
                    app_id: app.id
                };
                Knex.insert(userApp).into('apps_users')
				.returning('*')
				.then(function () {
                    resolve(app);
				}).catch(reject);
            }).catch(reject);
        });
        return promise;
    }

    get (id) {


    }

    getAll (id) {
        var promise = new Promise(function (resolve, reject) {
            new User({ 'id': id })
                .fetch({ withRelated: ['apps'] })
              .then(function (apps) {
                  if (apps.relations.apps && apps.relations.apps.length) {
                      resolve(apps.relations.apps);
                  }
                  else {
                      resolve(null);
                  }
              }).catch(reject);
        });
        return promise;

    }

    save (data) {

    }

    isValid (data) {
        var promise = new Promise(function (resolve, reject) {
            if (!data.name) {
                reject('name is required.');
            }
            else {
                resolve(true);
            }
        });
        return promise;
    }

    serialize (data) {
        return data;
    }

    serializeList (data) {
        return data;
    }
}

module.exports = new Apps();
