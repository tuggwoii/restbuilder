'use strict';
module.factory('AppService', ['$http', '$q', 'URLS', function ($http, $q, URLS) {

    return {
        getAll: function () {
			return $http.get(URLS.model('apps').all);
        },
        create: function (data) {
            console.log(data);
            return $http.post(URLS.model('apps').all, data);
        }
    };
}]);
