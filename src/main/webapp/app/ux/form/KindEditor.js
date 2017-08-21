Ext.define('AM.ux.form.KindEditor', {
    extend: 'Ext.form.field.Text',
    alias : 'widget.kindeditor',
    alternateClassName: 'Ext.form.KindEditor',
    fieldSubTpl: [
        '<textarea id="{id}" {inputAttrTpl}',
            '<tpl if="name"> name="{name}"</tpl>',
            '<tpl if="rows"> rows="{rows}" </tpl>',
            '<tpl if="cols"> cols="{cols}" </tpl>',
            '<tpl if="placeholder"> placeholder="{placeholder}"</tpl>',
            '<tpl if="size"> size="{size}"</tpl>',
            '<tpl if="maxLength !== undefined"> maxlength="{maxLength}"</tpl>',
            '<tpl if="readOnly"> readonly="readonly"</tpl>',
            '<tpl if="disabled"> disabled="disabled"</tpl>',
            '<tpl if="tabIdx"> tabIndex="{tabIdx}"</tpl>',
    //            ' class="{fieldCls} {inputCls}" ',
            '<tpl if="fieldStyle"> style="{fieldStyle}"</tpl>',
            ' autocomplete="off">\n',
            '<tpl if="value">{[Ext.util.Format.htmlEncode(values.value)]}</tpl>',
        '</textarea>',
        {
            disableFormats: true
        }
    ],
    kindeditorConfig: {},
    initComponent: function () {
        var me = this;
        me.callParent(arguments);
    },
    afterRender: function () {
        var me = this;
        me.callParent(arguments);
        if (!me.ke) {
            me.ke = KindEditor.create("#" + me.getInputId(), Ext.apply(me.kindeditorConfig, {
                height: me.height || '100%',
                width: '100%',
                afterCreate: function () {
                    me.KindEditorIsReady = true;
                }
            }));
           //这块 组件的父容器关闭的时候 需要销毁编辑器 否则第二次渲染的时候会出问题 可根据具体布局调整　　　　　　
            var win = me.up('window');
            if (win && win.closeAction == "hide") {
                win.on('beforehide', function () {
                    me.onDestroy();
                });
            } else {
                var panel = me.up('panel');
                if (panel && panel.closeAction == "hide") {
                    panel.on('beforehide', function () {
                        me.onDestroy();
                    });
                }
            }
        } else {
            me.ke.html(me.getValue());
        }
    },
    setValue: function (value) {
        var me = this;
        if (!me.ke) {
            me.setRawValue(me.valueToRaw(value));
        } else {
            me.ke.html(value.toString());
        }
        me.callParent(arguments);
        return me.mixins.field.setValue.call(me, value);
    },
    getRawValue: function () {
        var me = this;
        if (me.KindEditorIsReady) {
            me.ke.sync();
        }
        v = (me.inputEl ? me.inputEl.getValue() : me.rawValue);
        me.rawValue = v;
        return v;
    },
    destroyKindEditor: function () {
        var me = this;
        if (me.rendered) {
            try {
                me.ke.remove();
                var dom = document.getElementById(me.id);
                if (dom) {
                    dom.parentNode.removeChild(dom);
                }
                me.ke = null;
            } catch (e) { }
        }
    },
    onDestroy: function () {
        var me = this;
        me.destroyKindEditor();
        me.callParent(arguments);
    }
});