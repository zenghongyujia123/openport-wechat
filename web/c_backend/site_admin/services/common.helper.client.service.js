'use strict';

cSite.factory('CommonHelper', ['$rootScope', '$timeout', 'GlobalEvent', 'AddressConstant', '$mdDialog',
    function ($rootScope, $timeout, GlobalEvent, AddressConstant, $mdDialog) {
        // showMaterialReviewMap: function (scope, targetEvent, params, callback) {
        //   $mdDialog.show({
        //     controller: 'MaterialDialogReviewMapController',
        //     templateUrl: '/site_common/dialog/review_map/review_map.client.view.html',
        //     contentElement: document.querySelector('#myStaticDialog'),
        //     parent: angular.element(document.body),
        //     targetEvent: targetEvent,
        //     locals: params || {},
        //     scope: params.scope,
        //     preserveScope: true,
        //     clickOutsideToClose: false,
        //     fullscreen: scope.customFullscreen // Only for -xs, -sm breakpoints.
        //   }).then(callback);
        var commonHelper = {
            showLoading: function (scope, isShow) {
                $timeout(function () {
                    return scope.$emit(GlobalEvent.onShowLoading, isShow);
                }, 0);
            },
            showAlert: function (scope, text, callback, ev, delayTime) {
                var isFinished = false;
        
                var promise = $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('body')))
                    .clickOutsideToClose(true)
                    .title('消息')
                    .textContent(text)
                    .ariaLabel('Alert Dialog')
                    .ok('确定')
                    .targetEvent(ev)
                )
                  .finally(function () {
                    isFinished = true;
                    callback && callback();
                  });
        
                if (delayTime) {
                  $timeout(function () {
                    if (!isFinished) {
                      $mdDialog.cancel(promise);
                    }
                  }, delayTime);
                }
              },
              showConfirm: function (scope, title, text, sureCallback, cancelCallback, cancelLabel, ev) {
                $mdDialog.show(
                  $mdDialog.confirm()
                    .title(title || '提示')
                    .textContent(text)
                    .ariaLabel('Confirm')
                    .targetEvent(ev)
                    .ok('确定')
                    .cancel(cancelLabel ||'取消')
                ).then(function () {
                  if (sureCallback) {
                    sureCallback();
                  }
                }, function () {
                  if (cancelCallback) {
                    cancelCallback();
                  }
                });
              },
        };
        return commonHelper;
    }]);
