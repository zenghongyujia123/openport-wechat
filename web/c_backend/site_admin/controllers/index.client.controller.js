/**
 * Created by lance on 2016/11/17.
 */
'use strict';

cSite.controller('IndexController', [
  '$rootScope', '$scope', '$state', '$stateParams', '$mdSidenav',
  function ($rootScope, $scope, $state, $stateParams, $mdSidenav) {
    $scope.toggleLeft = buildToggler('left');
    $scope.toggleRight = buildToggler('right');

    $scope.goNav = function (nav) {
      $scope.toggleLeft();
      $state.go(nav);
    }

    function buildToggler(componentId) {
      return function () {
        $mdSidenav(componentId).toggle();
      };
    }
  }]);
