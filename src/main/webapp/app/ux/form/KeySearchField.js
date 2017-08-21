Ext.define('AM.ux.form.KeySearchField', {
    extend: 'Ext.form.field.Trigger',
    alias : 'widget.keysearchfield',
    trigger1Cls: Ext.baseCSSPrefix + 'form-clear-trigger',

    trigger2Cls: Ext.baseCSSPrefix + 'form-search-trigger',

    hasSearch : false,
    
	width:250,
	emptyText:'请输入关键词',
	
	//parmName:'keywords',
	
    initComponent: function() {
        var me = this;
        me.callParent(arguments);
        me.on('specialkey', function(f, e){
            if (e.getKey() == e.ENTER) {
                me.onTrigger2Click();
            }
        });
    },

    afterRender: function(){
        this.callParent();
        this.triggerCell.item(0).setDisplayed(false);
    },
    onTrigger1Click : function(){
        var me = this;

        if (me.hasSearch) {
            me.setValue('');
            me.store.clearFilter();
            me.hasSearch = false;
            me.triggerCell.item(0).setDisplayed(false);
            me.updateLayout();
        }
    },

    onTrigger2Click : function(){
        var me = this;
        var store = me.up("grid").getStore();
        /*store.loadPage(1,{
		    params : {
		        keywords : me.getValue()
		    }
		});*/
        Ext.apply(store.proxy.extraParams,{keywords : me.getValue()});
		store.removeAll();	
		store.loadPage(1);
    }
});