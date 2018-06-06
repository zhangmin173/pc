/*
 * @Author: Zhang Min 
 * @Date: 2018-06-01 08:35:53 
 * @Last Modified by: Zhang Min
 * @Last Modified time: 2018-06-06 20:34:34
 */

import Toolkit from '../../../../components/toolkit';
import Template from '../../../../../public/libs/artTemplate/index';

$(function () {
    class Index {
        constructor() {

            this.init()
        }
        init() {
            layui.table.render({
                elem: '#tablePage',
                height: 500,
                url: '/category/page',
                page: true,
                cols: [
                    [
                        { field: 'id', title: 'ID', width: 80, sort: true },
                        { field: 'category_icon', title: '栏目icon', width: 200 },
                        { field: 'category_title', title: '栏目名称' },
                        { title: '操作', fixed: 'right', width: 180, align: 'center', toolbar: '#tableBar' }
                    ]
                ]
            });
            layui.table.on('tool(tablePage)', obj => {
                const row = obj.data; // 获得当前行数据
                const layEvent = obj.event; // 获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
                const tr = obj.tr; // 获得当前行 tr 的DOM对象
                if (layEvent === 'detail') { //查看
                    this.detail(row);
                } else if (layEvent === 'del') { //删除
                    layer.confirm('真的删除行么', index => {
                        layer.close(index);
                        this.del(row, () => {
                            obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
                        });
                    });
                } else if (layEvent === 'edit') { //编辑
                    this.edit(row, obj);
                }
            });
        }
        detail(row) {
            window.open('../detail/index.html?id=' + row.id);
        }
        edit(row, obj) {
            const content = Template('tpl', row);
            const layerIndex = layer.open({
                type: 1,
                title: '编辑',
                closeBtn: 0,
                area: '800px',
                shadeClose: true,
                content
            });
            layer.full(layerIndex);

            layui.form.on('submit(editForm)', form => {
                const formData = form.field;
                if (!formData.paraent_id) {
                    formData.paraent_id = 0;
                }
                console.log(formData);
                this.update(formData, () => {
                    obj.update(formData);
                    layer.close(layerIndex);
                })
                return false;
            });

        }
        update(data, cb) {
            Toolkit.ajax({
                url: '/category/update',
                data,
                success: res => {
                    if (res.success) {
                        cb && cb(res);
                    } else {
                        layer.msg(res.msg);
                    }
                }
            })
        }
        del(row, cb) {
            Toolkit.ajax({
                url: '/article/delete',
                data: {
                    id: row.id
                },
                success: res => {
                    if (res.success) {
                        cb && cb(res);
                    } else {
                        layer.msg(res.msg);
                    }
                }
            })
        }
        getcategory(querys, cb) {
            Toolkit.ajax({
                url: '/Category/all',
                data: querys,
                success: res => {
                    if (res.success) {
                        cb && cb(res.data);
                    }
                }
            })
        }
    }

    new Index();

})