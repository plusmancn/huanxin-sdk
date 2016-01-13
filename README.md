# huanxin-sdk
The node sdk of Huanxin Rest API for high performance

## Install
```
npm install huanxin-sdk
```

## Usage
> 详细用法请移步：test/，建议使用 [redis](http://redis.io) 存储token

```
'use strict';
var Huanxin = require('huanxin-sdk');
var huanxin = new Huanxin({
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
        redisClient.setex('HXTOKEN_TEST1', 518400, data.access_token, function(err, res){
            DEBUG_HUAXIN('TokenSet err %j, res %s', err, res);
        });
    },
    tokenGet: function(callback){
        // token 缓存层，内部不会调用 getToken 方法实时获取
        /**
         * @return {String} token
         */
        redisClient.get('HXTOKEN_TEST1', callback);
    }
});

huanxin.getToken(function(err, data){
    //...something to do ...
});
```


## Method

1）**getToken**  
调用环信接口获取token，并调用tokenSet方法。

Success Return 
```
{
  "access_token":"YWMtWY779DgJEeS2h9OR7fw4QgAAAUmO4Qukwd9cfJSpkWHiOa7MCSk0MrkVIco",
  "expires_in":5184000,
  "application":"c03b3e30-046a-11e4-8ed1-5701cdaaa0e4"
}
```

2） **onceGetToken**
为了避免频繁请求环信接口，token获取顺序如下  
1. 从内存读取
2. 从tokenGet方法读
3. 调用getToken方法，从环信请求，并缓存

```
huanxin.onceGetToken(function(err, token){
    //...something to do ...
});
```
Sucess Return {Stirng} token



3）**sendTxt**  
```
/**
 * @desc 发送文本消息
 * 
 * @param {Message} message 消息实例
 * @param {Function} callback 标准回调函数
 */

// 消息实例初始化
var message = new Huanxin.Message('cn_18667903755', 'hello world!', 'cn_10000');
```


## Test
Before run `mocha`，Please make sure the `/config/config.js` is exists。The example file was located in `/config/config.sample.js`
```
mocha
```

## Todo
* 继续晚上Huanxin.Message实例方法
* 增加环信 Rest API 覆盖范围
