/*
* @Author: Ponnenult
* @Date:   2017-11-15 10:56:28
* @Last Modified by:   Ponnenult
* @Last Modified time: 2017-11-15 12:13:13
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
     data : {
        username : '',
        question : '',
        answer   : '',
        token    : ''
    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        this.loadStepUsername();
    },
    bindEvent : function(){
        var _this=this;
        //输入用户名后点击下一步
        $('#submit-username').click(function() {
            /* Act on the event */
            var username = $.trim($('#username').val());
            //用户名存在
            if (username) {
                _user.getQuestion(username,function(res){
                        _this.data.username = username;
                        _this.data.question = res;
                        _this.loadStepQuestion();
                },function(errMsg){
                    formError.show(errMsg);
                });
            }
            //用户名不存在
            else{
                formError.show('请输入用户名');
            }
        });
        //输入提示问题答案后的下一步
        $('#submit-question').click(function() {
            /* Act on the event */
            var answer = $.trim($('#answer').val());
            //检查密码提示问题答案
            if (answer) {
                _user.checkAnswer({
                    username : _this.data.username,
                    question : _this.data.question,
                    answer : answer
                },function(res){
                        _this.data.answer = answer;
                        _this.data.token = res;
                        _this.loadStepPassword();
                },function(errMsg){
                    formError.show(errMsg);
                });
            }
            //用户名不存在
            else{
                formError.show('请输入提示问题的答案');
            }
        });
        //输入新密码点击下一步
        $('#submit-password').click(function() {
            /* Act on the event */
            var password = $.trim($('#password').val());
            //密码不为空且长度大于6
            if (password && password.length>=6) {
                _user.resetPassword({
                    username    : _this.data.username,
                    passwordNew : password,
                    forgetToken : _this.token
                },function(res){
                        window.location.href = '.result.html?type=pass-reset';
                },function(errMsg){
                    formError.show(errMsg);
                });
            }
            //密码为空
            else{
                formError.show('请输入不少于6位数的新密码');
            }
        });
    },
    //加载输入用户名第一步
    loadStepUsername : function(){
        $(".step-username").show();
    },
    //加载输入问题答案第一步
    loadStepQuestion : function(){
        //隐藏错误提示
        formError.hide();
        //清除错误提示
        //容器切换
        $(".step-username").hide()
        .siblings('step-question').show()
            .find('.question').text(this.data.question);
    },
    //加载输入密码第一步
    loadStepPassword : function(){
        formError.hide();
        //清除错误提示
        //容器切换
        $(".step-question").hide()
        .siblings('step-password').show();
    }
};
$(function(){
        page.init();
    });