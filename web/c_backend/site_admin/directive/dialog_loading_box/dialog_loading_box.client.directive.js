'use strict';

cSite.directive('dialogLoadingBox', ['$rootScope', 'GlobalEvent', 'CommonHelper', function ($rootScope, GlobalEvent, CommonHelper) {
  return {
    restrict: 'E',
    templateUrl: '/c_backend/site_admin/directive/dialog_loading_box/dialog_loading_box.client.view.html',
    replace: true,
    scope: {},
    controller: function ($scope, $element) {
      $scope.dialogInfo = {
        isShow: false
      };

      $rootScope.$on(GlobalEvent.onShowLoading, function (event, isLoading) {
        $scope.dialogInfo.isShow = isLoading;
      });
    }
  };
}]);
