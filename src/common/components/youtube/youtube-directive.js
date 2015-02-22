angular.module('app.common.components.youtube', ['app.common.components.services.googleApiService'])
	.directive('youtube', ['youtubeService', function (youtubeService) {
		return {
			restrict: 'E',
			scope: {
				type: '@'
			},
			templateUrl: 'src/common/components/youtube/youtube.html',
			link: function (scope, element) {

				var search = function (query, type) {
					youtubeService
	                	.search(query, type)
	                	.then(function (items) {
		                	scope.$evalAsync(function () {
			            		scope.results = items;
			            		scope.state.dataLoaded = true;
			            		scope.pre = JSON.stringify(items, null, 4);
			            	});
			            }, function (error) {
			                console.log('Failed: ' + error);
			            });
				};

				scope.results = null;
				scope.query = '';
				scope.apiKey = '';
				scope.state = {
					hasApiKey: youtubeService.hasApiKey(),
					dataLoaded: false
				};

				scope.initialiseApi = function (key) {
					youtubeService.handleClientLoad(key).then(function () {
						scope.state.hasApiKey = true;
						scope.search();
					});
				};

				scope.search = function (query) {
					_.debounce(search.bind(null, query || 'The Cinematic Orchestra', scope.type), 500)();
				};

				if (scope.state.hasApiKey) {
					scope.initialiseApi();
				}
			},
		};
	}]);
