/**
 * Created by jameszhou on 2017/8/9.
 */
Ext.define('AM.store.MenuStore', {
    extend: 'Ext.data.TreeStore',
    fields:['text',"code","url",'pid','pname','resource','deep','iconCls','sort','glyph','xtype'],
    root: {
        text: "根",
        id:'0',
        expanded: true
    },
    proxy: {
        type: 'ajax',
        url: _Api + "/menu/list"
    }
});
