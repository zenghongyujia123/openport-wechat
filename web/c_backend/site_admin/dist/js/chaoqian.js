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
    .state('home', {
      url: '/home',
      templateUrl: '/c_backend/site_admin/templates/home.client.view.html',
      controller: 'HomeController'
    })
    ;

  $urlRouterProvider.otherwise('/home');
}]);


'use strict';

cSite.constant('GlobalEvent', {
  onBodyClick: 'onBodyClick',
  onUserUpdated: 'onUserUpdated',//用户信息更新,

  onShowLoading: 'onShowLoading',
  onShowAlert: 'onShowAlert', //提示窗口
  onShowAlertExtend: 'onShowAlertExtend', //扩展提示窗口,内容分两部分，概要和详细
  onShowAlertConfirm: 'onShowAlertConfirm', //confirm窗口
  onShowSelectDialog: 'onShowSelectDialog', //打开选择框消息,
  onShowMultiSelectDialog: 'onShowMultiSelectDialog', //打开多选择的选择框消息,
  onMultiSelectDialogUpdate: 'onMultiSelectDialogUpdate', //多选择的选项内容更新消息,
  onShowInputDialog: 'onShowInputDialog', //打开输入框消息,
  onShowExcelUploadDialog: 'onShowExcelUploadDialog', //打开excel导入对话框,
  onShowPhotoBrowser: 'onShowPhotoBrowser', //显示照片浏览,
  onScrollBottom: 'onScrollBottom', //滚动到底部

  onShowProgressBar: 'onShowProgressBar',//显示进度条
  onHideProgressBar: 'onHideProgressBar',//隐藏进度条
  onChangeProgressBar: 'onChangeProgressBar',//改变进度条数值
  onShowVideoDialog:'onShowVideoDialog',//播放视频
  onShowPhotoViewer:'onShowPhotoViewer',//显示图片查看
  onShowSideNavFloat: 'onShowSideNavFloat',
  onShowDialogPoiEdit: 'onShowDialogPoiEdit', //显示poi编辑框
  
  
  onShowMaterialMapLocationDialog:'onShowMaterialMapLocationDialog',
  onShowMaterialReviewMapDialog:'onShowMaterialReviewMapDialog'
});

'use strict';

cSite.constant('AddressConstant', {
  server: window.location.protocol + '//' + window.location.host,
  //server: 'https://zhuzhu1688.com',
  //server: 'https://agilepops.com',
  login: window.location.protocol + '//' + window.location.host,
  qiniuServerAddress: 'https://dn-agilepops.qbox.me/',
  uploadImageUrl: 'https://up.qbox.me/putb64/-1',
  qiniuUploadFileUrl: 'https://up.qbox.me'
});

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

'use strict';
cSite.factory('UserNetwork',
  ['Http', 'CommonHelper',
    function (Http, CommonHelper) {
      return {
        userList: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/user/userList', params);
        },
        getUserById: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/user/getUserById', params);
        },
        verifyVip: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/user/verifyVip', params);
        },
        updateVipInfo: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/user/updateVipInfo', params);
        },
        updateVipReportInfo: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/user/updateVipReportInfo', params);
        }
      };
    }]);

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

/**
 * Created by lance on 2016/11/17.
 */
'use strict';

cSite.factory('QiniuService', [
    function () {
        function createUploader(btnId, callback) {
            var Qiniu = new QiniuJsSDK();
            var uploader = Qiniu.uploader({
                runtimes: 'html5,flash,html4',      // 上传模式，依次退化
                browse_button: btnId,         // 上传选择的点选按钮，必需
                // 在初始化时，uptoken，uptoken_url，uptoken_func三个参数中必须有一个被设置
                // 切如果提供了多个，其优先级为uptoken > uptoken_url > uptoken_func
                // 其中uptoken是直接提供上传凭证，uptoken_url是提供了获取上传凭证的地址，如果需要定制获取uptoken的过程则可以设置uptoken_func
                // uptoken : '<Your upload token>', // uptoken是上传凭证，由其他程序生成
                uptoken_url: '/token/qiniu/uptoken',         // Ajax请求uptoken的Url，强烈建议设置（服务端提供）
                // uptoken_func: function (data) {    // 在需要获取uptoken时，该方法会被调用
                //     // do something
                //     return uptoken;
                // },
                get_new_uptoken: false,             // 设置上传文件的时候是否每次都重新获取新的uptoken
                // downtoken_url: '/downtoken',
                // Ajax请求downToken的Url，私有空间时使用，JS-SDK将向该地址POST文件的key和domain，服务端返回的JSON必须包含url字段，url值为该文件的下载地址
                // unique_names: true,              // 默认false，key为文件名。若开启该选项，JS-SDK会为每个文件自动生成key（文件名）
                // save_key: true,                  // 默认false。若在服务端生成uptoken的上传策略中指定了sava_key，则开启，SDK在前端将不对key进行任何处理
                domain: 'chaoqian',     // bucket域名，下载资源时用到，必需
                container: 'qiniu-upload-test-container',             // 上传区域DOM ID，默认是browser_button的父元素
                max_file_size: '100mb',             // 最大文件体积限制
                max_retries: 3,                     // 上传失败最大重试次数
                // dragdrop: true,                     // 开启可拖曳上传
                drop_element: 'qiniu-upload-test-container',          // 拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
                chunk_size: '4mb',                  // 分块上传时，每块的体积
                auto_start: true,                   // 选择文件后自动上传，若关闭需要自己绑定事件触发上传
                //x_vars : {
                //    查看自定义变量
                //    'time' : function(up,file) {
                //        var time = (new Date()).getTime();
                // do something with 'time'
                //        return time;
                //    },
                //    'size' : function(up,file) {
                //        var size = file.size;
                // do something with 'size'
                //        return size;
                //    }
                //},
                init: {
                    'FilesAdded': function (up, files) {
                        plupload.each(files, function (file) {
                            console.log(file);
                            // 文件添加进队列后，处理相关的事情
                        });
                    },
                    'BeforeUpload': function (up, file) {
                        // 每个文件上传前，处理相关的事情
                    },
                    'UploadProgress': function (up, file) {
                        // 每个文件上传时，处理相关的事情
                    },
                    'FileUploaded': function (up, file, info) {
                        if (info.response) {
                            console.log(btnId);
                            callback(JSON.parse(info.response));
                        }
                        else {
                            callback('upload error');
                        }
                        // 每个文件上传成功后，处理相关的事情
                        // 其中info是文件上传成功后，服务端返回的json，形式如：
                        // {
                        //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
                        //    "key": "gogopher.jpg"
                        //  }
                        // 查看简单反馈
                        // var domain = up.getOption('domain');
                        // var res = parseJSON(info);
                        // var sourceLink = domain +"/"+ res.key; 获取上传成功后的文件的Url
                    },
                    'Error': function (up, err, errTip) {
                        console.log(up);
                        console.log(err);
                        console.log(errTip);
                        //上传出错时，处理相关的事情
                    },
                    'UploadComplete': function () {
                        //队列文件处理完毕后，处理相关的事情
                    },
                    // 'Key': function(up, file) {
                    //     // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
                    //     // 该配置必须要在unique_names: false，save_key: false时才生效
                    //     var key = "";
                    //     // do something with key here
                    //     return key
                    // }
                }
            });

        }
        return {
            createUploader: createUploader,
            getQiniuImageSrc: function (key) {
                return 'http://ouv4j9a7a.bkt.clouddn.com/' + key;
            }
        }

    }]);

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

/**
 * Created by lance on 2016/11/17.
 */
'use strict';

cSite.controller('HomeController', [
  '$rootScope', '$scope', '$state', '$stateParams',
  function ($rootScope, $scope, $state, $stateParams) {

  }]);

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
