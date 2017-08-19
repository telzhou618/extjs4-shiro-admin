/**
 * Created by jameszhou on 2017/8/16.
 */
Ext.define('AM.view.ThemeSwitcher', function() {
    var theme = Ext.util.Cookies.get("theme");
    if (!theme) {
       theme = "neptune";
    }
    return {
        extend: 'Ext.Container',
        alias: 'widget.themeSwitcher',
        id: 'theme-switcher',
        margin: '0 10 0 0',
        layout: 'hbox',
        initComponent: function() {
            this.items = [{
                xtype: 'combo',
                id: 'theme-switcher-combo',
                width: 100,
                displayField: 'name',
                valueField: 'value',
                margin: '0 5 0 0',
                store: Ext.create('Ext.data.Store', {
                    fields: ['value', 'name'],
                    data : [
                        { value: 'neptune', name: '海之蓝' },
                        { value: 'access', name: '玄晶黑' },
                        { value: 'classic', name: '经典蓝' },
                        { value: 'gray', name: '经典灰' }
                    ]
                }),
                value: theme,
                listeners: {
                    select: function(combo) {
                        Ext.util.Cookies.set("theme",combo.getValue());
                        window.location.href="/" + combo.getValue();
                    }
                }
            }];

            this.callParent();
        }
    };
});
