/*
* @Author: Ponnenult
* @Date:   2017-11-14 02:09:08
* @Last Modified by:   Ponnenult
* @Last Modified time: 2017-11-14 02:58:37
*/
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');

$(function(){
    var type        =_mm.getUrlParam('type') || 'default',
    $element        =$('.'+type+'-success');
    //显示对应的提示信息
    $element.show();
});