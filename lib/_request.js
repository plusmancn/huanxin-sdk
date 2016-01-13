'use strict';

var request = require('request');
var DEBUG_HUAXIN = require('debug')('Huanxin:_request');

/**
 * @desc 发起网络请求工厂方法
 */
function _request(url, method, headers, params, callback){
    callback = callback || function(){};

    DEBUG_HUAXIN('req url: %s method: %s headers: %j params: %j', url, method, headers, params);
    request({
        url: url,
        headers: headers,
        method: method,
        body: params,
        json: true
    },function(err,response,body){
        if(err || response.statusCode !== 200){
          if (err) {
            return callback(err);
          }else {
            return callback(body);
          }
        }
        callback(null,body);
    });
}

module.exports = _request;
