/**
 * Created by jameszhou on 2017/8/9.
 */
Ext.define('AM.view.user.Form', {
    extend: 'Ext.form.Panel',
    alias: 'widget.userform',
    width:800,
    height:300,
    layout: {
        type:'hbox',
        align:'stretch'
    },
    requires: ['AM.ux.form.FormPanel'],
    items:[

        {
            xtype:'ux-form',
            flex:2,
            items: [
                {xtype:'hiddenfield',name:'id'},
                {
                    xtype: 'textfield',
                    name : 'userName',
                    vtype:'alphanum',
                    id:"userName",
                    fieldLabel: '用户名'
                },
                {
                    xtype: 'textfield',
                    inputType:'password',
                    vtype:'alphanum',
                    name : 'password',
                    id:'password',
                    fieldLabel: '密码'
                },{
                    xtype: 'textfield',
                    inputType:'password',
                    vtype:'alphanum',
                    id:'confPassword',
                    name : 'confPassword',
                    fieldLabel: '确认密码',
                    vtype: 'repetition',  //指定repetition验证类型
                    repetition: { targetCmpId: 'password' }  //配置repetition验证，提供目标组
                }, {
                    xtype      : 'fieldcontainer',
                    fieldLabel : '状态',
                    defaultType: 'radiofield',
                    layout: 'hbox',
                    items: [
                        {
                            boxLabel  : '<font color="green">启用</font>',
                            name      : 'userState',
                            inputValue: '1',
                            checked:true
                        },
                        { xtype: 'tbspacer',width:20 },
                        , {
                            boxLabel  : '锁定',
                            name      : 'userState',
                            inputValue: '0'
                        }
                    ]
                },{
                    xtype: 'textarea',
                    rows:3,
                    name : 'userDesc',
                    allowBlank:true,
                    fieldLabel: '描述'
                }
            ]
        },
        {
            xtype:'treepanel',
            flex:1,
            rootVisible: false,
            rowLines:true,
            forceFit : true,
            layout:'fit',
            columnLines : true,
            store:Ext.create('Ext.data.TreeStore', {
                fields:['id','roleName','roleState','checked'],
                root:{
                    expanded:false //取消自动加载
                },
                proxy: {
                    type: 'ajax',
                    url: _Api + "/role/treelist"
                },
                autoLoad:false
            }),
            columns:[
                {header: '角色名称',  dataIndex: 'roleName',xtype:'treecolumn',flex:2},
                {header: '状态', dataIndex: 'roleState',renderer:function (val) {
                    return val==1 ? "<font color='green'>启用</font>" : "<font color='red'>锁定</font>";
                }}
            ]
        }

    ],
    initComponent: function() {
        this.callParent(arguments);
    }
});
