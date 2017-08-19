Ext.define('AM.ux.GridController', {
   
	extend: 'Ext.app.Controller',
   
	//刷新Grid
    refreshAction : function(grid){
        grid.getStore().reload();
    },
    //批量除行
    removeBatchAction:function(_url,_grid){

        var data = _grid.getSelectionModel().getSelection();
        if(data.length==0){
            Ext.error("请选择要删除的行！");
            return;
        }
        var arr = [];
        Ext.each(data,function(obj,index,countriesItSelf){
            Ext.Array.include(arr,obj.raw.id);
        });

        this.removeRowAction(_url,{ids:arr},_grid);
    },
    //删除
    removeRowAction:function(_url,_params,_grid){
        Ext.create("AM.ux.Action").remove({ids:_params},_url,_grid);
    },
    //查看行数据
    viewRowAction : function (grid,record) {
        var html = '';
        var data = record.raw;
        for(var i in data){
            if(i!='id'){
                html = html +data[i] + "<br >";
            }
        }
        Ext.Msg.alert("查看", html);
    },
    //渲染数据
    renderAction : function (grid,record) {
        grid.getStore().reload();
    }
});
