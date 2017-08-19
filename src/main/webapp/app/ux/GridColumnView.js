
Ext.define('AM.ux.GridColumnView',{
	extend:'Ext.grid.column.Column',
	xtype:'gridcolumnview',
    initComponent : function(){
    	this.callParent(arguments);
    	var me = this;
    	//默认增加提示
    	me.renderer = function (value, meta, record) {
    		if(value){
           	  meta.tdAttr = 'data-qtip="' + value + '"';
    		}
            return value;
        };
    }
});