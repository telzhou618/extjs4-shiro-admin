/**
 * Created by jameszhou on 2017/8/9.
 */
Ext.define('AM.model.User', {
    extend: 'Ext.data.Model',
    fields: ["id","userName","password","userState","createTime","userDesc","userImg"]
});
