/*global angular:false*/
/*jshint browser:true devel:true */
(function () {
  'use strict';

  function PagesCtrl($scope, $params, $location, $dialog, pageTitleSetter,$rootScope) {
    pageTitleSetter.title("Edit Page " + $params.pageNumber);

    $scope.modalShown = false;
    $scope.page_box_style = {
      'height': '768px',
      'width': '1024px'
    };
    $scope.opts = {
      backdrop: true,
      keyboard: true,
      backdropClick: true,
      templateUrl:  'partials/changeViews.html' ,
      controller: 'ShowViewDialogController'
    };

    $scope.lang = $params.lang || 'en';
    $scope.pageNumber = $params.pageNumber;

    $scope.add_page = function(lang) {
      if (!$rootScope.book_data.PAGES) $rootScope.book_data.PAGES = {};
      if (!$rootScope.book_data.PAGES[lang]) $rootScope.book_data.PAGES[lang] = [];
      $rootScope.book_data.PAGES[lang].push({});
      var newPageNum = $rootScope.book_data.PAGES[lang].length;
      $location.path("/pages/" + lang + "/" + newPageNum);
    };
    $scope.showViews = function($event) {
      var d = $dialog.dialog($scope.opts);
      d.open().then(function(result){
        console.log("Result is:", result);
        if(result)
        {
          alert('dialog closed with result: ' + result);
        }
      });
      console.log('clicked show views');
    };
  }

  PagesCtrl.$inject = ['$scope','$routeParams','$location', '$dialog','pageTitleSetter','$rootScope'];

  window.bookLayoutEditorApp.controller('PagesCtrl',PagesCtrl);
  window.bookLayoutEditorApp.controller('ShowViewDialogController',function($scope, dialog) {
    $scope.view = "UNREAD";
    $scope.viewOptions = [
      "UNREAD",
      "READING",
      "READ"
    ];
    $scope.close = function(result) {
      console.log(arguments);
      dialog.close(result);
    };
  });
})();
