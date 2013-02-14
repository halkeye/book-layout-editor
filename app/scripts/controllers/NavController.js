/*global angular:false*/
/*jshint browser:true devel:true */
(function () {
  'use strict';
  window.bookLayoutEditorApp.controller('NavController', ['$scope', '$http', '$location', '$rootScope', '$route', function($scope, $http, $location, $rootScope, $route) {

    console.log('here');
    // Default Value
    $scope.book_language = 'en';
    // All Pages
    $scope.book_pages = $rootScope.book_data.PAGES;
    // All Languages
    var langs =  Object.keys($rootScope.book_data.PAGES);
    if (!langs.length) {
      $scope.book_page_languages = [{ val: 'en', name: window.getLanguageName('en')}];
    } else {
      $scope.book_page_languages = [];
      angular.forEach(langs, function(val) {
        $scope.book_page_languages.push({ val: val, name: window.getLanguageName(val)});
      });
    }

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
})();
