/*global angular:false*/
/*jshint browser:true devel:true */
var bookLayoutEditorApp;
(function () {
  'use strict';

  bookLayoutEditorApp = angular.module('bookLayoutEditorApp', ['ui.bootstrap']);
  bookLayoutEditorApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/pages/:lang/new', {
        templateUrl: 'views/pageNew.html',
        controller: 'PagesCtrl'
      })
      .when('/pages/:lang/:pageNumber', {
        templateUrl: 'views/pages.html',
        controller: 'PagesCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);

  bookLayoutEditorApp.run( function($rootScope, $location) {
    $rootScope.book_data = {
      "PAGES": {
        "ja": [
          {},{},{}
        ],
        "de": [
          {},{},{}
        ],
        "fr": [
          {},{},{}
        ],
        "en": [
          {},{},{},{},{},{}
        ]
      }
    };
  });

  bookLayoutEditorApp.service('pageTitleSetter', function($window) {
    this.title = function(documentTitle) {
      $window.document.title = "Page Editor - " + documentTitle;
    };
  }, {$inject:'$window'});

  bookLayoutEditorApp.controller("NavController", ["$scope", "$http", "$location", "$rootScope", "$route", function($scope, $http, $location, $rootScope, $route) {

    // Default Value
    $scope.book_language = 'en';
    // All Pages
    $scope.book_pages = $rootScope.book_data.PAGES;
    // All Languages
    $scope.book_page_languages = Object.keys($rootScope.book_data.PAGES) || ['en'];

    $scope.navCollection = [
      {id:'home', title:'Home'}
    ];

    $scope.navClass = function (page) {
      var currentRoute = $location.path().substring(1) || 'home';
      return page === currentRoute ? 'active' : '';
    };

    $scope.navigateToSection = function (sectionID) {
      $location.path('/'+sectionID);
    };
    $scope.navigateToPage = function (lang,pageNum) {
      $location.path('/pages/'+lang+'/'+pageNum);
    };
  }]);
}());

