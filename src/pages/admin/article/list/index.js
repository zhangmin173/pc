/*
 * @Author: Zhang Min 
 * @Date: 2018-06-01 08:35:53 
 * @Last Modified by: Zhang Min
 * @Last Modified time: 2018-06-06 09:01:16
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

            this.getcategory({
                paraent_id: 0
            }, data => {
                this.categoryParaent = data;
            })
        }
        detail(row) {
            window.open('../detail/index.html?id=' + row.id);
        }
        edit(row, obj) {
            row.categoryParaent = this.categoryParaent;
            const content = Template('tpl', row);
            const layerIndex = layer.open({
                type: 1,
                title: '编辑',
                closeBtn: 0,
                area: '800px',
                shadeClose: true,
                content
            });
            layui.form.render();
            layui.laydate.render({
                elem: '#laydate' //指定元素
            });
            const editor = this.initEditor();
            editor.txt.html(row.content);

            let category_parent_id = 0;
            layui.form.on('select(category_parent_id)', data => {
                category_parent_id = data.value;
                this.getcategory({
                    paraent_id: category_parent_id
                }, data => {
                    const htmlStr = Template('tpl1', { data });
                    $('#category_id').html(htmlStr);
                    layui.form.render();
                })
            });

            layui.form.on('submit(editForm)', form => {
                const formData = form.field;
                formData.content = editor.txt.html();
                if (category_parent_id) {
                    formData.category_parent_id = category_parent_id;
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
                url: '/article/update',
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
        initEditor(id = '#editor') {
            const E = window.wangEditor;
            const editor = new E(id);
            editor.customConfig.menus = [
                'head',  // 标题
                'bold',  // 粗体
                'fontSize',  // 字号
                'italic',  // 斜体
                'underline',  // 下划线
                'strikeThrough',  // 删除线
                'foreColor',  // 文字颜色
                'backColor',  // 背景颜色
                'link',  // 插入链接
                'list',  // 列表
                'justify',  // 对齐方式
                'emoticon',  // 表情
                'image',  // 插入图片
                'table',  // 表格
                'video',  // 插入视频
                'code',  // 插入代码
                'undo',  // 撤销
                'redo'  // 重复
            ]
            editor.customConfig.uploadImgShowBase64 = true;
            editor.create();
            return editor;
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