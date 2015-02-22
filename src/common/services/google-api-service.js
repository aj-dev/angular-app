angular.module('app.common.components.services.googleApiService', [])
	.service('googleApiService', ['$q', function ($q) {
		var publicApiKey,
			googleClientApi;

		this.setApiKey = function (key) {
			if (key && key !== publicApiKey) {
				publicApiKey = key;
			}

			gapi.client.setApiKey(publicApiKey);

			return this;
		};

		this.hasApiKey = function () {
			return !!publicApiKey;
		};

		this.load = function (api, version) {
			var deferred = $q.defer();

			if (this[api]) {
				deferred.resolve();

				return deferred.promise;
			}

			gapi.client.load(api, version).then(function () {
				this[api] = gapi.client[api];
				deferred.resolve();
			}.bind(this));

			return deferred.promise;
		};
	}]);
