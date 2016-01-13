# huanxin-sdk
The node sdk of Huanxin Rest API

## Install
```
npm install huanxin-sdk
```

## Usage
```
'use strict';
var Huanxin = require('huanxin-sdk');
var huanxin = new Huanxin({
    org_name      :  'your_org_name',
    app_name      :  'your_app_name',
    client_id     :  'your_client_id',
    client_secret :  'your_client_secret',
    tokenGet: function(){
        // token 缓存层，内部不会调用 getToken 方法实时获取
    },
    tokenSet: function(){
        // token 存储方法
    }
});

huanxin.getToken(function(err, data){
    //...something to do ...
});
```


## Method

1）**getToken**  
Success Return 
```
{
  "access_token":"YWMtWY779DgJEeS2h9OR7fw4QgAAAUmO4Qukwd9cfJSpkWHiOa7MCSk0MrkVIco",
  "expires_in":5184000,
  "application":"c03b3e30-046a-11e4-8ed1-5701cdaaa0e4"
}
```
2）**sendTxt**  
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


