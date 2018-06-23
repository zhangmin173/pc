/*
 * @Author: Zhang Min 
 * @Date: 2018-06-14 01:02:04 
 * @Last Modified by: Zhang Min
 * @Last Modified time: 2018-06-23 11:02:43
 */

import H5 from '../../../components/h5/index';
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
                H5.init(category => {
                    this.getArticle(category[0].id, data => {
                        const htmlStr = Template('tpl-block1', { data, category: category[0] });
                        $('.left').html(htmlStr);
                    })
                    this.getArticle(category[1].id, data => {
                        const htmlStr = Template('tpl-block2', { data, category: category[1] });
                        $('.right').html(htmlStr);
                        $('.right .title').text(category[1].category_title);
                    })
                    this.getArticle(category[2].id, data => {
                        const htmlStr = Template('tpl-qiye', { data });
                        $('.qiye-list').html(htmlStr);
                        $('.qiye-title').text(category[2].category_title);
                    })
                });
            }
            getArticle(category_id, cb) {
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
        }
    
        new Index();
    
    })
})