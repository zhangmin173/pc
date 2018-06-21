/*
 * @Author: Zhang Min 
 * @Date: 2018-06-01 08:35:53 
 * @Last Modified by: Zhang Min
 * @Last Modified time: 2018-06-21 23:15:18
 */

import Toolkit from '../../../../components/toolkit';
import Template from '../../../../../public/libs/artTemplate/index';

import '../../../../common/css/_tree.less';

$(function () {
    class Index {
        constructor() {

            this.init()
        }
        init() {
            const _this = this;
            
            this.getcategoryTree({
                
            }, data => {
                this.categoryData = data;
                const htmlStr = Template('tpl-tree', { data });
                $('.tree-components').html(htmlStr);
            })

            $('#add').on('click', () => {
                this.edit({}, false);
            })

            $('.tree-components').on('click', '.edit', function() {
                const id = $(this).data('id');
                const type = $(this).data('type');
                const data = _this.getcategoryById(id, type);
                _this.edit(data);
            })
        }
        edit(row, obj) {
            const content = Template('tpl', row);
            const layerIndex = layer.open({
                type: 1,
                title: '编辑',
                closeBtn: 1,
                area: '800px',
                shadeClose: true,
                content
            });
            layer.full(layerIndex);
            this.getcategory({
                paraent_id: 0
            }, data => {
                const htmlStr = Template('tpl1', { data });
                $('#paraent_id').html(htmlStr);
                $("#paraent_id").val(row.paraent_id);
                layui.form.render('select');
            })

            layui.form.on('submit(editForm)', form => {
                const formData = form.field;
                if (!formData.paraent_id) {
                    formData.paraent_id = 0;
                }
                console.log(formData);
                if (formData.id) {
                    this.update(formData, () => {
                        layer.close(layerIndex);
                        window.location.reload();
                    })
                } else {
                    delete formData.id;
                    this.add(formData, () => {
                        layer.close(layerIndex);
                        window.location.reload();
                    })
                }
                return false;
            });

        }
        add(data, cb) {
            Toolkit.ajax({
                url: '/category/add',
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
        getcategoryTree(querys, cb) {
            Toolkit.ajax({
                url: '/Category/tree',
                data: querys,
                success: res => {
                    if (res.success) {
                        cb && cb(res.data);
                    }
                }
            })
        }
        getcategoryById(id, type) {
            let data;
            if (type === 'paraent') {
                for (let index = 0; index < this.categoryData.length; index++) {
                    const item = this.categoryData[index];
                    if (item.id === id) {
                        data = item;
                        break;
                    }
                }
            } else {
                for (let index = 0; index < this.categoryData.length; index++) {
                    const item = this.categoryData[index];
                    for (let index = 0; index < item.child.length; index++) {
                        const c = item.child[index];
                        if (c.id === id) {
                            data = c;
                            break;
                        }
                    }
                }
            }
            return data;
        }
    }

    new Index();

})