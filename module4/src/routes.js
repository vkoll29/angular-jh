(function() {
  'use strict';

  angular.module('MenuApp')
  .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise("/");

    $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "src/templates/home.template.html"
    })

    .state('categories', {
      url: "/categories",
      templateUrl: "src/templates/categories.template.html",
      controller: "CategoriesListController as ctrl",
      resolve: {
        categories: ['MenuDataService', function (MenuDataService) {
          return MenuDataService.getAllCategories();
        }]
      }
    })

    .state('categories.items', {
      url: "/items/{categoryShortName}",
      templateUrl: "src/templates/items.template.html",
      controller: "ItemsListController as ctrl",
      params: {categoryShortName: null},
      resolve: {
        items: ['$stateParams', 'MenuDataService', function($stateParams, MenuDataService){
          return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
        }]
      }
    })
  }


})();
