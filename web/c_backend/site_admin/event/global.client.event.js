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
