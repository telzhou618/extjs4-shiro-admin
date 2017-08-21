Ext.define('AM.ux.form.TextEditable', {
    extend: 'Ext.window.Window',
    alias:'widget.texteditable',
    header:true,
    layout:'fit',
    resizable:false,
    modal:true,
    frame:true,
    
    submitUrl:'/dept/add', //数据提交的url
    cmpt:null, //提交成功要刷新面板,必须具有getStore()
    submitName:'submitName', //提交name
    compTitle:'标题',
    emptyText:'请输入类容',
    extValue:{},//附加值
    
    initComponent: function() {
        var me = this;
        this.setTitle(me.compTitle);
        me.items = 
        	{
				xtype:'form',
				layout:'hbox',
				width:320,
				height:70,
				padding:5,
				border:false,
				items:[
					{
						xtype:'textfield',
						flex:8,
						name:me.submitName,
						emptyText:me.emptyText,
						allowBlank:false,
						maxLength:255,
						msgTarget: 'under'
					},
					{
						text:'保存',
						xtype:'button',
						ui: 'soft-green',
						flext:2,
						handler:function(b){
							Ext.create('Admin.ux.Action').submit(b.up('form').getForm(),me.submitUrl,me.cmpt,me,me.extValue);
						}
					},
					{
						text:'取消',
						xtype:'button',
						ui: 'soft-red',
						flext:2,
						handler:function(b){
							me.close();
						}
					}
				]
			};
        me.callParent(arguments);
        
    }
});
