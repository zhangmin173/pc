!function(e){var t={};function n(o){if(t[o])return t[o].exports;var i=t[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:o})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="http://nextdog.cc/pc/",n(n.s="gke3")}({CHjh:function(e,t){},R7dQ:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o={ajax:function(e){var t={url:e.url,type:e.type||"post",data:e.data||{},success:function(t){e.success&&e.success(t)},error:function(t){e.error&&e.error(t)},complete:function(){e.complete&&e.complete()}};window.location.href.indexOf("admin.nextdog.cc")>-1&&(t.url="http://nextdog.cc"+t.url),$.ajax(t)},userLogin:function(e){window._global=window._global||{},window._global.userinfo?e&&e(window._global.userinfo):this.fetch({url:"/User/createUser",data:{visitUrl:window.location.href},success:function(t){t.success?(window._global.userinfo=t.data,e&&e(t.data)):window.location.href=t.data}})},uploadInit:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"assets",o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"http://nextdog.cc/upload/add";$("#"+e).uploadifive({formData:{type:n},fileObjName:"postFile",removeCompleted:!0,fileSizeLimit:"2048KB",buttonClass:"upload-components",uploadScript:o,buttonText:"请选择文件",onUploadComplete:function(e,n,o){(n=$.parseJSON(n)).success?t&&t(n.data):console.error("上传失败")}})},getUrlParameter:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:window.location.href,n=decodeURIComponent((new RegExp("[?|&]"+e+"=([^&;]+?)(&|#|;|$)").exec(t)||[void 0,""])[1].replace(/\+/g,"%20"))||null;return n?n.split("/")[0]:""},mobile2show:function(e){return e.substr(0,3)+"****"+e.substr(7)},getMapInfo:function(){return{key:"YL2BZ-2MRLU-HG7VH-B46PY-DMJW3-55FCV",app:"xiongwei"}}};t.default=o},gke3:function(e,t,n){"use strict";var o,i=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),r=n("R7dQ"),a=(o=r)&&o.__esModule?o:{default:o};n("CHjh"),$(function(){new(function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.typelist=this.getTypes(),this.init()}return i(e,[{key:"init",value:function(){var e=this;this.createDom(this.typelist),a.default.uploadInit("file",function(t){e.filePath=t.file_path}),this.event()}},{key:"event",value:function(){var e=this,t=!1;$("#addBtn").on("click",function(){if(t)return!1;t=!0;var n={name:$("#name").val(),mobile:$("#mobile").val(),type:$("#type").val(),file:e.filePath};if(console.log(n),!n.name||!n.mobile||11!==n.mobile.length||!n.file)return alert("所有选项必须填写噢"),t=!1,!1;e.add(n)})}},{key:"add",value:function(e){a.default.ajax({url:"/form/add",data:e,success:function(e){alert("提交成功")}})}},{key:"createDom",value:function(e){for(var t="",n=0;n<e.length;n++){var o=e[n];t+='<option value="'+o+'">'+o+"</option>"}$("#type").append(t)}},{key:"getTypes",value:function(){var e="中共界、妇联界、共青团界、工会界、侨联界、台联界、民宗界、教育界、科技界、卫生界、文体新界、经济界、工商联界、农业界、社会福利界、特邀界".split("、");return console.log(e),e}}]),e}())})}});