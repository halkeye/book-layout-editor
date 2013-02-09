/*global angular:false*/
/*jshint browser:true devel:true */
(function () {
  'use strict';

  function PagesCtrl($scope, $params, $dialog) {

    $scope.modalShown = false;
    $scope.opts = {
      backdrop: true,
      keyboard: true,
      backdropClick: true,
      templateUrl:  'partials/changeViews.html' ,
      controller: 'ShowViewDialogController'
    };

    $scope.pageNumber = $params.pageNumber;
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

  PagesCtrl.$inject = ['$scope','$routeParams','$dialog'];

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
