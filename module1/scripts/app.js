(function(){
  'use strict';
  angular.module('LunchCheck', [])
    .controller('LunchCheckController', LunchCheckController);
    LunchCheckController.$inject = ['$scope'];

    function LunchCheckController($scope){
      $scope.lunchItems = "";
      $scope.msg = "";
      $scope.rslt = "default";
      $scope.color = "black";
      $scope.checkItems = function(){
        var noSpace = $scope.lunchItems.trim();
        var empty = (noSpace === "");
        if(empty){
          $scope.msg = "Please enter data first";
          $scope.rslt = "danger";
          $scope.color = "red";
        }
        else{
          $scope.rslt = "success";
          $scope.color = "green"
          var items = $scope.lunchItems.split(',')
          if(items.length <4){
            $scope.msg = "Enjoy";
          }
          else{
            $scope.msg = "Too much";
          }
        }
      }
    }
})();
