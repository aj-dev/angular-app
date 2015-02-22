angular.module('app.common.components.books')
    .service('booksService', ['$q', 'googleApiService', function ($q, googleApiService) {
        var privateContext = {
            apiLoaded: false,
            normaliseData: function (data) {
                return data.map(function (item) {
                    return {
                        id: item.id,
                        title: item.volumeInfo.title,
                        authors: item.volumeInfo.authors && item.volumeInfo.authors.join(', '),
                        publisher: item.volumeInfo.publisher,
                        publishedDate: item.volumeInfo.publishedDate,
                        description: item.volumeInfo.description,
                        thumbnailUrl: item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail,
                        link: item.volumeInfo.canonicalVolumeLink
                    };
                });
            }
        };

        this.handleClientLoad = function (apiKey) {
            return googleApiService
                .setApiKey(apiKey)
                .load('books', 'v1')
                .then(function () {
                    privateContext.apiLoaded = true;
                });
        };

        this.hasApiKey = function () {
            return googleApiService.hasApiKey();
        };

        this.search = function (query) {
            var deferred = $q.defer();

            if (!privateContext.apiLoaded) {
                this.handleClientLoad();
            }

            googleApiService.books.volumes.list({
                q: query || 'JavaScript',
                part: 'snippet',
                printType: 'books',
                maxResults: 5,
                orderBy: 'relevance',
                projection: 'lite'
            }).then(function (response) {
                deferred.resolve(privateContext.normaliseData(response.result.items));
            });

            return deferred.promise;
        };
    }]);
