/*
* @Author: Ponnenult
* @Date:   2017-11-14 09:11:53
* @Last Modified by:   Ponnenult
* @Last Modified time: 2017-11-15 15:41:25
*/
var _mm   = require('util/mm.js');
var _user = {
    //用户登录
    login : function(userInfo,resolve,reject){
        _mm.request({
            url         : _mm.getServerUrl('/user/login.do'),
            data        : userInfo,
            method      : 'POST',
            success     : resolve,
            error       : reject
        });
    },
    //用户名检查
    checkUsername : function(username,resolve,reject){
         _mm.request({
            url         : _mm.getServerUrl('/user/check_valid.do'),
            data        : {
                   type : 'username',
                   str  :   username
                            },
            method      : 'POST',
            success     : resolve,
            error       : reject
        });
    },
    //确认用户
    getQuestion : function(username,resolve,reject){
         _mm.request({
            url         : _mm.getServerUrl('/user/forget_get_question.do'),
            data        :  username,
            method      : 'POST',
            success     : resolve,
            error       : reject
        });
    },
     //检查密码提示问题答案
     checkAnswer : function(userInfo,resolve,reject){
         _mm.request({
            url         : _mm.getServerUrl('/user/forget_check_answer.do'),
            data        : userInfo,
            method      : 'POST',
            success     : resolve,
            error       : reject
        });
    },
    //重置密码
     resetPassword : function(userInfo,resolve,reject){
         _mm.request({
            url         : _mm.getServerUrl('/user/forget_reset_password.do'),
            data        : userInfo,
            method      : 'POST',
            success     : resolve,
            error       : reject
        });
    },
    //用户注册
     register : function(userInfo,resolve,reject){
         _mm.request({
            url         : _mm.getServerUrl('/user/register.do'),
            data        : userInfo,
            method      : 'POST',
            success     : resolve,
            error       : reject
        });
    },
    //获取用户信息
    getUserInfo :function(resolve,reject){
        _mm.request({
            url         : _mm.getServerUrl('/user/get_information.do'),
            method      : 'POST',
            success     : resolve,
            error       : reject
        });
    },
     updateUserInfo : function(userInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/update_information.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
}
module.exports = _user;
