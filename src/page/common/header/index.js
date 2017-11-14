/*
* @Author: Ponnenult
* @Date:   2017-11-13 23:47:37
* @Last Modified by:   Ponnenult
* @Last Modified time: 2017-11-14 00:49:45
*/
require('./index.css');
var _mm    =require('util/mm.js');
/*通用页面头部*/
var header ={
    init : function(){
        this.bindEvent();
},
onLoad : function(){
    //keyword存在,则回填输入框
    var keyword = _mm.getUrlParam('keyword');
    if (keyword) {
        $("#search-input").val(keyword);
    };
},
bindEvent : function(){
    var _this=this;
    //点击搜索按钮,进行搜索提交
    $("#search-btn").click(function() {
        /* Act on the event */
            _this.searchSubmit();
    });
    //单击回车键时,进行搜索提交
    $("#search-input").keyup(function(e) {
        /* Act on the event */
        if (e.keyCode===13) {
            _this.searchSubmit();
        }
    });
    },
    searchSubmit  : function(){
        //如果提交的时候有keyword.正常跳转到list页
        var keyword = $.trim($("#search-input").val());
        if (keyword) {
            window.location.href = './list.html?keyword='+ keyword;
        }
        //如果keyword为空,直接返回首页
        else{
            _mm.goHome();
        }
    }
};
header.init();