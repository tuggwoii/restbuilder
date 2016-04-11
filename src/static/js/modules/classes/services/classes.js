'use strict';
module.factory('ClassService', ['$http', 'URLS', function ($http, URLS) {

    return {
        create: function (data) {
            return $http.post(URLS.classes.create, data);
        },
        getAll: function () {
            return $http.get(URLS.classes.getAll);
        },
        get: function (id) {
            return $http.get(URLS.classes.get.replace('{id}', id));
        },
        save: function (model) {
            return $http.post(URLS.classes.get.replace('{id}', model.id), model);
        }
    };
}]);
