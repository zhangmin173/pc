/*
 * @Author: Zhang Min 
 * @Date: 2018-06-14 01:02:04 
 * @Last Modified by: Zhang Min
 * @Last Modified time: 2018-06-21 21:59:37
 */

import Toolkit from '../../../components/toolkit';
import Template from '../../../../public/libs/artTemplate/index';
import './index.less';

$(() => {
    $(function() {
        class Index {
            constructor() {
                this.init()
            }
            init() {
    
                this.getWeb(data => {
                    $('title').text(data.web_title);
                    $('.web-header').text(data.web_organization);
                    $('.web-nav .title').text(data.web_title);
                })
                this.getcaterogy(data => {
                    this.categoryData = data;
                    const htmlStr = Template('tpl1', { data });
                    $('.menu').html(htmlStr);
                })
            }
            getWeb(cb) {
                Toolkit.fetch({
                    url: '/home/web/get',
                    success: res => {
                        if (res.success) {
                            cb && cb(res.data)
                        }
                    }
                })
            }
            getBlock1(cb) {
                Toolkit.fetch({
                    url: '/home/article/page',
                    success: res => {
                        if (res.success) {
                            cb && cb(res.data)
                        }
                    }
                })
            }
            getBlock2(cb) {
                Toolkit.fetch({
                    url: '/home/article/page',
                    success: res => {
                        if (res.success) {
                            cb && cb(res.data)
                        }
                    }
                })
            }
            getcaterogy(cb) {
                Toolkit.fetch({
                    url: '/category/all',
                    data: {
                        paraent_id: 0
                    },
                    success: res => {
                        if (res.success) {
                            cb && cb(res.data)
                        }
                    }
                })
            }
        }
    
        new Index();
    
    })
})