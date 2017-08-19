/**
 * Created by jameszhou on 2017/8/9.
 */
Ext.define('AM.store.Users', {
    extend: 'AM.ux.GridStore',
    model: 'AM.model.User',
    proxy: {
        type: 'ajax',
        url: _Api + "/user/list",
        reader: {
            type: 'json',
            root: 'data',
            totalProperty:'total'
        }
    }
});
