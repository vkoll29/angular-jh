(function(){
  'use strict';
  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownAppController', NarrowItDownAppController)
  .service('MenuSearchService', MenuSearchService)
  .directive('foundItems', FoundItemsDirective)
  .constant('ApiBasePath','https://davids-restaurant.herokuapp.com/menu_items.json');


function FoundItemsDirective(){
  var ddo = {
    templateUrl : 'foundItems.html',
    scope: {
      items : '<',
      warning : '<',
      showTable : '<',
      onRemove : '&'
    },
    controller : FoundItemsDirectiveController,
    controllerAs : 'narrow',
    bindToController : true
  };

  return ddo;
}

function FoundItemsDirectiveController() {
        var narrow = this;

}



NarrowItDownAppController.$inject = ['MenuSearchService'];
function NarrowItDownAppController(MenuSearchService) {
  var narrow  = this;

  narrow.searchMenu = function(){
    narrow.found = [];
  narrow.warning = false;
  narrow.showTable = false;

  if(!narrow.searchTerm){
    narrow.warning = true;
  }
  else{
    var promise = MenuSearchService.getMatchedMenuItems();
    promise.then(function(response){
      narrow.found = [];
      for(var i = 0; i < response.data.menu_items.length; i++){
        var desc = response.data.menu_items[i].description;
        if(desc.toLowerCase().indexOf(narrow.searchTerm) !== -1){
          narrow.found.push(response.data.menu_items[i]);
        }
      }
      if(!narrow.found.length > 0){
        narrow.warning = true;
      }
      else{
        narrow.showTable = true;
      }
    }).
    catch(function(error){
      console.log(error);
    });
  }
};

narrow.removeItem = function(itemIndex){
  narrow.found.splice(itemIndex, 1);
};
}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;
  service.getMatchedMenuItems = function () {
    var response = $http({
      method: "GET",
      url: (ApiBasePath)
    });
    return response;
  };
}


})();
