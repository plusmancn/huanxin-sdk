'use strict';

var _ = require('lodash');
var _request = require('./_request.js');
var _apiUrls = require('./_api-urls.js');
var Message  = require('./message.js');

var async = require('async');

var Huanxin = function(options){
    var self = this;

    this.options = {};
    this.options = _.assign(self.options, options);
};


/**
 * once getToken
 */
var onceGetToken = function(callback){
    var self = this;
    if(self.options.token){
        return callback(null, self.options.token);
    }

    this.options.tokenGet(function(err, value){
        if(!err && value){
            self.options.token = value;
            return callback(null, self.options.token);
        }else{
            GetToken(function(err, data){
                if(data.access_token){
                    self.options.token = data.access_token;
                    return callback(null, self.options.token);
                }else{
                    throw new Error('Token Get Failed');
                }
            });
        }
    });
};

/**
 * @desc 获取用户token
 */
var GetToken = function(callback){
    callback = callback || function(){};
    var self = this;

    var url = _apiUrls('getToken', this.options.org_name, this.options.app_name);
    return _request(url, 'POST', {}, {
      grant_type: 'client_credentials',
      client_id: this.options.client_id,
      client_secret: this.options.client_secret
    }, function(err, data){
        // tokenSet Callback
        self.options.tokenSet(err, data);
        // Func callback
        callback(err, data);
    });
};

/**
 * @desc 发送文本消息
 * 
 * @param {Message} message 消息实例
 * @param {Function} callback 标准回调函数
 */
var SendTxt = function(message, callback){
    if( !(message instanceof Message) ){
        callback(new Error('TypeError: message must be the instanceof Message'));
    }

    callback = callback || function(){};
    var self = this;

    async.waterfall([
        function(cb){
            onceGetToken.call(self, cb);
        },
        function(token ,cb){
            var url = _apiUrls('sendMessages', self.options.org_name, self.options.app_name);
            return _request(url, 'POST', {
                Authorization: 'Bearer ' + self.options.token
            }, message.body, cb);
        }
    ],function(err, result){
        callback(err, result);
    });

};

Huanxin.prototype.getToken = GetToken;
Huanxin.prototype.sendTxt  = SendTxt;

// 挂载message对象
Huanxin.Message = Message;

module.exports = Huanxin;
