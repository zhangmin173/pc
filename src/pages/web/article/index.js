/*
 * @Author: Zhang Min 
 * @Date: 2018-06-14 01:02:04 
 * @Last Modified by: Zhang Min
 * @Last Modified time: 2018-06-23 12:20:35
 */

import H5 from '../../../components/h5/index';
import Toolkit from '../../../components/toolkit';
import Template from '../../../../public/libs/artTemplate/index';
import './index.less';

$(() => {
    $(function() {
        class Index {
            constructor() {
                this.id = Toolkit.getUrlParameter('id');
                this.cid = Toolkit.getUrlParameter('cid');
                this.cname = Toolkit.getUrlParameter('cname');
                this.init();
            }
            init() {
                H5.init();
                if (this.id) {
                    this.getArticleList(this.cid, data => {
                        const category = {
                            id: this.cid,
                            name: this.cname
                        };
                        const htmlStr = Template('tpl-left', { data, category, activeId: this.id });
                        $('.left').html(htmlStr);
                    })
                    this.getArticle(this.id, data => {
                        Template.defaults.escape = false;
                        const htmlStr = Template('tpl-article', data);
                        $('.right').html(htmlStr);
                    })
                } else {
                    this.getArticleList(this.cid, data => {
                        const category = {
                            id: this.cid,
                            name: this.cname
                        };
                        const htmlStr = Template('tpl-left', { data, category, activeId: data[0].id });
                        $('.left').html(htmlStr);
                        this.getArticle(data[0].id, data => {
                            Template.defaults.escape = false;
                            const htmlStr = Template('tpl-article', data);
                            $('.right').html(htmlStr);
                        })
                    })
                }
                
            }
            getArticleList(category_id, cb) {
                Toolkit.fetch({
                    url: '/home/article/all',
                    data: {
                        category_id
                    },
                    success: res => {
                        if (res.success) {
                            cb && cb(res.data)
                        }
                    }
                })
            }
            getArticle(id, cb) {
                Toolkit.fetch({
                    url: '/home/article/get',
                    data: {
                        id
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