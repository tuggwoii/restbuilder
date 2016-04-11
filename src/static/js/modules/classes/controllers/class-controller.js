'use strict';
module.controller('ClassController', ['$scope', 'ClassService', 'NotificationService', function ($scope, ClassService, NotificationService) {

	$scope.model = {};
	$scope.classes = [];
	$scope.state = {};

	$scope.onLoad = function () {
		$scope.loadClasses();
	};

	$scope.loadClasses = function () {
		NotificationService.loading();
        ClassService.getAll().success(function (response) {
            $scope.classes = response.data;
        }).error(function (response) {
            var error = {};
            if (response.error && response.error.message) {
                error.message = response.error.message;
            }
            NotificationService.openDialog(error);
        }).finally(function () {
            NotificationService.stopLoading();
        });
    };

    $scope.createClass = function (form) {
        angular.forEach(form.$error.required, function (field) {
            field.$setDirty();
        });
        if (form.$valid) {
        NotificationService.loading();
            ClassService.create($scope.model).success(function (response) {
                $scope.state = {};
                window.location.href = '#/class-detail?name=' + response.data.name;
            }).error(function (res, status) {
                $scope.state = {};
                if (status === 400) {
                    $scope.state.exist = true;
                }
                else {
                    $scope.state.error = true;
                }
            }).finally(function () {
                NotificationService.stopLoading();
            });
        }
	};

	$scope.onLoad();

}]);
