/*
 * @Author: Zhang Min 
 * @Date: 2018-06-22 08:19:27 
 * @Last Modified by: Zhang Min
 * @Last Modified time: 2018-06-23 12:18:07
 */

import Toolkit from '../toolkit';
import './index.less';

const h5 = {
    init(cb) {
        this.getWeb(data => {
            let htmlStr = `<header class="web-header"><a href="../home/index.html">${data.web_organization}</a></header>
            <nav class="web-nav" style="background-image:url('${data.web_head_bg}')">
              <a class="title" href="../home/index.html">${data.web_title}</a>
            </nav>`;
            this.getMenu(menus => {
                htmlStr += '<ul class="web-menu">';
                for (let index = 0; index < 2; index++) {
                    const item = menus[index];
                    htmlStr += `<li><a href="../article/index.html?cid=${item.id}&cname=${item.category_title}">${item.category_title}</a></li>`;
                }
                htmlStr += '</ul>';
                $('#head-components').html(htmlStr);
                cb && cb(menus, data);
            })

            $('#copyright-components').text(data.web_copyright);
        })
        
    },
    getWeb(cb) {
        Toolkit.fetch({
            url: '/home/web/get',
            success: res => {
                if (res.success) {
                    cb && cb(res.data)
                }
            }
        })
    },
    getMenu(cb) {
        Toolkit.fetch({
            url: '/category/all',
            data: {
                paraent_id: 1,
                order: 'id'
            },
            success: res => {
                if (res.success) {
                    cb && cb(res.data)
                }
            }
        })
    }
}
export default h5