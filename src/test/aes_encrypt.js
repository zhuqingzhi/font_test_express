
var aesjs = require('aes-js');
// var key_128 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
// var text = 'hello world'
// var pbkdf2 = require('pbkdf2');
// const { rsaEncrypt } = require('.');
/* var str = `
    str
`//任意的字符串
// 生成会话秘钥
var key_128 = pbkdf2.pbkdf2Sync(str, 'salt', 1, 128 / 8, 'sha512'); */
function aesEncrypt(text,key) {

    var textBytes = aesjs.utils.utf8.toBytes(text);
    // The counter is optional, and if omitted will begin at 1
    var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    var encryptedBytes = aesCtr.encrypt(textBytes);

    // To print or store the binary data, you may convert it to hex
    var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
    console.log(encryptedHex);
    return encryptedHex
}
function aesDecrypt(encryptedHex, key) {
    var encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex);
    // decrypt a new instance must be instantiated.
    var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    var decryptedBytes = aesCtr.decrypt(encryptedBytes);

    // Convert our bytes back into text
    var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
    console.log(decryptedText);
    // "Text may be any length you wish, no padding is required."
    return decryptedText
}

module.exports = {
    aesDecrypt,
    aesEncrypt
}