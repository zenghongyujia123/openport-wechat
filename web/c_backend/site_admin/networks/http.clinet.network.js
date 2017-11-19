'use strict';

cSite.factory('Http',
  ['$rootScope', '$http', '$q', 'AddressConstant', 'GlobalEvent', 'CommonHelper',
    function ($rootScope, $http, $q, AddressConstant, GlobalEvent, CommonHelper) {

      function get(address, params) {
        var q = $q.defer();
        address = AddressConstant.server + address;

        $http.get(address, { params: params })
          .then(function (data) {
            q.resolve(data);
          }, function (err) {
            q.reject(err);
          });

        return q.promise;
      }

      function post(address, params) {
        var q = $q.defer();
        address = AddressConstant.server + address;

        $http.post(address, params)
          .then(function (data) {
            q.resolve(data);
          }, function (err) {
            q.reject(err);
          })

        return q.promise;
      }

      function request(scope, address, params, isCheck, withoutLoading, fn) {
        scope = scope || $rootScope;

        var q = $q.defer();
        if (!withoutLoading) {
          scope.$emit(GlobalEvent.onShowLoading, true);
        }

        fn(address, params).then(function (result) {
          var data = result.data;
          if (!withoutLoading) {
            scope.$emit(GlobalEvent.onShowLoading, false);
          }
          //   if ((!data || (CommonHelper.isObject(data) && !CommonHelper.getObjectLength(data))) && isCheck) {
          //     CommonHelper.showAlert(scope, RootService.getGlobalLanguageTextByName('noDataFromServer'));
          //     return q.reject({message: RootService.getGlobalLanguageTextByName('noDataFromServer')});
          //   }
          //   if (data && data.err && (data.err.type === FirmUserError.invalid_access_token.type || data.err.type === FirmUserError.not_a_firm_user.type)) {
          //     Auth.logout();
          //   }

          if (data && data.err && isCheck) {
            if ($rootScope.languageCode !== 'en') {
              CommonHelper.showAlert(scope, data.err.zh_message || data.err.message);
            }
            else {
              CommonHelper.showAlert(scope, data.err.message);
            }
          }

          q.resolve(data);

        }, function (err) {
          if (!withoutLoading) {
            scope.$emit(GlobalEvent.onShowLoading, false);
          }
          q.reject(err);
        });

        return q.promise;
      }

      return {
        getRequestWithCheck: function (scope, address, params) {
          return request(scope, address, params, true, false, get);
        },
        postRequestWithCheck: function (scope, address, params) {
          return request(scope, address, params, true, false, post);
        },
        getRequest: function (scope, address, params) {
          return request(scope, address, params, false, false, get);
        },
        postRequest: function (scope, address, params) {
          return request(scope, address, params, false, false, post);
        },
        getRequestWithoutLoading: function (scope, address, params) {
          return request(scope, address, params, true, true, get);
        },
        postRequestWithoutLoading: function (scope, address, params) {
          return request(scope, address, params, true, true, post);
        }
      };

    }]);
