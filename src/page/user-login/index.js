/*
* @Author: Ponnenult
* @Date:   2017-11-12 21:25:56
* @Last Modified by:   Ponnenult
* @Last Modified time: 2017-11-14 10:40:57
*/
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm   = require('util/mm.js');
var _user = require('service/user-service.js');

//表单里的错误
var formError = {
    show : function(errMsg){
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide : function(){
        $('.error-item').hide().find('.err-msg').text('');
    }
};
//page逻辑部分
var page = {
    init : function(){
        this.bindEvent();
    },
    bindEvent : function(){
        var _this=this;
        //点击登录按钮
        $('#submit').click(function() {
            /* Act on the event */
            _this.submit();
        });
        //按下回车键,进行提交
        $('.user-content').keyup(function(e){
            //keyCode==13 表示回车
            if (e.keyCode===13) {
                 _this.submit();
            }
        });
    },
    //提交表单
    submit :function(){
        var formData = {
            username : $.trim($('#username').val()),
            password : $.trim($('#password').val())
        },
        //表单验证结果
        validateResult =this.formValiDate(formData);
        //判断验证,且验证成功
        if (validateResult.status) {
            //提交
            _user.login(formData,function(res){
                window.location.href = _mm.getUrlParam('redirect') || './index.html';
            },function(errMsg){
                formError.show(errMsg);
            });
        }
        //验证失败
        else{
            //错误提示
            formError.show(validateResult.msg);
        }
    },
    //表单字段验证
    formValiDate :function(formData){
        var result ={
            status : false,
            msg    : ''
        };
        if (!_mm.validate(formData.username,'require')) {
            result.msg = '用户名不能为空';
            return result;
        }
        if (!_mm.validate(formData.password,'require')) {
            result.msg = '密码不能为空';
            return result;
        }
        //通过验证,返回正确提示
        result.status = true;
        result.msg    = '验证通过';
        return result;
    }
};
$(function(){
        page.init();
    });