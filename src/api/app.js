'use strict';
var BaseApi = require('./base');
var shortid = require('shortid');
var Apps = require('../models/app');
var Log = require('../helpers/log');

class AppApi extends BaseApi {

    create (context, request, response) {
        var data = request.body;
        Apps.isValid(data).then(function () {
            data.public_key = shortid.generate();
            data.owner = request.user.id;
            data.created_by = request.user.id;
            data.updated_by = request.user.id;
            data.created_datetime = new Date();
            data.updated_datetime = new Date();
            Apps.create(data).then(function (app) {
                context.success(response, app);
            }).catch(function (err) {
                Log.file(err.message + ', data: ' + JSON.stringify(data));
                context.error(response, 'Internal server error', 500);
            });

        }).catch(function (err) {
            Log.file(err.message + ', data: ' + JSON.stringify(data));
            context.error(response, 'Invalid model', 400);
        });
    }

    getAll (context, request, response) {
        Apps.getAll(request.user.id).then(function (res) {
            context.success(response, res);
        }).catch(function (err) {
            context.error(response, err, 500);
        });
    }

    get (context, request, response) {
        context.success(response, { r: 'get one' });
    }

    endpoints () {
        return [
			{ url: '/apps', method: 'post', roles: ['admin', 'user'], response: this.create },
            { url: '/apps', method: 'get', roles: ['admin', 'user'], response: this.getAll },
            { url: '/apps', method: 'get', roles: ['admin', 'user'], response: this.get, params: ['id'] }
        ];
    }
}

module.exports = new AppApi(Apps.serialize);