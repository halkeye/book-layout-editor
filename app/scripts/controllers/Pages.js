/*global angular:false*/
/*jshint browser:true devel:true */
(function () {
  'use strict';

  function PagesCtrl($scope, $params) {
    $scope.pageNumber = $params.pageNumber;
    $scope.pages = [1,2,3,4,5];
  }

  PagesCtrl.$inject = ['$scope','$routeParams'];

  window.bookLayoutEditorApp.controller('PagesCtrl',PagesCtrl);
})();
