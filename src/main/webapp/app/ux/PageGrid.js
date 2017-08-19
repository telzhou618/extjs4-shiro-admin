Ext.define("AM.ux.PageGrid",{
	extend: 'AM.ux.Grid',

    initComponent: function () {
        var me = this;
        me.dockedItems = [
			{
			    xtype: 'pagingtoolbar',
				dock: 'bottom',
				displayInfo: true,
				pageSize: 50,
				//displayMsg:"显示从{0}条数据到{1}条数据，共{2}条数据",
				emptyMsg:"没有数据",
                store:me.getStore(),
				plugins: Ext.create('AM.ux.ProgressBarPager')
			}
		];
		me.callParent();
	 }
 
});