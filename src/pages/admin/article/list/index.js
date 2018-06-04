/*
 * @Author: Zhang Min 
 * @Date: 2018-06-01 08:35:53 
 * @Last Modified by: Zhang Min
 * @Last Modified time: 2018-06-04 09:10:22
 */

import Toolkit from '../../../../components/toolkit';

$(function () {
    class Index {
        constructor() {

            this.init()
        }
        init() {

            layui.table.render({
                elem: '#tablePage',
                height: 500,
                url: '/article/page',
                page: true,
                cols: [
                    [
                        { field: 'id', title: 'ID', width: 80, sort: true },
                        { field: 'title', title: '标题', width: 200 },
                        { field: 'summary', title: '概要' },
                        { field: 'author', title: '作者', width: 150 },
                        { title: '操作', fixed: 'right', width: 180, align: 'center', toolbar: '#tableBar' }
                    ]
                ]
            });
            layui.table.on('tool(tablePage)', function (obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
                var data = obj.data; //获得当前行数据
                var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
                var tr = obj.tr; //获得当前行 tr 的DOM对象

                if (layEvent === 'detail') { //查看
                    //do somehing
                } else if (layEvent === 'del') { //删除
                    layer.confirm('真的删除行么', function (index) {
                        obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
                        layer.close(index);
                        //向服务端发送删除指令
                    });
                } else if (layEvent === 'edit') { //编辑
                    //do something

                    //同步更新缓存对应的值
                    obj.update({
                        username: '123'
                        , title: 'xxx'
                    });
                }
            });
        }
    }

    new Index();

})