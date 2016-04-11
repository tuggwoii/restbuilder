'use strict';
module.factory('URLS', function () {
    var base = '/api/v1/';
    var models = ['classes', 'apps'];
    var endpoints = {
        ui: {
            nav: base + 'backend/navigations'
        },
        accounts: {
            login: base + 'accounts/login',
            register: base + 'accounts/register',
            me: base + 'accounts/me',
            logout: base + 'accounts/logout'
        },
        strings: '/resources/strings.json'
    };

    function modelEndpoints (model) {
        return {
            all: base + model,
            one: base + model + '/{id}'
        };
    }

    return {
        model: function (model) {
            if (models.indexOf(model) > -1) {
                return modelEndpoints(model);
            }
            else {
                return endpoints[model];
            }
        }
    };
});
