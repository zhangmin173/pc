/*
 * @Author: Zhang Min 
 * @Date: 2018-06-01 08:35:53 
 * @Last Modified by: Zhang Min
 * @Last Modified time: 2018-06-23 12:12:36
 */

import Toolkit from '../../../components/toolkit';
import Template from '../../../../public/libs/artTemplate/index';
import './index.less';

$(function() {
    class Index {
        constructor() {

            this.init()
        }
        init() {

            this.getInfo(data => {
                const htmlStr = Template('tpl', data);
                    $('#app').html(htmlStr);
                    layui.form.render();
                    layui.upload.render({
                        elem: '#uploadWebLogo',
                        url: '/upload/add',
                        field: 'postFile',
                        done: function (res) {
                            if (res.success) {
                                $('#webLogo').val(res.data.file_path);
                                $('#webLogoView').attr('src', res.data.file_path);
                            }
                        }
                    });
                    layui.upload.render({
                        elem: '#uploadWebHeadBg',
                        url: '/upload/add',
                        field: 'postFile',
                        done: function (res) {
                            if (res.success) {
                                $('#webHeadBg').val(res.data.file_path);
                                $('#webHeadBgView').attr('src', res.data.file_path);
                            }
                        }
                    });
                    layui.form.on('submit(editForm)', form => {
                        const formData = form.field;
                        delete formData.postFile;
                        this.update(formData);
                        return false;
                    });
            })
        }
        getInfo(cb) {
            Toolkit.ajax({
                url: '/web/get',
                success: res => {
                    if (res.success) {
                        cb && cb(res.data);
                    }
                }
            })
        }
        update(data) {
            Toolkit.ajax({
                url: '/web/update',
                data,
                success: res => {
                    if (res.success) {
                        window.location.reload();
                    }
                }
            })  
        }
    }

    new Index();

})