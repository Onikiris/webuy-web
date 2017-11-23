/*
* @Author: Ponnenult
* @Date:   2017-11-14 17:02:15
* @Last Modified by:   Ponnenult
* @Last Modified time: 2017-11-15 10:14:29
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
        //验证username
        $("#username").blur(function(){
            var username = $.trim($(this).val());
            //用户名为空,不验证
            if (!username) {
                return;
            }
            //异步验证用户是否存在
            _user.checkUsername(username,function(res){
                formError.hide();
            },function(errMsg){
                formError.show(errMsg);
            });
        });
        //点击注册按钮
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
            username        : $.trim($('#username').val()),
            password        : $.trim($('#password').val()),
            passwordConfirm : $.trim($('#password-confirm').val()),
            phone           : $.trim($('#phone').val()),
            email           : $.trim($('#email').val()),
            question        : $.trim($('#question').val()),
            answer          : $.trim($('#answer').val())
        },
        //表单验证结果
        validateResult =this.formValiDate(formData);
        //判断验证,且验证成功
        if (validateResult.status) {
            //提交
            _user.register(formData,function(res){
                window.location.href = './result.html?type=register';
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
        //验证用户名是否为空
        if (!_mm.validate(formData.username,'require')) {
            result.msg = '用户名不能为空';
            return result;
        }
        //验证密码是否为空
        if (!_mm.validate(formData.password,'require')) {
            result.msg = '密码不能为空';
            return result;
        }
        //验证密码长度
        if (formData.password.length < 6) {
            result.msg = '密码不能少于6位';
            return result;
        }
        //验证两次密码
        if (formData.password !== formData.passwordConfirm) {
            result.msg = '两次密码输入不一致';
            return result;
        }
        //验证手机号
        if (!_mm.validate(formData.phone,'phone')) {
            result.msg = '手机号码格式不正确';
            return result;
        }
        //验证邮箱
        if (!_mm.validate(formData.email,'email')) {
            result.msg = '邮箱格式不正确';
            return result;
        }
        //密码提示问题答案是否为空
        if (!_mm.validate(formData.question,'require')) {
            result.msg = '问题不能为空';
            return result;
        }
        //密码答案是否为空
        if (!_mm.validate(formData.answer,'require')) {
            result.msg = '问题答案不能为空';
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