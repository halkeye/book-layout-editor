/*global angular:false*/
/*jshint browser:true devel:true */
var bookLayoutEditorApp;
(function () {
  'use strict';

  bookLayoutEditorApp = angular.module('bookLayoutEditorApp', ['ui.bootstrap'])
    .config(['$routeProvider', function($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'views/main.html',
          controller: 'MainCtrl'
        })
        .when('/pages/:pageNumber', {
          templateUrl: 'views/pages.html',
          controller: 'PagesCtrl'
        })
        .otherwise({
          redirectTo: '/'
        });
    }]);

  bookLayoutEditorApp.controller("NavController", ["$scope", "$http", "$location", "$rootScope", "$route", function($scope, $http, $location, $rootScape, $route) { 
    $scope.navCollection = [
      {id:'home', title:'Home'}
    ];
    for (var pageNum = 1; pageNum < 10; pageNum++) {
      $scope.navCollection.push({id:'pages/'+pageNum, title:'Page ' + pageNum});
    }
    $scope.navClass = function (page) {
      var currentRoute = $location.path().substring(1) || 'home';
      return page === currentRoute ? 'active' : '';
    };

    $scope.navigateToSection = function (sectionID) {
      $location.url('/'+sectionID);
    };
  }]);
}());

