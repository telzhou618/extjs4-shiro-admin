/**
 * Created by jameszhou on 2017/8/9.
 */
Ext.define('AM.store.RoleStore', {
    extend: 'AM.ux.GridStore',
    model: 'AM.model.Role',
    proxy: {
        type: 'ajax',
        url: _Api + "/role/list",
        reader: {
            type: 'json',
            root: 'data',
            totalProperty:'total'
        }
    }
});
