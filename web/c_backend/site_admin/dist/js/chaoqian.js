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
cSite.factory('CardNetwork',
  ['Http', 'CommonHelper',
    function (Http, CommonHelper) {
      return {
        updateCard: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/card/updateCard', params);
        },
        cardList: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/card/cardList', params);
        },
        cardDetail: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/card/cardDetail', params);
        }

      };
    }]);

'use strict';
cSite.factory('CreditPeopleNetwork',
  ['Http', 'CommonHelper',
    function (Http, CommonHelper) {
      return {
        updateCreditPeople: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/credit_people/updateCreditPeople', params);
        },
        creditPeopleList: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/credit_people/creditPeopleList', params);
        },
        creditPeopleDetail: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/credit_people/creditPeopleDetail', params);
        }
      };
    }]);

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
cSite.factory('ProductNetwork',
  ['Http', 'CommonHelper',
    function (Http, CommonHelper) {
      return {
        updateProduct: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/product/updateProduct', params);
        },
        productList: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/product/productList', params);
        },
        productDetail: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/product/productDetail', params);
        },
        udpateProductFilter: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/product_filter/updateFilter', params);
        },
        getProductFilter: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/product_filter/getFilter', params);
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

cSite.controller('CardDetailController', [
  '$rootScope', '$scope', '$state', '$stateParams', 'QiniuService', 'CardNetwork', 'CommonHelper',
  function ($rootScope, $scope, $state, $stateParams, QiniuService, CardNetwork, CommonHelper) {
    var qiniu = QiniuService.createUploader('qiniu-upload-test-card-log-button', function (info) {
      $scope.card.logo = QiniuService.getQiniuImageSrc(info.key);
      console.log('upload successs : ---- ', info);
    });

    $scope.card = {
      _id: $stateParams.card_id,
      name: '',
      logo: '',
      description: '',
      organization_url:'',
    };

    $scope.updateCard = function (event) {
      CardNetwork.updateCard($scope, { card_info: $scope.card }).then(function (data) {
        if (!data.err) {
          CommonHelper.showConfirm($scope, null, '操作成功', function () {
            $state.go('card_detail', { card_id: data._id }, { reload: true });
          }, null, null, event);
        }
        console.log(data);
      }, function (err) {
        console.log(err);
      });;
    }

    function cardDetail() {
      if ($scope.card._id) {
        CardNetwork.cardDetail($scope, { card_id: $scope.card._id }).then(function (data) {
          console.log(data);
          if (!data.err) {
            $scope.card = data;
          }
        }, function (err) {
          console.log(err);
        });
      }
    }
    cardDetail();
  }]);

/**
 * Created by lance on 2016/11/17.
 */
'use strict';

cSite.controller('CardListController', [
  '$rootScope', '$scope', '$state', '$stateParams', 'CardNetwork',
  function ($rootScope, $scope, $state, $stateParams, CardNetwork) {
    $scope.goDetail = function (id) {
      $state.go('card_detail', { card_id: id || '' });
    }
    $scope.card_list = [];
    $scope.cardList = function () {
      CardNetwork.cardList($scope, {}).then(function (data) {
        console.log(data);
        if (!data.err) {
          $scope.card_list = data;
        }
      }, function (err) {
        console.log(err);
      });
    };
    $scope.cardList();
  }]);

/**
 * Created by lance on 2016/11/17.
 */
'use strict';

cSite.controller('CreditPeopleDetailController', [
  '$rootScope', '$scope', '$state', '$stateParams', 'QiniuService', 'CreditPeopleNetwork', 'CommonHelper',
  function ($rootScope, $scope, $state, $stateParams, QiniuService, CreditPeopleNetwork, CommonHelper) {
    var qiniu = QiniuService.createUploader('qiniu-upload-test-button', function (info) {
      $scope.credit_people.photo = QiniuService.getQiniuImageSrc(info.key);
      console.log('upload successs : ---- ', info);
    });

    $scope.credit_people = {
      _id: $stateParams.credit_people_id || '',
      name: '',
      photo: '',
      tags: '',
      job_start_time: '',
      company_type: '',
      personal_description: '',
      business_description: '',
    };

    $scope.updateCreditPeople = function (event) {
      CreditPeopleNetwork.updateCreditPeople($scope, { credit_people_info: $scope.credit_people }).then(function (data) {
        if (!data.err) {
          CommonHelper.showConfirm($scope, null, '操作成功', function () {
            $state.go('credit_people_detail', null, { reload: true });
          }, null, null, event);
        }


        console.log(data);
      }, function (err) {
        console.log(err);
      });;
    }

    function creditPeopleDetail() {
      if ($scope.credit_people._id) {
        CreditPeopleNetwork.creditPeopleDetail($scope, { credit_people_id: $scope.credit_people._id }).then(function (data) {
          console.log(data);
          if (!data.err) {
            $scope.credit_people = data;
          }
        }, function (err) {
          console.log(err);
        });
      }
    }
    creditPeopleDetail();
  }]);

/**
 * Created by lance on 2016/11/17.
 */
'use strict';

cSite.controller('CreditPeopleListController', [
  '$rootScope', '$scope', '$state', '$stateParams', 'CreditPeopleNetwork',
  function ($rootScope, $scope, $state, $stateParams, CreditPeopleNetwork) {
    $scope.goDetail = function (id) {
      $state.go('credit_people_detail', { credit_people_id: id || '' });
    }
    $scope.credit_people_list = [];
    $scope.creditPeopleList = function () {
      CreditPeopleNetwork.creditPeopleList($scope, {}).then(function (data) {
        console.log(data);
        if (!data.err) {
          $scope.credit_people_list = data;
        }
      }, function (err) {
        console.log(err);
      });
    };

    $scope.creditPeopleList();
  }]);

/**
 * Created by lance on 2016/11/17.
 */
'use strict';

cSite.controller('FilterEditController', [
  '$rootScope', '$scope', '$state', '$stateParams', 'QiniuService', 'ProductNetwork', 'CommonHelper',
  function ($rootScope, $scope, $state, $stateParams, QiniuService, ProductNetwork, CommonHelper) {
    $scope.filter_strings = {
      brain_sort_string: '',
      loan_limit_string: '',
      working_identity_string: '',
      personal_natural_string: '',
      cycle_time_string: '',
      loan_term_string: ''
    };

    $scope.splitFilters = splitFilters;

    function splitFilters(str) {
      var filters = str.split(',');
      if (filters.length == 1 && filters[0] == '') {
        filters = [];
      }
      return filters
    }

    function getProductFilter() {
      ProductNetwork.getProductFilter($scope, {}).then(function (data) {
        console.log(data);
        if (!data.err) {
          $scope.filter_strings.brain_sort_string = data.brain_sort.join(',');
          $scope.filter_strings.loan_limit_string = data.loan_limit.join(',');
          $scope.filter_strings.working_identity_string = data.working_identity.join(',');
          $scope.filter_strings.personal_natural_string = data.personal_natural.join(',');
          $scope.filter_strings.cycle_time_string = data.cycle_time.join(',');
          $scope.filter_strings.loan_term_string = data.loan_term.join(',');
        }
      });
    }

    $scope.udpateProductFilter = function () {
      var filter_info = {
        brain_sort: splitFilters($scope.filter_strings.brain_sort_string),
        loan_limit: splitFilters($scope.filter_strings.loan_limit_string),
        working_identity: splitFilters($scope.filter_strings.working_identity_string),
        personal_natural: splitFilters($scope.filter_strings.personal_natural_string),
        cycle_time: splitFilters($scope.filter_strings.cycle_time_string),
        loan_term: splitFilters($scope.filter_strings.loan_term_string)
      };

      ProductNetwork.udpateProductFilter($scope, { filter_info: filter_info }).then(function (data) {
        if (!data.err) {
          getProductFilter();
        }
      });
    }



    getProductFilter();
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

/**
 * Created by lance on 2016/11/17.
 */
'use strict';

cSite.controller('ProductDetailController', [
  '$rootScope', '$scope', '$state', '$stateParams', 'QiniuService', 'ProductNetwork', 'CommonHelper',
  function ($rootScope, $scope, $state, $stateParams, QiniuService, ProductNetwork, CommonHelper) {
    var qiniu = QiniuService.createUploader('qiniu-upload-test-button', function (info) {
      $scope.product.logo = QiniuService.getQiniuImageSrc(info.key);
      console.log('upload successs : ---- ', info);
    });

    $scope.product = {
      _id: $stateParams.product_id,
      name: '',
      logo: '',
      description: '',
      min_limit: '',
      max_limit: '',
      refer_cost_per_day: '',
      fee_cost_per_day: '',
      longest_time: '',
      fee_info: '',
      apply_success_percent: '',
      apply_people_count: '',
      apply_info: '',
      other_info: '',
      apply_strategy: '',
      organization_url: '',
      organization_info: '',
      wechat_detail_info: '',
      risk_codes: '',
      str1:'',
      str2:'',
      str3:'',
      str4:'',
      str5:'',
      str6:'',
      str7:'',
      str8:'',
      str9:'',
      str10:'',
      str11:'',
      str12:'',
      str13:0,
      str14:0,
      str15:0,
      str16:0,
      str17:0,
      str18:0,
    };

    $scope.updateProduct = function (event) {
      ProductNetwork.updateProduct($scope, { product_info: $scope.product }).then(function (data) {
        if (!data.err) {
          CommonHelper.showConfirm($scope, null, '操作成功', function () {
            $state.go('product_detail', null, { reload: true });
          }, null, null, event);
        }


        console.log(data);
      }, function (err) {
        console.log(err);
      });;
    }

    function productDetail() {
      if ($scope.product._id) {
        ProductNetwork.productDetail($scope, { product_id: $scope.product._id }).then(function (data) {
          console.log(data);
          if (!data.err) {
            $scope.product = data;
          }
        }, function (err) {
          console.log(err);
        });
      }
    }
    productDetail();
  }]);

/**
 * Created by lance on 2016/11/17.
 */
'use strict';

cSite.controller('ProductListController', [
    '$rootScope', '$scope', '$state', '$stateParams', 'ProductNetwork',
    function ($rootScope, $scope, $state, $stateParams, ProductNetwork) {
        $scope.goDetail = function (id) {
            $state.go('product_detail', { product_id: id||'' });
        }
        $scope.product_list = [];
        $scope.productList = function () {
            ProductNetwork.productList($scope, {}).then(function (data) {
                console.log(data);
                if (!data.err) {
                    $scope.product_list = data;
                }
            }, function (err) {
                console.log(err);
            });
        };

        $scope.productList();
    }]);

/**
 * Created by lance on 2016/11/17.
 */
'use strict';

cSite.controller('UserCarrierDetailController', [
  '$rootScope', '$scope', '$state', '$stateParams', 'UserNetwork', 'ProductNetwork', 'CardNetwork',
  function ($rootScope, $scope, $state, $stateParams, UserNetwork, ProductNetwork, CardNetwork) {
    // $scope.goDetail = function (id) {
    //     $state.go('product_detail', { product_id: id||'' });
    // }

    function syntaxHighlight(json) {
      if (typeof json != 'string') {
        json = JSON.stringify(json, undefined, 2);
      }
      json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = 'key';
          } else {
            cls = 'string';
          }
        } else if (/true|false/.test(match)) {
          cls = 'boolean';
        } else if (/null/.test(match)) {
          cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
      });
    }

    $scope.user = {};
    $scope.getUserById = function () {
      UserNetwork.getUserById($scope, { user_id: $stateParams.user_id }).then(function (data) {
        console.log(data);
        if (!data.err) {
          if (data.carrier_detail) {
            data.carrier_detail = syntaxHighlight(JSON.parse(data.carrier_detail));
          }

          $scope.user = data;

          $('.id_carrier_detail').append(data.carrier_detail);
          $('.id_carrier_detail').html($('.id_carrier_detail').text());
        }
      }, function (err) {
        console.log(err);
      });
    };

    $scope.getUserById();


  }]);

/**
 * Created by lance on 2016/11/17.
 */
'use strict';

cSite.controller('UserDetailController', [
  '$rootScope', '$scope', '$state', '$stateParams', 'UserNetwork', 'ProductNetwork', 'CardNetwork',
  function ($rootScope, $scope, $state, $stateParams, UserNetwork, ProductNetwork, CardNetwork) {
    // $scope.goDetail = function (id) {
    //     $state.go('product_detail', { product_id: id||'' });
    // }

    function syntaxHighlight(json) {
      if (typeof json != 'string') {
        json = JSON.stringify(json, undefined, 2);
      }
      json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = 'key';
          } else {
            cls = 'string';
          }
        } else if (/true|false/.test(match)) {
          cls = 'boolean';
        } else if (/null/.test(match)) {
          cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
      });
    }
    $scope.product_list = [];
    $scope.select_product_list = [];
    $scope.card_list = [];
    $scope.select_card_list = [];

    $scope.productList = function () {
      ProductNetwork.productList($scope, {}).then(function (data) {
        console.log(data);
        if (!data.err) {
          $scope.product_list = data;
          $scope.user.vip_product_ids = $scope.user.vip_product_ids || [];

          $scope.user.vip_product_ids.forEach(function (pid) {
            $scope.select_product_list.push($scope.product_list.filter(function (p) {
              return p._id === pid;
            })[0]);
          });
        }
      }, function (err) {
        console.log(err);
      });
    };

    $scope.cardList = function () {
      CardNetwork.cardList($scope, {}).then(function (data) {
        console.log(data);
        if (!data.err) {
          $scope.card_list = data;
          $scope.user.vip_card_ids = $scope.user.vip_card_ids || [];
          $scope.user.vip_card_ids.forEach(function (cid) {
            $scope.select_card_list.push($scope.card_list.filter(function (c) {
              return c._id === cid;
            })[0]);
          });
        }
      }, function (err) {
        console.log(err);
      });
    };

    $scope.user = {};
    $scope.getUserById = function () {
      UserNetwork.getUserById($scope, { user_id: $stateParams.user_id }).then(function (data) {
        console.log(data);
        if (!data.err) {
          $scope.user = data;
          $scope.productList();
          $scope.cardList();
        }
      }, function (err) {
        console.log(err);
      });
    };

    $scope.verifyVip = function () {
      UserNetwork.verifyVip($scope, { user_id: $stateParams.user_id }).then(function (data) {
        console.log(data);
        $state.go('user_detail', null, { reload: true });
      });
    }


    $scope.goReport = function () {
      $state.go('user_vip_report', { user_id: $stateParams.user_id }, { reload: true });
    }

    $scope.goCarrier = function () {
      $state.go('user_carrier_detail', { user_id: $stateParams.user_id }, { reload: true });
    }

    $scope.goPbc = function () {
      $state.go('user_pbc_detail', { user_id: $stateParams.user_id }, { reload: true });
    }

    $scope.clickProduct = function (product) {
      var index = -1;
      for (var i = 0; i < $scope.select_product_list.length; i++) {
        if ($scope.select_product_list[i]._id === product._id) {
          index = i;
          break;
        }
      }
      if (index === -1) {
        $scope.select_product_list.push(product);
      }
    }

    $scope.removeProduct = function (product) {
      var index = -1;
      for (var i = 0; i < $scope.select_product_list.length; i++) {
        if ($scope.select_product_list[i]._id === product._id) {
          index = i;
          break;
        }
      }
      if (index !== -1) {
        $scope.select_product_list.splice(index, 1);
      }
    }

    $scope.clickCard = function (card) {
      var index = -1;
      for (var i = 0; i < $scope.select_card_list.length; i++) {
        if ($scope.select_card_list[i]._id === card._id) {
          index = i;
          break;
        }
      }
      if (index === -1) {
        $scope.select_card_list.push(card);
      }
    }

    $scope.removeCard = function (card) {
      var index = -1;
      for (var i = 0; i < $scope.select_card_list.length; i++) {
        if ($scope.select_card_list[i]._id === card._id) {
          index = i;
          break;
        }
      }
      if (index !== -1) {
        $scope.select_card_list.splice(index, 1);
      }
    }

    $scope.updateVipInfo = function () {
      var productids = $scope.select_product_list.map(function (product) {
        return product._id;
      });
      var cardids = $scope.select_card_list.map(function (card) {
        return card._id;
      });


      UserNetwork.updateVipInfo($scope, {
        user_id: $stateParams.user_id, vip_info: {
          vip_report_url_text: $scope.user.vip_report_url_text,
          vip_product_ids: productids,
          vip_card_ids: cardids,
          vip_credit_starter: $scope.user.vip_credit_starter,
          vip_credit_assessment: $scope.user.vip_credit_assessment
        }
      }).then(function (data) {
        console.log(data);
        $state.go('user_detail', null, { reload: true });
      });
    }
    $scope.getVipStatus = function (status) {
      var map = {
        'un_submit': {
          text: '未递交材料'
        },
        'submit': {
          text: '已递交材料'
        },
        'passed': {
          text: '审核通过'
        }
      }
      return map[status].text;
    }
    $scope.getUserById();


  }]);

/**
 * Created by lance on 2016/11/17.
 */
'use strict';

cSite.controller('UserListController', [
  '$rootScope', '$scope', '$state', '$stateParams', 'UserNetwork',
  function ($rootScope, $scope, $state, $stateParams, UserNetwork) {
    $scope.goDetail = function (user) {
      $state.go('user_detail', { user_id: user._id });
    }
    $scope.user_list = [];
    $scope.userList = function () {
      UserNetwork.userList($scope, {}).then(function (data) {
        console.log(data);
        if (!data.err) {
          $scope.user_list = data;
        }
      }, function (err) {
        console.log(err);
      });
    };

    $scope.userList();

    $scope.getVipStatus = function (status) {
      var map = {
        'un_submit': {
          text: '未递交材料'
        },
        'submit': {
          text: '已递交材料'
        },
        'passed': {
          text: '审核通过'
        }
      }
      return map[status].text;
    }
  }]);

/**
 * Created by lance on 2016/11/17.
 */
'use strict';

cSite.controller('UserPbcDetailController', [
  '$rootScope', '$scope', '$state', '$stateParams', 'UserNetwork', 'ProductNetwork', 'CardNetwork',
  function ($rootScope, $scope, $state, $stateParams, UserNetwork, ProductNetwork, CardNetwork) {
    // $scope.goDetail = function (id) {
    //     $state.go('product_detail', { product_id: id||'' });
    // }

    function syntaxHighlight(json) {
      if (typeof json != 'string') {
        json = JSON.stringify(json, undefined, 2);
      }
      json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = 'key';
          } else {
            cls = 'string';
          }
        } else if (/true|false/.test(match)) {
          cls = 'boolean';
        } else if (/null/.test(match)) {
          cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
      });
    }
    $scope.user = {};
    $scope.getUserById = function () {
      UserNetwork.getUserById($scope, { user_id: $stateParams.user_id }).then(function (data) {
        console.log(data);
        if (!data.err) {
          if (data.pbc_detail) {
            data.pbc_detail = syntaxHighlight(JSON.parse(data.pbc_detail));
          }
          $scope.user = data;

          $('.id_pbc_detail').append(data.pbc_detail);
          $('.id_pbc_detail').html($('.id_pbc_detail').text());
        }
      }, function (err) {
        console.log(err);
      });
    };

    $scope.getUserById();


  }]);

/**
 * Created by lance on 2016/11/17.
 */
'use strict';

cSite.controller('UserVipReportController', [
  '$rootScope', '$scope', '$state', '$stateParams', 'UserNetwork', 'ProductNetwork', 'CardNetwork',
  function ($rootScope, $scope, $state, $stateParams, UserNetwork, ProductNetwork, CardNetwork) {
    $scope.user = {};
    $scope.getUserById = function () {
      UserNetwork.getUserById($scope, { user_id: $stateParams.user_id }).then(function (data) {
        console.log(data);
        if (!data.err) {
          $scope.user = data;
          $scope.user.vip_report = $scope.user.vip_report || {};
        }
      }, function (err) {
        console.log(err);
      });
    };

    $scope.updateVipReportInfo = function () {
      UserNetwork.updateVipReportInfo($scope, {
        user_id: $stateParams.user_id, vip_report: $scope.user.vip_report
      }).then(function (data) {
        console.log(data);
        $state.go('user_vip_detail', null, { reload: true });
      });
    }
    $scope.getUserById();
  }]);
