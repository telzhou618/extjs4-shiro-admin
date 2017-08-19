/**
 * Created by jameszhou on 2017/8/9.
 */
Ext.define('AM.controller.RoleController', {
    extend: 'AM.ux.GridController',

    views: [
        'role.List',
        'role.Form',
        'role.AuthForm'
    ],
    stores: [
        'RoleStore'
    ],
    models: ['Role'],

    init: function() {
        var me = this;
        this.control({
            //渲染事件
            'rolelist': {
                render:'renderAction',
                itemdblclick: 'viewRowAction'
            },

            //新增事件
            'rolelist button[action=add]':{
                click:function (b) {
                    var win = Ext.create("AM.ux.Window",{
                        title:'新增用户',
                        items:[{xtype:'roleform'}],
                        buttons:[
                            {
                                text:'保存',
                                handler:function (btn) {
                                    Ext.create("AM.ux.Action").submit(win.down("form"),_Api+"/role/add",b.up('grid'),win);
                                }
                            },
                            {
                                text:'重置',handler:function (btn) {
                                btn.up("window").down("form").form.reset();
                            }
                            },{
                                text:'取消',handler:function (btn) {
                                    btn.up("window").close();
                                }
                            }
                        ]
                    });
                }
            },
            //批量删除
            'rolelist button[action=remove]':{
                click:function (btn) {
                    me.removeBatchAction(_Api+"/role/delete",btn.up("grid"));
                }
            },
            //搜索
            'rolelist textfield[action=search]':{
                specialkey: function(field,e){
                    if (e.getKey()==Ext.EventObject.ENTER){
                        Ext.create("AM.ux.Action").search(field.up("grid"),{search:field.getValue()});
                    }
                }
            },
            //行编辑事件
            'rolelist actioncolumn':{
                //行删除
                deleteRow:function (grid, record) {
                    me.removeRowAction(_Api+"/role/delete",{ids:record.get("id")},grid);
                },
                //行编辑
                editRow:function (grid, record) {
                    var win = Ext.create("AM.ux.Window",{
                        title:'编辑角色',
                        items:[{xtype:'roleform'}],
                        buttons:[
                            {
                                text:'保存',
                                handler:function (btn) {
                                    Ext.create("AM.ux.Action").submit(win.down("form"),_Api+"/role/edit",grid,win);
                                }
                            },
                            {
                                text:'重置',handler:function (btn) {
                                win.down("form").loadRecord(record);
                            }
                            },{
                                text:'取消',handler:function (btn) {
                                    win.close();
                                }
                            }
                        ],
                        listeners:{
                            show:function () {
                                var form = this.down("form");
                                form.loadRecord(record);
                            }
                        }
                    })
                },

                'authRow' : function (grid,record) {

                    var win = Ext.create("AM.ux.Window",{
                        title:'分配权限['+record.get('roleName')+']',
                        items:[ {
                                xtype:'authform'
                            }],
                        buttons:[
                            {
                                text:'保存',
                                handler:function (btn) {

                                    var tree = win.down('treepanel');
                                    var checks = tree.getChecked();
                                    var arrs = [];
                                    Ext.Array.forEach(checks,function (node) {
                                        if(node.data.id!='root'){
                                            Ext.Array.include(arrs,node.data.id);
                                        }
                                    });
                                   Ext.create("AM.ux.Action").doAction({
                                       url : _Api + '/role/doAuth',
                                       msg : "确定保存权限?",
                                       params:{rid:record.get('id'),menuIds:arrs},
                                       win:win
                                   });
                                }
                            },
                            {
                                text:'重置',handler:function (btn) {
                                var tree = win.down('treepanel');
                                tree.getStore().load({
                                    params:{
                                        rid:record.get('id')
                                    },
                                    callback:function () {
                                        tree.getRootNode().expand();
                                    }
                                });
                            }
                            },{
                                text:'取消',handler:function (btn) {
                                    win.close();
                                }
                            }
                        ],
                        listeners:{
                            show:function () {
                                var tree = this.down('treepanel');
                                tree.getStore().load({
                                    params:{
                                        rid:record.get('id')
                                    },
                                    callback:function () {
                                        tree.getRootNode().expand();
                                    }
                                });
                            }
                        }
                    })
                }
            }
        });
    }
});
