var signInController = function($scope, $http) {
    $scope.showOption = {
        signIn: true,
        signUp: false,
        forgotPassword: false
    }

    $scope.switchWindow = function(option){
        angular.forEach($scope.showOption, function(value, key) {
            if(key == option){
                $scope.showOption[key] = true;
            }else{
                $scope.showOption[key] = false;
            }
        });
    }
};


var bookingModule = angular.module("signInModule", []);
bookingModule.controller("signInController", signInController);