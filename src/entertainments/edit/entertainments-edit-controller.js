angular.module('app.entertainments.edit', [])
	.controller('EntertainmentsEditController', ['$scope', '$stateParams', function ($scope, $stateParams) {
		'use strict';

		$scope.entertainment = _.find($scope.entertainments, {'path': $stateParams.path});
	}]);
