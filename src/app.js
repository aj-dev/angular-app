angular.module('app', ['ui.router', 'oc.lazyLoad'])
	.run(['$rootScope',	'$state', '$stateParams',
		function ($rootScope, $state, $stateParams) {
			$rootScope.state = $state;
    		$rootScope.stateParams = $stateParams;
		}
	])
	.config([
		'$ocLazyLoadProvider',
		'$stateProvider',
		'$urlRouterProvider',

		function ($ocLazyLoadProvider, $stateProvider, $urlRouterProvider) {
			// For any unmatched url, redirect to /
			$urlRouterProvider.otherwise('/');

			$stateProvider
				.state('app', {
					url: '/',
					views: {
						header: {
							templateUrl: 'src/common/header/header.html'
						},
						content: {
							templateUrl: 'src/home/home.html'
						},
						footer: {
							templateUrl: 'src/common/footer/footer.html'
						}
					}
				})
				.state('app.entertainments', {
					url: 'entertainment',
					views: {
						'content@': {
							templateUrl: 'src/entertainments/entertainments.html',
							controller: 'EntertainmentsController',
							resolve: {
								entertainments: ['$ocLazyLoad', function ($ocLazyLoad) {
									return $ocLazyLoad.load({
										name: 'app.entertainments',
										files: [
											'src/entertainments/entertainments-controller.js',
											'src/entertainments/entertainments.css'
										]
									});
								}]
							}
						}
					}
				})
				.state('app.entertainments.edit', {
					url: '/:path',
					views: {
						'edit': {
							templateUrl: 'src/entertainments/edit/entertainments-edit.html',
							controller: 'EntertainmentsEditController',
							resolve: {
								entertainmentsEdit: ['$ocLazyLoad', function ($ocLazyLoad) {
									return $ocLazyLoad.load({
										name: 'app.entertainments.edit',
										files: ['src/entertainments/edit/entertainments-edit-controller.js']
									});
								}],
								loadYoutube: ['$ocLazyLoad', function ($ocLazyLoad) {
									return $ocLazyLoad.load({
										serie: true,
										name: 'app.common.components.youtube',
										files: [
											'src/common/components/youtube/youtube.css',
											'src/common/services/google-api-service.js',
											'src/common/components/youtube/youtube-directive.js',
											'src/common/components/youtube/youtube-service.js'
										]
									});
								}]
							}
						}
					}
				})
				.state('app.books', {
					url: 'books',
					views: {
						'content@': {
							templateUrl: 'src/common/components/books/books.html',
							controller: 'BooksController',
							resolve: {
								books: ['$ocLazyLoad', function ($ocLazyLoad) {
									return $ocLazyLoad.load({
										name: 'app.common.components.books',
										serie: true,
										files: [
											'src/common/components/books/books.css',
											'src/common/services/google-api-service.js',
											'src/common/components/books/books-controller.js',
											'src/common/components/books/books-service.js'
										]
									});
								}]
							}
						}
					}
				})
				.state('app.about', {
					url: 'about',
					views: {
						'content@': {
							templateUrl: 'src/about/about.html',
							controller: 'AboutController',
							resolve: {
								load: ['$ocLazyLoad', function ($ocLazyLoad) {
									return $ocLazyLoad.load({
										name: 'app.about',
										files: ['src/about/about-controller.js']
									});
								}]
							}
						}
					}
				});
	}]);
