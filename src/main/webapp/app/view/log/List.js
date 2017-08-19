/**
 * Created by jameszhou on 2017/8/9.
 */
Ext.define('AM.view.log.List' ,{
    extend: 'AM.ux.PageGrid',
    alias: 'widget.loglist',
    store: 'LogStore',
    columns:[
        {header: 'No', xtype: 'rownumberer',width:50},
        {header: '用户',  dataIndex: 'userName'},
        {header: '日志内容', dataIndex: 'logContent',renderer:function (val,metaData,record) {
            return record.get("logTitle") + " | " + record.get("logContent");
        },width:300},
        {header: '客户端IP', dataIndex: 'clientIp'},
        {header: '请求地址', dataIndex: 'requestUrl'},
        {header: '请求方式', dataIndex: 'requestMethod'},
        {header: '日志时间', dataIndex: 'logTime'}
    ],
    tbar:[
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
