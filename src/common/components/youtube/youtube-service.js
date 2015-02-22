angular.module('app.common.components.youtube')
    .service('youtubeService', ['$q', 'googleApiService', function ($q, googleApiService) {
        var privateContext = {
            apiLoaded: false,
            normaliseData: function (data, type) {
                return data.map(function (item) {
                    return {
                        id: item.id[type + 'Id'],
                        title: item.snippet.title,
                        publishedAt: item.snippet.publishedAt,
                        thumbnailUrl: item.snippet.thumbnails.default.url
                    };
                });
            }
        };

        this.handleClientLoad = function (apiKey) {
            return googleApiService
                .setApiKey(apiKey)
                .load('youtube', 'v3')
                .then(function () {
                    privateContext.apiLoaded = true;
                });
        };

        this.hasApiKey = function () {
            return googleApiService.hasApiKey();
        };

        this.search = function (query, type) {
            var deferred = $q.defer();

            if (!privateContext.apiLoaded) {
                this.handleClientLoad();
            }

            googleApiService.youtube.search.list({
                q: query,
                type: type,
                part: 'snippet',
                maxResults: 4
            }).then(function (response) {
                deferred.resolve(privateContext.normaliseData(response.result.items, type));
            });

            return deferred.promise;
        };
    }]);
