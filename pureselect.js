if (!window.Y) window.Y = {}

Y.pureSelect = function (target, searchable) {
    // console.log(123)
    this.searchable = searchable
    this.init(target)
}

Y.pureSelect.prototype = {
    domel: {},
    //创建输入框、按钮及下拉菜单
    init: function(target){
        this.isclose = true

        this.domel.slWarp = document.createElement('div')
        this.domel.slIpt = document.createElement('span')
        this.domel.slArrow = document.createElement('span')
        this.domel.slList = document.createElement('ul')
        this.domel.slWarp.classList.add("sltwarp")
        this.domel.slIpt.setAttribute('contenteditable', true)
        this.domel.slIpt.classList.add("sltcontent")
        this.domel.slArrow.classList.add("sltarrow")
        this.domel.slList.classList.add("sltlist")
        // this._input = $('<input>').addClass('input_text').attr('placeholder','请选择');
        // this.arrow = $('<a>').addClass('arrow');
        // this._list = $('<ul>').addClass('ul_list').css({'z-index':100});
        target.style.display = 'none'
        target.insertBefore(this.domel.slWarp, target)
        // this.combo_el.append(this._input).append(this.arrow);
        // this.setValue(target.find('option'));
        // this.combo_el.append(this._list.hide());
        //
        //
        // $('a.arrow').click(function(){
        //     if(comobj.isclose)comobj.showList();
        //     else comobj.hideList();
        // });
        // this.resetValue(this._list);
        // this.autohide(this);
        // this.placeChange();
        // if(this.searchable)this.searchable();
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
}