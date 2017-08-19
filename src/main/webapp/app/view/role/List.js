/**
 * Created by jameszhou on 2017/8/9.
 */
Ext.define('AM.view.role.List' ,{
    extend: 'AM.ux.PageGrid',
    alias: 'widget.rolelist',
    store: 'RoleStore',
    columns:[
        {header: 'No', xtype: 'rownumberer',width:50},
        {header: '角色名称',  dataIndex: 'roleName'},
        {header: '描述', dataIndex: 'roleDesc'},
        {header: '创建日期', dataIndex: 'createTime'},
        {header: '状态', dataIndex: 'roleState',renderer:function (val) {
            return val==1 ? "<font color='green'>启用</font>" : "<font color='red'>锁定</font>";
        }},
        {
            header:'操作',
            menuDisabled: true,
            sortable: false,
            xtype: 'actioncolumn',
            action: 'rowOpt',
            width: 70,
            items: [{
                iconCls: 'delete',
                tooltip: '删除',
                handler:function (grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                    this.fireEventArgs('deleteRow',[grid, rec]);
                }
            },{
                iconCls: 'edit',
                tooltip: '编辑',
                handler:function (grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                    this.fireEventArgs('editRow',[grid, rec]);
                }
            },{
                iconCls: 'accept',
                tooltip: '分配权限',
                handler:function (grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                    this.fireEventArgs('authRow',[grid, rec]);
                }
            }]
        }
    ],
    tbar:[
        {
            xtype:'button',
            text:'新增',
            action: 'add',
            iconCls:'add'
        },
        {
            xtype:'button',
            text:'删除',
            action:'remove',
            iconCls:'delete'
        },
        {
            xtype:'textfield',
            action:'search',
            emptyText:'搜索'
        }
    ],

    initComponent: function() {
        this.callParent(arguments);
    }
});
