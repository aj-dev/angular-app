angular.module('app.common.components.books', ['app.common.components.services.googleApiService'])
    .controller('BooksController', ['$scope', 'booksService', function ($scope, booksService) {
        'use strict';

        var search = function (query) {
            booksService.search(query).then(function (books) {
                $scope.books = books;
                $scope.state.dataLoaded = true;
            });
        };

        $scope.books = [];
        $scope.query = '';
        $scope.state = {
            hasApiKey: booksService.hasApiKey(),
            dataLoaded: false
        };

        $scope.initialiseApi = function (key) {
            booksService.handleClientLoad(key).then(function () {
                $scope.state.hasApiKey = true;
                $scope.search();
            });
        };

        $scope.search = function (query) {
            _.debounce(search.bind(null, query || 'JavaScript'), 500)();
        };

        if ($scope.state.hasApiKey) {
            $scope.initialiseApi();
        }
    }]);
