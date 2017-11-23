/*
* @Author: Ponnenult
* @Date:   2017-11-15 14:13:34
* @Last Modified by:   Ponnenult
* @Last Modified time: 2017-11-15 15:19:48
*/
require('page/common/nav/index.js');
require('./index.css');
var navSide=require('page/common/nav-side/index.js');
require('page/common/header/index.js');
var _mm = require('util/mm.js');
var templateIndex =require('./index.string');
var _user = require('service/user-service.js');


//page逻辑部分
var page = {
    init : function(){
        this.onLoad();
    },
    onLoad : function(){
       navSide.init({
        //初始化左侧菜单
        name :'user-center'
       });
       this.loadUserInfo();

    },
    //加载用户信息
    loadUserInfo :function(){
        var userHtml = '';
           _user.getUserInfo(function(res){
            userHtml = -_mm.renderHtml(templateIndex,res);
            $('.panel-body').html(userHtml);
        },function(errMsg){
          _mm.errorTips(errMsg);
        });
    }
};
$(function(){
        page.init();
    });