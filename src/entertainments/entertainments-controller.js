angular.module('app.entertainments', [])
    .controller('EntertainmentsController', ['$rootScope', '$scope', function ($rootScope, $scope) {
        'use strict';

        $scope.entertainments = [{
            id: '1',
            title: 'Videos',
            type: 'video',
            path: 'videos'
        }, {
            id: '2',
            title: 'Channels',
            type: 'channel',
            path: 'channels'
        }, {
            id: '3',
            title: 'Playlists',
            type: 'playlist',
            path: 'playlists'
        }];
    }]);
