﻿'use strict';
module.factory('NotificationService', ['$rootScope', '$timeout', function ($rootScope, $timeout) {
    return {
        loading: function () {
            $rootScope.$broadcast('Loading');
        },
        stopLoading: function () {
            $rootScope.$broadcast('StopLoading');
            $rootScope.$broadcast('Ready');
        },
        openDialog: function (model) {
            $timeout(function () {
                $rootScope.$broadcast('OpenDialog', model);
            }, 1000);
        }
    };
}]);
