/**
 * Created by jameszhou on 2017/8/9.
 */
Ext.application({
    requires: ['Ext.container.Viewport'],
    name: 'AM',

    appFolder: 'app',

    controllers: [
        "MainController", "Users", "RoleController", "MenuController",
        'LogController'
    ],
    requires: ['AM.ux.Util'],

    launch: function () {

        //  Ext.create("AM.ux.Util").init();
        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items: {
                xtype: 'main'
            }
        });
    }
});