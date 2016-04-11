'use strict';
module.controller('ClassDetailController', ['$scope', '$location', 'ClassService', 'NotificationService', function ($scope, $location, ClassService, NotificationService) {

    $scope.model = {
        id: $location['$$search'].name
    };

    $scope.onLoad = function () {
        $scope.loadClasses();
    };

    $scope.loadClasses = function () {
        NotificationService.loading();
        ClassService.get($scope.model.id).success(function (response) {
            $scope.model = response.data;
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

    $scope.save = function (form) {
        angular.forEach(form.$error.required, function (field) {
            field.$setDirty();
        });
        if (form.$valid) {
            NotificationService.loading();
            ClassService.save($scope.model).success(function (response) {
                $scope.state = {};
                window.location.href = '#/class-detail?name=' + response.data.name;
            }).error(function (response, status) {
                $scope.state = {};
                if (status === 400) {
                    $scope.state.exist = true;
                }
                else {
                    var error = {};
                    if (response.error && response.error.message) {
                        error.message = response.error.message;
                    }
                    NotificationService.openDialog(error);
                }
            }).finally(function () {
                NotificationService.stopLoading();
            });
        }
    };

    $scope.addProperty = function () {

    };

    $scope.onLoad();

}]);
