/**
 * Created by jameszhou on 2017/8/10.
 */
Ext.define('AM.view.Welcome', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.welcome',
    layout: 'fit',
    title: '主页',
    padding:10,
    closable:true,
    glyph:0xf015,
    html:'欢迎使用 Ext-Admin。',
    id:'_0',
    initComponent: function () {
        this.callParent(arguments);
    }
});
