'use strict';
var BaseApi = require('./base');
var Classes = require('../models/class');
var log = require('../helpers/log');

class ClassesApi extends BaseApi {

    create (context, request, response) {
        var data = request.body;
        if (Classes.isValid(data)) {
            data.created_by = request.user;
            data.updated_by = request.user;
            Classes.create(data).then(function (obj) {
                context.success(response, obj);
            }).catch(function (err) {
                if (err === 'exist') {
                    context.error(response, 'Model exist', 400);
                }
                else {
                    context.error(response, 'Internal server error', 500);
                    log.file(err.message);
                }
            });
        }
        else {
            context.error(response, 'Class is invalid model', 400);
        }
    }

    getAll (context, request, response) {
        Classes.getAll().then(function (obj) {
            context.success(response, obj, Classes.serializeList);
        }).catch(function (err) {
            context.error(response, 'Internal server error', 500);
            log.file(err.message);
        });
    }

    get (context, request, response) {
        Classes.get(request.params['id']).then(function (obj) {
            context.success(response, obj);
        }).catch(function (err) {
            if (err === 404) {
                context.error(response, 'not found', 404);
            }
            else {
                context.error(response, 'Internal server error', 500);
                log.file(err.message);
            }
        });
    }

    endpoints () {
        return [
			{ url: '/classes', method: 'post', roles: ['admin'], response: this.create },
            { url: '/classes', method: 'get', roles: ['admin'], response: this.getAll },
            { url: '/classes', method: 'get', roles: ['admin'], response: this.get, params: ['id'] }
        ];
    }
}

module.exports = new ClassesApi(Classes.serialize);