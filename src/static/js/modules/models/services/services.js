'use strict';
module.factory('ModelService', ['$http', '$q', 'URLS', function ($http, $q, URLS) {

    return {
        getAll: function (model) {
			return $http.get(URLS.model(model).all);
		}
    };
}]);
