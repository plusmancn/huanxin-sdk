/**
 * API地址统一存储
 */
'use strict';
var util = require('util');

var URLCONFIG= {
    host: 'https://a1.easemob.com',
    urls:{
        getToken: '/%s/%s/token', // '/org_name/app_name/token',
        sendMessages: '/%s/%s/messages' // '/org_name/app_name/messages'
    }
};

module.exports =  function(urlKey){
    var args = Array.prototype.slice.apply(arguments);
    var template = URLCONFIG.host + URLCONFIG.urls[urlKey];
    return util.format.apply(null ,[template].concat(args.slice(1)));
};
