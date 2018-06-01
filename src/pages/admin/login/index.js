/*
 * @Author: Zhang Min 
 * @Date: 2018-06-01 08:35:53 
 * @Last Modified by: Zhang Min
 * @Last Modified time: 2018-06-01 09:18:33
 */

import './index.less';

$(function() {
    console.log(layui);
    const element = layui.element;
    element.init();
    const form = layui.form;
    //form.render();

    class Index {
        constructor() {

            this.init()
        }
        init() {

        }
    }

    new Index();

})