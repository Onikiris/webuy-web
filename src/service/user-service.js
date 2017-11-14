/*
* @Author: Ponnenult
* @Date:   2017-11-14 09:11:53
* @Last Modified by:   Ponnenult
* @Last Modified time: 2017-11-14 10:55:18
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
    }
}
module.exports = _user;
