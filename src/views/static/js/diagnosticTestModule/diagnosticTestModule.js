/**
 * Created by siddhartha on 14/8/17 at 09:56 PM.
 */

var diagnosticLabId = '59744253c9aebe1254fd409b';

var diagnosticTestController = function($scope, $http, DTOptionsBuilder, DTColumnDefBuilder) {
    $scope.diagnosticTestList = [];
    $scope.dtOptions = DTOptionsBuilder.newOptions();

    $scope.dtColumnDefs = [
        DTColumnDefBuilder.newColumnDef(0),
        DTColumnDefBuilder.newColumnDef(1),
        DTColumnDefBuilder.newColumnDef(2),
        DTColumnDefBuilder.newColumnDef(3),
        DTColumnDefBuilder.newColumnDef(4),
        DTColumnDefBuilder.newColumnDef(5),
        DTColumnDefBuilder.newColumnDef(6),
        DTColumnDefBuilder.newColumnDef(7),
        DTColumnDefBuilder.newColumnDef(8)
    ];

    $scope.substring = function(data, n) {
        return data.substring(0, n);
    };
    $scope.showMore = function(index) {
        $scope.diagnosticTestList[index]['showFullDesc'] = true;
    };
    $scope.showLess = function(index) {
        delete $scope.diagnosticTestList[index]['showFullDesc'];
    };

    $scope.joinStr = function(data, delimeter) {
        var d = angular.copy(data);
        if(d.length == 1)
            return d.toString();
        else if(d.length == 2)
            return d.join(' & ');
        else {
            var last = d.splice(d.length - 1, 1);
            return (d.join(', ') + " & "+ last[0]);
        }
    };
    var init = function () {
        $http.get('/api/diagnosticTest/getByDiagnosticLab/'+ diagnosticLabId).then(function(res) {
            $scope.diagnosticTestList = res.data;
        });

    };
    init();

};

var newDiagnosticTestController = function ($scope, $http, $window) {
    /*$scope.getDiagnosticTestByCategory = function(categoryId) {
        $http.get('/api/diagnosticTest/getByDiagnosticLabAndCategory/'+ diagnosticLabId + '/'+ categoryId).then(function(res) {
            $scope.diagnosticTestList = res.data;
        });
    };*/
    $scope.diagnosticTest = {};
    $scope.diagnosticTest.diagnosticLabId = $window.diagnosticLabId;

    $scope.submitNewDiagnosticTest = function () {
        console.log($scope.diagnosticTest);
        $http.post('/api/diagnosticTest/create', angular.copy($scope.diagnosticTest))
            .then(function () {
                $window.location.href = '/diagnosticTests';
            }, function () {
                alert('Something went wrong!');
            });
    };
    var init = function () {
        $http.get('/api/diagnosticTest/category/getAll').then(function(res) {
            $scope.categoryList = res.data;
        });

    };
    init();
};

var diagnosticTestModule = angular.module("diagnosticTestModule", ['datatables']);
diagnosticTestModule.controller("diagnosticTestController", diagnosticTestController);


var newDiagnosticTestModule = angular.module("newDiagnosticTestModule", []);
newDiagnosticTestModule.controller("newDiagnosticTestController", newDiagnosticTestController);