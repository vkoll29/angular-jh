(function () {
  'use strict';

  angular.module('shoppingListCheckOff', [])
  .controller('toBuyController', toBuyController)
  .controller('alreadyBoughtController', alreadyBoughtController)
  .provider('shoppingListCheckOffService', shoppingListCheckOffServiceProvider);


toBuyController.$inject = ['shoppingListCheckOffService'];
function toBuyController(shoppingListCheckOffService) {
  var toBuy = this;
  toBuy.itemsToBuy = shoppingListCheckOffService.getItemsToBuy();
  toBuy.buyItem = function(itemIndex){
    shoppingListCheckOffService.buyItemFromList(itemIndex);
    shoppingListCheckOffService.removeItemFromBuyList(itemIndex);
  };

}

alreadyBoughtController.$inject = ['shoppingListCheckOffService'];
function alreadyBoughtController(shoppingListCheckOffService) {
  var alreadyBought = this;

  alreadyBought.itemsAlreadyBought = shoppingListCheckOffService.getItemsAlreadyBought();
}

function shoppingListCheckOffService() {
  var service = this;

  var itemsToBuy = [
    {
      quantity :"2TB",
      name : "Hard Drive Disk"
    },
    {
      quantity : "1 bale",
      name : "clothing"
    },
    {
      quantity : "3 kg",
      name : "Wheat flour"
    },
    {
      quantity : "2 litres",
      name : "Mango Juice"
    },
    {
      quantity : "4 boxes",
      name : "Ginger biscuit"
    },
    {
      quantity : "2 packs",
      name : "Ramen"
    },
    {
      quantity : "2 kg",
      name  : "Rice"
    }
  ];

  var itemsAlreadyBought = [];

  service.buyItemFromList = function (itemIndex) {
      var item = {
        name: itemsToBuy[itemIndex].name,
        quantity: itemsToBuy[itemIndex].quantity
      };
      itemsAlreadyBought.push(item);
  };

  service.removeItemFromBuyList = function(itemIndex){
    itemsToBuy.splice(itemIndex, 1);
  };

  service.getItemsToBuy = function (){
    return itemsToBuy;
  };

  service.getItemsAlreadyBought = function (){
    return itemsAlreadyBought;
  };

}

function shoppingListCheckOffServiceProvider() {
  var provider = this;

  provider.$get = function () {
    var shoppingList = new shoppingListCheckOffService();

    return shoppingList;
  };
}


})();
