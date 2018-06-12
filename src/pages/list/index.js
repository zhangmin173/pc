/*
 * @Author: Zhang Min 
 * @Date: 2018-04-28 08:57:30 
 * @Last Modified by: Zhang Min
 * @Last Modified time: 2018-06-12 22:49:02
 */

import Toolkit from '../../components/toolkit';
import './index.less';

$(function () {
    class Index {
        constructor() {

            this.init();
        }
        init() {
            this.getList(data => {
                let htmlStr = `<li class="list-item">
                    <span class="name">姓名</span>
                    <span class="mobile">手机号</span>
                    <span class="type">界别</span>
                    <a class="file" href="##">点击下载提案</a>
                </li>`;
                for (let index = 0; index < data.length; index++) {
                    const item = data[index];
                    htmlStr += `<li class="list-item">
                        <span class="name">${item.name}</span>
                        <span class="mobile">${item.mobile}</span>
                        <span class="type">${item.type}</span>
                        <a class="file" href="${item.file}">点击下载提案</a>
                    </li>`;
                }
                $('#list').append(htmlStr);
            });
        }
        getList(cb) {
            Toolkit.ajax({
                url: '/form/all',
                success: res => {
                    if (res.success) {
                        cb && cb(res.data)
                    } else {
                        alert(res.msg);
                    }
                }
            })
        }
    }

    new Index()
});
