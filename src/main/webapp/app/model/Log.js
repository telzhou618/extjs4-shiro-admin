/**
 * Created by jameszhou on 2017/8/9.
 */
Ext.define('AM.model.Log', {
    extend: 'Ext.data.Model',
    fields: ["id", "userName", "logTitle", "logContent", "clientIp", "requestUrl", "requestMethod", "requestParams", "logTime", "other"]
});
