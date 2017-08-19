/**
 * Created by jameszhou on 2017/8/10.
 */
Ext.define('AM.view.Main', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.main',
    layout: 'border',
    items: [{
        xtype:'appHeader',
        hidden:false,
        region: 'north'
    },{
        region: 'west',
        xtype: 'menu',
        margins: '0 0 0 1',
        split: true,
        id:'leftId',
        collapsible: true   // make collapsible
    }, {
        region: 'center',     // center region is required, no width/height specified
        xtype: 'center',
        id:'centerId',
        layout: 'fit',
        margins: '0 0 0 0'
    }, {
        region: 'south',     // position for region
        xtype: 'panel',
        id:'bottomId',
        title: '甘肃米粒电子商务有限公司 VACOMALL.COM 版权所有',
        titleAlign:'center'
    }],
    initComponent: function () {
        Ext.setGlyphFontFamily('FontAwesome');
        this.callParent(arguments);
    }
});
