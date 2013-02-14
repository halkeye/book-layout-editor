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

  bookLayoutEditorApp.service('pageTitleSetter', ['$window', function($window) {
    this.title = function(documentTitle) {
      $window.document.title = "Page Editor - " + documentTitle;
    };
  }]);

  bookLayoutEditorApp.directive('dropFileZone', [function () {
    return {
      restrict: 'A', // Attribute
      link: function (scope, elm, attrs,controller) {
        /* FIXME
         * $parser is needed to call the controller?
         * 2 readers
         * controller[attr.drop-file-zone]('url', event.target.result);
         * controller[attr.drop-file-zone]('data', event.target.result);
         */
        console.log(elm);
        elm.bind('dragover',function(e) {
          e.stopPropagation();
          e.preventDefault();
          e.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy. 
        });
        elm.bind('drop', function(e){
          e.stopPropagation();
          e.preventDefault();
          var file = e.dataTransfer.files[0], reader = new FileReader();
          reader.onload = function (event) {
            console.log(event.target);
            console.log(elm);
            elm[0].style.backgroundImage = 'url(' + event.target.result + ')';
            elm[0].style.backgroundRepeat = 'no-repeat';
            elm[0].style.backgroundPosition = 'center';
          };
          reader.readAsDataURL(file);

          return false;
        });
      }
    };
  }]);
}());

