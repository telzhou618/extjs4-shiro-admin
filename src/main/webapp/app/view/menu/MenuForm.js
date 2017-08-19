/**
 * Created by jameszhou on 2017/8/9.
 */
Ext.define('AM.view.menu.MenuForm', {
    extend: 'AM.ux.form.FormPanel',
    alias: 'widget.menuform',
    requires: ["AM.ux.ComboBoxTree"],
    items: [
        {xtype:'hiddenfield',name:'id'},
        {
            xtype:'comboboxtree',
            name : 'pname',
            id:'pid',
            storeUrl : '/menu/treelist',
            cascade : 'child',//级联方式:1.child子级联;2.parent,父级联,3,both全部级联
            checkModel:'single',//当json数据为不带checked的数据时只配置为single,带checked配置为double为单选,不配置为多选
            fieldLabel : '上级菜单',
            rootId : '0',
            rootText : '顶级菜单',
            treeNodeParameter : ''
        },{
            xtype: 'textfield',
            name : 'code',
            fieldLabel: '编码'
        },
        {
            xtype: 'textfield',
            name : 'text',
            fieldLabel: '菜单名称'
        },{
            xtype: 'textfield',
            name : 'url',
            allowBlank:true,
            value:'#',
            fieldLabel: '地址'
        },{
            xtype: 'textfield',
            name : 'iconCls',
            allowBlank:true,
            fieldLabel: 'CSS图标'
        },{
            xtype: 'textfield',
            name : 'sort',
            value:'0',
            vtype:'alphanum',
            fieldLabel: '排序'
        },{
            xtype: 'textfield',
            name : 'resource',
            allowBlank:true,
            fieldLabel: '资源'
        },{
            xtype: 'textfield',
            name : 'xtype',
            allowBlank:true,
            fieldLabel: 'Xtype视图'
        },{
            xtype: 'textfield',
            name : 'glyph',
            allowBlank:true,
            value:'0xf0a4',
            fieldLabel: 'Glyph图标'
        }
    ],
    initComponent: function() {
        this.callParent(arguments);
    }
});
