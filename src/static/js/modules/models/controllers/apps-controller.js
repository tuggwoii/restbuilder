'use strict';
module.controller('AppsController', ['$scope', '$timeout', 'ModelService', 'NotificationService',
function ($scope, $timeout, ModelService, NotificationService) {

    $scope.model = {};

    $scope.onLoad = function () {
        $scope.loadModel();
    };

    $scope.loadModel = function () {
        NotificationService.loading();
        ModelService.getAll('apps')
		.success(function (res) {
            $scope.model = res.data;
		}).error(function () {

		}).finally(function () {
            NotificationService.stopLoading();
		});
    };

    $scope.onLoad();

}]);
