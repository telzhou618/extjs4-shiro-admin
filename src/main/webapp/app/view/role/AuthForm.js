/**
 * Created by jameszhou on 2017/8/9.
 */

//选中子节点
function setChildChecked(node,checked){
    node.expand();
    node.set({checked:checked});
    if(node.hasChildNodes()){
        node.eachChild(function(child) {
            setChildChecked(child,checked);
        });
    }
}
//选中父节点
function setParentChecked(node,checked){
    node.set({checked:checked});
    var parentNode = node.parentNode;
    if(parentNode !=null){
        var flag = false;
        parentNode.eachChild(function(child) {
            if(child.data.checked == true){
                flag = true;
            }
        });
        if(checked == false){
            if(!flag){
                setParentChecked(parentNode,checked);
            }
        }else{
            if(flag){
                setParentChecked(parentNode,checked);
            }
        }
    }
}

Ext.define('AM.view.role.AuthForm', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.authform',
    height:300,
    width:600,
    rootVisible: false,
    rowLines:true,
    forceFit : true,
    layout:'fit',
    columnLines : true,
    store:Ext.create('Ext.data.TreeStore', {
        fields:['id','text','leaf','pid','checked','expanded','resource'],
        root:{
            expanded:false //取消自动加载
        },
        proxy: {
            type: 'ajax',
            url: _Api + "/role/menulist"
        },
        autoLoad:false
    }),
    columns:[
        {header: '名称',  dataIndex: 'text',xtype:'treecolumn',flex:2},
        {header: '权限资源', dataIndex: 'resource',flex:1}
    ],
    listeners:{
        "checkchange": function(node,checked,eOpts) {
            setChildChecked(node,checked);
            setParentChecked(node,checked);
        }
    },
    initComponent: function() {
        this.callParent(arguments);
    }
});
