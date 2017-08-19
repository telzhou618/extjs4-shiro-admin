Ext.define('AM.ux.form.FormPanel', {
    extend: 'Ext.form.Panel',
    alias : 'widget.ux-form',
    layout: {
        type:'vbox',
        align:'stretch'
    },
    width:500,
    bodyPadding: 10,
    scrollable: true,
    defaults: {
        labelWidth: 80,
        labelAlign:'right',
        labelSeparator: '',
        allowBlank :false,
	    msgTarget: 'under'
    }

});
