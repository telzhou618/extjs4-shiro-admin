/**
 * Created by jameszhou on 2017/8/9.
 */
Ext.define('AM.store.LogStore', {
    extend: 'AM.ux.GridStore',
    model: 'AM.model.Log',
    proxy: {
        type: 'ajax',
        url: _Api + "/log/list",
        reader: {
            type: 'json',
            root: 'data',
            totalProperty:'total'
        }
    }
});
