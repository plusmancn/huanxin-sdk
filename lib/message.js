/**
 * 消息实例
 */
'use strict';

var _ = require('lodash');

var Message = function(target, txtMsg, from, ext){
    this.body = {
        target_type: 'users',
        target: [].concat(target),
        msg : {
            type : 'txt',
            msg : txtMsg || 'hello from huanxin-sdk'
        },
        from : from || 'admin',
        ext : ext || {}
    };
};

Message.prototype.setTargetType = function(){
    return this;
};

Message.prototype.setTarget  = function(){
    return this;
};

Message.prototype.setMsg = function(){
    return this;
};

Message.prototype.setFrom = function(from){
    this.body.from = from;
    return this;
};

Message.prototype.setExt = function(obj){
    this.body.ext = _.assign(this.body.ext, obj);
    return this;
};

module.exports = Message;
