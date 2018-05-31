/*
 * @Author: 张敏 
 * @Date: 2018-04-17 08:41:11 
 * @Last Modified by: Zhang Min
 * @Last Modified time: 2018-05-31 21:54:07
 */

/**
 * 工具类函数
 */
const Toolkit = (function () {
  return {
    /**
     * ajax请求
     * @param {ajax参数} options 
     */
    ajax(options) {
      let _default = {
        url: options.url,
        type: options.type || 'post',
        data: options.data || {},
        success: (res) => {
          // console.log(res);
          options.success && options.success(res);
        },
        error: (err) => {
          options.error && options.error(err);
        },
        complete: () => {
          options.complete && options.complete();
        }
      };
      if (window.location.href.indexOf('admin.nextdog.cc') > -1) {
        _default.url = 'http://admin.nextdog.cc/Projects/WuYe/index.php/home' + _default.url
      }
      $.ajax(_default);
    },
    /**
     * 用户登陆
     */
    userLogin(cb) {
      window._global = window._global || {};
      if (!window._global.userinfo) {
        this.fetch({
          url: '/User/createUser',
          data: {
            visitUrl: window.location.href
          },
          success: res => {
            if (res.success) {
              window._global.userinfo = res.data;
              cb && cb(res.data);
            } else {
              window.location.href = res.data;
            }
          }
        })
      } else {
        cb && cb(window._global.userinfo);
      }
    },
    /**
     * 上传初始化
     * @param {*} obj 
     * @param {*} cb 
     * @param {*} key 
     * @param {*} type 
     */
    uploadInit(obj, cb, type = 'assets', url = '/upload/add') {
      $("#" + obj).uploadifive({
        formData: { type: type },
        fileObjName: 'postedFile',
        removeCompleted: true,
        fileSizeLimit: '2048KB',
        buttonClass: 'upload-components',
        uploadScript: url,
        buttonText: '请选择文件',
        onUploadComplete: (file, res, response) => {
          res = $.parseJSON(res);
          if (res.success) {
            cb && cb(res.data);
          } else {
            console.error('上传失败');
          }
        }
      })
    },
    /**
     * 获取url参数
     * @param {参数名称} name 
     * @param {utl地址} path 
     */
    getUrlParameter(name, path = window.location.href) {
      const result = decodeURIComponent((new RegExp('[?|&]' + name + '=([^&;]+?)(&|#|;|$)').exec(path) || [undefined, ''])[1].replace(/\+/g, '%20')) || null;
      return result ? result.split('/')[0] : '';
    },
    /**
     * 手机号隐藏4位
     * @param {手机号} tel 
     */
    mobile2show(tel) {
      return tel.substr(0, 3) + '****' + tel.substr(7);;
    },
    /**
     * 获取腾讯地图key
     */
    getMapInfo() {
      return {
        key: 'YL2BZ-2MRLU-HG7VH-B46PY-DMJW3-55FCV',
        app: 'xiongwei'
      };
    }
  }
})();
export default Toolkit