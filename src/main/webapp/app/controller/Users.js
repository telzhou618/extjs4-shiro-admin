/**
 * Created by jameszhou on 2017/8/9.
 */
Ext.define('AM.controller.Users', {
    extend: 'AM.ux.GridController',

    views: [
        'user.List',
        'user.Form'
    ],
    stores: [
        'Users'
    ],
    models: ['User'],

    init: function() {
        var me = this;
        this.control({
            //渲染事件
            'userlist': {
                render:'renderAction',
                itemdblclick: 'viewRowAction'
            },

            //新增事件
            'userlist button[action=add]':{
                click:function (b) {
                    var win = Ext.create("AM.ux.Window",{
                        title:'新增用户',
                        items:[{xtype:'userform'}],
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
                                    Ext.create("AM.ux.Action").submit(win.down("form"),_Api+"/user/add",b.up('grid'),win,{rids:arrs});
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
                        ],
                        listeners:{
                            render:function () {
                                var tree = this.down('form').down('treepanel');
                                tree.getStore().load({
                                    callback:function () {
                                        tree.getRootNode().expand();
                                    }
                                });
                            }
                        }
                    });
                }
            },
            //批量删除
            'userlist button[action=remove]':{
                click:function (btn) {
                    me.removeBatchAction(_Api+"/user/delete",btn.up("grid"));
                }
            },
            //搜索
            'userlist textfield[action=search]':{
                specialkey: function(field,e){
                    if (e.getKey()==Ext.EventObject.ENTER){
                        Ext.create("AM.ux.Action").search(field.up("grid"),{search:field.getValue()});
                    }
                }
            },

            //行编辑事件
            'userlist actioncolumn':{
                //行删除
                deleteRow:function (grid, record) {
                    me.removeRowAction(_Api+"/user/delete",{ids:record.get("id")},grid);
                },
                //行编辑
                editRow:function (grid, record) {
                    var win = Ext.create("AM.ux.Window",{
                        title:'编辑用户',
                        items:[{xtype:'userform'}],
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
                                    Ext.create("AM.ux.Action").submit(win.down("form"),_Api+"/user/edit",grid,win,{rids:arrs});
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
                                var form = this.down("form").down('ux-form');
                                form.loadRecord(record);
                                form.down("textfield#userName").setReadOnly(true);
                                form.remove("password");
                                form.remove("confPassword");
                            },
                            render:function () {
                                var tree = this.down('form').down('treepanel');
                                tree.getStore().load({
                                    params:{
                                        uid:record.get('id')
                                    },
                                    callback:function () {
                                        tree.getRootNode().expand();
                                    }
                                });
                            }
                        }
                    })
                },
                //重置密码
                rePwd:function (grid, record) {
                    Ext.Msg.prompt("重置密码","正在重置[<font color='red'>"+record.get("userName")+"</font>]用户的密码?",function(btn,text){
                        var win = this;
                        if(btn=="ok"){
                            Ext.create("AM.ux.Action").doAction({
                                url:'/user/repwd',
                                params:{'id':record.get("id"),'pwd':text},
                                grid:grid,
                                win:win
                            });
                        }
                    });
                }
            }
        });
    }
});
