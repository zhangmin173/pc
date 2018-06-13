/*
 * @Author: Zhang Min 
 * @Date: 2018-06-01 08:35:53 
 * @Last Modified by: Zhang Min
 * @Last Modified time: 2018-06-13 08:45:38
 */

import './index.less';

$(function() {
    class Index {
        constructor() {

            this.init()
        }
        init() {
            layui.form.on('submit(loginForm)', form => {
                const formData = form.field;
                this.login(formData);
                return false;
            });
        }
        login() {
            window.location.href = '../article/list/index.html';
        }
    }

    new Index();

})