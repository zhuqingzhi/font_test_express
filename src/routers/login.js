const express = require('express');
const { generateRSAKeyPair, rsaDecrypt } = require('../test');
const { aesDecrypt } = require('../test/aes_encrypt');
const router = express.Router()
var publicKey = '', privateKey = '', sessionKey = '';

router.get('/rsa', (req, res, next) => {
    const keyPairs = generateRSAKeyPair()
    publicKey = keyPairs[0]
    privateKey = keyPairs[1]
    res.send({
        code: 0,
        data: publicKey,
        privateKey
    })
})

router.post('/login', (req, res, next) => {
    const body = req.body;
    const data1 = body.data1;// 会话key
    const data2 = body.data2;// 登录数据
    // 使用rsa解密会话key
    console.log(data1,data2)
    sessionKey = rsaDecrypt(privateKey, data1)
    console.log('会话key解密：', sessionKey)
    // 使用sessionkey解密登录数据
    const keys = sessionKey.split(',').map(item=>+item)
    const loginData = JSON.parse(aesDecrypt(data2, keys))
    console.log('登录数据',loginData)
    if (loginData.username != 'zs' || loginData.pass != '123456') {
        return res.send({
            code: 10001,
            msg:'账户或密码错误'
        }).status(200)
    }
    // 返回publickey
    res.send({
        code: 0,
        msg: '成功',
        data: {
            token: '',
            refreshToken: '',
            rsa:''
        }
    }).status(200)
})
module.exports=router