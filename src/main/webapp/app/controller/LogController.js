/**
 * Created by jameszhou on 2017/8/9.
 */
Ext.define('AM.controller.LogController', {
    extend: 'AM.ux.GridController',

    views: [
        'log.List'
    ],
    stores: [
        'LogStore'
    ],
    models: ['Log'],

    init: function() {
        var me = this;
        this.control({
            //渲染事件
            'loglist': {
                render:'renderAction',
                itemdblclick: 'viewRowAction'
            },
            //搜索
            'loglist textfield[action=search]':{
                specialkey: function(field,e){
                    if (e.getKey()==Ext.EventObject.ENTER){
                        Ext.create("AM.ux.Action").search(field.up("grid"),{search:field.getValue()});
                    }
                }
            }
        });
    }
});
