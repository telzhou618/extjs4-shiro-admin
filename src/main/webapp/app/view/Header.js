/**
 * Created by jameszhou on 2017/8/16.
 */
Ext.define('AM.view.Header', {
    extend: 'Ext.Container',
    alias: 'widget.appHeader',
    id: 'app-header',
    height: 52,
    layout: {
        type: 'hbox',
        align: 'middle'
    },
    defaults:{
        margin:5
    },
    items:[
        {
            xtype: 'component',
            style:{
                fontSize:'18px',
                fontWeight:'bold'
            },
            cls :'s-color',
            html: 'Ext-Admin',
            flex: 1
        },
        {
            xtype:"displayfield",
            fieldCls:'s-color',
            value:Ext.Date.format(new Date(),'Y-m-d H:i l').toString()
        },
        {
            xtype:"displayfield",
            fieldCls:'s-color',
            value:'Admin'
        },
        { xtype: 'tbspacer'},
        {
            xtype: 'themeSwitcher'
        },
        {
            xtype:'button',
            glyph:0xf011,
            border:false,
            tooltip:'退出系统',
            handler:function () {
                Ext.Msg.confirm('提示',"<font color='red'>尊敬的用户,您确定要退出系统吗?</font>",function (btn) {
                    if(btn=='yes'){
                        window.location.href="/logout";
                    }
                });
            }
        },
        { xtype: 'tbspacer',width:60 }
    ],

    initComponent: function() {
        this.callParent();
    }
});

