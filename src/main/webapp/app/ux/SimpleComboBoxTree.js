Ext.define("AM.ux.SimpleComboBoxTree", {
    extend: "Ext.form.field.Picker",
    requires: ["Ext.tree.Panel"],
    xtype:'simple-combobox-tree',
    initComponent: function() {
        var self = this;
        Ext.apply(self, {
            fieldLabel: self.fieldLabel,
            labelWidth: self.labelWidth
        });
        self.callParent();
    },
    setHiddenValue:function(value){
		this.hiddenValue = value;   
    },
    getHiddenValue:function(){
		return this.hiddenValue;   
    },
    createPicker: function() {
        var self = this;
        var store = Ext.create('Ext.data.TreeStore', {
            proxy: {
                type: 'ajax',
                url: self.storeUrl
            },
            root: {
                id: self.rootId,
                text: self.rootText
            },
            nodeParameter: self.treeNodeParameter
        });
        self.picker = new Ext.tree.Panel({
            height: 300,
            autoScroll: true,
            floating: true,
            focusOnToFront: false,
            shadow: true,
            ownerCt: this.ownerCt,
            useArrows: true,
            lines:true,
            store: store,
            //singleExpand :true,
            rootVisible: true
        });
        self.picker.on({
            
            itemclick: function(tree, record, item, index, e, options) {
                var checkModel = self.checkModel;
                self.setHiddenValue(record.get('id')); // 隐藏值
                self.setValue(record.get('text')); // 显示值
            }
        });
        return self.picker;
    },
    alignPicker: function() {
        var me = this,
        picker, isAbove, aboveSfx = '-above';
        if (this.isExpanded) {
            picker = me.getPicker();
            if (me.matchFieldWidth) {
                picker.setWidth(me.bodyEl.getWidth());
            }
            if (picker.isFloating()) {
                picker.alignTo(me.inputEl, "", me.pickerOffset); // ""->tl
                isAbove = picker.el.getY() < me.inputEl.getY();
                me.bodyEl[isAbove ? 'addCls': 'removeCls'](me.openCls + aboveSfx);
                picker.el[isAbove ? 'addCls': 'removeCls'](picker.baseCls + aboveSfx);
            }
        }
    }
});