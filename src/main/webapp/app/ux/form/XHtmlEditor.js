Ext.define('AM.ux.form.XHtmlEditor',{
    extend:'Ext.form.field.HtmlEditor',
    alias:'widget.xhtmleditor',
    //扩展的属性
    uploadConfig:{
        url:''//后台上传地址
    },
    fontFamilies: ['Arial', 'Courier New', 'Tahoma', 'Times New Roman', 'Verdana','宋体','新宋体','微软雅黑'],
    initComponent : function(b,e){
        this.callParent(arguments);
        var me = this;
        //创建组件
        me.initExtFun = function(btn,ets){
            Ext.create('Ext.window.Window',{
                title:'插入图片',
                resizable:false,
                border:false,
                modal:true,
                frame:false,
                iconCls:'x-fa fa-image',
                animateTarget:btn,
                items:[
                    {
                        xtype:'form',
                        width:320,
                        height:70,
                        padding:10,
                        border:false,
                        items:[
                            {
                                width:280,
                                labelAlign:'right',
                                labelWidth:60,
                                xtype:'filefield',
                                name:'file',
                                allowBlank:false,
                                fieldLabel:'选择图片',
                                buttonText:'浏览...'
                            }
                        ]
                    }
                ],
                buttons:[
                    {
                        text:'插入',
                        handler:function(b,e){
                            //实现上传,完成之后插入带编辑器
                            var form = b.up('window').down('form');
                            form.submit({
                                waitMsg:'正在上传...',
                                clientValidation: true,
                                url:me.uploadConfig.url,
                                success:function(form,action){
                                    //返回图片路径
                                    var path = action.result.msg;
                                    //将图片插入到光标所在的位置
                                    me.insertAtCursor("<img src='"+path+"' />");
                                    b.up('window').close();
                                },
                                failure:function(form,action){
                                        switch (action.failureType) {
                                            case Ext.form.action.Action.CLIENT_INVALID:
                                                Ext.Msg.alert('提示','客户端验证不通过!');
                                                break;
                                            default:
                                                Ext.Msg.alert('保存失败,',action.result.msg);
                                        }
                                    }    
                                });
                        }
                    },
                    {
                        text:'取消',
                        handler:function(b,e){
                            b.up('window').close();
                        }
                    }
                ]
            }).showAt(btn.getX(),btn.getY());
        }
        var b = Ext.create('Ext.button.Button',{
            xtype:'button',
            iconCls:'x-fa fa-image',
            tooltip:'插入图片',
            text:'',
            listeners:{
                click:function(b,e){
                     me.initExtFun(b,e);
                }
            }
        });
        me.getToolbar().add(b);
    }
});