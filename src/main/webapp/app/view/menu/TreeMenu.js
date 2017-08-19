/**
 * Created by jameszhou on 2017/8/9.
 */
Ext.define('AM.view.menu.TreeMenu' ,{
    extend: 'Ext.tree.Panel',
    alias: 'widget.treemenu',
    store: 'MenuStore',
    rootVisible: false,
    multiSelect: true,
    singleExpand: true,

    selType: 'checkboxmodel',
    emptyText:'暂无数据',
    rowLines:true,
    forceFit : true,
    layout:'fit',
    columnLines : true,

    columns:[
        {header: 'No', xtype: 'rownumberer',width:50},
        {header: '名称',  dataIndex: 'text',xtype:'treecolumn'},
        {header: '编码', dataIndex: 'code'},
        {header: 'Xtype试图', dataIndex: 'xtype'},
        {header: '地址', dataIndex: 'url'},
        {header: '权限资源', dataIndex: 'resource'},
        {header: 'CSS图标', dataIndex: 'iconCls'},
        {header: '字体图标', dataIndex: 'glyph'},
        {header: '排序', dataIndex: 'sort'},
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
            }]
        }
    ],
    tbar:[
        {
            xtype:'button',
            text:'新增',
            action: 'add',
            iconCls:'add'
        }
    ],

    initComponent: function() {
        this.callParent(arguments);
    }
});
