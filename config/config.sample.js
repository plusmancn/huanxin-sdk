'use strict';
var redis = require('redis'),
    client = redis.createClient({
        port: 6379,
        host: 'redis_host_ip'
    });

client.auth('redis_password:w');

var DEBUG_HUAXIN = require('debug')('Huanxin:config');

module.exports = {
    init: {
        org_name      :  'your_org_name',
        app_name      :  'your_app_name',
        client_id     :  'your_client_id',
        client_secret :  'your_client_secret',
        tokenSet: function(err, data){
            /**
             *  data = {
             *      access_token: '环信返回的token值',
             *      expires_in: '过期时间（秒），按照当前返回是60天，但是实际是7天就会过期，不可用',
             *      application: '应用id'
             *  }
             */
            // 518400 设置6天过期
            client.setex('HXTOKEN_TEST1', 518400, data.access_token, function(err, res){
                DEBUG_HUAXIN('TokenSet err %j, res %s', err, res);
            });
        },
        tokenGet: function(callback){
            // token 缓存层，内部不会调用 getToken 方法实时获取
            /**
             * @return {String} token
             */
            client.get('HXTOKEN_TEST1', callback);
        }
    }
};



