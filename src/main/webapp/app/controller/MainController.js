/**
 * Created by jameszhou on 2017/8/9.
 */
Ext.define('AM.controller.MainController', {
    extend: 'Ext.app.Controller',
    views: ['Main','Menu','Center','Welcome','ThemeSwitcher','Header'],
    stores: [],
    models: [],

    init: function() {
        this.control({
            'viewport > main': {

            },
            'menu': {
                render:'initMenu'
            },
            'menu > treepanel' :{
                itemclick: 'menuClick'
            }
        });
    },

    //初始化菜单
    initMenu:function (p) {
        var me = this;
        var myMask = new Ext.LoadMask(p, {msg:"Please wait..."});
        myMask.show();
        Ext.Ajax.request({
            url: '/menu/leftmenus',
            success: function(response, opts) {
               var obj = Ext.decode(response.responseText);
               if(obj.success){
                   var data = obj.data;
                   if(data){
                       Ext.Array.each(data, function(n, index, countriesItSelf) {
                           if(n.items){
                               p.add({
                                   xtype:'treepanel',
                                   title:n.text,
                                   rootVisible: false,
                                   layout:'fit',
                                   iconCls:n.iconCls || '',
                                   glyph:eval(n.glyph) || '',
                                   root: {
                                       expanded: true,
                                       children: n.items
                                   }
                               });
                           }
                       });
                   }
                   me.initTab(data);
                   myMask.hide();
               }else{
                   Ext.error(obj.msg);
               }
            },
            failure: function(response, opts) {
               Ext.error("loading error");
            }
        });
    },

    //菜单点击事件
    menuClick:function (tree, record) {
        this.addTabData(record.raw);
        location.hash = record.raw.xtype;
    },

    //初始化Tab
    initTab:function (data) {
        var me= this;
        var locs  = location.href.split('#');
        var _xtype = "welcome";
        if(locs.length>1 && locs[locs.length-1]!=''){
            _xtype = locs[locs.length-1];
        }
        var flag = false;
        Ext.Array.each(data, function(n, index, countriesItSelf) {
            Ext.Array.each(n.items, function(n1) {
                if(n1.xtype == _xtype){
                    me.addTabData(n1);
                    flag = true;
                    return;
                }
            });
        });

        if(!flag){
            this.addTabXtype('welcome');
        }

    },

    //根据数据添加tab
    addTabData:function (data) {
        var id = "_id_"+ data.id;
        var tab = Ext.getCmp('centerId');
        var item = tab.getComponent(id);
        if(item){
            item.show();
        }else{
            tab.add({
                id:id,
                xtype:'panel',
                layout:'fit',
                closable:true,
                title:data.text,
                glyph:eval(data.glyph) || '',
                xtype:data.xtype,
                /*items:[{
                    title:data.text,
                    xtype:data.xtype,
                    glyph:eval(data.glyph) || ''
                }]*/
            }).show();
        }
    },
    //根据类型添加tab
    addTabXtype:function (_xtype) {
        var tab = Ext.getCmp('centerId');
        tab.add({
            xtype:_xtype,
        }).show();
    },
});
