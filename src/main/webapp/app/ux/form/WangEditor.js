Ext.define('AM.ux.form.WangEditor', {
    extend: 'Ext.panel.Panel',
    alias:'widget.wangeditor',
	width:700,
	height:300,
	cfg:{
		uploadImg:'/upload'
	},
	initComponent: function () {
        this.callParent(arguments);
		this.on("boxready", function (t) {
              var editor = new wangEditor(this.id);
              // 上传图片（举例）
			    editor.config.uploadImgUrl = this.cfg.uploadImg;
			    // 配置自定义参数（举例）
			    editor.config.uploadParams = {
			        token: 'abcdefg',
			        user: 'wangfupeng1988'
			    };
			
			    // 设置 headers（举例）
			    editor.config.uploadHeaders = {
			        'Accept' : 'text/x-json'
			    };
			    // 关闭菜单栏fixed
    			//editor.config.menuFixed = true;
    			 // 将全屏时z-index修改为20000
    			editor.config.zindex = 20000;
    			editor.config.pasteFilter = false;
    			  // 自定义菜单
			    editor.config.menus = [
			         	'source',
				        '|',
				        'bold',
				        'underline',
				        'italic',
				        'strikethrough',
				        'eraser',
				        'forecolor',
				        'bgcolor',
				        '|',
				        'quote',
				        'fontfamily',
				        'fontsize',
				        'head',
				        'unorderlist',
				        'orderlist',
				        'alignleft',
				        'aligncenter',
				        'alignright',
				        '|',
				        'link',
				        'unlink',
				        'table',
				        'emotion',
				        '|',
				        'img',
				        'video',
				        'location',
				        'insertcode',
				        '|',
				        'undo',
				        'redo'
				       // 'fullscreen'
			     ];

            	editor.create();
            	editor.$txt.html('<p>请输入内容...</p>');
            	this.getValue = function(){
            		return editor.$txt.html();
            	}
            	this.setValue = function(value){
            		editor.$txt.html(value);
            	},
            	this.append = function(value){
            		 editor.$txt.append(value);
            	}
            	this.editor = editor;
         });
		this.on("resize", function (t, w, h) {
           ed = this.editor;
           // 启用
    		//ed.enable();
        });
    }
});