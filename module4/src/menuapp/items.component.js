(function () {
  'use strict';

  angular.module('MenuApp')
  .component('items', {
    templateUrl: "src/templates/items.templates.html",
    controller: ItemsComponentController,
    bindings: {
      list: "<"
    }
  });

  ItemsComponentController = [];
  function ItemsComponentController() {

  }

})();
