/**
 * Created by siddhartha on 6/8/17 at 05:59 PM.
 */


var diagnosticLabId = '';
var bookingController = function($scope, $http, DTOptionsBuilder, DTColumnDefBuilder) {

    $scope.persons = [];
    $scope.dtOptions = DTOptionsBuilder.newOptions();

    $scope.dtColumnDefs = [
        DTColumnDefBuilder.newColumnDef(0),
        DTColumnDefBuilder.newColumnDef(1),
        DTColumnDefBuilder.newColumnDef(2),
        DTColumnDefBuilder.newColumnDef(3),
        DTColumnDefBuilder.newColumnDef(4),
        DTColumnDefBuilder.newColumnDef(5),
        DTColumnDefBuilder.newColumnDef(6)
    ];

    $http.get('/api/booking/getAll').then(function(res) {
        $scope.bookings = res.data;
    });

    $scope.remove = function (index) {
        $scope.bookings.splice(index, 1);
    };
    // .withPaginationType('full_numbers');
};

var newBookingController = function($scope, $http, $window) {
    $scope.diagnosticTestList = [];
    $scope.booking = {};
    var getDiagnosticTestList = function(diagnosticLabId) {
        var promise = $http({
            url: '/api/diagnosticTest/getAll',
            method: 'GET'
        });

        promise.then(function (res) {
            $scope.diagnosticTestList = res.data;
        });
    }

    $scope.submitBooking = function () {
        var data = angular.copy($scope.booking);
        var promise = $http({
            url: '/api/booking/create',
            method: 'POST',
            data: data
        });

        promise.then(function (res) {
            $window.location.href = "/booking";
        });

        return promise;
    };

    var init = function() {
        getDiagnosticTestList();
    };
    init();
};


var bookingModule = angular.module("bookingModule", ['datatables']);
bookingModule.controller("bookingController", bookingController);

var newBookingModule = angular.module("newBookingModule", []);
newBookingModule.controller("newBookingController", newBookingController);