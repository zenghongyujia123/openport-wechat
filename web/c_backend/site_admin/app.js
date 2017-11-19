'use strict';

var cSite = angular.module('chaoQianSite', [
  'ui.router',
  //   'LocalStorageModule',
  //   'base64',
  'ngMaterial',
  'textAngular'
]);

cSite.config(function ($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('green')
    .accentPalette('orange')
    .warnPalette('red');
});

cSite.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    // .state('home', {
    //   url: '/home',
    //   templateUrl: '/c_backend/site_admin/templates/home.client.view.html',
    //   controller: 'HomeController'
    // })
    .state('product_list', {
      url: '/product_list',
      templateUrl: '/c_backend/site_admin/templates/product_list.client.view.html',
      controller: 'ProductListController'
    })
    .state('card_list', {
      url: '/card_list',
      templateUrl: '/c_backend/site_admin/templates/card_list.client.view.html',
      controller: 'CardListController'
    })
    .state('user_list', {
      url: '/user_list',
      templateUrl: '/c_backend/site_admin/templates/user_list.client.view.html',
      controller: 'UserListController'
    })
    .state('product_detail', {
      url: '/product_detail/:product_id',
      templateUrl: '/c_backend/site_admin/templates/product_detail.client.view.html',
      controller: 'ProductDetailController'
    })
    .state('user_detail', {
      url: '/user_detail/:user_id',
      templateUrl: '/c_backend/site_admin/templates/user_detail.client.view.html',
      controller: 'UserDetailController'
    })
    .state('user_vip_report', {
      url: '/user_vip_report/:user_id',
      templateUrl: '/c_backend/site_admin/templates/user_vip_report.client.view.html',
      controller: 'UserVipReportController'
    })
    .state('user_carrier_detail', {
      url: '/user_carrier_detail/:user_id',
      templateUrl: '/c_backend/site_admin/templates/user_carrier_detail.client.view.html',
      controller: 'UserCarrierDetailController'
    })
    .state('user_pbc_detail', {
      url: '/user_pbc_detail/:user_id',
      templateUrl: '/c_backend/site_admin/templates/user_pbc_detail.client.view.html',
      controller: 'UserPbcDetailController'
    })
    .state('card_detail', {
      url: '/card_detail/:card_id',
      templateUrl: '/c_backend/site_admin/templates/card_detail.client.view.html',
      controller: 'CardDetailController'
    })
    .state('credit_people_list', {
      url: '/credit_people_list',
      templateUrl: '/c_backend/site_admin/templates/credit_people_list.client.view.html',
      controller: 'CreditPeopleListController'
    })
    .state('credit_people_detail', {
      url: '/credit_people_detail/:credit_people_id',
      templateUrl: '/c_backend/site_admin/templates/credit_people_detail.client.view.html',
      controller: 'CreditPeopleDetailController'
    })
    .state('filter_edit', {
      url: '/filter_edit',
      templateUrl: '/c_backend/site_admin/templates/filter_edit.client.view.html',
      controller: 'FilterEditController'
    });

  $urlRouterProvider.otherwise('/product_list');
}]);

