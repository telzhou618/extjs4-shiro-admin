/**
 * Created by jameszhou on 2017/8/9.
 */
Ext.define('AM.controller.MenuController', {
    extend: 'AM.ux.GridController',

    views: [
        'menu.TreeMenu',
        'menu.MenuForm'
    ],
    stores: [
        'MenuStore'
    ],
    models: [],

    init: function() {
        var me = this;
        this.control({
            //新增事件
            'treemenu button[action=add]':{
                click:function (b) {
                    var win = Ext.create("AM.ux.Window",{
                        title:'新增菜单',
                        items:[{xtype:'menuform'}],
                        buttons:[
                            {
                                text:'保存',
                                handler:function (btn) {
                                    var ct = win.down("form").down('comboboxtree#pid');
                                    var pid = ct.getExtValue();
                                    Ext.create("AM.ux.Action").submit(win.down("form"),_Api+"/menu/add",b.up('treepanel'),win,{pid:pid});
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
            //行编辑事件
            'treemenu actioncolumn':{
                //行删除
                deleteRow:function (grid, record) {
                    me.removeRowAction(_Api+"/menu/delete",{ids:record.get("id")},grid);
                },
                //行编辑
                editRow:function (grid, record) {
                    var win = Ext.create("AM.ux.Window",{
                        title:'编辑菜单',
                        items:[{xtype:'menuform'}],
                        buttons:[
                            {
                                text:'保存',
                                handler:function (btn) {
                                    var ct = win.down("form").down('comboboxtree#pid');
                                    var pid = ct.getExtValue();
                                    Ext.create("AM.ux.Action").submit(win.down("form"),_Api+"/menu/edit",grid,win);
                                }
                            },{
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
                                var ct = form.down('comboboxtree#pid');
                                ct.setExtValue(record.get('pid'));
                                ct.setValue(record.get('pid'));
                                ct.setVisible(false);
                            }
                        }
                    })
                }
            }
        });
    }
});
