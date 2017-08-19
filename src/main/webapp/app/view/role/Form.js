/**
 * Created by jameszhou on 2017/8/9.
 */
Ext.define('AM.view.role.Form', {
    extend: 'AM.ux.form.FormPanel',
    alias: 'widget.roleform',
    items: [
        {xtype:'hiddenfield',name:'id'},
        {
            xtype: 'textfield',
            name : 'roleName',
            id:"userName",
            fieldLabel: '角色名称'
        }, {
            xtype      : 'fieldcontainer',
            fieldLabel : '状态',
            defaultType: 'radiofield',
            layout: 'hbox',
            items: [
                {
                    boxLabel  : '<font color="green">启用</font>',
                    name      : 'roleState',
                    inputValue: '1',
                    checked:true
                },
                { xtype: 'tbspacer',width:20 },
                , {
                    boxLabel  : '锁定',
                    name      : 'roleState',
                    inputValue: '0'
                }
            ]
        },{
            xtype: 'textarea',
            rows:3,
            name : 'roleDesc',
            allowBlank:true,
            fieldLabel: '描述'
        }
    ],
    initComponent: function() {
        this.callParent(arguments);
    }
});
