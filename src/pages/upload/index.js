/*
 * @Author: Zhang Min 
 * @Date: 2018-04-28 08:57:30 
 * @Last Modified by: Zhang Min
 * @Last Modified time: 2018-07-14 12:10:30
 */

import Toolkit from '../../components/toolkit';
import './index.less';

$(function () {
    class Index {
        constructor() {
            
            this.typelist = this.getTypes();

            this.init();
        }
        init() {
            this.createDom(this.typelist);
            Toolkit.uploadInit('file',data => {
                this.filePath = data.file_path;
                $('.tip').text('上传成功');
            })

            this.event();
        }
        event() {
            // 提交
            let isAdd = false;
            $('#addBtn').on('click', () => {
                if (isAdd) {
                    return false;
                }
                isAdd = true;
                const data = {
                    name: $('#name').val(),
                    mobile: $('#mobile').val(),
                    type: $('#type').val(),
                    file: this.filePath
                }
                console.log(data);
                if (!data.name || !data.mobile || data.mobile.length !== 11 || !data.file) {
                    alert('所有选项必须填写噢');
                    isAdd = false;
                    return false;
                }

                this.add(data);
                
            })
        }
        add(data) {
            Toolkit.ajax({
                url: '/form/add',
                data,
                success: res => {
                    alert('提交成功');
                }
            })
        }
        createDom(arr) {
            let htmlStr = '<option value="0">请选择</option>';
            for (let index = 0; index < arr.length; index++) {
                const val = arr[index];
                htmlStr += `<option value="${val}">${val}</option>`;
            }
            $('#type').append(htmlStr);
        }
        getTypes() {
            const str = '中共界、妇联界、共青团界、工会界、侨联界、台联界、民宗界、教育界、科技界、卫生界、文体新界、经济界、工商联界、农业界、社会福利界、特邀界';
            const arr = str.split('、');
            console.log(arr);
            return arr;
        }
    }

    new Index()
});
