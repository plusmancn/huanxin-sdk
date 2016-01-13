'use strict';

var CONFIG = require('../config/config.js');
var Huanxin = require('../');
var huanxin = new Huanxin(CONFIG.init);

require('should');


describe('Token', function(){
    describe('#getToken', function(){
        it('should get the token', function(done){
            huanxin.getToken(function(err, data){
                if (err) return done(err);
                data.should.have.property('access_token');
                done();
            });
        });
    });

    describe('#onceGetToken', function(){
        it('should reutrn the token', function(done){
            huanxin.onceGetToken(function(err, token){
                token.should.be.a.String();
                done();
            });
        });
    });
});


describe('Send', function(){
    describe('#sendTxt', function(){
        it('should return success', function(done){
            var message = new Huanxin.Message('cn_18667903755', 'hello world!', 'cn_10000');
            huanxin.sendTxt(message, function(err, res){
                res.data['cn_18667903755'].should.equal('success');
                done();
            });
        });
    });
});


