// MyComboBox.js

var Y_select_curry = function(targets){
	target = target || document.getElementsByClassName('Y_select');
	if(!target.length){
		console.log('no targets, function returns!');
		return false;
	};
	var defsetting = {
		width: 300,
		height: 30,
		searchable: true,
		placeChange: false
	};
	return function(){
		var thesetting = [];
		for (var i = 0; i <= arguments.length; i++) {
			defargs[i] = defargs[i] || arguments[i];
		};

	}
};
// var selectCreater = Y_select_curry();
// console.log(selectCreater);

// var bolck1 = document.getElementById('bolck1');
// var bolck2 = document.getElementById('bolck2');

// document.body.onclick = function(e){
// 	if (e.target==bolck1) {
// 		console.log("it's block1!");
// 	}else {
// 		console.log("it's block2!");
// 	}
// };


(function($){
define(function(require,exports,module){
//向jquery添加MyComboBox的类
	$.fn.MyComboBox = function(cfg){//7-33:undefined is not a function
		var obj = new MyComboBox(cfg,this);
	}
//为MyComboBox类创建构造函数
	function MyComboBox(cfg,target){//6-29:MyComboBox is not defined
		this.cfg = $.extend({},MyComboBox.defaults,cfg);
		this.init(target);             
	}
//以对象方式给构造函数添加方法的各种功能方法
	$.fn.extend(MyComboBox.prototype,{//6-29:MyComboBox is not defined
	//创建combobox按钮、输入框及下拉菜单
		init: function(target){
			var cfg = this.cfg;
			this.isclose = true;
			this.combo_el = $('<div>').addClass('combo_select');
			this._input = $('<input>').addClass('input_text').attr('placeholder','请选择');
			this.arrow = $('<a>').addClass('arrow');
			this._list = $('<ul>').addClass('ul_list').css({'z-index':100});		
			target.hide().before(this.combo_el);
			this.combo_el.append(this._input).append(this.arrow);
			if(cfg.width&&cfg.height)this.setCSS(cfg.width,cfg.height);
			this.setValue(target.find('option'));
			this.combo_el.append(this._list.hide());


			$('a.arrow').click(function(){
				if(comobj.isclose)comobj.showList();
				else comobj.hideList();
			});
			this.resetValue(this._list);
			if(this.cfg.autohide)this.autohide(this);
			if(this.cfg.placeChange)this.placeChange();
			if(this.cfg.searchable)this.searchable();
		},
		setCSS: function(width,height){
			this.arrow.css({'width':height,'height':height});
			this._list.css({'width':(width+height+5)});		
			this.combo_el.css({'width':(width+height+6),'height':height});
			this._input.css({'width':width,'height':height});
		},
		setValue: function(options){
			for(var i=0; i<options.length;i++){
				var li = $('<li>').addClass('li_option').attr('value',options.eq(i).val()).html(options.eq(i).html());
				this._list.append(li);
			}
		},
//显示日历表并确定其位置
		showList : function(){
				//top=div距离也页面顶端的距离+div的高度（即div底部距离整个页面顶端的距离）
			var _top = this.combo_el.offset().top+this.combo_el.height();
				_left = this.combo_el.offset().left;
			if(!this.cfg.placeChange){
				_top += 2;
				this._list.css('top',_top).css('left',_left);
				this.isclose = false;
				this._list.show();
				return false;
			};
			if(this.isclose){
				//如果top-滚动过的高度（即div底部距离显示的页面的顶端的距离）+列表的高度 〉 显示的页面的高度
				if(_top-$('body').scrollTop()+this._list.height()>$(window).height()){
					//放上面
					_top = _top-this._list.height()-this.combo_el.height()-2;
					this._list.css('top',_top).css('left',_left);
				}else {
					//放下面
					_top += 2;
					this._list.css('top',_top).css('left',_left);
				}
				this.isclose = false;
				this._list.show();
			}
		},
		hideList: function(){
			this.isclose = true;
			this._list.hide();
		},
		autoHide: function(comobj){
			$(document).click(function(e) {
				if(e.target.className=='li_option'){
					comobj._input.val(e.target.innerHTML);
					comobj.changevalue(target,e.target.getAttribute('value'));
					comobj.hideList();
				}else if(e.target.className=='input_text'){
					return;
				}else {
					comobj.hideList();
				}
			});
		},
//当下拉框被选中后将修改保存到select里面
		changevalue: function(sobj,value){
			sobj.find('option[value='+value+']').attr('selected','selected');
		},
//当select改变后修改下拉框里的值
		resetValue: function(target){
			target.change(function(){
				setValue();
			});
		},
//在文本框中输入值会查询出列表里面与之匹配的项
		searchable : function(){
			var _this = this;
			this._input.keyup(function(e) {
				var s = e.target.value;
				if(s.indexOf(' ')!=-1)return false;
				var li_list = $('.ul_list').find('li').hide();
				for(var i = 0; i<li_list.length; i++){
					if(li_list.eq(i).html().indexOf(s)!=-1){
						li_list.eq(i).show();
					}
				}
				_this.hideList();
				_this.showList();
			});
		},
//当下拉框打开的时候页面滚动时改变下拉框位置
		placeChange: function(){
			var _this = this;
			window.onscroll = function(){
				if(_this.isclose)return false;
				_this.hideList();
				_this.showList();
			};
		}
	});
	MyComboBox.defaults = {
		width: 200,
		height: 30,
		searchable: true,
		placeChange: true
	};
	
	$('._select').MyComboBox({
		width: 300,
		height: 30,
		searchable: true,
		placeChange: false
	});
});
})($);