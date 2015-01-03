var app = angular.module('tutorial', [ ]);

app.config(["$locationProvider", function($locationProvider) {
    $locationProvider.html5Mode(true);
}]);

app.controller("defaultCtrl", ["$scope", function($scope) {
    $scope.sayHello = function (name) {
        alert("Привет, " + name);
    }
	this.data = {
		'name' : 'defaultCtrl',
		'version' : '1.0'
	};
}]);