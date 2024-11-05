const NodeRSA = require('node-rsa');

function generateRSAKeyPair() {
    // 生成密钥对
    const key = new NodeRSA({ b: 512 }); // 使用512位长度的密钥

    // 获取公钥和私钥
    const publicKey = key.exportKey('public');
    const privateKey = key.exportKey('private');
    return [publicKey,privateKey]
}

function rsaEncrypt(publicKey,data) {
    const encryptKey = new NodeRSA(publicKey);
    const encrypted = encryptKey.encrypt(data, 'base64')
    return encrypted
}
function rsaDecrypt(privateKey, data) {
    const decryptKey = new NodeRSA(privateKey);
    // 设置加密方案为pkcs1，以匹配JSEncrypt的加密方案
    decryptKey.setOptions({ encryptionScheme: 'pkcs1' });

    const decrypted = decryptKey.decrypt(data, 'utf8');
    return decrypted
}
/* const data = 'hello'
const [pubkey, privkey] = generateRSAKeyPair()
const datastr = rsaEncrypt(pubkey, data)
console.log('加密后', datastr)
const decryptData = rsaDecrypt(privkey, datastr)
console.log('解密后',decryptData) */
module.exports = {
    generateRSAKeyPair,
    rsaDecrypt,
    rsaEncrypt
}