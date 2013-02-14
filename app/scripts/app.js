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

  bookLayoutEditorApp.run( ['$rootScope', function($rootScope) {
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
  }]);

  bookLayoutEditorApp.filter('langName', function() {
    return function(text) {
      return window.getLanguageName(text);
    };
  });

  bookLayoutEditorApp.service('pageTitleSetter', function($window) {
    this.title = function(documentTitle) {
      $window.document.title = "Page Editor - " + documentTitle;
    };
  }, {$inject:'$window'});

}());

